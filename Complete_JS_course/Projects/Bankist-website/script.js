'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
////////////////////////////////////////////////////////////////////////////////////////
// test

console.log(document.documentElement); // html ...
console.log(document.head); // head ...
console.log(document.body); // body ...

const allSelections = document.querySelectorAll('.section');
console.log(allSelections); // NodeList - like array but NOT ARRAY

const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection - like array but NOT ARRAY
// NodeList and HTMLCollection differences
// If we delete element use F12 then HTMLCollection will change

// Creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message'); // Add class
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // Can add HTML

document.querySelector('.header').append(message); // Insert into .header, like the first child

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  // Normal way
  message.remove(); // delete prepended element into header

  // Old way
  message.parentElement.removeChild(message);
});

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.height); // nothing - because we don't have this style
console.log(message.style.width); // 120%

console.log(getComputedStyle(message)); // Show all style
console.log(getComputedStyle(message).backgroundColor); // rgb(55, 56, 61) - not #37383d
console.log(getComputedStyle(message).height); // 90px - not from css, js calculate height on it own

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// use Number.parseFloat - because getComputedStyle return string '90px', '90px' + 40 + 'px' = '90px40px'

console.log(getComputedStyle(message).height); // 130px

// Change variable in css
// in css= :root {--color-primary: #5ec576;}
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.className); // nav__logo
console.log(logo.alt); // Bankist logo
logo.alt = 'Beautiful minimalist logo'; // Set a new meaning
console.log(logo.alt); // Beautiful minimalist logo

// Get absolute URL, but in HTML we use relative URL 'img/logo.png'
console.log(logo.src); // http://localhost:63342/100DaysOfCode/Complete_JS_course/Projects/Bankist-website/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png - Get relative URL

// Check before get absolute or relative URL
const navLink = document.querySelector('.nav__link--btn'); // anchor
// I hide some url after localhost for comfort reading
console.log(navLink.href); // http://localhost:.../index.html?_ijt=ts2vm3kacursna75hfdbir6pt5&_ij_reload=RELOAD_ON_SAVE#
console.log(navLink.getAttribute('href')); // #

// Both of them are absolute anyway
const link = document.querySelector('.twitter-link');
console.log(link.href); // https://twitter.com/jonasschmedtman
console.log(link.getAttribute('href')); // https://twitter.com/jonasschmedtman

// Non-standard attributes
console.log(logo.designer); // undefined - it isn't the standard attribute
console.log(logo.getAttribute('designer')); // Jonas

// The wrong way to add a new attribute
logo.newAttr = 'test'; // but it doesn't show in html
console.log(logo.newAttr); // test
console.log(logo.getAttribute('newAttr')); // null

// The right way to add a new attribute
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company')); // Bankist

// Data attributes
// in html <img data-version-number="3.0" src="..." alt="..."/>
console.log(logo.getAttribute('data-version-number')); // 3.0 - the wrong way
console.log(logo.dataset.versionNumber); // 3.0 - it's better way

// Classes
logo.classList.add('c');
console.log(logo.classList); // DOMTokenList ['nav__logo', 'c', value: 'nav__logo c']
console.log(logo.classList.value); // nav__logo c

logo.classList.remove('c'); // remove
console.log(logo.classList.value); // nav__logo

logo.classList.toggle('c'); // toggle add / remove
console.log(logo.classList.value); // nav__logo c

console.log(logo.classList.contains('c')); // true - check includes or not

// Don't use this
logo.classList = 'Jonas'; // delete all classes, and set only 'Jonas'
