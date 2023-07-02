import ImageTile from "../game/imageTile.js";
import Position from "../util/position.js";
import BackgroundStatus from "./backgroundStatus.js";
import Fireball from "./fireball.js";


class StatusBar {
    background = [];
    fireball = [];
    collectedObjects =[];


    static #instance;

    static getInstance() {
        if (StatusBar.#instance === undefined) {
            StatusBar.#instance = new StatusBar();
        }
        return StatusBar.#instance;
    }

    addBackground() {
        for (let x = 0; x < 10; x++) {
            let position = new Position(x, 0);

            this.background.push(new BackgroundStatus(position));
        }

    }

    addFireball() {
        for (let x = 0; x < 3; x++) {
            let position = new Position(x, 0);

            this.fireball.push(new Fireball(position));
        }
    }

    addItems(objetoColetado){
        for (let x = 7; x < 10; x++) {
            let position = new Position(x, 0);

           this.collectedObjects.push(objetoColetado );
        }
    }


}

export default StatusBar;