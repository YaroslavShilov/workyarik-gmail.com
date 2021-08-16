"use strict";

// Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
score0El.textContent = "0";
score1El.textContent = "0";
diceEl.classList.add("hidden");

// State
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

/**
 * @param {number} number
 */
const changeCurrentHtml = (number) => {
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = number.toString();
};

const switchPlayer = () => {
  changeCurrentHtml(0);
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// User rolls dice
btnRoll.addEventListener("click", () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for roller 1: if true - switch to next player, if false - add dice to the current score
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      changeCurrentHtml(currentScore);
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// User hold score
btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[
      activePlayer
    ].toString();

    // 2. Check if score >= 100: true - current player wins, false - switch the player
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(".player--active").classList.add("player--winner");
      document
        .querySelector(".player--winner")
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// User reset the game
