import { ships } from "../config";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Point } from "./types/Point";

type ShipNames = keyof typeof ships;

export class Player {
    public isBot: boolean;
    public name: string;
    public gameBoard: Gameboard
    private missedShots: number = 0;

    constructor(name?: string) {
        this.isBot = name ? false : true;
        this.name = name || "Bot";
        this.gameBoard = new Gameboard();

        if (this.isBot) {
            this.gameBoard.placeShipsRandomly();
        }
    }

    public makeMove(point: Point): void {
        this.gameBoard.receiveAttack(point);
    }

    public placeShip(shipName: ShipNames, orientation: string, start: Point): void {
        let coordinates: Point[] = [];
        const ship = ships[shipName];

        for (let i = 0; i < ship.size; i++) {
            if (orientation === "horizontal") {
                coordinates.push({ x: start.x + i, y: start.y });
            } else {
                coordinates.push({ x: start.x, y: start.y + i });
            }
        }

        const shipInstance = new Ship(ship.name, ship.size, coordinates);
        this.gameBoard.placeShip(shipInstance, coordinates);
    }


    // MARK: GETTERS
    get missedShotsCount(): number {
        return this.missedShots;
    }
}