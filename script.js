/* Edit project content here. Keep ids in the same order as the cards. */
const PROJECTS={
 'lumen':{title:'LUMEN',tags:['Wireless Sensor Network','Edge AI','Computer Vision'],
  github:'https://github.com/capybrad/lumen',
  desc:['LUMEN stands for <b>Lane-Use Monitoring for Event Notification</b>: An Integrated Sensor and Computer Vision-Based System for Rural Blind Curves Lane Safety Enhancement and Accident Detection. It\u2019s our capstone project for the final year.',
        'Its subnodes are equipped with a <b>24 GHz millimeter-wave radar</b> for vehicle detection, using <b>ESP32 microcontrollers</b>. Its main node is powered by a <b>Raspberry Pi 5</b> with a wide-angle day/night camera, running a custom <b>YOLOv8n</b> computer vision model. All nodes are interconnected through <b>433 MHz transceiver modules</b>, and the entire system is <b>solar powered</b>.'],
  images:[['assets/lumen-1.jpg','Team beside the LUMEN nodes'],['assets/lumen-2.jpg','Team beside the LUMEN nodes']]},
 'plant-monitor':{title:'PLANT MONITOR',tags:['ESP32','IoT','PlatformIO'],
  github:'https://github.com/capybrad/plant-monitor',
  desc:['An <b>ESP32</b> plant monitoring system that reads a <b>soil moisture sensor</b>. It is built with the Arduino framework on <b>PlatformIO</b>.'],
  images:[['assets/plant-monitor-1.jpg','Plant monitor prototype'],['assets/plant-monitor-2.jpg','Plant monitor wiring']]},
 'stm32-tetris':{title:'BLUE PILL TETRIS',tags:['Embedded Systems','STM32','Custom Driver'],
  github:'https://github.com/capybrad/stm32-tetris',
  desc:['A Tetris game console on an <b>STM32 Blue Pill</b> with an <b>SSD1306 OLED</b> display. The board has 32 KB of flash, so a custom minimal I2C driver (<b>SSD1306Mini</b>) replaces the Adafruit display libraries to fit.'],
  images:[['assets/tetris-1.jpg','Tetris console running'],['assets/tetris-2.jpg','Tetris console wiring']]}
};

const $=s=>document.querySelector(s);
const modal=$('#modal'),dialog=$('.dialog');
let current=null,opener=null;

function render(id){
  const p=PROJECTS[id];current=id;
  $('#pop-title').textContent=p.title;
  $('.tags').innerHTML=p.tags.map(t=>'<li>'+t+'</li>').join('');
  $('.desc').innerHTML=p.desc.map(t=>'<p>'+t+'</p>').join('');
  $('.gh').href=p.github;
  $('.gallery').replaceChildren(...p.images.map(([src,alt])=>{
    const f=document.createElement('div');f.className='frame';
    f.innerHTML=['h t','h b','v l','v r'].map(c=>'<span class="m '+c+'" aria-hidden="true"></span>').join('');
    const i=new Image();i.src=src;i.alt=alt;i.onerror=()=>f.remove();f.prepend(i);return f}));
  history.replaceState(null,'','#'+id);
  modal.scrollTop=0;
}
function open(id,from){opener=from||null;render(id);modal.hidden=false;document.body.style.overflow='hidden';$('.close').focus()}
function close(){modal.hidden=true;document.body.style.overflow='';history.replaceState(null,'','#projects');if(opener)opener.focus()}

document.querySelectorAll('[data-project]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();open(a.dataset.project,a)}));
$('.close').onclick=close;
modal.addEventListener('click',e=>{if(e.target===modal)close()});
document.addEventListener('keydown',e=>{
  if(modal.hidden)return;
  if(e.key==='Escape')close();
  else if(e.key==='Tab'){
    const f=[...dialog.querySelectorAll('button,a[href]')],a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
    else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
  }
});
if(PROJECTS[location.hash.slice(1)])open(location.hash.slice(1));