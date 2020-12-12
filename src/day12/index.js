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
  let position = { x: 0, y: 0 };
  let waypoint = { x: 10, y: 1 };
  let currentDirection = 'E';

  input.forEach(instrucction => {
    if (instrucction.action === 'F') {
      position.x += waypoint.x * instrucction.value;
      position.y += waypoint.y * instrucction.value;
    }
    else if (instrucction.action === 'R') {
      for (let d = 0; d < (instrucction.value / 90); d++) {
        let tempX = waypoint.x;
        let tempY = waypoint.y;

        waypoint.x = tempY;
        waypoint.y = tempX * -1;
      }
    }
    else if (instrucction.action === 'L') {
      for (let d = 0; d < (instrucction.value / 90); d++) {
        let tempX = waypoint.x;
        let tempY = waypoint.y;

        waypoint.x = tempY * -1;
        waypoint.y = tempX;
      }
    }
    else if (instrucction.action === 'N') {
      waypoint.y += instrucction.value;
    }
    else if (instrucction.action === 'S') {
      waypoint.y -= instrucction.value;
    }
    else if (instrucction.action === 'E') {
      waypoint.x += instrucction.value;
    }
    else if (instrucction.action === 'W') {
      waypoint.x -= instrucction.value;
    }
  });

  return Math.abs(position.x) + Math.abs(position.y);
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
test(resultB, 52069);

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
