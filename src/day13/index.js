const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput()).trim().split('\n');

const goA = () => {
  const departure = parseInt(input[0]);
  const buses = input[1]
      .split(',')
      .map(bus => (bus !== 'x') ? parseInt(bus) : null)
      .filter(bus => bus !== null);

  let result;

  for (let i = departure; result === undefined; i++) {
    for (const bus of buses) {
      if (i % bus === 0) {
        return (i - departure) * bus;
      }
    }
  }

  return null;
}

const goB = () => {
  const buses = input[1]
      .split(',')
      .map((bus, index) => (bus !== 'x') ? { bus: BigInt(bus), index: BigInt(index)} : null)
      .filter(b => b !== null);

  const modules = buses.map(b => (b.bus - b.index) % b.bus);
  const residues = buses.map(b => b.bus);

  return chineseRemainderTheorem(modules, residues);
}

function chineseRemainderTheorem(modules, residues) {
  const prod = residues.reduce((m, c) => m * c, 1n);
  let sum = 0n;

  for (const residue in residues) {
    const p = prod / residues[residue];

    sum += modules[residue] * multiplyInverse(p, residues[residue]) * p;
  }

  return parseInt((sum % prod).toString());
}

function multiplyInverse(a, b) {
  if (b === 1) return 1n;

  let aa = a;
  let bb = b;
  let x0 = 0n;
  let x1 = 1n;

  while (aa > 1n) {
    const q = aa / bb;
    let t = bb;

    bb = aa % bb;
    aa = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0n) x1 += b;

  return x1;
}

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

/* Tests */
test(resultA, 2382);
test(resultB, 906332393333683);

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
