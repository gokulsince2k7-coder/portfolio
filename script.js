/* =====================================================
   SCRIPT.JS — Minimal, clean interactions
   ===================================================== */

/* ── NAV: shadow on scroll + active link ── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow', window.scrollY > 10);
  }, { passive: true });
}

/* ── BURGER MENU ── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nl').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 52;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.hero-photo-wrap, .hero-text, .about-left, .about-right, ' +
  '.skill-group, .project-row, .ach-card, ' +
  '.contact-left, .contact-form, .section-header, .explore-cta-wrap'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 3) * 0.1 + 's';
  observer.observe(el);
});

/* ── CONTACT FORM — sends to WhatsApp ── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote  = document.getElementById('formNote');

const WHATSAPP_NUMBER = '917449077490'; // +91 7449077490

if (form && submitBtn) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name  = document.getElementById('fName').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const msg   = document.getElementById('fMsg').value.trim();

    if (!name || !email || !msg) {
      if (formNote) { formNote.textContent = 'Please fill in all fields.'; formNote.style.color = '#c0392b'; }
      return;
    }

    // Build the WhatsApp message
    const text = `Hi Gokul! 👋\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${msg}`;
    const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    // Button feedback
    submitBtn.textContent = 'Opening WhatsApp…';
    submitBtn.disabled = true;
    if (formNote) formNote.textContent = '';

    setTimeout(() => {
      window.open(url, '_blank');
      submitBtn.textContent = 'Sent via WhatsApp ✓';
      if (formNote) {
        formNote.textContent  = 'WhatsApp opened! Your message is ready to send.';
        formNote.style.color  = '#1d8348';
      }
      form.reset();

      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled    = false;
        if (formNote) formNote.textContent = '';
      }, 4000);
    }, 600);
  });
}

/* ── ACTIVE NAV HIGHLIGHTING ── */
const sections   = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nl[href^="#"]');

if (sections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--black)'
            : '';
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));
}
