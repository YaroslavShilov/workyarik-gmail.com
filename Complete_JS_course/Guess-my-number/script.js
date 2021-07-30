"use strict";

const again = document.querySelector(".again");
const message = document.querySelector(".message");
const number = document.querySelector(".number");
const score = document.querySelector(".score");
const highscore = document.querySelector(".highscore");
const body = document.querySelector("body");

const check = document.querySelector(".check");

const getSecretNumber = () => Math.trunc(Math.random() * 20) + 1;

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
 * @param {string} status - can be [default | win | lose]
 */

const finishGame = (status) => {
  message.textContent = state[status].text;
  body.style.backgroundColor = state[status].body.backgroundColor;
  number.style.width = state[status].number.width;
  number.textContent = status !== "default" ? state.secretNumber : "?";
};

const changeHighscore = () => {
  finishGame("win");
  if (state.score > highscore.textContent) highscore.textContent = state.score;
};

check.addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  // When there's no input
  if (!guess) message.textContent = "No number!";
  // When player wins
  else if (guess === state.secretNumber) {
    changeHighscore();
  }
  // When guess is too high
  else {
    --state.score;

    if (state.score <= 0) {
      finishGame("lose");
      score.textContent = 0;
    } else {
      message.textContent =
        guess > state.secretNumber ? "Too high!" : "Too low!";
      score.textContent = state.score;
    }
  }
});

again.addEventListener("click", () => {
  finishGame("default");
  state.score = 20;
  score.textContent = state.score;
  state.secretNumber = getSecretNumber();

  document.querySelector(".guess").value = "";
});
