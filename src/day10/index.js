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
  // Oject with all of the arrangements
  // I'll save all the posibilities in each item
  const arrangements = {};

  // input is sorted asc
  // The last input is 1
  arrangements[input[input.length - 1]] = 1;

  // Count all by inputs from end to start
  for (let i = input.length - 2; i >= 0; i--) {
    arrangements[input[i]] = 0; // Count start

    // Check with the next three items of i
    for (let j = i + 1; j < input.length && j <= i + 3; j++) {
      // If the difference is less or equal to 3 then is valid arrangement, increment
      if (input[j] - input[i] <= 3) {
        arrangements[input[i]] += arrangements[input[j]];
      }
    }
  }

  // First item is the solution
  return arrangements[0];
}

/* Tests */
test(goA(input), 1820);
test(goB(input), 3454189699072);


/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
