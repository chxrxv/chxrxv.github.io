/* ═══════════════════════════════════════════════════════════
   CHARUVI SURESH · PORTFOLIO · script.js
   GitHub Dark · Catppuccin Palette
═══════════════════════════════════════════════════════════ */

/* ─── Loader ──────────────────────────────────────────────── */
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    document.body.style.overflow = '';
    initReveal();
  }, 2300);
});

/* ─── Custom cursor ───────────────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, fX = 0, fY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursor) { cursor.style.left = mouseX+'px'; cursor.style.top = mouseY+'px'; }
});
(function animF() {
  fX += (mouseX - fX) * 0.12; fY += (mouseY - fY) * 0.12;
  if (follower) { follower.style.left = fX+'px'; follower.style.top = fY+'px'; }
  requestAnimationFrame(animF);
})();
document.querySelectorAll('a,button,.skill-pill,.project-card,.social-icon,.interest-tag').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
});

/* ─── Scroll progress ──────────────────────────────────────── */
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!bar) return;
  bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
});

/* ─── Navbar ───────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 50));

/* ─── Mobile menu ─────────────────────────────────────────── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobile-menu');
if (ham && mob) {
  ham.addEventListener('click', () => mob.classList.toggle('open'));
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));
}

/* ─── Theme toggle ────────────────────────────────────────── */
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
  themeBtn.addEventListener('click', () => {
    const l = document.body.classList.toggle('light');
    themeBtn.innerHTML = l ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', l ? 'light' : 'dark');
  });
}

/* ─── Typed text ──────────────────────────────────────────── */
const phrases = [
  'Software Engineer · AI-ML Engineer.',
  'Deployed AI and compliance systems.',
  'Python · PyTorch · Firebase · Cloud Functions.',
  'Built RAG, security triage, and computer vision products.',
  'Open to engineering roles in AI and product systems.',
];
let pi = 0, ci = 0, del = false;
const typed = document.getElementById('typed-text');
function typeLoop() {
  if (!typed) return;
  const p = phrases[pi];
  if (!del) {
    typed.textContent = p.slice(0, ci + 1); ci++;
    if (ci === p.length) { del = true; setTimeout(typeLoop, 2200); return; }
  } else {
    typed.textContent = p.slice(0, ci - 1); ci--;
    if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, del ? 32 : 62);
}
setTimeout(typeLoop, 2700);

/* ─── Particles ───────────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);

  class P {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W; this.y = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - .5) * .25; this.vy = -(Math.random() * .35 + .08);
      this.r = Math.random() * 1.5 + .4;
      this.a = Math.random() * .4 + .1; this.life = 0;
      // catppuccin colors: purple, blue, pink
      const colors = ['203,166,247','137,180,250','243,139,168','148,226,213'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() { this.x += this.vx; this.y += this.vy; this.life += .005; if (this.y < -10 || this.life > 1) this.reset(); }
    draw() {
      const alpha = Math.sin(this.life * Math.PI) * this.a;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${alpha})`; ctx.fill();
    }
  }
  for (let i = 0; i < 70; i++) particles.push(new P());
  (function loop() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(loop); })();
})();

/* ─── Scroll reveal ───────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal-up').forEach(el => obs.observe(el));
}

/* ─── Magnetic buttons ────────────────────────────────────── */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2) * .22;
    const dy = (e.clientY - r.top - r.height/2) * .22;
    el.style.transform = `translate(${dx}px,${dy}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

/* ─── Project filter ──────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const cats = card.dataset.category || '';
      const show = f === 'all' || cats.includes(f);
      card.style.transition = 'opacity .35s,transform .35s';
      card.style.opacity = show ? '1' : '0.15';
      card.style.transform = show ? '' : 'scale(0.97)';
      card.style.pointerEvents = show ? '' : 'none';
    });
  });
});

/* ─── Contact form ────────────────────────────────────────── */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button span');
    btn.textContent = 'Sending…';
    setTimeout(() => {
      btn.textContent = 'Send message';
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.className = 'success';
      form.reset();
      setTimeout(() => { status.textContent = ''; status.className = ''; }, 5000);
    }, 1500);
  });
}

/* ─── Smooth scroll ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return; e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── Parallax blobs ──────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  document.querySelectorAll('.blob').forEach((b, i) => {
    b.style.transform = `translateY(${sy * (.04 + i * .025)}px)`;
  });
});

/* ─── Active nav ──────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
  navLinks.forEach(a => { a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--purple)' : ''; });
});
