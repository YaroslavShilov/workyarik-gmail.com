'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////////////////////////////
// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Building a Tabbed Component
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', e => {
    e.preventDefault();
    const target = e.target.closest('.operations__tab');

    // Check if the target is tab and not active tab
    if (!target || target?.classList.contains('operations__tab--active')) {
      return;
    }

    // Remove active from previous active tab
    document
      .querySelector('.operations__tab--active')
      .classList.remove('operations__tab--active');

    // Remove active from previous active content
    document
      .querySelector('.operations__content--active')
      .classList.remove('operations__content--active');

    // Add active to this tab
    target.classList.add('operations__tab--active');

    // Add active to this content
    document
      .querySelector(`.operations__content--${target.dataset.tab}`)
      .classList.add('operations__content--active');
  });

////////////////////////////////////////////////////////////////////////////////////////
// Menu fade animation
const handleHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });

    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => handleHover(e, 0.5));

nav.addEventListener('mouseout', e => handleHover(e, 1));

////////////////////////////////////////////////////////////////////////////////////////
// Sticky Navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;
  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////////////////////////////////////////////////////////////////////////////////////////
// Revealing Elements on Scroll
// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden'); // show the section
  observer.unobserve(entry.target); // delete handler, because we've already showed the section
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////////////////////////////////////////////////////
// Lazy Loading Images
/* HTML:
<img
  src="img/digital-lazy.jpg" // small img, 10kb - show this before we scroll to this big img
  data-src="img/digital.jpg" // normal img, 500kb
  alt="Computer"
  class="lazy-img" // add blur (filter: blur(20px);) in css
/>
 */
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    // use addEventListener('load') instead .classList.remove('lazy-img')
    // because if our internet speed is low, we see nothing or bad picture
    // that's why we show image after loading
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target); // delete handler, because we've already downloaded the img
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.1,
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//
