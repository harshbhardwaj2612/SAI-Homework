/**
 * Harsh Bhardwaj — Portfolio Application
 * Spider-Verse (Across the Spider-Verse) Edition
 * - Classy Dimensional Cursor & Particles
 * - Interactive Text Glitch on Mouse Movement (RGB Split & Scramble)
 * - Scroll Reveals, Count-Up Stats, Skill Bars, Tilt
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpiderVerseCursor();
  initTextGlitchOnHover();
  initParticles();
  initNavbar();
  initTypewriter();
  initScrollReveal();
  initSkillBars();
  initProjectTilt();
  initRippleButtons();
  initContactForm();
  initMobileMenu();
  initCountUp();
});

/* ==========================================================================
   1. SPIDER-VERSE CLASSY CUSTOM CURSOR
   ========================================================================== */
function initSpiderVerseCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // 1. Cursor Dot
  let dot = document.getElementById('sv-cursor-dot');
  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'sv-cursor-dot';
    document.body.appendChild(dot);
  }

  // 2. Cursor Ring
  let ring = document.getElementById('sv-cursor-ring');
  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'sv-cursor-ring';
    document.body.appendChild(ring);
  }

  // 3. Canvas for Trailing Dimensional Dust & Click Shockwaves
  let canvas = document.getElementById('sv-cursor-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'sv-cursor-canvas';
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let mouse = { x: -100, y: -100 };
  let ringPos = { x: -100, y: -100 };
  let particles = [];
  let shockwaves = [];

  // Track Mouse Movement
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    dot.style.left = mouse.x + 'px';
    dot.style.top = mouse.y + 'px';

    // Spawn subtle dimensional glitch dust
    if (Math.random() > 0.4) {
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 8,
        y: mouse.y + (Math.random() - 0.5) * 8,
        size: Math.random() * 2.5 + 1,
        color: Math.random() > 0.5 ? '#00e5ff' : '#ff1744',
        alpha: 0.8,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    }
  });

  // Smooth Ring Follow with Lerp
  function updateRing() {
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;

    ring.style.left = ringPos.x + 'px';
    ring.style.top = ringPos.y + 'px';

    requestAnimationFrame(updateRing);
  }
  updateRing();

  // Hover states on interactive elements
  const hoverTargets = 'a, button, input, textarea, select, .project-card, .glass, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('cursor-hover');
      dot.style.transform = 'translate(-50%, -50%) scale(1.6)';
      dot.style.background = '#ffea00';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('cursor-hover');
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.background = '#00e5ff';
    }
  });

  // Click Shockwave
  window.addEventListener('mousedown', (e) => {
    ring.classList.add('cursor-active');
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 4,
      maxRadius: 36,
      alpha: 1
    });
  });

  window.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-active');
  });

  // Canvas Render Loop for Glitch Dust & Waves
  function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.035;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fillRect(p.x, p.y, p.size, p.size); // Rectangular glitch pixels!
      ctx.restore();
    }

    // Draw Click Shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const s = shockwaves[i];
      s.radius += (s.maxRadius - s.radius) * 0.22;
      s.alpha -= 0.045;

      if (s.alpha <= 0) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.strokeStyle = `rgba(0, 229, 255, ${s.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#ff1744';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    requestAnimationFrame(renderCanvas);
  }
  renderCanvas();
}

/* ==========================================================================
   2. SPIDER-VERSE TEXT GLITCH ON CURSOR HOVER (REVERTS INSTANTLY ON LEAVE)
   ========================================================================== */
function initTextGlitchOnHover() {
  const glitchSelector = 'h1, h2, h3, h4, .nav-link, .glitch-target, .count-up, strong, .float-badge';
  const textElements = document.querySelectorAll(glitchSelector);

  const glitchChars = '!<>-_\\/[]{}—=+*^?#________01ØΔ';

  textElements.forEach(el => {
    // Store original HTML and text once so it can ALWAYS be reverted
    el.dataset.originalHtml = el.innerHTML;
    el.dataset.originalText = el.innerText || el.textContent;

    let scrambleInterval = null;

    el.addEventListener('mouseenter', () => {
      // 1. Add visual Spider-Verse chromatic RGB split
      el.classList.add('sv-glitch-active');

      // 2. Controlled character glitch only on elements that don't have nested complex markup
      // and only if the text is short enough to feel snappy like the movie
      const hasChildren = el.children && el.children.length > 0;
      if (!hasChildren && el.dataset.originalText && el.dataset.originalText.length < 50) {
        const text = el.dataset.originalText;
        let iteration = 0;
        clearInterval(scrambleInterval);

        scrambleInterval = setInterval(() => {
          el.innerText = text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ' || char === '\n') return char;
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');

          if (iteration >= text.length) {
            clearInterval(scrambleInterval);
            el.innerText = text;
          }

          iteration += 1.5;
        }, 25);
      }
    });

    el.addEventListener('mouseleave', () => {
      // 1. Stop any in-progress character glitch immediately
      if (scrambleInterval) {
        clearInterval(scrambleInterval);
        scrambleInterval = null;
      }

      // 2. Remove the glitch animation class
      el.classList.remove('sv-glitch-active');

      // 3. 100% Guaranteed Reversion: restore exact original state immediately
      if (el.dataset.originalHtml) {
        el.innerHTML = el.dataset.originalHtml;
      } else if (el.dataset.originalText) {
        el.innerText = el.dataset.originalText;
      }
    });
  });
}

/* ==========================================================================
   3. BACKGROUND PARTICLES (Classy Multiverse Field)
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.color = Math.random() > 0.5 ? '0, 229, 255' : '255, 23, 68';
      this.opacity = Math.random() * 0.45 + 0.15;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w) this.speedX *= -1;
      if (this.y < 0 || this.y > h) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(Math.floor((w * h) / 12000), 90);
  particles = Array.from({ length: count }, () => new Particle());

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 115) {
          const opacity = 1 - dist / 115;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. NAVBAR
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   5. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'First-Year CS Student @ NST Hyderabad',
    'Hacktoberfest Hackathon Winner (3rd Place) 🏆',
    'Creator of Reporbit — Learn Code from Scratch',
    'Python Enthusiast & Systems Explorer',
    'Learning Maths, Physics & SNAI Daily',
    'Taking the Leap of Faith into Tech 🚀'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 65;

  function tick() {
    const current = phrases[phraseIdx];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 60 + Math.random() * 30;

      if (charIdx === current.length) {
        isDeleting = true;
        speed = 2200;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 30;

      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 350;
      }
    }

    setTimeout(tick, speed);
  }

  tick();
}

/* ==========================================================================
   6. SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. SKILL BARS
   ========================================================================== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-width');
        entry.target.style.width = target;
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  fills.forEach(f => observer.observe(f));
}

/* ==========================================================================
   8. PROJECT CARD TILT
   ========================================================================== */
function initProjectTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const inner = card.querySelector('.project-card-inner');
    if (!inner) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   9. RIPPLE BUTTONS
   ========================================================================== */
function initRippleButtons() {
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* ==========================================================================
   10. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
      Transmitting message...
    `;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();
      showToast('✨ Transmission dispatched! Harsh will reply shortly.');
    }, 1200);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; z-index: 999999;
    background: linear-gradient(135deg, #0d0818, #180924);
    border: 1.5px solid #00e5ff;
    color: #f8fafc; padding: 16px 24px; border-radius: 14px;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.4);
    animation: slideUp 0.4s ease forwards;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   11. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('menu-close');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => menu.classList.add('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => menu.classList.remove('open'));

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ==========================================================================
   12. COUNT-UP STAT ANIMATION
   ========================================================================== */
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
}
