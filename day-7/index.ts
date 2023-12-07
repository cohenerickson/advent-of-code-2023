import fs from "fs/promises";

const input = await fs.readFile("./day-7/input.txt", "utf-8");

let lines = input
  .trim()
  .split(/\n/g)
  .map((line) => line.trim());

type Hand = {
  cards: number[];
  points: number;
};

function getHands(order: string): Hand[] {
  let hands: Hand[] = [];

  for (let i = 0; i < lines.length; i++) {
    const points = Number(lines[i].split(/\s+/).slice(1)[0]);

    const cards = lines[i]
      .split(/\s+/)[0]
      .split("")
      .map((card) => order.indexOf(card));

    hands.push({ cards, points });
  }

  return hands;
}

function sortHands(a: Hand, b: Hand, jokers: boolean) {
  const handTypeA = getHandType(a, jokers);
  const handTypeB = getHandType(b, jokers);

  if (handTypeA !== handTypeB) return handTypeA - handTypeB;

  for (let i = 0; i < a.cards.length; i++) {
    if (a.cards[i] > b.cards[i]) return 1;
    if (a.cards[i] < b.cards[i]) return -1;
  }

  return 0;
}

function getHandType(hand: Hand, jokers: boolean): number {
  let cardTypes: { [key: number]: number } = {};

  for (let i = 0; i < hand.cards.length; i++) {
    cardTypes[hand.cards[i]] = ++cardTypes[hand.cards[i]] || 1;
  }

  const values = Object.values(cardTypes);

  if (values.includes(5)) {
    return 3;
  } else if (values.includes(4)) {
    if (jokers && cardTypes[0] > 0) {
      return 3;
    }
    return 2;
  } else if (values.includes(3)) {
    if (values.includes(2)) {
      if (jokers && cardTypes[0] > 0) {
        return 3;
      }
      return 1;
    } else {
      if (jokers && cardTypes[0] === 3) {
        return 2;
      } else if (jokers && cardTypes[0] === 1) {
        return 2;
      }
      return 0;
    }
  } else if (values.includes(2) && values.filter((x) => x === 2).length === 2) {
    if (jokers && cardTypes[0] === 1) {
      return 1;
    } else if (jokers && cardTypes[0] === 2) {
      return 2;
    }
    return -1;
  } else if (values.includes(2)) {
    if (jokers && cardTypes[0] === 1) {
      return 0;
    } else if (jokers && cardTypes[0] === 2) {
      return 0;
    }
    return -2;
  } else {
    if (jokers && cardTypes[0] === 1) {
      return -2;
    }
    return -3;
  }
}

function part1() {
  let sum = 0;

  const hands = getHands("23456789TJQKA").sort((a, b) =>
    sortHands(a, b, false)
  );

  for (let i = 0; i < hands.length; i++) {
    sum += hands[i].points * (i + 1);
  }

  return sum;
}

function part2() {
  let sum = 0;

  const hands = getHands("J23456789TQKA").sort((a, b) => sortHands(a, b, true));

  for (let i = 0; i < hands.length; i++) {
    sum += hands[i].points * (i + 1);
  }

  return sum;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
