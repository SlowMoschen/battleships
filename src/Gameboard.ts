import { Ship } from "./Ship";
import { CellStates } from "./types/CellStates";
import { Point } from "./types/Point";
import {ships} from "../config";

export class Gameboard {
    public static BOARD_SIZE: number = 10;
    public board: Array<Array<number>> = Array.from({ length: Gameboard.BOARD_SIZE }, () => Array.from({ length: Gameboard.BOARD_SIZE }, () => 0));
    public ships: Ship[] = [];
    private missedShots: number = 0;

    constructor() {}

    // MARK: METHODS

    /**
     * Placing Methods
     */
    public placeShip(ship: Ship, coordinates: Point[]): void {
        if (this.isShipPlacementValid(coordinates)) {
            this.ships.push(ship);
            coordinates.forEach((point) => {
                this.board[point.x][point.y] = CellStates.SHIP;
            });
        }
    }

    private isShipPlacementValid(coordinates: Point[]): boolean {
        const isInBounds = coordinates.every((point) => point.x >= 0 && point.x < Gameboard.BOARD_SIZE && point.y >= 0 && point.y < Gameboard.BOARD_SIZE);
        if (!isInBounds) return false;

        const isNotOccupied = coordinates.every((point) => this.board[point.x][point.y] === 0);
        if (!isNotOccupied) return false;
        
        const isNotAdjacent = coordinates.every((point) => {
            const x = point.x;
            const y = point.y;

            return this.board[x - 1]?.[y] !== CellStates.SHIP &&
                this.board[x + 1]?.[y] !== CellStates.SHIP &&
                this.board[x]?.[y - 1] !== CellStates.SHIP &&
                this.board[x]?.[y + 1] !== CellStates.SHIP;
        });


        return isInBounds && isNotOccupied && isNotAdjacent;
    }

    public placeShipsRandomly(): void {
        Object.values(ships).forEach((ship) => {
            let coordinates: Point[] = [];

            while (!this.isShipPlacementValid(coordinates) || coordinates.length === 0) {
                coordinates = this.getRandomShipCoordinates(ship.size);
            }

            const shipInstance = new Ship(ship.name, ship.size, coordinates);
            this.placeShip(shipInstance, coordinates);
        });
    }

    private getRandomShipCoordinates(shipSize: number): Point[] {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * Gameboard.BOARD_SIZE);
        const y = Math.floor(Math.random() * Gameboard.BOARD_SIZE);
        const coordinates: Point[] = [];

        if (orientation === "horizontal") {
            for (let i = 0; i < shipSize; i++) {
                coordinates.push({ x: x + i, y });
            }
        } else {
            for (let i = 0; i < shipSize; i++) {
                coordinates.push({ x, y: y + i });
            }
        }

        return coordinates;
    }

    /**
     * Attack Methods
     */
    public receiveAttack(point: Point): void {
        const cell = this.board[point.x][point.y];
        const ship = this.ships.find((ship) => ship.coordinates.some((coord) => coord.x === point.x && coord.y === point.y));

        switch (cell) {
            case CellStates.SHIP:
                ship?.hit();
                this.board[point.x][point.y] = CellStates.HIT;
                if (this.allShipsSunk()) this.gameOver();
                break;
            case CellStates.MISS:
                break;
            case CellStates.HIT:
                break;
            default:
                this.board[point.x][point.y] = CellStates.MISS;
                this.missedShots++;
                break;
        }
    }

    public allShipsSunk(): boolean {
        return this.ships.every((ship) => ship.isSunk());
    }

    private gameOver(): void {
        console.log("Game Over");
    }

    // MARK: GETTERS
    get missedShotsCount(): number {
        return this.missedShots;
    }
}