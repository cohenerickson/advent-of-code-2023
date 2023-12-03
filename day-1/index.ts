import fs from "fs/promises";

const input = await fs.readFile("./day1/input.txt", "utf-8");

const lines = input.trim().split("\n");

function part1() {
  let sum = 0;

  for (const line of lines) {
    const characters = line.trim().split("");

    const digit1 = characters.find((x) => !isNaN(parseInt(x)));
    const digit2 = characters.findLast((x) => !isNaN(parseInt(x)));

    const number = parseInt(`${digit1}${digit2}`);

    sum += number || 0;
  }

  return sum;
}

function part2() {
  let sum = 0;

  const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ];

  for (let line of lines) {
    numbers.forEach((number, index) => {
      line = line.replaceAll(
        number,
        `${number.slice(0, 1)}${index}${number.slice(-1)}`
      );
    });

    const characters = line.trim().split("");

    const digit1 = characters.find((x) => !isNaN(parseInt(x)));
    const digit2 = characters.findLast((x) => !isNaN(parseInt(x)));

    const number = parseInt(`${digit1}${digit2}`);

    sum += number || 0;
  }

  return sum;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
