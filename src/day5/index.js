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
  return
}

/* Tests */
// test(result, expected);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
