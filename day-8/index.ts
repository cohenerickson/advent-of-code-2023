import fs from "fs/promises";

const input = await fs.readFile("./day-8/input.txt", "utf-8");

let lines = input
  .trim()
  .split(/\n/g)
  .map((line) => line.trim());

const directions = lines[0].split("");

type Node = {
  name: string;
  left: string;
  right: string;
};

const nodes = getNodes();

function getNodes(): { [key: string]: Node } {
  const nodes: { [key: string]: Node } = {};

  lines.slice(2).map((line) => {
    const [name, left, right] =
      line.match(/[a-z0-9]{3,3}/gi) ?? ([] as string[]);

    if (name && left && right) {
      nodes[name] = {
        name,
        left,
        right
      };
    }
  });

  return nodes;
}

function part1() {
  let current = nodes.AAA;

  let i = 0;
  while (current !== nodes.ZZZ) {
    if (directions[i % directions.length] === "R") {
      current = nodes[current.right];
    } else {
      current = nodes[current.left];
    }

    i++;
  }

  return i;
}

function part2() {
  const currentNodes = Object.values(nodes).filter(
    (x) => x.name.at(-1) === "A"
  );

  const numbers = currentNodes.map((current) => {
    let i = 0;
    while (!current.name.endsWith("Z")) {
      if (directions[i % directions.length] === "R") {
        current = nodes[current.right];
      } else {
        current = nodes[current.left];
      }

      i++;
    }

    return i;
  });

  return lcm(...numbers);
}

function lcm(...numbers: number[]): number {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
