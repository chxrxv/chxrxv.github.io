/* ═══════════════════════════════════════════════════════════
   CHARUVI SURESH · PORTFOLIO · script.js
   GitHub Dark · Catppuccin Palette
═══════════════════════════════════════════════════════════ */

/* ─── Progressive enhancement and loader ─────────────────── */
document.documentElement.classList.replace('no-js', 'js');
const loader = document.getElementById('loader');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (loader) {
  document.body.style.overflow = 'hidden';
  const finishLoading = () => {
    window.setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initReveal();
    }, prefersReducedMotion ? 0 : 650);
  };
  if (document.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading, { once: true });
}

/* ─── Custom cursor ───────────────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, fX = 0, fY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursor) { cursor.style.left = mouseX+'px'; cursor.style.top = mouseY+'px'; }
});
(function animF() {
  if (!follower || prefersReducedMotion) return;
  fX += (mouseX - fX) * 0.12; fY += (mouseY - fY) * 0.12;
  follower.style.left = fX+'px'; follower.style.top = fY+'px';
  requestAnimationFrame(animF);
})();
document.querySelectorAll('a,button,.skill-pill,.project-card,.social-icon,.interest-tag').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
});

/* ─── Project card depth ──────────────────────────────────── */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty('--pointer-x', `${x * 100}%`);
      card.style.setProperty('--pointer-y', `${y * 100}%`);
      card.style.setProperty('--tilt-x', `${(x - .5) * 4}deg`);
      card.style.setProperty('--tilt-y', `${(.5 - y) * 4}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

/* ─── Scroll progress ──────────────────────────────────────── */
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!bar) return;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0}%`;
}, { passive: true });

/* ─── Navbar ───────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 50));

/* ─── Mobile menu ─────────────────────────────────────────── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobile-menu');
if (ham && mob) {
  const setMenuOpen = open => {
    mob.classList.toggle('open', open);
    mob.inert = !open;
    mob.setAttribute('aria-hidden', String(!open));
    ham.setAttribute('aria-expanded', String(open));
    ham.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };
  setMenuOpen(false);
  ham.addEventListener('click', () => setMenuOpen(!mob.classList.contains('open')));
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mob.classList.contains('open')) {
      setMenuOpen(false);
      ham.focus();
    }
  });
}

/* ─── Theme toggle ────────────────────────────────────────── */
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (error) {
    console.warn('Unable to read the saved theme preference.', error);
  }
  const setTheme = light => {
    document.body.classList.toggle('light', light);
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    const icon = document.createElement('i');
    icon.className = `fas fa-${light ? 'sun' : 'moon'}`;
    icon.setAttribute('aria-hidden', 'true');
    themeBtn.replaceChildren(icon);
  };
  setTheme(savedTheme === 'light');
  themeBtn.addEventListener('click', () => {
    const light = !document.body.classList.contains('light');
    setTheme(light);
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark');
    } catch (error) {
      console.warn('Unable to save the theme preference.', error);
    }
  });
}

/* ─── Typed text ──────────────────────────────────────────── */
const phrases = [
  'Software Engineer · AI-ML Engineer.',
  'AI, cloud, and full-stack development.',
  'Python · React · Firebase · Google Cloud.',
  'Building with RAG, security, and computer vision.',
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
if (typed && prefersReducedMotion) {
  typed.textContent = phrases[0];
} else {
  setTimeout(typeLoop, 2700);
}

/* ─── Particles ───────────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx || prefersReducedMotion) return;
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
  const particleCount = window.matchMedia('(pointer: coarse)').matches ? 24 : 70;
  for (let i = 0; i < particleCount; i++) particles.push(new P());
  (function loop() {
    if (document.visibilityState === 'visible') {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
    }
    requestAnimationFrame(loop);
  })();
})();

/* ─── Scroll reveal ───────────────────────────────────────── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  document.querySelectorAll('.projects-bento,.skills-grid,.certs-grid,.timeline,.github-grid,.contact-socials').forEach(group => {
    group.querySelectorAll(':scope > .reveal-up').forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 55}ms`);
    });
  });
  const revealInView = () => {
    elements.forEach(el => {
      if (el.classList.contains('visible')) return;
      const bounds = el.getBoundingClientRect();
      if (bounds.top < window.innerHeight - 48 && bounds.bottom > 0) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  elements.forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
  let revealFrame = 0;
  const scheduleReveal = () => {
    if (revealFrame) return;
    revealFrame = requestAnimationFrame(() => {
      revealFrame = 0;
      revealInView();
    });
  };
  revealInView();
  window.addEventListener('scroll', scheduleReveal, { passive: true });
  window.addEventListener('resize', scheduleReveal);
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
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    const f = btn.dataset.filter;
    const cards = [...document.querySelectorAll('.project-card')];
    let visibleCount = 0;
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(/\s+/);
      const show = f === 'all' || categories.includes(f);
      if (show && card.hidden) {
        card.hidden = false;
        card.classList.remove('filter-enter');
        void card.offsetWidth;
        card.classList.add('filter-enter');
      } else if (!show) {
        card.hidden = true;
        card.classList.remove('filter-enter');
      }
      if (show) visibleCount++;
    });
    const projectStatus = document.getElementById('project-status');
    if (projectStatus) projectStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}.`;
  });
});

/* ─── Smooth scroll ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return; e.preventDefault();
    t.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ─── Active nav ──────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const updateActiveNav = () => {
  let cur = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) cur = section.id;
  });
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${cur}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
