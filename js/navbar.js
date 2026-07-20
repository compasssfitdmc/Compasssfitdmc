/* ============================================================
   TD Medical College — Navbar JavaScript
   Mobile menu toggle, scroll-based background
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');
  const overlay = document.getElementById('navOverlay');

  /* --- Toggle mobile menu --- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');

      if (overlay) {
        overlay.classList.toggle('active');
      }

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  /* --- Close menu on link click --- */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Close menu on overlay click --- */
  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  /* --- Navbar background on scroll --- */
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load in case page is already scrolled
  }
});
