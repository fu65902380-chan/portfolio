
(function(){
  function safePathName(){ return (location.pathname||'').replace(/\/index\.html$/, ''); }

  function classifyPage(){
    var path=safePathName();
    if(/stills(\.html)?$/.test(path)) document.body.classList.add('stills-page');
    if(!/(^|\/)(index\.html)?$/.test(path) && !/stills|about|vlog/.test(path)) document.body.classList.add('project-page');
    if(/honghe(\.html)?$/.test(path)) document.body.classList.add('page-honghe');
  }

  function setupSlideshows(){
    document.querySelectorAll('section.block .slideshow').forEach(function(show){
      var slides=[].slice.call(show.querySelectorAll('.slide')).filter(function(img){
        return img && img.getAttribute('src') && img.getAttribute('src') !== 'data:,';
      });
      if(!slides.length) return;
      slides.forEach(function(slide){ slide.style.display='block'; });
      if(!show.previousElementSibling || !show.previousElementSibling.classList || !show.previousElementSibling.classList.contains('slideshow-nav')){
        var nav=document.createElement('div');
        nav.className='slideshow-nav';
        nav.innerHTML='<button type="button" aria-label="Scroll left">&#8592;</button><button type="button" aria-label="Scroll right">&#8594;</button>';
        show.parentNode.insertBefore(nav, show);
        var amount=function(){ return Math.min(show.clientWidth*0.9, 900); };
        nav.children[0].addEventListener('click', function(){ show.scrollBy({left:-amount(),behavior:'smooth'}); });
        nav.children[1].addEventListener('click', function(){ show.scrollBy({left: amount(),behavior:'smooth'}); });
      }
    });
  }

  function setupHongheLayout(){
    var path=safePathName();
    if(!/honghe(\.html)?$/.test(path)) return;
    if(document.querySelector('.honghe-hero-fix')) return;
    var titleSec=document.querySelector('#zwehhQ');
    var slideSec=document.querySelector('#z_dEa8');
    var creditSec=document.querySelector('#zrVjt_');
    if(!slideSec) return;
    var title=(titleSec && titleSec.innerText || 'Honghe, Yunnan').trim();
    var sub='';
    if(titleSec){
      var txt=titleSec.innerText.split('\n').map(function(s){return s.trim();}).filter(Boolean);
      if(txt.length>1) sub=txt[1];
    }
    var credit=(creditSec && creditSec.innerText || '').trim();
    var hero=document.createElement('div');
    hero.className='honghe-hero-fix';
    hero.innerHTML='<h1>'+title+'</h1>'+(sub?'<p>'+sub+'</p>':'')+(credit?'<p style="margin-top:18px;opacity:.72">'+credit+'</p>':'');
    slideSec.parentNode.insertBefore(hero, slideSec);
  }

  function setupHongheExtraGallery(){
    var path=safePathName();
    if(!/honghe(\.html)?$/.test(path)) return;
    if(document.querySelector('.honghe-extra-gallery')) return;
    var target=document.querySelector('#z_dEa8 .slideshow, section.block .slideshow');
    if(!target) return;
    var wrap=document.createElement('section');
    wrap.className='honghe-extra-wrap';
    wrap.innerHTML='\n      <div class="honghe-extra-heading">More Stills</div>\n      <div class="honghe-extra-gallery slideshow">\n        <img class="slide" src="Honghe_1.35.2.jpg" alt="Honghe still 1">\n        <img class="slide" src="Honghe_1.46.1.jpg" alt="Honghe still 2">\n        <img class="slide" src="Honghe_1.62.1.jpg" alt="Honghe still 3">\n        <img class="slide" src="Honghe_1.33.1.jpg" alt="Honghe still 4">\n        <img class="slide" src="Honghe_1.42.2.jpg" alt="Honghe still 5">\n        <img class="slide" src="Honghe_1.44.1.jpg" alt="Honghe still 6">\n      </div>';
    target.parentNode.insertBefore(wrap, target.nextSibling);
    var gallery=wrap.querySelector('.honghe-extra-gallery');
    var nav=document.createElement('div');
    nav.className='slideshow-nav';
    nav.innerHTML='<button type="button" aria-label="Scroll left">&#8592;</button><button type="button" aria-label="Scroll right">&#8594;</button>';
    wrap.insertBefore(nav, gallery);
    var amount=function(){ return Math.min(gallery.clientWidth*0.9, 900); };
    nav.children[0].addEventListener('click', function(){ gallery.scrollBy({left:-amount(),behavior:'smooth'}); });
    nav.children[1].addEventListener('click', function(){ gallery.scrollBy({left: amount(),behavior:'smooth'}); });
  }

  function setupLightbox(){
    var overlay=document.querySelector('.custom-lightbox');
    if(!overlay){
      overlay=document.createElement('div');
      overlay.className='custom-lightbox';
      overlay.innerHTML='\n        <button class="custom-lightbox-close" aria-label="Close">&times;</button>\n        <img class="custom-lightbox-image" alt="Fullscreen preview">';
      document.body.appendChild(overlay);
    }
    var img=overlay.querySelector('.custom-lightbox-image');
    var closeBtn=overlay.querySelector('.custom-lightbox-close');
    function close(){
      overlay.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      img.removeAttribute('src');
    }
    function open(src, alt){
      if(!src || src==='data:,') return;
      img.src=src;
      img.alt=alt||'';
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-open');
    }
    closeBtn.onclick=close;
    overlay.onclick=function(e){ if(e.target===overlay) close(); };
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
    document.addEventListener('click', function(e){
      var el=e.target.closest('img.image__image, .grid-gallery img, section.block .slideshow .slide, .honghe-extra-gallery img');
      if(!el) return;
      var src=el.getAttribute('src');
      if(!src || src==='data:,') return;
      e.preventDefault();
      e.stopPropagation();
      open(src, el.getAttribute('alt'));
    }, true);
  }

  function init(){
    classifyPage();
    setupSlideshows();
    setupHongheLayout();
    setupHongheExtraGallery();
    setupLightbox();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
