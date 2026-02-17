if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  document.body.classList.add('loaded');
});

// Navbar : apparition au scroll + toggle mobile
const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');
const scrollTopButton = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 320;

  if (navbar) {
    navbar.classList.toggle('is-visible', scrolled);
  }
  if (scrollTopButton) {
    scrollTopButton.classList.toggle('is-visible', scrolled);
  }
});

navbarToggle?.addEventListener('click', () => {
  const isOpen = navbarLinks.classList.toggle('is-open');
  navbarToggle.setAttribute('aria-expanded', isOpen);
});

// Fermer le menu mobile au clic sur un lien
navbarLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navbarLinks.classList.remove('is-open');
    navbarToggle?.setAttribute('aria-expanded', 'false');
  });
});

scrollTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animation des sections au scroll
const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);
sections.forEach((section) => observer.observe(section));
