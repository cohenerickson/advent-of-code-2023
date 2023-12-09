import fs from "fs/promises";

const input = await fs.readFile("./day-9/input.txt", "utf-8");

let lines = input
  .trim()
  .split(/\n/g)
  .map((line) => line.trim());

const historyEntries = getHistory();

function getHistory() {
  const historyEntries: number[][] = [];

  for (let i = 0; i < lines.length; i++) {
    historyEntries.push(lines[i].split(/\s+/g).map(Number));
  }

  return historyEntries;
}

function part1() {
  let sum = 0;

  for (let i = 0; i < historyEntries.length; i++) {
    let differences: number[][] = [historyEntries[i]];

    while (!differences.at(-1)?.every((x) => x === 0)) {
      let prev = differences.at(-1)![0];
      let difference = [];

      for (let j = 1; j < differences[differences.length - 1].length; j++) {
        difference.push(differences[differences.length - 1][j] - prev);
        prev = differences[differences.length - 1][j];
      }

      differences.push(difference);
    }

    for (let i = differences.length - 1; i > 0; i--) {
      const current = differences[i].at(-1)!;
      const next = differences[i - 1].at(-1)!;

      differences[i - 1].push(current + next);
    }

    sum += differences[0]!.at(-1)!;
  }

  return sum;
}

function part2() {
  let sum = 0;

  for (let i = 0; i < historyEntries.length; i++) {
    let differences: number[][] = [historyEntries[i]];

    while (!differences.at(-1)?.every((x) => x === 0)) {
      let prev = differences.at(-1)![0];
      let difference = [];

      for (let j = 1; j < differences[differences.length - 1].length; j++) {
        difference.push(differences[differences.length - 1][j] - prev);
        prev = differences[differences.length - 1][j];
      }

      differences.push(difference);
    }

    for (let i = differences.length - 1; i > 0; i--) {
      const current = differences[i][0];
      const next = differences[i - 1][0];

      differences[i - 1].unshift(next - current);
    }

    sum += differences[0][0];
  }

  return sum;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
