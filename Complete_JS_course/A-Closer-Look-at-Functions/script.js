"use strict";

/////////////////////////////////////////////////////////////////////////
// Default parameters
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 99 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.table(booking);
  bookings.push(booking);
};

createBooking("LH123"); // {flightNum: "LH123", numPassengers: 1, price: 99}
createBooking("LH123", 2, 800); // {flightNum: "LH123", numPassengers: 2, price: 800}
createBooking("LH123", 2); // {flightNum: "LH123", numPassengers: 2, price: 198}
createBooking("LH123", undefined, 800); // {flightNum: "LH123", numPassengers: 2, price: 800}
 */

//////////////////////////////////////////
// How Passing Arguments Works Value vs. Reference
/*
const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name; // mutate because we get ref to obj, not obj;

  if (passenger.passport === 24739479284) {
    console.log("Checked in");
  } else {
    console.log("Wrong passport!");
  }
};

checkIn(flight, jonas); // Checked in
console.log(flight); // LH234 - not mutated
console.log(jonas); // {name: "Mr. Jonas Schmedtmann", passport: 24739479284} - mutated
*/

/////////////////////////////////////////////
// Functions Accepting Callback Functions
/*
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`string: ${fn(str)}`);
  console.log(`by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord); // string: JAVASCRIPT is the best!; by: upperFirstWord
transformer("JavaScript is the best!", oneWord); // string: javascriptisthebest!; by: oneWord

const high5 = function (name = "") {
  console.log(":hello: " + name);
};

document.body.style.height = "200px";
document.body.style.backgroundColor = "tomato";
document.body.addEventListener("click", high5);

["Jonas", "Martha", "Adam"].forEach((name) => high5(name));

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");

greet("Hello")("Jonas");

const arrowGreet = (greeting) => (name) => console.log(`${greeting} ${name}`);
const greeterHello = arrowGreet("Hello");
greeterHello("Maxim");
greeterHello("Steven");
*/

///////////////////////////////////////////////////////
// The call and apply Methods
/*
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Jonas Schmedtmann"); // Jonas Schmedtmann booked a seat on Lufthansa flight LH239
lufthansa.book(635, "John Smith"); // John Smith booked a seat on Lufthansa flight LH635
console.log(lufthansa.bookings); // [{flight: "LH239", name: "Jonas Schmedtmann"}, {flight: "LH635", name: "John Smith"}]

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
// book(23, "Sarah Williams"); // TypeError: Cannot read property 'airline' of undefined

// Call method
book.call(eurowings, 23, "Hello"); // Hello booked a seat on Eurowings flight EW23
book.call(lufthansa, 12, "Hello"); // Hello booked a seat on Lufthansa flight LH12

const book2 = lufthansa.book.bind(eurowings);
book2(23, "Sarah Williams"); // Sarah Williams booked a seat on Eurowings flight EW23

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper"); // Mary Cooper booked a seat on Swiss Air Lines flight LX583

// Apply method - don't use in JS anymore
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData); // George Cooper booked a seat on Swiss Air Lines flight LX583

// apply - don't use because call is the same
book.call(swiss, ...flightData); // George Cooper booked a seat on Swiss Air Lines flight LX583

// Bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, "Steven Williams"); // Steven Williams booked a seat on Eurowings flight EW23

const bookEW23 = book.bind(eurowings, 2000); // set the first parameter of this function
// now we don't need to set the first parameter
bookEW23("Jonas Schmedtmann"); // Jonas Schmedtmann booked a seat on Eurowings flight EW2000
bookEW23("Martha Cooper"); // Martha Cooper booked a seat on Eurowings flight EW2000

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
// {airline: "Lufthansa", iataCode: "LH", bookings: Array(3), planes: 300, book: …}
// 301

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // 220

// all time use the same the first parameter
const addNDS = addTax.bind(null, 0.2);
// addNDS = value => value + value * 0.20

console.log(addNDS(100)); // 120;
console.log(addNDS(23)); // 27.6

// the same code using Higher-order function
const addNDS2 = (value) => addTax(0.2, value);
console.log(addNDS2(100)); // 120;
console.log(addNDS2(23)); // 27.6
*/

///////////////////////////////////////////////////////////////
// Coding Challenge #1
// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an
// array with the number of replies for each option. This data is stored in the starter
// 'poll' object below.
// Your tasks:
// 1.  Create a method called 'registerNewAnswer' on the 'poll' object. The
// method does 2 things:
// 1.1.  Display a prompt window for the user to input the number of the
// selected option. The prompt should look like this:
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)
// 1.2.  Based on the input number, update the 'answers' array property. For
// example, if the option is 3, increase the value at position 3 of the array by
// 1. Make sure to check if the input is a number and if the number makes
// sense (e.g. answer 52 wouldn't make sense, right?)
// 2.  Call this method whenever the user clicks the "Answer poll" button.
// 3.  Create a method 'displayResults' which displays the poll results. The
// method takes a string as an input (called 'type'), which can be either 'string'
// or 'array'. If type is 'array', simply display the results array as it is, using
// console.log(). This should be the default option. If type is 'string', display a
// string like "Poll results are 13, 2, 4, 1".
// 4.  Run the 'displayResults' method at the end of each
// 'registerNewAnswer' method call.
// 5.  Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// object! So what should the this keyword look like in this situation?
//Test data for bonus:
// §  Data 1: [5, 2, 3]
// §  Data 2: [1, 5, 3, 9, 6, 1]
// Hints: Use many of the tools you learned about in this and the last section 䎕

/*
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    // Get the answer
    const answer = prompt(
      `${this.question}\n${this.options.join("\n")}\n(Write option number)`
    );
    console.log("answer: ", answer);

    // Register the answer
    answer >= 0 && answer < this.answers.length && this.answers[answer]++;

    this.displayResults();
    this.displayResults("string");
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

// BONUS:
console.log("test: ", [5, 2, 3]);
poll.displayResults.call({ answers: [5, 2, 3] }, "string");

console.log("test: ", [1, 5, 3, 9, 6, 1]);
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

console.log("END BONUS");
*/

/*
const runOnce = function () {
  console.log("This will never run again");
};

runOnce();

// IIFE
(() => {
  console.log("This will never run again");
  const isPrivate = 23;
  var notPrivate = 46;
})();

// console.log(isPrivate); // doesn't work
// console.log(notPrivate); // doesn't work

{
  const isPrivate = 23;
  var notPrivate2 = 46;
}

// console.log(isPrivate); // doesn't work
console.log(notPrivate2); // work

const arrs = (name) => {
  console.log("hello");
};

function hello(test) {
  console.log("hello2");
}

function hell2(test) {
  console.log(test);
}

runOnce();
*/

const secureBooking = function () {
  let passengerCount = 0;

  function test() {
    console.log("from test: ", passengerCount);
  }
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
    test();
  };
};

const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
console.dir(booker);
