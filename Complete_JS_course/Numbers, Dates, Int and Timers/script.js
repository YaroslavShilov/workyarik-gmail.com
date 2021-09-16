"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2020-12-23T07:42:02.383Z",
    "2021-11-18T21:31:17.178Z",
    "2021-01-28T09:15:04.904Z",
    "2021-04-01T10:17:24.185Z",
    "2021-05-08T14:11:59.604Z",
    "2021-05-27T17:01:17.194Z",
    "2021-09-14T10:51:36.790Z",
    "2021-09-14T23:36:17.929Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2020-11-01T13:15:33.035Z",
    "2020-11-30T09:48:16.867Z",
    "2020-12-25T06:04:23.907Z",
    "2021-01-25T14:18:46.235Z",
    "2021-02-05T16:33:06.386Z",
    "2021-04-10T14:43:26.374Z",
    "2021-06-25T18:49:59.371Z",
    "2021-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formattedMoney = (sum, locale) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(sum);

const displayMovements = function (acc, sort = false) {
  const { movements, movementsDates, locale } = acc;
  containerMovements.innerHTML = "";

  let movs = movements.map((mov, i) => ({ mov, date: movementsDates[i] }));

  movs = sort ? movs.sort((a, b) => a.mov - b.mov) : movs;

  movs.forEach(function ({ mov, date }, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const displayDate = formatMovementDate(new Date(date), locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMoney(mov, locale)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formattedMoney(acc.balance, acc.locale);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

const login = () => {
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Create current date and time
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Update UI
    updateUI(currentAccount);
  }
};

// FAKE ALWAYS LOGGED IN
inputLoginUsername.value = "js";
inputLoginPin.value = 1111;
login();

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Internationalizing Numbers (Intl)
/*const num = 3884764.23;
console.log("US:", new Intl.NumberFormat("en-US").format(num)); // US: 3,884,764.23
console.log("Germany:", new Intl.NumberFormat("de-De").format(num)); // Germany: 3.884.764,23
console.log("Rus:", new Intl.NumberFormat("rus").format(num)); // Rus: 3 884 764,23
console.log("Suria:", new Intl.NumberFormat("ar-SY").format(num)); // Suria: ٣٬٨٨٤٬٧٦٤٫٢٣

const options = {
  style: "unit",
  unit: "mile-per-hour",
};

console.log("US:", new Intl.NumberFormat("en-US", options).format(num)); // US: 3,884,764.23 mph
console.log("Germany:", new Intl.NumberFormat("de-De", options).format(num)); // Germany: 3.884.764,23 mi/h
console.log("Rus:", new Intl.NumberFormat("rus", options).format(num)); // Rus: 3 884 764,23 ми/ч
console.log("Suria:", new Intl.NumberFormat("ar-SY", options).format(num)); // Suria: ٣٬٨٨٤٬٧٦٤٫٢٣ ميل/س

options.unit = "celsius";
console.log("US:", new Intl.NumberFormat("en-US", options).format(num)); // US: 3,884,764.23°C
console.log("Germany:", new Intl.NumberFormat("de-De", options).format(num)); // Germany: 3.884.764,23 °C
console.log("Rus:", new Intl.NumberFormat("rus", options).format(num)); // Rus: 3 884 764,23 °C

const options2 = {
  style: "currency",
  unit: "celsius",
  currency: "EUR",
};

console.log("US:", new Intl.NumberFormat("en-US", options2).format(num)); // US: €3,884,764.23
console.log("Germany:", new Intl.NumberFormat("de-De", options2).format(num)); // Germany: 3.884.764,23 €
console.log("Rus:", new Intl.NumberFormat("rus", options2).format(num)); // Rus: 3 884 764,23 €

options2.useGrouping = false;

console.log("US:", new Intl.NumberFormat("en-US", options2).format(num)); // US: €3884764.23
console.log("Germany:", new Intl.NumberFormat("de-De", options2).format(num)); // Germany: 3884764,23 €
console.log("Rus:", new Intl.NumberFormat("rus", options2).format(num)); // Rus: 3884764,23 €*/
