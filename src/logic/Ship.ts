import { Point } from "../types/Point";

export class Ship {
    public name: string;
    public size: number;
    public coordinates: Point[];
    private hits: number = 0;

    constructor(name: string, size: number, coordinates: Point[]) {
        this.name = name;
        this.size = size;
        this.coordinates = coordinates;
    }

    public hit(): void {
        this.hits++;
        if (this.isSunk()) this.hits = this.size;
    }

    public isSunk(): boolean {
        return this.hits === this.size;
    }

    get hitsCount(): number {
        return this.hits;
    }
}