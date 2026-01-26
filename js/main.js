if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  document.body.classList.add('loaded');
});

const scrollTopButton = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (!scrollTopButton) return;
  if (window.scrollY > 320) {
    scrollTopButton.classList.add('is-visible');
  } else {
    scrollTopButton.classList.remove('is-visible');
  }
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
    threshold: 0.18,
  }
);
sections.forEach((section) => observer.observe(section));

// FAQ accordéon
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const questionBtn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  questionBtn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    // Optionnel : fermer les autres
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove('is-open');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      }
    });

    if (!isOpen) {
      item.classList.add('is-open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      item.classList.remove('is-open');
      answer.style.maxHeight = null;
    }
  });
});

// Pour que les réponses soient bien calculées si la fenêtre change de taille
window.addEventListener('resize', () => {
  document.querySelectorAll('.faq-item.is-open .faq-answer').forEach((answer) => {
    answer.style.maxHeight = answer.scrollHeight + 'px';
  });
});

