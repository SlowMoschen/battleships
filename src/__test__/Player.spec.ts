import { beforeEach, describe, expect, test } from "vitest";
import { CellStates } from "../types/CellStates";
import { BotPlayer, RealPlayer } from "../logic/Player";

// MARK: Player initialization
describe("Player initialization", () => {
  test("should create a bot player if no name is provided", () => {
    const player = new BotPlayer();
    expect(player.isBot).toBe(true);
    expect(player.name).toBe("Bot");
  });

  test("should create a human player if a name is provided", () => {
    const player = new RealPlayer("Alice");
    expect(player.isBot).toBe(false);
    expect(player.name).toBe("Alice");
  });

  test("should have a gameBoard", () => {
    const player = new RealPlayer("Alice");
    expect(player.gameBoard).not.toBe(undefined);
  });

  test("should place ships randomly if player is a bot", () => {
    const player = new BotPlayer();
    expect(player.gameBoard.ships.length).toBe(5);
  });
});

// MARK: Player actions
describe("Player actions", () => {
  let player: RealPlayer;
  let bot: BotPlayer;

  beforeEach(() => {
    player = new RealPlayer("Alice");
    bot = new BotPlayer();
  });

  test("isValidAttack Tests", () => {
    expect(player.isValidAttack({ x: 0, y: 0 })).toBe(true);
    expect(player.isValidAttack({ x: 10, y: 10 })).toBe(false);
  });

  test("should make a move", () => {
    player.makeMove(bot.gameBoard, { x: 0, y: 0 });
    expect(bot.gameBoard.board[0][0]).not.toBe(CellStates.EMPTY);
  });

  test("should receive an attack", () => {
    player.placeShip("carrier", "horizontal", { x: 0, y: 0 });
    bot.makeMove(player.gameBoard, { x: 0, y: 0 });
    expect(player.gameBoard.board[0][0]).toBe(CellStates.HIT);
  });
});

// MARK: RealPlayer actions
describe("RealPlayer actions", () => {
  let player: RealPlayer;

  beforeEach(() => {
    player = new RealPlayer("Alice");
  });

  test("should place a ship on the gameboard", () => {
    player.placeShip("carrier", "horizontal", { x: 0, y: 0 });
    expect(player.gameBoard.ships.length).toBe(1);
  });

  test("shouldn't place a ship if the coordinates are invalid", () => {
    player.placeShip("carrier", "horizontal", { x: 0, y: 0 });
    player.placeShip("battleship", "horizontal", { x: 0, y: 0 });
    expect(player.gameBoard.ships.length).toBe(1);
  });

  test("should receive an attack", () => {
    player.receiveAttack({ x: 0, y: 0 });
    expect(player.gameBoard.board[0][0]).toBe(CellStates.MISS);
  });
});

// MARK: BotPlayer actions
describe("BotPlayer actions", () => {
  let bot: BotPlayer;
  let player: RealPlayer;

  beforeEach(() => {
    bot = new BotPlayer();
    player = new RealPlayer("Alice");
  });

  test("should make a random move", () => {
    bot.makeMove(player.gameBoard);
    const attackedCell = bot.lastMoveCoordinates!;
    expect(player.gameBoard.board[attackedCell.x][attackedCell.y]).not.toBe(CellStates.EMPTY);
  });

  test("should make an adjacent move if the last move was a hit", () => {
    player.placeShip("carrier", "horizontal", { x: 0, y: 0 });
    bot.makeMove(player.gameBoard, { x: 0, y: 0 });
    bot.makeMove(player.gameBoard);
    const attackedCell = bot.lastMoveCoordinates!;
    expect(player.gameBoard.board[attackedCell.x][attackedCell.y]).not.toBe(CellStates.EMPTY);
  });
});
