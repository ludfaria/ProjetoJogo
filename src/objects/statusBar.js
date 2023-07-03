import ImageTile from "../game/imageTile.js";
import Position from "../util/position.js";
import BackgroundStatus from "./backgroundStatus.js";
import Fireball from "./fireball.js";
import Hammer from "./notSolidObjects/hammer.js";
import Key from "./notSolidObjects/key.js";
import LifeGreen from "./lifeGreen.js";

class StatusBar {
    background = []; //fzr getter setter
    fireball = [];
    collectedObjects = [];
    lifeBar =[];


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

    addLifeBar(){
        for (let x = 3; x < 7; x++) {
            let position = new Position(x, 0);

            this.lifeBar.push(new LifeGreen(position));
        }
    }

    addHammer() {
        for (let x = 8; x < 10; x++) {
            this.collectedObjects.push(new Hammer(new Position(x, 0)));
        }
    }

    addKey() {
        for (let x = 9; x < 10; x++) {
            this.collectedObjects.push(new Key(new Position(x, 0)));

        }
    }

    // addItems(objetoColetado) {
    //     for (let x = 7; x < 10; x++) {
    //         let position = new Position(x, 0);
    //
    //         if (objetoColetado instanceof Hammer) {
    //
    //             this.collectedObjects.push(new Hammer(position));
    //         }
    //         // if (objetoColetado instanceof Key){
    //         //     this.collectedObjects.push(new Key(position));
    //         // }
    //
    //             }
    // }


}

export default StatusBar;