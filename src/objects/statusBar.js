import ImageTile from "../game/imageTile.js";
import Position from "../util/position.js";
import BackgroundStatus from "./backgroundStatus.js";
import Fireball from "./fireball.js";
import Hammer from "./notSolidObjects/hammer.js";
import Key from "./notSolidObjects/key.js";
import LifeGreen from "./lifeGreen.js";
import Hero from "./moveables/hero.js";

class StatusBar {
    background = []; //fzr getter setter
    fireball = [];
    inventory = [];
    lifeBar = [];
    hero = Hero.getInstance();


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

    addLifeBar() {
        for (let x = 3; x < 7; x++) {
            let position = new Position(x, 0);

            this.lifeBar.push(new LifeGreen(position));
        }
    }

    addHammer() {
        //Hammer + 1 de poder
        this.hero.addPowerEquipment(1)
    }

    addKey() {
        for (let x = 9; x < 10; x++) {
            this.inventory.push(new Key(new Position(x, 0)));

        }
    }

    addItems(objetoColetado) {

        //TODO: usar um try and catch para limitar o maximo de 3 itens
        let xPosition = this.inventory.length + 7

        let position = new Position(xPosition, 0);

        if (objetoColetado instanceof Hammer) {
            this.addHammer();
            this.inventory.push(new Hammer(position));
        }

        if (objetoColetado instanceof Key) {
            this.inventory.push(new Key(position));
        }


    }


}

export default StatusBar;