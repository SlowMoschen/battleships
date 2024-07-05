import { Gameboard } from "./Gameboard";
import { BotPlayer, Player } from "./Player";
import { Point } from "./types/Point";

export class GameController {
    public player1: Player;
    public player2: Player;
    public isPlayer1Turn: boolean = true;

    constructor(player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
    }

    public isGameOver(): boolean {
        return this.player1.gameBoard.areAllShipsSunk() || this.player2.gameBoard.areAllShipsSunk();
    }

    public getWinner(): Player {
        return this.player1.gameBoard.areAllShipsSunk() ? this.player2 : this.player1;
    }

    // MARK: Utils
    private switchTurn(): void {
        this.isPlayer1Turn = !this.isPlayer1Turn;
    }

    private getEnemyBoard(): Gameboard {
        return this.isPlayer1Turn ? this.player2.gameBoard : this.player1.gameBoard;
    }

    private getCurrentPlayer(): Player {
        return this.isPlayer1Turn ? this.player1 : this.player2;
    }
}