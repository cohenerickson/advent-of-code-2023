import fs from "fs/promises";

const input = await fs.readFile("./day-4/input.txt", "utf-8");

let cards = input
  .trim()
  .split(/\n/g)
  .map((line) => line.trim());

function part1() {
  let sum = 0;

  for (const card of cards) {
    const numberOfMatches = getMatches(card);

    sum += numberOfMatches.length > 0 ? 2 ** (numberOfMatches.length - 1) : 0;
  }

  return sum;
}

function part2() {
  const myCards = new Array(cards.length).fill(1);

  for (let i = 0; i < myCards.length; i++) {
    const matches = getMatches(cards[i]);

    for (let j = 1; j <= matches.length; j++) {
      myCards[i + j] += myCards[i] || 0;
    }
  }

  return myCards.reduce((a, b) => a + b, 0);
}

function getMatches(line: string): number[] {
  if (!line) return [];
  const [_, numbers] = line.split(/: +/);

  const [winning, mine] = numbers.split(" | ");

  const winningNumbers = winning.split(/ +/).map(Number);
  const myNumbers = mine.split(/ +/).map(Number);

  const numberOfMatches = myNumbers.filter((x) => winningNumbers.includes(x));

  return numberOfMatches;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
