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

    console.log(target);

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
const obsCallback = (entries, observer) => {
  console.log('callback');
  console.log('entries: ', entries); // entries:  [IntersectionObserverEntry]
  console.log('observer: ', observer);
  // observer:
  // IntersectionObserver {root: null, rootMargin: '0px 0px 0px 0px', thresholds: Array(1), delay: 0, trackVisibility: false}

  entries.forEach(entry => {
    console.log('entry ', entry);
    // entry
    // IntersectionObserverEntry {
    // time: 480.69999998807907,
    // rootBounds: DOMRectReadOnly,
    // boundingClientRect: DOMRectReadOnly,
    // intersectionRect: DOMRectReadOnly,
    // isIntersecting: true,
    // …
    // }
  });
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2], // percent
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
console.log('variable: ', observer);
// variable:
// IntersectionObserver {root: null, rootMargin: '0px 0px 0px 0px', thresholds: Array(1), delay: 0, trackVisibility: false}
observer.observe(section1);

///////////////////////
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;
  console.log('hello:', entry);
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
////////////////////////////////////////////////////////////////////////////////////////
//
