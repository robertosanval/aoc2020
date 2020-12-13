const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput()).trim().split('\n');
const departure = parseInt(input[0]);
const buses = input[1]
    .split(',')
    .map(bus => (bus !== 'x') ? parseInt(bus) : 0)
    .filter(bus => bus > 0);

const goA = () => {
  let result;

  for (let i = departure; result === undefined; i++) {
    for (const bus of buses) {
      if (i % bus === 0) {
        return (i - departure) * bus;
      }
    }
  }

  return null;
}

const goB = (input) => {
  return
}

/* Tests */
test(goA(), 2382);
// test(goB(input), expected);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
