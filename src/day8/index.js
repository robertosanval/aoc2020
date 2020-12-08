const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());

const goA = (input) => {
  const codelines = input.trim().split('\n');
  let codelinesexecuted = [];
  let acc = 0;

  let pos = 0;
  do {
    const ins = codelines[pos].split(' ')[0];
    const val = parseInt(codelines[pos].split(' ')[1]);

    if (ins === 'acc') {
      acc += val;
      codelinesexecuted.push(pos);
    }
    else if (ins === 'jmp') {
      pos += val - 1;
    }

    pos++;
  } while (pos < codelines.length && !codelinesexecuted.includes(pos));

  return acc;
}

const goB = (input) => {
  return
}

/* Tests */
// test(goA(input), expected);
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
