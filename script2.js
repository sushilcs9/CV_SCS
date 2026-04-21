// Nav: appear after hero
const nav = document.getElementById('nav');
const hero = document.querySelector('.hero');

new IntersectionObserver(
  ([e]) => nav.classList.toggle('visible', !e.isIntersecting),
  { threshold: 0 }
).observe(hero);

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// Scroll reveal with stagger per group
const items = document.querySelectorAll(
  '.tl-item, .pub-item, .pres-item, .award-card, .skill-group, .thesis-block'
);
items.forEach(el => el.classList.add('reveal-hidden'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.replace('reveal-hidden', 'reveal-visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
);

// Stagger siblings
document.querySelectorAll('.timeline, .pub-list, .pres-list, .awards-grid, .skills-grid').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 55}ms`;
  });
});

items.forEach(el => observer.observe(el));
