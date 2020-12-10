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
  const codelines = input.trim().split('\n');

  for (let corrupted = 0; corrupted < codelines.length; corrupted++) {
    if (codelines[corrupted].split(' ')[0] === "acc") continue;

    let acc = 0;
    let pos = 0;
    let codelinesexecuted = [];
    do {
      if (codelinesexecuted.includes(pos)) break;
      if (pos === codelines.length) return acc;

      codelinesexecuted.push(pos);

      let ins = codelines[pos].split(' ')[0];
      let val = parseInt(codelines[pos].split(' ')[1]);

      if (pos === corrupted) ins = (ins === 'nop') ? 'jmp' : 'nop';

      if (ins === 'acc') {
        acc += val;
        pos++;
      }
      else if (ins === 'jmp') {
        pos += val;
      }
      else if (ins === 'nop') {
        pos++;
      }
    } while (pos <= codelines.length);
  }
}

/* Tests */
test(goA(input), 1600);
test(goB(input), 1543);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
