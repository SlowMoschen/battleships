import { beforeEach, describe, expect, test } from "vitest";
import { Player } from "../Player";
import { CellStates } from "../types/CellStates";

describe("Player initialization", () => {
    test("should create a bot player if no name is provided", () => {
        const player = new Player();
        expect(player.isBot).toBe(true);
        expect(player.name).toBe("Bot");
    });

    test("should create a human player if a name is provided", () => {
        const player = new Player("Alice");
        expect(player.isBot).toBe(false);
        expect(player.name).toBe("Alice");
    });

    test("should have a gameBoard", () => {
        const player = new Player();
        expect(player.gameBoard).not.toBe(undefined);
    });

    test("should place ships randomly if player is a bot", () => {
        const player = new Player();
        expect(player.gameBoard.ships.length).toBe(5);
    });
});

describe("Player actions", () => {
    let player: Player;

    beforeEach(() => {
        player = new Player('Alice');
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

    test("should make a move on the gameboard", () => {
        player.makeMove({ x: 0, y: 0 });
        expect(player.gameBoard.board[0][0]).toBe(CellStates.MISS);
    });
});