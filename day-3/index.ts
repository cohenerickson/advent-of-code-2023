import fs from "fs/promises";

const input = await fs.readFile("./day-3/input.txt", "utf-8");

let matrix = input
  .trim()
  .split(/\n/g)
  .map((line) => line.trim().split(""));

function part1() {
  let sum = 0;

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (/[0-9]/.test(char)) {
        if (checkNearby(i, j)) {
          const num = getNumber(i, j);

          sum += Number(num);

          j += num.length - 1;
        }
      }
    }
  }

  return sum;
}

function checkNearby(i: number, j: number): boolean {
  const nearby = getNearby(i, j);

  const nearbySymbols = nearby
    .filter((char) => /[^0-9.]/.test(char) && char)
    .map((char) => char);

  let returnVal = nearbySymbols.length > 0;

  if (/[0-9]/.test(matrix[i][j + 1])) {
    returnVal ||= checkNearby(i, j + 1);
  }

  return returnVal;
}

function getNearby(i: number, j: number): string[] {
  return [
    matrix[i - 1]?.[j - 1],
    matrix[i - 1]?.[j],
    matrix[i - 1]?.[j + 1],
    matrix[i]?.[j - 1],
    matrix[i]?.[j + 1],
    matrix[i + 1]?.[j - 1],
    matrix[i + 1]?.[j],
    matrix[i + 1]?.[j + 1]
  ];
}

function getNumber(i: number, j: number): string {
  let number = matrix[i][j];

  let index = 1;

  while (/[0-9]/.test(matrix[i][j + index])) {
    number += matrix[i][j + index];
    index++;
  }

  return number;
}

function part2() {
  matrix = transformMatrix(matrix);
  let sum = 0;

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === "*") {
        const nearbyNumbers = getNearbyNumbers(i, j);

        if (nearbyNumbers.length < 2) continue;

        const product = nearbyNumbers.reduce(
          (acc, cur) => acc * Number(cur),
          1
        );

        sum += product;
      }
    }
  }

  return sum;
}

function getNearbyNumbers(i: number, j: number): string[] {
  const nearby = Array.from(new Set(getNearby(i, j)));

  const nearbyNumbers = nearby
    .filter((char) => /[0-9]/.test(char) && char)
    .map((char) => char);

  return nearbyNumbers;
}

function transformMatrix(matrix: string[][]): string[][] {
  let newMatrix = matrix;

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (/[0-9]/.test(char)) {
        const num = getNumber(i, j);

        for (let k = 0; k < num.length; k++) {
          newMatrix[i][j + k] = num;
        }

        j += num.length - 1;
      }
    }
  }

  return newMatrix;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
