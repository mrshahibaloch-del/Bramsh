/* Small, dependency-free interactions for Brew Haven. */
(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link, .nav__cta');
  const progress = document.getElementById('scroll-progress-bar');
  const backToTop = document.getElementById('back-to-top');
  const year = document.getElementById('year');

  year.textContent = new Date().getFullYear();

  const setMenu = (open) => {
    body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  navToggle.addEventListener('click', () => setMenu(!body.classList.contains('nav-open')));
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  const updateScrollUI = () => {
    const top = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${height > 0 ? (top / height) * 100 : 0}%`;
    header.classList.toggle('is-scrolled', top > 14);
    backToTop.classList.toggle('is-visible', top > 650);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach((item) => revealObserver.observe(item));

    const sections = document.querySelectorAll('main section[id]');
    const navItems = document.querySelectorAll('.nav__link');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  } else { reveals.forEach((item) => item.classList.add('is-visible')); }

  const slides = [...document.querySelectorAll('.testimonial')];
  const slideNumber = document.getElementById('slide-number');
  let slide = 0;
  const showSlide = (next) => {
    slides[slide].classList.remove('is-current');
    slide = (next + slides.length) % slides.length;
    slides[slide].classList.add('is-current');
    slideNumber.textContent = String(slide + 1).padStart(2, '0');
  };
  document.querySelector('[data-slider="previous"]').addEventListener('click', () => showSlide(slide - 1));
  document.querySelector('[data-slider="next"]').addEventListener('click', () => showSlide(slide + 1));
  let sliderTimer = window.setInterval(() => showSlide(slide + 1), 7000);
  document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => window.clearInterval(sliderTimer));
  document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => { sliderTimer = window.setInterval(() => showSlide(slide + 1), 7000); });

  const bindForm = (formId, messageId, successText, endpoint) => {
    const form = document.getElementById(formId);
    const message = document.getElementById(messageId);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const fields = [...form.querySelectorAll('[required]')];
      let isValid = true;
      fields.forEach((field) => { const invalid = !field.checkValidity(); field.classList.toggle('is-invalid', invalid); isValid = isValid && !invalid; });
      if (!isValid) { message.textContent = 'Please complete the highlighted fields.'; return; }

      const payload = Object.fromEntries(new FormData(form).entries());
      message.textContent = 'Sending your request…';

      try {
        const url = endpoint.startsWith('http') ? endpoint : `http://localhost:3000${endpoint}`;
        console.log('Sending to:', url, 'Data:', payload);
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json().catch(() => ({}));
        console.log('Response:', response.status, data);
        if (!response.ok) throw new Error(data.error || 'Unable to send your request right now.');
        message.textContent = successText;
        form.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        message.textContent = error.message || 'Unable to send your request right now. Please email us directly at mrshahibaloch@gmail.com.';
      }
    });

    form.querySelectorAll('input, select').forEach((field) => field.addEventListener('input', () => { field.classList.remove('is-invalid'); message.textContent = ''; }));
  };
  bindForm('reservation-form', 'reservation-message', 'You’re all set — we’ll confirm your table shortly.', '/api/contact');
  bindForm('newsletter-form', 'newsletter-message', 'Welcome in. Your first note is on its way.', '/api/newsletter');
})();
