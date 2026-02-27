/* =============================================
   NSEE Portfolio — Main JS
   Handles: navbar toggle, active link, scroll-reveal, theme toggle
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    /* Close on link click (mobile) */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ---- Active navbar link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Theme toggle ---- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function getTheme() {
    return localStorage.getItem('nsee-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('nsee-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  /* Apply saved / system theme immediately (no flash) */
  applyTheme(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ---- Scroll-reveal animation ---- */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll(
    '.pillar-card, .member-card, .project-card, .social-item, .about-grid, .about-logos'
  );

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* ---- Navbar shadow on scroll ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(0,0,0,0.4)'
        : 'none';
    }, { passive: true });
  }

  /* ---- Project card modal ---- */
  const modal      = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  let lastFocusedCard = null;

  if (modal) {
    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocusedCard) lastFocusedCard.focus();
    };

    /* Focus trap inside modal */
    modal.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        lastFocusedCard = card;
        document.getElementById('modalIcon').textContent  =
          card.querySelector('.project-thumb')?.textContent ?? '';
        document.getElementById('modalTitle').textContent =
          card.querySelector('h3')?.textContent          ?? '';
        document.getElementById('modalDesc').textContent  =
          card.querySelector('p')?.textContent           ?? '';

        const meta = document.getElementById('modalMeta');
        meta.innerHTML = '';
        card.querySelectorAll('.tag-group .tag').forEach(tag => {
          const s = document.createElement('span');
          s.textContent = tag.textContent;
          meta.appendChild(s);
        });
        card.querySelectorAll('.project-meta span').forEach(span => {
          const s = document.createElement('span');
          s.textContent = span.textContent;
          meta.appendChild(s);
        });

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (modalClose) modalClose.focus();
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  /* ---- Project filter chips ---- */
  const filterChips = document.querySelectorAll('.filter-chip');
  if (filterChips.length) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        document.querySelectorAll('.project-category').forEach(cat => {
          if (filter === 'all' || cat.dataset.category === filter) {
            cat.classList.remove('hidden');
          } else {
            cat.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ---- Contact form (Formspree AJAX) ---- */
  const contactForm    = document.getElementById('contactForm');
  const formFeedback   = document.getElementById('formFeedback');
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const action = contactForm.getAttribute('action');
      if (action.includes('YOUR_FORM_ID')) {
        formFeedback.textContent = 'Form not configured yet. Please email nsee@maua.br directly.';
        formFeedback.className   = 'form-feedback error';
        return;
      }
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = '...';
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          contactForm.reset();
          formFeedback.textContent = 'Message sent! We\'ll get back to you soon.';
          formFeedback.className   = 'form-feedback success';
        } else {
          throw new Error('Server error');
        }
      } catch {
        formFeedback.textContent = 'Something went wrong. Please email nsee@maua.br directly.';
        formFeedback.className   = 'form-feedback error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

});
