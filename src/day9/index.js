const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput()).split('\n').map(n => parseInt(n));
const preamble = 25;

function testSum(number, group) {
  let sums = [];

  for (let i = 0; i < group.length; i++) {
    for (let j = 0; j < group.length; j++) {
      if (!sums.includes(group[i] + group[j])) {
        sums.push(group[i] + group[j]);
      }
    }
  }

  return (!sums.includes(number));
}

function sumRanges(numberToFind) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j <= input.length; j++) {
      const groupToSum = input.slice(i, i + j);

      if (groupToSum.length > 0) {
        const sum = groupToSum.reduce((acc, num) => acc + num);

        if (sum === numberToFind) {
          return Math.min(...groupToSum) + Math.max(...groupToSum);
        }
      }
    }
  }
}

const goA = (input) => {
  let currentNumber;
  let numberFound;

  for (let i = preamble; i < input.length; i++) {
    const groupToTest = input.slice(i - preamble, i);
    currentNumber = input[i];
    if (testSum(currentNumber, groupToTest)) {
      numberFound = currentNumber
      break;
    }
  }

  return numberFound;
}

const goB = (input) => {
  return sumRanges(goA(input));
}

/* Tests */
test(goA(input), 14360655);
test(goB(input), 1962331);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
