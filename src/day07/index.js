const { test, readInput } = require("../utils");

const prepareInput = (rawInput) => rawInput;

const input = prepareInput(readInput());
const rules = input
    .trim()
    .split('\n')
    .map(line => line.split(' contain '))
    .reduce((acc, cur) => {
      const curColor = cur[0].replace(/ bags?/, '');
      acc[curColor] = cur[1]
          .split(/,\s/)
          .reduce((acc2, cur2) => {
            cur2 = cur2.replace(/\.$/, '');

            if (cur2 === "no other bags") return {};

            const curColor = cur2
                .replace(/ bags?/, '')
                .replace(/(\d+) /, '$1-')
                .split('-');
            acc2[curColor[1]] = parseInt(curColor[0]);

            return acc2;
          }, {});
      return acc;
    }, {});

const goA = () => {
  function findBagByColor(color){
    return Object
        .keys(rules)
        .filter(ruleColor => Object.keys(rules[ruleColor]).includes(color))
        .map(bag => [bag, findBagByColor(bag)].flat())
        .flat();
  }

  return Object.keys(
      findBagByColor("shiny gold")
          .reduce((acc, val) => {
            acc[val] = true;
            return acc;
          }, {})
  ).length;
}

const goB = () => {
  function countBags(color){
    return Object.keys(rules[color])
        .map(c => rules[color][c] + (rules[color][c] * countBags(c)))
        .reduce((acc, val) => acc + val, 0);
  }

  return countBags("shiny gold");
}

/* Tests */
test(goA(input), 274);
test(goB(input), 158730);

/* Results */
console.time("Time 1");
const resultA = goA(input);
console.timeEnd("Time 1");

console.time("Time 2");
const resultB = goB(input);
console.timeEnd("Time 2");

console.log("Solution to part 1: ", resultA);
console.log("Solution to part 2: ", resultB);
