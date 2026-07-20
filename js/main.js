/* ============================================================
   TD Medical College — Main JavaScript
   Scroll animations, counters, FAQ accordion
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Scroll Reveal (Intersection Observer) --- */
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .stagger-children'
  );

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* --- Animated Number Counters --- */
  const counters = document.querySelectorAll('.stat-number');

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const end = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          let start = 0;
          const startTime = performance.now();

          function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(eased * end);
            el.textContent = current + suffix;
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = end + suffix;
            }
          }

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  }

  /* --- FAQ Accordion --- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all open items
      document.querySelectorAll('.faq-item.active').forEach((openItem) => {
        openItem.classList.remove('active');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
