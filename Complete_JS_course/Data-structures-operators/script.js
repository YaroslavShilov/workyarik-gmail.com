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

////////////////////////////////////////////
// Maps
/*
const rest = new Map();
console.log(rest); // {}
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
rest.set(2, "Lisbon, Portugal");
console.log(rest); //{"name" => "Classico Italiano", 1 => "Firenze, Italy", 2 => "Lisbon, Portugal"}

rest
  .set("categories", ["categ-1", "categ-2", "categ-3"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");
console.log(rest);
//{
// "name" => "Classico Italiano",
// 1 => "Firenze, Italy",
// 2 => "Lisbon, Portugal",
// "categories" => Array(3),
// "open" => 11,
// "close" => 23,
// true => "We are open :D",
// false => "We are closed :(",
//}
console.log(rest.get("name")); // Classico Italiano
console.log(rest.get(true)); // We are open :D
console.log(rest.get("true")); // undefined - because we have true as a boolean, not "true" as a string

const time = 21;
//                                   21 > 11 && 21 < 23; result: true; rest.get(true) // We are open :D
console.log(rest.get(time > rest.get("open") && time < rest.get("close"))); // We are open :D

console.log(rest.has("categories")); // true
rest.delete(2); // delete 2 => "Lisbon, Portugal"
console.log(rest.get(2)); // undefined;
console.log(rest.size); // 7
rest.clear();
console.log(rest); // {}
console.log(rest.size); // 0

rest.set([1, 2], "Test 1");
console.log(rest); // {[1,2] => 'Test 1'};
console.log(rest.get([1, 2])); // undefined - because these two arrays are not the same object, because reference type
const arr = [2, 3];
rest.set(arr, "Test 2");
console.log(rest.get(arr)); // Test 2 - because we use the same array (reference type);

rest.set(document.querySelector("body"), "Body");
console.log(rest); //{[1,2] => "Test 1", [2,3] => "Test 2", body => "Body"};
console.log(rest.get(document.querySelector("body"))); // Body;
 */

////////////////////////////////////////////////////
// Maps: iteration
/*
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct answer!!!"],
  [false, "Try again!"],
]);
console.log(question);
//{
// "question" => "What is the best programming language in the world?",
// 1 => "C",
// 2 => "Java",
// 3 => "JavaScript",
// "correct" => 3,
// true => "Correct answer!!!",
// false => "Try again!",
//}

console.log(openingHours); //{thu: {…}, fri: {…}, sat: {…}}
//{
//   "tue": {open: 12, close: 22},
//   "wed": {open: 11, close: 23},
//   "fri": {open: 0, close: 24},
//};

// Convert object to arr
console.log(Object.entries(openingHours));
//[
//   ["tue", {open: 12, close: 22}],
//   ["wed", {open: 11, close: 23}],
//   ["fri", {open: 0, close: 24},]
//];

// Convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
//{
//   "tue" => {open: 12, close: 22},
//   "wed" => {open: 11, close: 23},
//   "fri" => {open: 0, close: 24},
//};

// Map can be iterable
// Quiz app
console.log(question.get("question")); //What is the best programming language in the world?
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
  //Answer 1: C
  //Answer 2: Java
  //Answer 3: JavaScript
}

const answer = Number(prompt("Your answer"));
const test = new Map();
// answer = 3, will be true, we get "Correct answer!!!"
// answer != 3, will be false, we get "Try again!"

// Convert map to array
const convertMap = new Map([
  [true, "yes"],
  [false, "no"],
]);
console.log(convertMap); // { true => "yes", false => "no" }
console.log([...convertMap]); // [ [true, "yes"], [false, "no"] ], map can be iterate
console.log([...convertMap.keys()]); // [true, false]
console.log([...convertMap.values()]); // ["yes", "no"]
console.log([...{ 1: 1, 2: 2 }]); // obj can't be iterate
 */

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
/*
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
*/

