"use strict";

const message = document.querySelector(".message");
const number = document.querySelector(".number");
const score = document.querySelector(".score");

const check = document.querySelector(".check");

const secretNumber = Math.trunc(Math.random() * 20) + 1;

check.addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) message.textContent = "No number!";
  else if (guess === secretNumber) message.textContent = "Current Number!";
  else if (guess > secretNumber) message.textContent = "Too high!";
  else if (guess < secretNumber) message.textContent = "Too low!";
});
10:46