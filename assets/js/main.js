// =========================================================================
// protfolio — main.js
// No build step: vanilla JS, loaded as a plain <script> tag.
// =========================================================================

/* ---- Dark / light mode, persisted in localStorage ---- */
(function initTheme() {
  const stored = localStorage.getItem('ma-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored ? stored === 'dark' : prefersDark;
  document.documentElement.classList.toggle('dark', isDark);
})();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ma-theme', isDark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = isDark ? '\u2600' : '\u263D'; // sun / moon
}

/* ---- Per-card wireframe inspection toggle ---- */
function toggleWireframe(btn) {
  const stage = btn.closest('.cad-stage');
  if (!stage) return;
  stage.classList.toggle('wireframe-on');
  const on = stage.classList.contains('wireframe-on');
  btn.textContent = on ? 'WIREFRAME: ON' : 'WIREFRAME: OFF';
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

/* ---- Lightbox / zoom viewer ---- */
function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  /* ---- Contact form -> EmailJS ---- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const original = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.textContent = '';
      statusEl.className = 'text-sm mt-3';

      try {
        // Requires the EmailJS SDK (loaded in index.html) and your own
        // Service ID / Template ID / Public Key — see README.md.
        await emailjs.sendForm(
          window.EMAILJS_SERVICE_ID,
          window.EMAILJS_TEMPLATE_ID,
          form,
          window.EMAILJS_PUBLIC_KEY
        );
        statusEl.textContent = 'Message sent successfully — thank you.';
        statusEl.className = 'text-sm mt-3 text-emerald-600';
        form.reset();
      } catch (err) {
        console.error('EmailJS send failed:', err);
        statusEl.textContent = "Couldn't send that. Please try again or email directly.";
        statusEl.className = 'text-sm mt-3 text-red-600';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }
    });
  }
});
