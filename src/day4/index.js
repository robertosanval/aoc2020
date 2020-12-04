const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());
const mandatoryFields = [ 'byr', 'iyr','eyr', 'hgt', 'hcl', 'ecl', 'pid' ];
const optionalFields = [ 'cid' ];
const fieldValueSeparator = ':';

const goA = (input) => {
  const passports = input.split(/\n{2,}/g);
  let validPassports = 0;

  passports.forEach(passport => {
    if (mandatoryFields.every(field => passport.includes(field + fieldValueSeparator))) {
      validPassports++;
    }
  });

  return validPassports++;
}

const goB = (input) => {
  return
}

/* Tests */
// test(result, expected);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
