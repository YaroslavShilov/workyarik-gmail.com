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
  style: {
    win: {
      body: {
        backgroundColor: "#60b347",
      },
      number: {
        width: "30rem",
      },
    },
    normal: {
      body: {
        backgroundColor: "#222222",
      },
      number: {
        width: "15rem",
      },
    },
    lose: {
      body: {
        backgroundColor: "tomato",
      },
      number: {
        width: "15rem",
      },
    },
  },
};

const changeScore = (text) => {
  --state.score;

  if (state.score <= 0) {
    message.textContent = "You lost the game!!!";
    body.style.backgroundColor = state.style.lose.body.backgroundColor;
    number.style.width = state.style.lose.number.width;
    score.textContent = 0;
  } else {
    message.textContent = text;
    score.textContent = state.score;
  }
};

const changeHighscore = () => {
  message.textContent = "Current Number!";

  body.style.backgroundColor = state.style.win.body.backgroundColor;
  number.style.width = state.style.win.number.width;
  number.textContent = state.secretNumber;

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
  else if (guess > state.secretNumber) {
    changeScore("Too high!");
  }
  //When guess is too low
  else if (guess < state.secretNumber) {
    changeScore("Too low!");
  }
});

again.addEventListener("click", () => {
  body.style.backgroundColor = state.style.normal.body.backgroundColor;
  number.style.width = state.style.normal.number.width;
  number.textContent = "?";
  message.textContent = "Start guessing...";
  state.score = 20;
  score.textContent = state.score;
  state.secretNumber = getSecretNumber();

  document.querySelector(".guess").value = "";
});
