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
*/

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
