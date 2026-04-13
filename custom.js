
(function(){
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

  function setupHongheExtraGallery(){
    var path=(location.pathname||'').replace(/\/index\.html$/, '');
    if(!/honghe(\.html)?$/.test(path)) return;
    if(document.querySelector('.honghe-extra-gallery')) return;
    var target=document.querySelector('section.block .slideshow');
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
    if(document.querySelector('.custom-lightbox')) return;
    var overlay=document.createElement('div');
    overlay.className='custom-lightbox';
    overlay.innerHTML='\n      <button class="custom-lightbox-close" aria-label="Close">&times;</button>\n      <img class="custom-lightbox-image" alt="Fullscreen preview">';
    document.body.appendChild(overlay);
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
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
    document.querySelectorAll('img.image__image, section.block .slideshow .slide, .honghe-extra-gallery img').forEach(function(el){
      var src=el.getAttribute('src');
      if(!src || src==='data:,') return;
      el.classList.add('lightbox-enabled');
      el.style.cursor='zoom-in';
      el.addEventListener('click', function(e){ e.preventDefault(); open(src, el.getAttribute('alt')); });
    });
  }

  function init(){
    setupSlideshows();
    setupHongheExtraGallery();
    setupLightbox();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
