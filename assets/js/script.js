'use strict';

/**
 * Add event listener to one element or a NodeList
 */
const addEventOnElem = (elem, type, callback) => {
  if (!elem) return;
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) elem[i].addEventListener(type, callback);
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle
 */
const navbar     = document.querySelector('[data-navbar]');
const navToggler = document.querySelector('[data-nav-toggler]');
const navLinks   = document.querySelectorAll('[data-nav-link]');

const openNavbar  = () => { navbar?.classList.add('active');    navToggler?.classList.add('active'); };
const closeNavbar = () => { navbar?.classList.remove('active'); navToggler?.classList.remove('active'); };
const toggleNavbar = () => navbar?.classList.contains('active') ? closeNavbar() : openNavbar();

addEventOnElem(navToggler, 'click', toggleNavbar);
addEventOnElem(navLinks,   'click', closeNavbar);

// Close navbar when clicking outside it
document.addEventListener('click', (e) => {
  if (navbar?.classList.contains('active') &&
      !navbar.contains(e.target) &&
      !navToggler?.contains(e.target)) {
    closeNavbar();
  }
});

/**
 * Sticky header + back-to-top button
 */
const header     = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 100;
  header?.classList.toggle('active', scrolled);
  backTopBtn?.classList.toggle('active', scrolled);
}, { passive: true });

/**
 * Theme toggle — light (default) / dark
 */
const themeToggleBtn = document.querySelector('[data-theme-toggle]');
const htmlEl = document.documentElement;

// Read saved preference; default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);

const applyTheme = (theme) => {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

themeToggleBtn?.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/**
 * Scroll-reveal: fade cards up when they enter the viewport
 */
const revealTargets = document.querySelectorAll(
  '.service-card, .project-card, .contact-card, .about-stat, .about-item, .client-card'
);

if ('IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.6s ease forwards';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
  });
}

/**
 * Footer year
 */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}