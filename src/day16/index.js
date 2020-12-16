const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;
const inputLines = prepareInput(readInput()).trim().split('\n');

let rules = [];
let myTicket = [];
let nearbyTickets = [];

let readingRules = true;
let readingMyTicket = false;
let readingNearbyTickets = false;

inputLines.forEach(line => {
  if (line.includes('your ticket:')) {
    readingRules = false;
    readingMyTicket = true;
    readingNearbyTickets = false;
  }
  else if (line.includes('nearby tickets:')) {
    readingRules = false;
    readingMyTicket = false;
    readingNearbyTickets = true;
  }
  else {
    if (readingRules) {
      const matches = /([\w\s]+):\s(\d+-\d+)\sor\s(\d+-\d+)/gm.exec(line);

      if (matches !== null) {
        rules.push({
          name: matches[1],
          ranges: [
            {
              min: parseInt(matches[2].split(('-'))[0]),
              max: parseInt(matches[2].split(('-'))[1]),
            },
            {
              min: parseInt(matches[3].split(('-'))[0]),
              max: parseInt(matches[3].split(('-'))[1]),
            },
          ]
        });
      }
    }
    else if (readingMyTicket) {
      if (line.length > 0) {
        myTicket = line.split(',');
      }
    }
    else if (readingNearbyTickets) {
      if (line.length > 0) {
        nearbyTickets.push(line.split(',').map(n => parseInt(n)));
      }
    }
  }
});

// console.log(JSON.stringify(rules));
// console.log(myTicket);
// console.log(nearbyTickets);

const goA = () => {
  let errorRate = 0;

  nearbyTickets.forEach( ticket => {
    let errorFields = ticket.filter(number => {
      return !rules.some(rule => {
        return (number >= rule.ranges[0].min && number <= rule.ranges[0].max ) || ( number >= rule.ranges[1].min && number <= rule.ranges[1].max)
      });
    });

    if (errorFields.length > 0) {
      errorRate += errorFields.reduce((sum, n) => sum + n);
    }
  } )

  return errorRate
}

const goB = () => {
  return
}

/* Tests */
test(goA(), 21956);
// test(goB(input), expected);

/* Results */
console.time("Time 1");
const resultA = goA();
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB();
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
