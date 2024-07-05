import { beforeEach, describe, expect, test } from "vitest";
import { Gameboard } from "../logic/Gameboard";
import { Ship } from "../logic/Ship";

const SHIP_COORDINATES = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
];

// MARK: INITIALIZATION
describe("Gameboard initialization", () => {
  const gameboard = new Gameboard();

  test("should not be undefined", () => {
    expect(gameboard).not.toBe(undefined);
  });

  test("should have a board", () => {
    expect(gameboard.board).not.toBe(undefined);
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
    expect(gameboard.board[0][0]).toBe(0);
  });

  test("should have an empty ships array", () => {
    expect(Array.isArray(gameboard.ships)).toBe(true);
    expect(gameboard.ships.length).toBe(0);
  });

  test("should have a missedShots counter", () => {
    expect(gameboard.missedShotsCount).toBe(0);
  });
});

// MARK: METHODS
describe("Gameboard methods", () => {
  let gameboard: Gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("should have a placeShip method", () => {
    expect(gameboard.placeShip).not.toBe(undefined);
  });

  test("should have a isShipPlacementValid method", () => {
    expect(gameboard["isShipPlacementValid"]).not.toBe(undefined);
  });

  test("should have a placeShipsRandomly method", () => {
    expect(gameboard.placeShipsRandomly).not.toBe(undefined);
  });

  test("should have a getRandomShipCoordinates method", () => {
    expect(gameboard["getRandomShipCoordinates"]).not.toBe(undefined);
  });

  test("should have a receiveAttack method", () => {
    expect(gameboard.receiveAttack).not.toBe(undefined);
  });

  test("should have a allShipsSunk method", () => {
    expect(gameboard.areAllShipsSunk).not.toBe(undefined);
  });

  test("should have a missedShotsCount getter", () => {
    expect(gameboard.missedShotsCount).not.toBe(undefined);
  });
});

// MARK: PLACE SHIP
describe("Gameboard placeShip method", () => {
  let gameboard: Gameboard;
  let ship: Ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship("carrier", 5, SHIP_COORDINATES);
  });

  test("should place a ship on the board", () => {
    gameboard.placeShip(ship, ship.coordinates);

    expect(gameboard.ships.length).toBe(1);
    expect(gameboard.ships[0]).toBe(ship);
    expect(gameboard.board[0][0]).toBe(1);
  });

  test("should place a ship on the board with multiple cells", () => {
    gameboard.placeShip(ship, ship.coordinates);

    expect(gameboard.board[0][0]).toBe(1);
    expect(gameboard.board[0][1]).toBe(1);
    expect(gameboard.board[0][2]).toBe(1);
    expect(gameboard.board[0][3]).toBe(1);
    expect(gameboard.board[0][4]).toBe(1);
  });

  test("should not place a ship on the board if there is a ship already", () => {
    gameboard.placeShip(ship, ship.coordinates);
    gameboard.placeShip(ship, ship.coordinates);

    expect(gameboard.ships.length).toBe(1);
  });

  test("should not place a ship if the coordinates are out of bounds", () => {
    const ship = new Ship("carrier", 5, [{ x: 11, y: 11 }]);

    gameboard.placeShip(ship, ship.coordinates);

    expect(gameboard.ships.length).toBe(0);
  });

  test("should not place a ship if the coordinates are adjacent to another ship", () => {
    const ship1 = new Ship("carrier", 5, SHIP_COORDINATES);
    const ship2 = new Ship("carrier", 5, [{ x: 1, y: 1 }]);

    gameboard.placeShip(ship1, ship1.coordinates);
    gameboard.placeShip(ship2, ship2.coordinates);

    expect(gameboard.ships.length).toBe(1);
  });

  test("should place ships randomly when calling placeShipsRandomly", () => {
    gameboard.placeShipsRandomly();

    expect(gameboard.ships.length).toBe(5);
    expect(gameboard.ships[0].coordinates.length).toBe(5);
    const shipCoordinates = gameboard.ships.map((ship) => ship.coordinates);
    shipCoordinates.forEach((coordinates) => {
      expect(coordinates.every((point) => gameboard.board[point.x][point.y] === 1)).toBe(true);
    });
  });
});

// MARK: RECEIVE ATTACK
describe("Gameboard receiveAttack method", () => {
  let gameboard: Gameboard;
  let ship: Ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship("carrier", 5, SHIP_COORDINATES);
    gameboard.placeShip(ship, ship.coordinates);
  });

  test("should register a hit", () => {
    gameboard.receiveAttack({ x: 0, y: 0 });

    expect(gameboard.board[0][0]).toBe(2);
  });

  test("should register a miss", () => {
    gameboard.receiveAttack({ x: 1, y: 0 });

    expect(gameboard.board[1][0]).toBe(3);
    expect(gameboard.missedShotsCount).toBe(1);
  });

  test("should register a hit and sink the ship", () => {
    gameboard.receiveAttack({ x: 0, y: 0 });
    gameboard.receiveAttack({ x: 0, y: 1 });
    gameboard.receiveAttack({ x: 0, y: 2 });
    gameboard.receiveAttack({ x: 0, y: 3 });
    gameboard.receiveAttack({ x: 0, y: 4 });

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  test("should do nothing if the cell is already hit", () => {
    gameboard.receiveAttack({ x: 0, y: 0 });
    gameboard.receiveAttack({ x: 0, y: 0 });

    expect(gameboard.board[0][0]).toBe(2);
  });
});
