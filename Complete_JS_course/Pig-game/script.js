"use strict";

// Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
score0El.textContent = "0";
score1El.textContent = "0";
diceEl.classList.add("hidden");

// State
const state = {
  currentScore: 0,
};

// User rolls dice
btnRoll.addEventListener("click", () => {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for roller 1: if true, switch to next player
  if (dice !== 1) {
    // Add dice to the current score
    state.currentScore += dice;
    current0El.textContent = state.currentScore;
  } else {
    // Switch to next player
  }
});
