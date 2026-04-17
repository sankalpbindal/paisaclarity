// ── NAVBAR ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if(hamburger && navLinks){
  hamburger.addEventListener('click',()=>navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
}
// Active nav link
const currentPage = location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.getAttribute('href')===currentPage)a.classList.add('active');
});

// ── TABS ──
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    // Find the parent tool-page or container that holds both tabs bar and tab contents
    const group=btn.closest('[data-tabs]');
    const container=group.parentElement;
    // Deactivate all buttons in this tab group
    group.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    // Deactivate all tab-content panels in the same container
    container.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    // Activate clicked button
    btn.classList.add('active');
    // Activate matching content panel
    const target=document.getElementById(btn.dataset.tab);
    if(target)target.classList.add('active');
    // Update URL hash silently
    history.replaceState(null,'','#'+btn.dataset.tab);
  });
});

// ── HASH → TAB ACTIVATION (for footer deep links) ──
function activateTabFromHash(){
  const hash=location.hash.replace('#','');
  if(!hash)return;
  // Find a tab button whose data-tab matches the hash
  const btn=document.querySelector(`.tab-btn[data-tab="${hash}"]`);
  if(btn){
    btn.click();
    // Scroll to the tabs bar smoothly
    setTimeout(()=>{
      const tabsBar=btn.closest('[data-tabs]');
      if(tabsBar)tabsBar.scrollIntoView({behavior:'smooth',block:'start'});
    },80);
  }
}
activateTabFromHash();
window.addEventListener('hashchange',activateTabFromHash);

// ── FAQ ──
document.querySelectorAll('.faq-question').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.closest('.faq-item');
    const wasOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!wasOpen)item.classList.add('open');
  });
});

// ── SCROLL TOP ──
const scrollTopBtn=document.getElementById('scrollTop');
if(scrollTopBtn){
  window.addEventListener('scroll',()=>scrollTopBtn.classList.toggle('visible',window.scrollY>400));
  scrollTopBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// ── SCROLL ANIMATIONS ──
const animObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');animObserver.unobserve(e.target);}});
},{threshold:.1});
document.querySelectorAll('[data-anim]').forEach(el=>animObserver.observe(el));

// ── FORMAT HELPERS ──
function fmt(n){return new Intl.NumberFormat('en-IN').format(Math.round(n));}
function fmtL(n){if(n>=10000000)return(n/10000000).toFixed(2)+' Cr';if(n>=100000)return(n/100000).toFixed(2)+' L';return fmt(n);}
function parseFmt(s){return parseFloat(s.replace(/[^0-9.]/g,''))||0;}

// ── RANGE INPUT DISPLAY ──
document.querySelectorAll('input[type=range][data-display]').forEach(r=>{
  const out=document.getElementById(r.dataset.display);
  const prefix=r.dataset.prefix||'';
  const suffix=r.dataset.suffix||'';
  const format=r.dataset.format;
  function update(){
    let v=parseFloat(r.value);
    let display=format==='lakh'?fmtL(v):fmt(v);
    if(out)out.textContent=prefix+display+suffix;
  }
  r.addEventListener('input',update);
  update();
});

// ── COPY TO CLIPBOARD ──
document.querySelectorAll('[data-copy]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const target=document.getElementById(btn.dataset.copy);
    if(target){
      navigator.clipboard.writeText(target.innerText||target.value).then(()=>{
        const orig=btn.textContent;btn.textContent='Copied!';
        setTimeout(()=>btn.textContent=orig,2000);
      });
    }
  });
});