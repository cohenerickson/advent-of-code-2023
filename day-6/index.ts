import fs from "fs/promises";

const input = await fs.readFile("./day-6/input.txt", "utf-8");

let lines = input
  .trim()
  .split(/\n/g)
  .map((line) => line.trim());

const times = lines[0].split(/\s+/).slice(1).map(Number);
const distances = lines[1].split(/\s+/).slice(1).map(Number);

console.log(times, distances);

function part1() {
  let product = 1;

  for (let i = 0; i < times.length; i++) {
    let wins = 0;

    for (let j = 1; j < times[i]; j++) {
      let distance = j * (times[i] - j);

      if (distance > distances[i]) {
        wins++;
      }
    }

    product *= wins;
  }

  return product;
}

function part2() {
  let wins = 0;
  let time = Number(times.join(""));
  let distance = Number(distances.join(""));

  for (let j = 1; j < time; j++) {
    let round = j * (time - j);

    if (round > distance) {
      wins++;
    }
  }

  return wins;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
