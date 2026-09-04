(() => {
 const enabled=matchMedia('(prefers-reduced-motion:no-preference)');
 const panels=[...document.querySelectorAll('main > .section')];
 let pending=false;
 function measure(){
  pending=false;
  document.body.classList.toggle('mobile-story',enabled.matches);
  const height=document.documentElement.clientHeight;
  const header=document.querySelector('.site-header');
  const clearance=Math.min(Math.round(height*.35),Math.max(100,(header?.offsetHeight||80)+30));
  panels.forEach((panel,i)=>{
   if(!enabled.matches)return;
   panel.style.setProperty('--story-height', (height-clearance)+'px');
   panel.style.setProperty('--story-top', Math.min(clearance,height-panel.offsetHeight)+'px');
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
