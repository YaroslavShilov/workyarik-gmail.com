"use strict";

/*
function calcAge(birthYear) {
  const age = 2021 - birthYear;

  function printAge() {
    const output = `You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = "Steven";
      const str = `Oh, and you're a millennial, ${firstName}`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
    }
  }
  printAge();

  return age;
}

const firstName = "Jonas";
calcAge(1991);
*/

/*
var me = "Jonas";
let job = "teacher";
const year = 1991;

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

var addVarExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;
*/

/*
const jonas = {
  name: "hello",
  calcAge: () => {
    console.log(this);
  },
};

jonas.calcAge();
*/

const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; //self or that
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const self = this; //self or that
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  greet: () => console.log(`hey ${this.firstName}`),
};

jonas.greet();
jonas.calcAge();

console.log("============");

// Arguments keyword
const addExpr = function (a, b, ...other) {
  console.log(arguments);
  console.log(other);
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 5, 6, 7, "123");

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addArrow(2, 5, 8);
