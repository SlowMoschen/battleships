import './style.css'
import { Gameboard } from './Gameboard'
import { GameboardElement } from './components/Gameboard.component'

const app = document.getElementById('app')

if (app) {
    const gameboard = new Gameboard()
    const gameboardElement = new GameboardElement(gameboard)
    app.appendChild(gameboardElement)
}
