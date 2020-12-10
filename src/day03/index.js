const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());

const goA = (input, right, down) => {
  const area = input.trim().split('\n');
  const tree = '#';
  const width = area[0].length;
  const height = area.length;

  let posX = right;
  let posY = down;
  let trees = 0;

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
  return goA(input, 1, 1) *
         goA(input, 3, 1) *
         goA(input, 5, 1) *
         goA(input, 7, 1) *
         goA(input, 1, 2);
}

/* Tests */
// test(goA(input, 3, 1), 7);
// test(goB(input), 336);

/* Results */
console.time("Time 1");
const resultA = goA(input, 3, 1);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
