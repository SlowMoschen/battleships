import { describe, expect, test } from "vitest";
import { BotPlayer, RealPlayer } from "../Player";
import { GameController } from "../GameController";

describe("Game initialization", () => {

    test("should initialize the game with two players", () => {
        const player1 = new RealPlayer("Player 1");
        const player2 = new RealPlayer("Player 2");
        const game = new GameController(player1, player2);

        expect(game).toBeDefined();
        expect(game).toBeInstanceOf(GameController);
    });

    test("should initialize the game with a bot player", () => {
        const player1 = new RealPlayer("Player 1");
        const player2 = new BotPlayer();
        const game = new GameController(player1, player2);

        expect(game).toBeDefined();
        expect(game).toBeInstanceOf(GameController);
    });

});
        