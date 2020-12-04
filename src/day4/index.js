const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());
const mandatoryFields = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ];
const fieldValueSeparator = ':';
const fieldRules = {
  byr: /^(19[2-8][0-9]|199[0-9]|200[0-2])$/,
  iyr: /^(201[0-9]|2020)$/,
  eyr: /^(202[0-9]|2030)$/,
  hgt: /^(\d+)(cm|in)$/, // Can be improved checking the ranges in the regex
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^amb|blu|brn|gry|grn|hzl|oth$/,
  pid: /^\d{9}$/,
};

const goA = (input) => {
  const passports = input.split(/\n{2,}/g);
  let validPassports = 0;

  passports.forEach(passport => {
    if (mandatoryFields.every(field => passport.includes(field + fieldValueSeparator))) {
      validPassports++;
    }
  });

  return validPassports;
}

const goB = (input) => {
  const passports = input.split(/\n{2,}/g);
  let validPassports = 0;

  passports.forEach(passport => {
    if (mandatoryFields.every(field => passport.includes(field + fieldValueSeparator))) {
      // Passport is valid so check the fields format requirements

      let isValidPassport = true;
      const regex = /((?:byr|iyr|eyr|hgt|hcl|ecl|pid)):([^\s.]+)/gm;
      while ((m = regex.exec(passport)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) regex.lastIndex++;

        const field = m[1], value = m[2];

        if (field === 'hgt' && fieldRules[field].test(value)) {
          var match = fieldRules[field].exec(value);
          if (match[2] === 'cm' && !(match[1] > 150 && match[1] <= 193) ||
              match[2] === 'in' && !(match[1] > 59 && match[1] <= 76)) {
            isValidPassport = false;
            break;
          }
        } else {
          if (!fieldRules[field].test(value)) {
            isValidPassport = false;
            break;
          }
        }
      }

      if (isValidPassport) validPassports++;
    }
  });

  return validPassports;
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
