"use strict";

const again = document.querySelector(".again");
const number = document.querySelector(".number");
const highScore = document.querySelector(".highscore");
const body = document.querySelector("body");

const check = document.querySelector(".check");

const getSecretNumber = () => Math.trunc(Math.random() * 20) + 1;

/**
 *
 * @param {string} message - get text for showing
 */
const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

/**
 *
 * @param {string || number} score - get text for showing
 */
const displayScore = (score) => {
  document.querySelector(".score").textContent = score;
};

const state = {
  secretNumber: getSecretNumber(),
  score: 20,

  default: {
    text: "Start guessing...",
    body: {
      backgroundColor: "#222222",
    },
    number: {
      width: "15rem",
    },
  },

  win: {
    text: "Current Number!",
    body: {
      backgroundColor: "#60b347",
    },
    number: {
      width: "30rem",
    },
  },

  lose: {
    text: "You lost the game!!!",
    body: {
      backgroundColor: "tomato",
    },
    number: {
      width: "15rem",
    },
  },
};

/**
 * Change game style and html, using state
 *
 * @param {"default" || "win" || "lose"} status - can be [default | win | lose]
 */

const finishGame = (status) => {
  displayMessage(state[status].text);
  body.style.backgroundColor = state[status].body.backgroundColor;
  number.style.width = state[status].number.width;
  number.textContent = status !== "default" ? state.secretNumber : "?";
};

check.addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  // When there's no input
  if (!guess) displayMessage("No number!");
  // When player wins
  else if (guess === state.secretNumber) {
    finishGame("win");
    if (state.score > highScore.textContent)
      highScore.textContent = state.score;
  }
  // When guess is too high
  else {
    --state.score;

    if (state.score <= 0) {
      finishGame("lose");
      displayScore(0);
    } else {
      displayMessage(guess > state.secretNumber ? "Too high!" : "Too low!");
      displayScore(state.score);
    }
  }
});

again.addEventListener("click", () => {
  finishGame("default");
  displayScore((state.score = 20));
  state.secretNumber = getSecretNumber();

  document.querySelector(".guess").value = "";
});
