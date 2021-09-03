"use strict";

///////////////////////////////////////////////////
////////////////////////////////////////////////////
// BANKIST APP

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
  movements: [200, -200, 340, -340, -300, -20, 50, 400, -460],
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




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

////////////////////////////////////////////////////////////
// forEach
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) console.log(`deposited: ${movement}`);
  else console.log(`withdrew: ${Math.abs(movement)}`); // .abs - returns the absolute value of a number - remove "-"
  // result:
  // deposited: 200
  // deposited: 450
  // withdrew: 400
  // deposited: 3000
  // withdrew: 650
  // withdrew: 130
  // deposited: 70
  // deposited: 1300
}

for (const [index, movement] of movements.entries()) {
  // the same like .forEach method
  console.log(`${index}: ${movement}`); // result:
  // result:
  // 0: 200
  // 1: 450
  // 2: -400
  // 3: 3000
  // 4: -650
  // 5: -130
  // 6: 70
  // 7: 1300
}

movements.forEach((movement, index, array) => {
  // array - is array which we use (movements)
  // array.push(0); - mutate the original array
  console.log(`${index}: ${movement}`);
  // result:
  // 0: 200
  // 1: 450
  // 2: -400
  // 3: 3000
  // 4: -650
  // 5: -130
  // 6: 70
  // 7: 1300
});
console.log(movements);

console.log("----------MAPS---------");

// forEach with Maps and Sets
// Maps
const currencies = new Map([
  ["USD", "United States dollar"], // [key, value]
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach((value, key, map) => {
  console.log(`value: `, value);
  console.log(`key: `, key);
  console.log(`map: `, map);
  console.log("");

  // result:
  // value:  United States dollar
  // key:  USD
  // map:  Map(3){"USD" => "United States dollar", "EUR" => "Euro", "GBP" => "Pound sterling"}
  //
  // value:  Euro
  // key:  EUR
  // map:  Map(3){"USD" => "United States dollar", "EUR" => "Euro", "GBP" => "Pound sterling"}
  //
  // value:  Pound sterling
  // key:  GBP
  // map:  Map(3){"USD" => "United States dollar", "EUR" => "Euro", "GBP" => "Pound sterling"}
});

// Set
const currenciesArr = ["USD", "GBP", "USD", "EUR", "EUR"];
const currenciesUnique = new Set(currenciesArr); // take only unique - don't mutate
console.log(currenciesUnique); // {"USD", "GBP", "EUR"}
console.log(currenciesArr); // ["USD", "GBP", "USD", "EUR", "EUR"]

currenciesUnique.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
  console.log(`map: `, map);
  console.log("");
  // result
  // USD: USD
  // map:  Set(3){"USD", "GBP", "EUR"}
  //
  // GBP: GBP
  // map:  Set(3){"USD", "GBP", "EUR"}
  //
  // EUR: EUR
  // map:  Set(3){"USD", "GBP", "EUR"}
  // Sets - doesn't have keys and index, that's why we have the same value and key
  // WRITE "_" instead "key"
});
 */

/////////////////////////////////////////////////
// Simple Array Methods
/*
let arr = ["a", "b", "c", "d", "e"];

// SLICE - return a new array (copy)
console.log(arr.slice(2)); // ["c", "d", "e"]
console.log(arr.slice(2, 4)); // ["c", "d"]
console.log(arr.slice(-2)); // ["d", "e"]
console.log(arr.slice(-1)); // ["e"]
console.log(arr.slice(1, -1)); // ["b", "c", "d"]
console.log(arr.slice()); // ["a", "b", "c", "d", "e"] - copy array
console.log([...arr]); // ["a", "b", "c", "d", "e"] - copy array

// SPLICE - like SLICE, return a new array, BUT (cut) mutate the array which we use
console.log(arr.splice(2)); // ["c", "d", "e"] - cut the original array
console.log(arr); // ["a", "b"] - splice cut this array
console.log(arr.splice(-1)); // ["b"] - cut the last value
console.log(arr); // ["a"]

// REVERSE - mutate the original array too
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse()); // ["f", "g", "h", "i", "j"]
console.log(arr2); // ["f", "g", "h", "i", "j"]

// CONCAT - don't mutate
const letters = arr.concat(arr2);
console.log(letters); // ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
console.log(arr); // ["a", "b", "c", "d", "e"]
console.log([...arr, ...arr2]); // ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"] - the same

// JOIN - don't mutate
console.log(letters.join("-")); // a-b-c-d-e-f-g-h-i-j
console.log(letters); // ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
*/
