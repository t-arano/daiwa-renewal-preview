(() => {
 const enabled=matchMedia('(max-width:800px) and (prefers-reduced-motion:no-preference)');
 const panels=[...document.querySelectorAll('main > .section')];
 let pending=false;
 function measure(){
  pending=false;
  document.body.classList.toggle('mobile-story',enabled.matches);
  const height=document.documentElement.clientHeight;
  panels.forEach((panel,i)=>{
   if(!enabled.matches)return;
   panel.style.setProperty('--story-height', (height-100)+'px');
   panel.style.setProperty('--story-top', Math.min(100,height-panel.offsetHeight)+'px');
   panel.style.setProperty('--story-order',i+1);
   if(getComputedStyle(panel).backgroundColor==='rgba(0, 0, 0, 0)')panel.classList.add('story-paper');
  });
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(measure)}}
 const observer=new ResizeObserver(schedule);
 panels.forEach(p=>observer.observe(p));
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 enabled.addEventListener('change',schedule);
 document.fonts?.ready.then(schedule);
 measure();
})();
