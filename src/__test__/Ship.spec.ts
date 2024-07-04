import { describe, expect, test } from "vitest";
import { Ship } from "../Ship";

// MARK: INITIALIZATION
describe("Ship initialization", () => {
  const ship = new Ship("Ship", 3, [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ]);

  test("should not be undefined", () => {
    expect(Ship).not.toBe(undefined);
  });

  test("should have a name", () => {
    expect(ship.name).toBe("Ship");
  });

  test("should have a certain size", () => {
    expect(ship.size).toBe(3);
  });

  test("should have a hits counter", () => {
    expect(ship.hitsCount).toBe(0);
  });

  test("should have coordinates points", () => {
    expect(ship.coordinates).toStrictEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ]);
  });
});

// MARK: METHODS
describe("Ship methods", () => {
  const ship = new Ship("Ship", 3, [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ]);

  test("should have a hit method", () => {
    expect(ship.hit).not.toBe(undefined);
  });

  test("should have a isSunk method", () => {
    expect(ship.isSunk).not.toBe(undefined);
  });

  test("should increase hits when hit method is called", () => {
    ship.hit();
    expect(ship.hitsCount).toBe(1);
  });

  test("should tell if the ship is sunk", () => {
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
