import { Gameboard } from "../Gameboard";

export class GameboardElement extends HTMLElement {
  public gameBoard: Gameboard;

  constructor(gameBoard: Gameboard) {
    super();
    this.attachShadow({ mode: "open" });
    this.gameBoard = gameBoard;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                        width: 100%;
                        height: 100%;
                        background-color: #f0f0f0;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        padding: 10px;
                    }
                </style>
                <div>
                 ${this.renderBoard()}
                </div>
            `;
    }
  }

  renderBoard() {
    return `
            ${this.gameBoard.board
              .map((row, rowIndex) => {
                return `
                        <div style="display: flex;">
                            ${row
                              .map((cell, cellIndex) => {
                                return `
                                        <div style="width: 30px; height: 30px; border: 1px solid #ccc; text-align: center; line-height: 30px;">
                                            ${cell}
                                        </div>
                                    `;
                              })
                              .join("")}
                        </div>
                    `;
              })
              .join("")}
        `;
  }
}

customElements.define("gameboard-element", GameboardElement);
