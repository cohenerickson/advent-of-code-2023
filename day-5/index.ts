import fs from "fs/promises";

const input = await fs.readFile("./day-5/input.txt", "utf-8");

let lines = input
  .trim()
  .split(/\n/g)
  .map((line) => line.trim());

let seeds = lines[0].split(" ").map(Number).slice(1);

const maps = getMaps();

function getMaps(): number[][][] {
  const maps: number[][][] = [];
  let currMap: number[][] = [];

  lines.slice(1).map((line) => {
    if (line !== "") {
      currMap.push(line.split(" ").map(Number));
    } else if (currMap.length > 0) {
      maps.push(currMap);
      currMap = [];
    }
  });

  return [...maps, currMap]
    .filter((map) => map.length > 0)
    .map((map) => map.slice(1));
}

function part1() {
  let min = Number.MAX_SAFE_INTEGER;

  // loop through seeds
  for (let i = 0; i < seeds.length; i++) {
    let dest = getDest(seeds[i]);

    if (dest < min) {
      min = dest;
    }
  }

  return min;
}

function getDest(seed: number): number {
  let dest = seed;

  // loop through maps
  for (let j = 0; j < maps.length; j++) {
    const map = maps[j];

    // loop through ranges
    for (let k = 0; k < map.length; k++) {
      const [destStart, sourceStart, rangeLen] = map[k];

      if (dest >= sourceStart && dest < sourceStart + rangeLen) {
        dest = destStart + (dest - sourceStart);
        break;
      }
    }
  }

  return dest;
}

function part2() {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < seeds.length; i += 2) {
    let baseSeed = seeds[i];

    for (let j = 0; j < seeds[i + 1]; j++) {
      const seed = baseSeed + j;

      const dest = getDest(seed);

      if (dest < min) {
        min = dest;
        console.log(seed, min);
      }
    }

    console.log(
      `Seed range ${baseSeed}...${baseSeed + seeds[i + 1] - 1} complete`
    );
  }

  return min;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
