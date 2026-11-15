(() => {
  'use strict';

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    const setNavOpen = (isOpen) => {
      navLinks.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    };
    navToggle.addEventListener('click', () => {
      setNavOpen(!navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setNavOpen(false);
        navToggle.focus();
      }
    });
  }

  // Hairline under the header once the page has scrolled
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const syncHeader = () => siteHeader.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();
  }

  // Photo viewer for the "Some of our work" cards.
  // Uses a custom lightbox rather than the Fullscreen API — iOS Safari
  // doesn't support requestFullscreen() on <img> elements (only <video>),
  // so a lightbox is the only approach that works consistently on both
  // desktop and mobile.
  const photoLightbox = document.getElementById('photoLightbox');
  const photoLightboxImg = document.getElementById('photoLightboxImg');
  const photoLightboxClose = document.getElementById('photoLightboxClose');
  if (photoLightbox && photoLightboxImg) {
    const placeholderSrc = photoLightboxImg.src;
    let returnFocusTo = null;

    const openLightbox = (img, trigger) => {
      returnFocusTo = trigger || null;
      photoLightboxImg.src = img.currentSrc || img.src;
      photoLightboxImg.alt = img.alt;
      photoLightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (photoLightboxClose) photoLightboxClose.focus();
    };
    const closeLightbox = () => {
      photoLightbox.hidden = true;
      document.body.style.overflow = '';
      photoLightboxImg.src = placeholderSrc;
      photoLightboxImg.alt = '';
      if (returnFocusTo) returnFocusTo.focus();
      returnFocusTo = null;
    };

    document.querySelectorAll('.media-card').forEach((card) => {
      const img = card.querySelector('.media img');
      const trigger = card.querySelector('[data-lightbox]');
      if (!img) return;
      if (trigger) trigger.addEventListener('click', () => openLightbox(img, trigger));
      // Clicking the photo itself is a mouse shortcut; the button above is the accessible control.
      img.addEventListener('click', () => openLightbox(img, trigger));
    });
    photoLightbox.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !photoLightbox.hidden) closeLightbox();
    });
  }
})();
