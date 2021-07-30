/////////////////////////////////////
// Coding Challeng #1

/*
Mark and John are trying to compare their BMI (Body Mass Index),
which is calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height).
(mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula
(you can even implement both versions)
3. Create a boolean variable 'markHigherBMI'
containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks wights 78 kg and is 1.69 m tall.
John weights 92 kg and is 1.95 m tall.

TEST DATA 2: Marks wights 95KG and is 1.88 m tall.
John weights 85 kg and is 1.76 m tall.
 */

/*
const TEST = {
  data_1: {
    Mark: {
      mass: 78,
      height: 1.69,
    },
    John: {
      mass: 92,
      height: 1.95,
    },
  },
  data_2: {
    Mark: {
      mass: 95,
      height: 1.88,
    },
    John: {
      mass: 85,
      height: 1.76,
    },
  },
};

const getBMI = (person) => {
  return person.mass / person.height ** 2;
};

const markHigherBMI_1 = getBMI(TEST.data_1.Mark) > getBMI(TEST.data_1.John);
const markHigherBMI_2 = getBMI(TEST.data_2.Mark) > getBMI(TEST.data_2.John);

console.log("test 1: ", markHigherBMI_1);
console.log("test 2: ", markHigherBMI_2);

 */

/////////////////////////////////////
// Coding Challeng #2

/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has
the higher BMI. The message can be either "Mark's BMI
is higher than John's!" or "John's BMI is higher than Mark's!"

2. Use a template string to include the BMI values is the outputs. Example: "Mark's BMI
(28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement
 */

const TEST = {
  data_1: [
    {
      name: "Mark",
      mass: 78,
      height: 1.69,
    },
    {
      name: "John",
      mass: 92,
      height: 1.95,
    },
  ],
  data_2: [
    {
      name: "Mark",
      mass: 95,
      height: 1.88,
    },
    {
      name: "John",
      mass: 85,
      height: 1.76,
    },
  ],
};

const getBMI = (person) => {
  return Math.floor((person.mass / person.height ** 2) * 10) / 10;
};

const getResult = (personsArray) => {
  const person1 = personsArray[0];
  const person2 = personsArray[1];
  let winner;
  let loser;

  if (getBMI(person1) > getBMI(person2)) {
    winner = person1;
    loser = person2;
  } else {
    winner = person2;
    loser = person1;
  }

  return `
  ${winner.name}'s BMI (${getBMI(winner)}) is higher than ${
    loser.name
  }'s (${getBMI(loser)})!
  `;
};

console.log("test 1: ", getResult(TEST.data_1));
console.log("test 2: ", getResult(TEST.data_2));
