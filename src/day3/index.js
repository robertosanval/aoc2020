const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());

const goA = (input) => {
  const area = input.trim().split('\n');
  const right = 3;
  const down = 1;
  const tree = '#';

  const width = area[0].length;
  const height = area.length;
  let posX = 3;
  let posY = 1;
  let trees = 0;

  console.log({ width, height });

  while (posY < height) {
    if (area[posY][posX % width] === tree) {
      trees++;
    }

    posX = posX + right
    posY = posY + down;
  }

  return trees;
}

const goB = (input) => {
  return
}

/* Tests */
test(goA(input), 7);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
