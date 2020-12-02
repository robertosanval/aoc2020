const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  let result = 0;
  const numbers = input
    .split('\n')
    .map(number => parseInt(number));

  numbers.forEach(n1 => {
    numbers.forEach(n2 => {
      if (n1 + n2 === 2020) {
        result = n1 * n2;
      }
    });
  });

  return result;
}

const goB = (input) => {
  let result = 0;
  const numbers = input
    .split('\n')
    .map(number => parseInt(number));

  numbers.forEach(n1 => {
    numbers.forEach(n2 => {
      numbers.forEach(n3 => {
        if (n1 + n2 + n3 === 2020) {
          result = n1 * n2 * n3;
        }
      })
    });
  });

  return result;
}

/* Tests */
// test(goA(input), 514579)

/* Results */
console.time("Time 1")
const resultA = goA(input)
console.timeEnd("Time 1")

console.time("Time 2")
const resultB = goB(input)
console.timeEnd("Time 2")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
