class Controls {


    constructor() {
        this.initializeListeners();
    }

    private initializeListeners(): void {
        document.addEventListener("keydown", (e) => this.handleRotate(e));
        document.getElementById("btn-rotate")?.addEventListener("click", (e) => this.handleRotate(e));
    }

    private handleRotate(e: MouseEvent | KeyboardEvent): void {
        const key = e instanceof KeyboardEvent ? e.key : (e.target as HTMLElement).id;

        if (key === "r") {
            console.log("Rotate");
        } else if (key === "btn-rotate") {
            console.log("Rotate");
        }
    }
}
export const controls = new Controls();