//////////////////////////////////////////////////
// Sets - remove duplicated values of arrays and can be iterable
/*
const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);
console.log(new Set("Jonas")); // {"J", "o", "n", "a", "s"} - obj
console.log(ordersSet); // {"Pasta", "Pizza", "Risotto"} - obj, without duplicated string;
console.log(ordersSet.size); // 3
console.log(ordersSet.has("Pizza")); // true - check includes
console.log(ordersSet.has("Bread")); // false
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
console.log(ordersSet); // {"Pasta", "Pizza", "Risotto", "Garlic Bread"} - only add unique
ordersSet.delete("Risotto");
ordersSet.delete("Car");
console.log(ordersSet); // {"Pasta", "Pizza", "Garlic Bread"} - delete "Risotto", "Car" - doesn't exist
console.log(ordersSet[0]); // undefined - because it's object
console.log(ordersSet["Pasta"]); // undefined - because it doesn't have value, only key;
for (const order of ordersSet) {
  console.log(order); // "Pasta"; "Pizza"; "Garlic Bread"
}
ordersSet.clear();
console.log(ordersSet); // {} - delete all

// Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]; // array of all stuff in the restaurant
const staffUnique = new Set(staff); // {"Waiter", "Chef", "Manager"}
console.log([...staffUnique]); // ["Waiter", "Chef", "Manager"] - because Set obj can be iterable

console.log(new Set(staff).size); // 3
console.log([...staffUnique].length); // 3

console.log(new Set("Jonasschmedtmann").size); // 11 - only unique letters
console.log("Jonasschmedtmann".length); // 16 - all letters
*/

//////////////////////////////////////////////////
// Challenge #3
/*
const gameEvents = new Map([
  [17, "Goal"],
  [36, "Substitution"],
  [47, "Goal"],
  [61, "Substitution"],
  [64, "Yellow card"],
  [69, "Red card"],
  [70, "Substitution"],
  [72, "Substitution"],
  [76, "Goal"],
  [80, "Goal"],
  [92, "Yellow card"],
]);

// 1.  Create an array 'events' of the different game events that happened (no
// duplicates)
const events = [...new Set([...gameEvents.values()])];
console.log(events);

// 2.  After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.
gameEvents.delete(64);
console.log(gameEvents);

// 3.  Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)

// Add times to events' state
const eventTimes = {};
for (const [time, event] of [...gameEvents]) {
  if (time <= 90) {
    eventTimes[event]
      ? eventTimes[event].push(time)
      : (eventTimes[event] = [time]);
  }
}

const average = {};
for (const [event, times] of Object.entries(eventTimes)) {
  let sumOfTime = 0;

  for (let i = 0; i < times.length; i++) {
    // If we have previous time of event, get time since previous time
    // Get average of event
    sumOfTime += i !== 0 ? times[i] - times[i - 1] : times[i];
  }
  const averageTime = sumOfTime / times.length;

  console.log(`An ${event} happened, on average, every ${averageTime} minutes`);

  average[event] = averageTime;
}

// 4.  Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
//   [FIRST HALF] 17: ⚽  GOAL
for (const [time, event] of gameEvents) {
  let halfType = time <= 45 ? "FIRST HALF" : "SECOND HALF";
  console.log(`[${halfType}] ${time}: ${event}`);
}
*/

///////////////////////////////////////////////////////////
// Working with strings
const airline = "TAP Air Portugal";
const plane = "A320";
console.log(plane[0]); // A
console.log("B737"[0]); // B
console.log(airline.length); // 16
console.log("B737".length); // 4

console.log(airline.indexOf("r")); // 6
console.log(airline.indexOf("A")); // 1 - the first

console.log(airline.lastIndexOf("A")); // 4 - the first from the end;
console.log(airline.lastIndexOf("hello")); // -1 - don't have this letters

console.log(airline.slice(4)); // Air Portugal - slice from word[4] till the end
console.log(airline.slice(-1)); // l - slice from word[word.length-1] till the end
console.log(airline.slice(airline.length - 1)); // l - the same
console.log(airline.slice(4, 7)); // Air - from index 4 till 7;

console.log(airline.slice(0, airline.indexOf(" "))); // TAP - from first word till space;
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // Portugal - from last space till the end
// (+1 because we don't want see this space)

console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats;
  const position = seat.slice(-1);
  if (position === "B" || position === "E")
    console.log("You got the middle seat :|");
  else console.log("You got lucky :)");
};

checkMiddleSeat("11B"); // You got the middle seat :|
checkMiddleSeat("23C"); // You got lucky :)
checkMiddleSeat("3E"); // You got the middle seat :|

console.log(new String("Jonas")); // {"Jonas"}
console.log(typeof new String("Jonas")); // object
console.log(typeof new String("Jonas").slice(1)); // string
