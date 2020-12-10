const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput())
    .trim()
    .split('\n')
    .map(i => parseInt(i))
    .sort((a, b) => a - b);

input.unshift(0);
input.push(input[input.length - 1] + 3);

const goA = (input) => {
  let differenceOfOne = 0;
  let differenceOfThree = 0;

  for (let i = 1; i < input.length; i++) {
    const difference = input[i] - input[i - 1];

    if (difference === 1) differenceOfOne++;
    if (difference === 3) differenceOfThree++;
  }

  return differenceOfOne * differenceOfThree;
}

const goB = (input) => {
  return
}

/* Tests */
test(goA(input), 1820);


/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
