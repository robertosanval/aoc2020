const { parse } = require("path");
const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());

function getSeatNumber(seatCode) {
  return parseInt(seatCode.replace(/(F|L)/g, '0').replace(/(B|R)/g, '1'), 2);
}

const goA = (input) => {
  const seatsCodes = input.trim().split('\n');
  const seatsNumbers = [];

  seatsCodes.forEach(seatCode => seatsNumbers.push(getSeatNumber(seatCode)));

  return Math.max(...seatsNumbers);
}

const goB = (input) => {
  const seatsCodes = input.trim().split('\n');
  const seatsNumbers = [];

  seatsCodes.forEach(seatCode => seatsNumbers.push(getSeatNumber(seatCode)));

  const orderedSeatsNumbers = seatsNumbers.sort((a, b) => a - b);
  let missingNumber;

  const range = (start, stop, step = 1) => {
    return [...Array(stop - start + 1).keys()]
      .filter(i => !(i % Math.round(step)))
      .map(v => start + v)
  };

  const allSeats = range(
    Math.min(...orderedSeatsNumbers),
    Math.max(...orderedSeatsNumbers)
  );
  const allSeatsButOne = new Set(orderedSeatsNumbers);

  var difference = [...new Set(allSeats.filter(x => !allSeatsButOne.has(x)))];
  missingNumber = parseInt(difference.join(''));

  return missingNumber;
}

/* Tests */
test(goA(input), 911);
test(goB(input), 629);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
