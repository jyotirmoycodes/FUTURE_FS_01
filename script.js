// ===== Centered tab navigation: active state + sliding indicator =====
const tabs = document.getElementById('tabs');
const tabLinks = document.querySelectorAll('.tab-link');
const tabIndicator = document.getElementById('tabIndicator');

function moveIndicatorTo(link) {
  if (!link) return;
  const tabsRect = tabs.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const offsetLeft = linkRect.left - tabsRect.left - 5; // account for tabs padding
  tabIndicator.style.width = `${linkRect.width}px`;
  tabIndicator.style.transform = `translateX(${offsetLeft}px)`;
}

function setActiveTab(id) {
  tabLinks.forEach(link => {
    const isActive = link.dataset.section === id;
    link.classList.toggle('active', isActive);
    if (isActive) moveIndicatorTo(link);
  });
}

// Initialize indicator position once fonts/layout settle
window.addEventListener('load', () => setActiveTab('home'));
window.addEventListener('resize', () => {
  const active = document.querySelector('.tab-link.active');
  moveIndicatorTo(active);
});

// ===== Active section highlighting on scroll =====
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveTab(entry.target.getAttribute('id'));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ===== Theme toggle (dark default, light optional) =====
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    iconMoon.style.display = 'none';
    iconSun.style.display = 'inline-block';
  } else {
    root.removeAttribute('data-theme');
    iconMoon.style.display = 'inline-block';
    iconSun.style.display = 'none';
  }
}

// In-memory preference (no localStorage per artifact/browser-storage constraints)
let currentTheme = 'dark';
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  const active = document.querySelector('.tab-link.active');
  moveIndicatorTo(active);
});

// ===== Contact form -> mailto =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  window.location.href = `mailto:jyotirmoy555999@gmail.com?subject=${subject}&body=${body}`;
});

// ===== Animated background: gentle particle network =====
(function initBackground() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, particles, dpr;

  function getAccentColor() {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue('--accent').trim() || '#E8A33D';
  }

  function hexToRgb(hex) {
    const parsed = hex.replace('#', '');
    const bigint = parseInt(parsed.length === 3
      ? parsed.split('').map(c => c + c).join('')
      : parsed, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const density = Math.min(90, Math.floor((width * height) / 16000));
    particles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function step() {
    const [r, g, b] = hexToRgb(getAccentColor());
    ctx.clearRect(0, 0, width, height);

    // update + draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
      ctx.fill();
    });

    // connecting lines between nearby particles
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize);

  if (prefersReducedMotion) {
    step(); // draw a single static frame, no animation loop
  } else {
    requestAnimationFrame(step);
  }
})();
