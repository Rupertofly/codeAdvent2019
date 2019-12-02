import { inputDataQ1 } from './01data'; // Data has been split into an array and parsed as a number;
export function fuelRequirementforMass(mass: number) {
  return Math.floor(mass / 3) - 2;
}
export function fuelRequirementSum(massArray: number[]) {
  return massArray
    .map(fuelRequirementforMass)
    .reduce((a, b) => a + b, 0);
}
export function recursiveFuelForMass(
  startingMass: number
): number {
  let fuel = fuelRequirementforMass(startingMass);
  if (fuel < 0) fuel = 0;
  return fuel > 0
    ? startingMass + recursiveFuelForMass(fuel)
    : startingMass + fuel;
}

export function p2fuelRequirementSum(massArray: number[]) {
  return massArray
    .map(recursiveFuelForMass)
    .map((d, i) => d - massArray[i])
    .reduce((a, b) => a + b, 0);
}
console.log(inputDataQ1);
