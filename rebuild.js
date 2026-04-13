
(function(){
 const box=document.querySelector('.lightbox');
 if(!box) return;
 const img=box.querySelector('img');
 const close=()=>{box.classList.remove('open');img.removeAttribute('src');document.body.style.overflow='';};
 document.addEventListener('click',e=>{
   const target=e.target.closest('[data-full]');
   if(target){ e.preventDefault(); img.src=target.getAttribute('data-full')||target.getAttribute('src'); box.classList.add('open'); document.body.style.overflow='hidden'; return; }
   if(e.target===box || e.target.closest('.lb-close')) close();
 }, true);
 document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
})();
