import { SHIPS } from "../../config";
import { CellStates } from "../types/CellStates";
import { Point } from "../types/Point";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

type ShipNames = keyof typeof SHIPS;

/**
 * Abstract class for Player - RealPlayer and BotPlayer will extend this class
 */
export abstract class Player {
  abstract isBot: boolean;
  abstract name: string;
  public gameBoard: Gameboard = new Gameboard();

  abstract makeMove(enemyBoard: Gameboard, point?: Point): void;

  isValidAttack(point: Point): boolean {
    const isWithinBounds = point.x >= 0 && point.x < Gameboard.BOARD_SIZE && point.y >= 0 && point.y < Gameboard.BOARD_SIZE;
    if (!isWithinBounds) return false;

    const hasNotBeenAttacked = this.gameBoard.board[point.x][point.y] === CellStates.EMPTY;
    const hasNotBeenMissed = this.gameBoard.board[point.x][point.y] !== CellStates.MISS;
    const hasNotBeenHit = this.gameBoard.board[point.x][point.y] !== CellStates.HIT;

    return isWithinBounds && hasNotBeenAttacked && hasNotBeenMissed && hasNotBeenHit;
  }

  receiveAttack(point: Point): void {
    this.gameBoard.receiveAttack(point);
  }
}

// MARK: RealPlayer
export class RealPlayer extends Player {
  public isBot: boolean;
  public name: string;
  public gameBoard: Gameboard = new Gameboard();

  constructor(name: string) {
    super();
    this.isBot = false;
    this.name = name;
  }

  public makeMove(enemyBoard: Gameboard, point: Point): void {
    if (this.isValidAttack(point)) {
      enemyBoard.receiveAttack(point);
    }
  }

  public placeShip(shipName: ShipNames, orientation: string, start: Point): void {
    let coordinates: Point[] = [];
    const ship = SHIPS[shipName];

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
}

// MARK: BotPlayer
export class BotPlayer extends Player {
  public isBot: boolean;
  public name: string;
  public gameBoard: Gameboard = new Gameboard();
  private lastMove: {
    coordinates: Point;
    hit: boolean;
  } | null = null;

  constructor() {
    super();
    this.isBot = true;
    this.name = "Bot";
    this.gameBoard.placeShipsRandomly();
  }

  public makeMove(enemyBoard: Gameboard, point?: Point): void {
    if (!point) {
        point = this.lastMove && this.lastMove.hit ? this.getAdjacentPoint() : this.getRandomPoint();
    }

    enemyBoard.receiveAttack(point);
    this.lastMove = {
      coordinates: point,
      hit: enemyBoard.board[point.x][point.y] === CellStates.HIT,
    };
}

  private getRandomPoint(): Point {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    return { x, y };
  }

  private getAdjacentPoint(): Point {
    let point: Point;
    const directions = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        ];
    const { x, y } = this.lastMove!.coordinates;

    do {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        point = { x: x + direction.x, y: y + direction.y };
    } while (!this.isValidAttack(point));

    return point;
  }

  get lastMoveCoordinates(): Point | null {
    return this.lastMove?.coordinates || null;
  }
}
