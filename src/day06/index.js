const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());

const goA = (input) => {
  const groups = input.split(/\n{2}/g);
  let total = 0;

  groups.forEach(group => {
    const forms = group.split('\n');
    let groupAnswers = [];

    forms.forEach(form => form.split('').forEach(answer => groupAnswers.push(answer)));
    
    total += new Set(groupAnswers).size;
  });

  return total;
}

const goB = (input) => {
  const groups = input.split(/\n{2}/g);
  let total = 0;

  groups.forEach(group => {
    const forms = group.split('\n');
    let groupAnswers = [];

    if (forms.length === 1) {
      total += new Set(forms[0]).size;
    }
    else {
      forms.forEach(form => groupAnswers.push(form.split('')));
      total += groupAnswers.shift().filter(v => groupAnswers.every(a => a.indexOf(v) !== -1)).length;
    }
  });

  return total;
}

/* Tests */
test(goA(input), 6551);
test(goB(input), 3358);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
