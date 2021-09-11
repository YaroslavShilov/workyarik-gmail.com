"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 100, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const createUsernames = (accounts) => {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createUsernames(accounts);

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? [...movements].sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}$</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance} USD`;
};

const calcDisplaySummary = ({ movements, interestRate }) => {
  labelSumIn.textContent =
    movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov) + "$";

  labelSumOut.textContent =
    Math.abs(
      movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov)
    ) + "$";

  labelSumInterest.textContent =
    movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * interestRate) / 100)
      .filter((int) => int >= 1)
      .reduce((acc, int) => acc + int) + "$";
};

const updateUI = (acc) => {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;

  currentAccount = accounts.find((acc) => {
    return acc.username === username && acc.pin.toString() === pin;
  });

  if (currentAccount) {
    // Clear input fields
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "1";

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  inputLoanAmount.value = "";

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    console.log(amount * 0.1);
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = inputClosePin.value;

  if (
    currentAccount.username === username &&
    currentAccount.pin.toString() === pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === username && acc.pin.toString() === pin
    );

    inputCloseUsername.value = inputClosePin.value = "";

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
});

let sortState = false;

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  sortState = !sortState;
  displayMovements(currentAccount.movements, sortState);
});

///////////////////////////////////////////////////////////////////////
// Coding Challenge #4

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// Use slice for copy
const dogsSortedByWeight = dogs.slice().sort((a, b) => a.weight - b.weight);
console.log(dogsSortedByWeight);
// result:
// {weight: 8, curFood: 200, owners: Array(1), recFood: 133}
// {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
// {weight: 22, curFood: 250, owners: Array(2), recFood: 284}
// {weight: 32, curFood: 340, owners: Array(1), recFood: 376}
console.log(dogs); // doesn't mutated

// The same result
const dogsSortedByWeight2 = [...dogs].sort((a, b) => a.weight - b.weight);
console.log(dogsSortedByWeight);
// result:
// {weight: 8, curFood: 200, owners: Array(1), recFood: 133}
// {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
// {weight: 22, curFood: 250, owners: Array(2), recFood: 284}
console.log(dogs); // doesn't mutated

dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

const dogSarah = dogs.find(({ owners }) => owners.includes("Sarah"));
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap(({ owners }) => owners);
console.log(`${ownersEatTooMuch.join(", ")}'s dogs eat too much`);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap(({ owners }) => owners);
console.log(`${ownersEatTooLittle.join(", ")}'s dogs eat too little`);

console.log(dogs.some((dog) => dog.curFood === dog.recFood));
