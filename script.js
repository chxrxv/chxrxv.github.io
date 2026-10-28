/* ═══════════════════════════════════════════════════════════
   CHARUVI SURESH · PORTFOLIO · script.js
   GitHub Dark · Catppuccin Palette
═══════════════════════════════════════════════════════════ */

/* ─── Progressive enhancement ────────────────────────────── */
document.documentElement.classList.replace('no-js', 'js');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
document.querySelectorAll('a,button,.project-card,.social-icon,.interest-tag').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
});

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
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mob.classList.contains('open')) setMenuOpen(false);
  });
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

/* ─── Rotating focus text ─────────────────────────────────── */
const phrases = [
  'AI / ML · Computer Vision',
  'GenAI · LLM Applications',
  'Full-stack Software Engineering',
];
const typed = document.getElementById('typed-text');
if (typed && !prefersReducedMotion) {
  let phraseIndex = 0;
  window.setInterval(() => {
    typed.classList.add('is-changing');
    window.setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typed.textContent = phrases[phraseIndex];
      typed.classList.remove('is-changing');
    }, 200);
  }, 4200);
}

/* ─── Scroll reveal ───────────────────────────────────────── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  document.querySelectorAll('.projects-bento,.skills-grid,.certs-grid,.timeline,.github-activity,.contact-socials').forEach(group => {
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

initReveal();

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
      const show = f === 'all' || categories.includes(f) || (f === 'cloud' && categories.includes('data'));
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
