const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const seats = [];
const input = prepareInput(readInput())
    .split('\n')
    .forEach(row => seats.push(row.split('')));

const EMPTY = 'L';
const OCCUPIED = '#';

function printSeats(seats) {
  seats.forEach(row => console.log(row.join('')));
}

function countOccupied1(seatsMap, i, j) {
  const incI = [-1, -1, -1, 0, 1, 1, 1, 0];
  const incJ = [-1, 0, 1, 1, 1, 0, -1, -1];
  let count = 0;

  for (let k=0;k<8;k++) {
    if (checkRange(seatsMap, i + incI[k], j + incJ[k])) {
      if (seatsMap[i + incI[k]][j + incJ[k]] === '#') {
        count++;
      }
    }
  }
  return count;
}

function countOccupied2(seatsMap, i, j) {
  const incI = [-1, -1, -1, 0, 1, 1, 1, 0];
  const incJ = [-1, 0, 1, 1, 1, 0, -1, -1];
  let count = 0;

  for (let k=0; k < 8; k++) {
    let w = 1;

    while(checkRange(seatsMap, i + incI[k] * w, j + incJ[k] * w)) {
      if (seatsMap[i + incI[k] * w][j + incJ[k] * w] === '#') {
        count++;
        break;
      }

      if (seatsMap[i + incI[k] * w][j + incJ[k] * w] === 'L') {
        break;
      }

      w++;
    }

  }
  return count;
}

function checkRange(seatsMap, i, j) {
  return 0 <= i && i < seatsMap.length && 0 <= j && j < seatsMap[0].length;
}

function compareSeatsMaps(mapA, mapB) {
  for (let r = 0; r < mapA.length; r++) {
    for (let c = 0; c < mapA[r].length; c++) {
      if (mapA[r][c] !== mapB[r][c]) return false;
    }
  }

  return true;
}

function applyRules(seatsMap, part = 1) {
  let newSeatsMap = [...seatsMap.map(row => row.slice(0))];

  for (let r = 0; r < seatsMap.length; r++) {
    for (let c = 0; c < seatsMap[r].length; c++) {
      if (part === 1) {
        if (seatsMap[r][c] === EMPTY && countOccupied1(seatsMap, r, c) === 0) {
          newSeatsMap[r][c] = OCCUPIED;
        }
        else if (seatsMap[r][c] === OCCUPIED && countOccupied1(seatsMap, r, c) >= 4) {
          newSeatsMap[r][c] = EMPTY;
        }
      }
      else if (part === 2) {
        if (seatsMap[r][c] === EMPTY && countOccupied2(seatsMap, r, c) === 0) {
          newSeatsMap[r][c] = OCCUPIED;
        }
        else if (seatsMap[r][c] === OCCUPIED && countOccupied2(seatsMap, r, c) >= 5) {
          newSeatsMap[r][c] = EMPTY;
        }
      }
    }
  }

  return newSeatsMap;
}

const goA = (seats) => {
  let prevSeatMap = [...seats.map(seatRow => seatRow.slice(0))]
  let newSeatMap;

  while (true) {
    newSeatMap = applyRules(prevSeatMap, 1)
    if (compareSeatsMaps(prevSeatMap, newSeatMap)) break;
    prevSeatMap = newSeatMap
  }

  let count = 0;
  for (let i = 0; i < newSeatMap.length; i++) {
    for (let c = 0; c < newSeatMap[0].length; c++) {
      if (newSeatMap[i][c] === '#') count++;
    }
  }

  return count;
}

const goB = (seats) => {
  let prevSeatMap = [...seats.map(seatRow => seatRow.slice(0))]
  let newSeatMap;

  while (true) {
    newSeatMap = applyRules(prevSeatMap, 2)
    if (compareSeatsMaps(prevSeatMap, newSeatMap)) break;
    prevSeatMap = newSeatMap
  }

  let count = 0;
  for (let i = 0; i < newSeatMap.length; i++) {
    for (let c = 0; c < newSeatMap[0].length; c++) {
      if (newSeatMap[i][c] === '#') count++;
    }
  }

  return count;
}

/* Results */
console.time("Time 1");
const resultA = goA(seats);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(seats);
console.timeEnd("Time 2");

/* Tests */
test(resultA, 2296);
test(resultB, 2089);

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
