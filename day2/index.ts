import fs from "fs/promises";

const input = await fs.readFile("./day2/input.txt", "utf-8");

const games = input.trim().split("\n");

function part1() {
  let sum = 0;

  for (const game of games) {
    const id = Number(game.match(/^Game (\d+):/)![1]);

    let colors = {} as { [key: string]: number };

    const rounds = game.split(": ")[1].split("; ");

    for (const round of rounds) {
      const cubes = round.split(", ");

      for (const cube of cubes) {
        const [count, color] = cube.trim().split(" ");

        colors[color] = colors[color] || 0;

        if (colors[color] < Number(count)) {
          colors[color] = Number(count);
        }
      }
    }

    if (colors["red"] <= 12 && colors["green"] <= 13 && colors["blue"] <= 14) {
      sum += id;
    }
  }

  return sum;
}

function part2() {
  let sum = 0;

  for (const game of games) {
    let colors = {} as { [key: string]: number };

    const rounds = game.split(": ")[1].split("; ");

    for (const round of rounds) {
      const cubes = round.split(", ");

      for (const cube of cubes) {
        const [count, color] = cube.trim().split(" ");

        colors[color] = colors[color] || 0;

        if (colors[color] < Number(count)) {
          colors[color] = Number(count);
        }
      }
    }

    sum += colors["red"] * colors["green"] * colors["blue"];
  }

  return sum;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
