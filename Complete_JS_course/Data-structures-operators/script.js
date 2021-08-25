"use strict";

/*
const restaurant = {
  name: "Classico Italiano",
  location: "Va Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

const arr = [2, 3, 4, 5, 6, 7];

const [a, b, c, ...other] = arr;

console.log(a, b, c, other);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// Solution 1
// const temp = main;
// main = secondary;
// secondary = temp;

// Solution 2
[main, secondary] = [secondary, main];

console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Va Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:20", address }) {
    console.log(`
    Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
    will be delivered to ${address} at ${time}
    `);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//////////////////////////
// Looping Objects
/*
//Property NAMES
const properties = Object.keys(openingHours);
console.log(properties); // ['thu', 'fri', 'sat']
for (const days of Object.keys(openingHours)) {
  console.log(days);
}

for (const days in openingHours) {
  console.log(days);
}

// Property VALUES
const values = Object.values(openingHours);
console.log(values); // [{open:12, close: 22}, {open:11, close: 23}, {open:0, close: 24}]

// Entire object
const entries = Object.entries(openingHours);
console.log(entries); // [ [key: value], [key:value]...] all object

for (const x of entries) {
  console.log(x); //[key: value] every elem of array
}

for (const [key, { open, close }] of entries) {
  console.log(key, open, close); // destruct [key: value] every elem of array
}

 */
//////////////////////////////////////////
// Optional Chaining
/*
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

// With Optional chaining
// if "openingHours" exist, do if "mon" exist, do ".open"
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "nope";
  console.log(`
    On ${day}, we open at ${open}
  `);
}

// Methods
// if use ?? we get 0, '' = true
// if use || or && we get 0, '' = false
console.log(restaurant.orderNone?.(0, 1) ?? "Method does'nt exist"); // Method doesn't exist
console.log(restaurant.order?.(0, 1) ?? "Method does'nt exist"); // result

// Arrays
//check is array empty
const users = [{ name: "Jonas" }, { name: "" }];
console.log(users[0]?.name ?? "User array empty"); // Jonas
console.log(users[1]?.name ?? "User array empty"); // '';
console.log(users[2]?.name ?? "User array empty"); // "User array empty";

 */

/////////////////////////////////////////
// Looping Arrays
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  console.log(item);
}

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

console.log(...menu.entries());
*/

///////////////////////////
// The Nullish Coalescing Operator
/*
restaurant.numGuests = 0;
console.log(restaurant.numGuests || 10); //10

// Nullish: null and undefined (NOT 0 or '')
restaurant.numGuests = 0;
console.log(restaurant.numGuests ?? 10); //0

restaurant.numGuests = "";
console.log(restaurant.numGuests ?? 10); // ''

restaurant.numGuests = null;
console.log(restaurant.numGuests ?? 10); //10

restaurant.numGuests = undefined;
console.log(restaurant.numGuests ?? 10); //10
*/

/////////////////////////////////
// Short Circuiting (&& and ||);
/*
console.log("------- OR ---------");
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || "Jonas"); //3
console.log("" || "Jonas"); //Jonas
console.log(true || 0); //true
console.log(undefined || null); //null
console.log(0 || false); //false

//restaurant.numGuests is undefined
//instead of restaurant.numGuests ? restaurant.numGuests : 10; we can write:
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); //10

const guests2 = restaurant.numGuests || 10;
console.log(guests2); //10

console.log("------- AND ---------");
console.log(0 && "Jonas");
console.log(7 && "Jonas");

console.log("Hello" && 23 && null && "Jonas");
console.log("Hello" && 23 && true && "Jonas");

//if isn't undefined to do the code
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");
*/

///////////////////////////////////
// The Rest Pattern and Parameters (...)
/*
const arr = [1, 2, ...[3, 4]];

// Rest, because on Left side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat: saturday, ...weekdays } = restaurant.openingHours;
console.log(saturday, weekdays);

// Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  console.log(`sum of arr: ${numbers} = ${sum}`);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("tomato");
*/

/*
/////////////////////////////////////
// The spread Operator

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = "Jonas";
const letters = [...str, " ", "S."];
console.log(letters);
console.log(...str);
// console.log(`${...str} Schmedtmann`);

const ingredients = ["test ing 1", "test ing 2", "test ing 3"];

restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant }; // Shallow copy
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy);
console.log(restaurant);
 */

/*
// Destructing Objects

restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 1,
});

const { name, openingHours, categories } = restaurant;

console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c, test: t = 1 },
} = openingHours;
console.log(o, c, t);

 */

//////////////////////////
// Challenge 1;
/*
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, "Thiago", "Coutinho", "Periscic"];
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`);
};

printGoals("Davies", "Muller", "Lewandowsky", "Kimmich");
printGoals("Davies", "Muller");
printGoals(...game.scored);

team1 < team2
  ? console.log("Team 1 is more likely to win")
  : console.log("Team 2 is more likely to win");
*/

///////////////////////////////
// Coding Challenge #2
// Let's continue with our football betting app! Keep using the 'game' variable from
// before.
//   Your tasks:
//   1.  Loop over the game.scored array and print each player name to the console,
//   along with the goal number (Example: "Goal 1: Lewandowski")
// 2.  Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)
// 3.  Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names ✀
// 4.  Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
//   Gnarby: 1,
//     Hummels: 1,
//   Lewandowski: 2
// }
//
// GOOD LUCK
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.  Loop over the game.scored array and print each player name to the console,
//   along with the goal number (Example: "Goal 1: Lewandowski")
for (const [i, name] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${name}`);
}

// 2.  Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) {
  average += odd;
  average /= odds.length;
}
console.log(average);

// 3.  Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names ✀
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

// 4.  Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
//   Gnarby: 1,
//     Hummels: 1,
//   Lewandowski: 2
// }
const scorers = {};
for (const [i, name] of game.scored.entries()) {
  scorers[name] ? (scorers[name] += 1) : (scorers[name] = 1);
}

console.log(scorers);
