// src/utils/generateRandomData.ts
import { Player } from "../entities/Player";
import { generateUniqueId } from "./utils";

function getRandomName() {
  const names = [
    "John",
    "Jane",
    "Alex",
    "Alice",
    "Mike",
    "Sara",
    "Tom",
    "Emma",
    "Chris",
    "Olivia",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomGaussian(mean: number, stdDev: number) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  // Translate to the desired mean and standard deviation:
  num = num * stdDev + mean;

  // Ensure the number is within the desired range (e.g., between 1000 and 10000):
  return Math.floor(Math.max(1000, Math.min(num, 10000)));
}

function getRandomPositions() {
  const positions = [];
  const length = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < length; i++) {
    positions.push(Math.floor(Math.random() * 5) + 1);
  }
  return positions;
}

function generateRandomData(count: number): Player[] {
  const data: Player[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: getRandomName(),
      mmr: getRandomGaussian(3000, 1000),
      id: generateUniqueId(),
      positions: getRandomPositions(),
    });
  }
  return data;
}

export default generateRandomData;
