const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput())
    .trim()
    .split('\n')
    .map(line => {
      let matches = line.match(/(N|S|W|E|L|R|F)(\d+)/);
      return { action: matches[1], value: parseInt(matches[2]) }
    });

const goA = (input) => {
  let position = { x: 0, y: 0 };
  let currentDirection = 'E';

  input.forEach(instrucction => {
    if (instrucction.action === 'F') {
      if (currentDirection === 'N') position.x += instrucction.value;
      else if (currentDirection === 'S') position.x -= instrucction.value;
      else if (currentDirection === 'E') position.y += instrucction.value;
      else if (currentDirection === 'W') position.y -= instrucction.value;
    }
    else if (instrucction.action === 'R') {
      for (let d = 0; d < instrucction.value; d += 90) {
        if (currentDirection === 'E') currentDirection = 'S';
        else if (currentDirection === 'S') currentDirection = 'W';
        else if (currentDirection === 'W') currentDirection = 'N';
        else if (currentDirection === 'N') currentDirection = 'E';
      }
    }
    else if (instrucction.action === 'L') {
      for (let d = 0; d < instrucction.value; d += 90) {
        if (currentDirection === 'E') currentDirection = 'N';
        else if (currentDirection === 'N') currentDirection = 'W';
        else if (currentDirection === 'W') currentDirection = 'S';
        else if (currentDirection === 'S') currentDirection = 'E';
      }
    }
    else if (instrucction.action === 'N') {
      position.x += instrucction.value;
    }
    else if (instrucction.action === 'S') {
      position.x -= instrucction.value;
    }
    else if (instrucction.action === 'E') {
      position.y += instrucction.value;
    }
    else if (instrucction.action === 'W') {
      position.y -= instrucction.value;
    }
  });

  return Math.abs(position.x) + Math.abs(position.y);
}

const goB = (input) => {
  return
}

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

/* Tests */
test(resultA, 582);
// test(resultB, expected);

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
