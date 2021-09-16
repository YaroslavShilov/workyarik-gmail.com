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
