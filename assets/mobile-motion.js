(() => {
 const enabled=matchMedia('(max-width:800px) and (prefers-reduced-motion:no-preference)');
 const panels=[...document.querySelectorAll('main .section')];
 let pending=false, cards;
 function paint(){
  pending=false;
  if(!enabled.matches)return;
  const height=window.innerHeight;
  panels.forEach(panel=>{
   const top=panel.getBoundingClientRect().top;
   const progress=Math.max(0,Math.min(1,(height-top)/(height*.72)));
   panel.style.setProperty('--story-rise',`${Math.round((1-progress)*180)}px`);
   panel.style.setProperty('--story-scale',String(.955+.045*progress));
  });
 }
 function schedule(){if(enabled.matches&&!pending){pending=true;requestAnimationFrame(paint)}}
 function setup(){
  document.body.classList.toggle('mobile-story',enabled.matches);
  cards?.disconnect();
  if(!enabled.matches){panels.forEach(p=>{p.style.removeProperty('--story-rise');p.style.removeProperty('--story-scale')});return}
  cards=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('story-card');cards.unobserve(entry.target)}
  }),{threshold:.08});
  document.querySelectorAll('.work,.strength,.business-item,.trust-panel,.evidence-grid figure,.facility').forEach(el=>cards.observe(el));
  paint();
 }
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 enabled.addEventListener('change',setup);
 setup();
})();
