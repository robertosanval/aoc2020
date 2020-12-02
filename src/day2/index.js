const { parse } = require("path");
const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

const count = (char, word) => {
  const re = new RegExp(char, "ig");
  return ((word || '').match(re) || []).length;
}

const goA = (input) => {
  const regex = /(\d+)-(\d+) ([a-z]): ([a-z]+)/gm;

  let validPasswords = 0;
  while ((m = regex.exec(input)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    const min = parseInt(m[1]);
    const max = parseInt(m[2]);
    const letter = m[3];
    const password = m[4];
    const occurrences = count(letter, password);

    if (occurrences >= min && occurrences <= max) {
      validPasswords++;
    }
  }

  return validPasswords;
}

const goB = (input) => {
const regex = /(\d+)-(\d+) ([a-z]): ([a-z]+)/gm;
  let validPasswords = 0;
  while ((m = regex.exec(input)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    const min = parseInt(m[1]);
    const max = parseInt(m[2]);
    const letter = m[3];
    const password = m[4];
    const matchFirst = password.substr(min - 1, 1) === letter;
    const matchSecond = password.substr(max - 1, 1) === letter;

    if (matchFirst ^ matchSecond) {
      validPasswords++;
    }

  }

  return validPasswords;
}

/* Tests */
// test(goB(input), 428)

/* Results */
console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
