'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

    // Check if the target is tab and not active tab
    if (
      e.target.classList.contains('operations__tab') &&
      !e.target.classList.contains('operations__tab--active')
    ) {
      // Remove active from previous active tab
      document
        .querySelector('.operations__tab--active')
        .classList.remove('operations__tab--active');

      // Remove active from previous active content
      document
        .querySelector('.operations__content--active')
        .classList.remove('operations__content--active');

      // Add active to this tab
      e.target.classList.add('operations__tab--active');

      // Add active to this content
      const id = e.target.dataset.tab;
      document
        .querySelector(`.operations__content--${id}`)
        .classList.add('operations__content--active');
    }
  });

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//
