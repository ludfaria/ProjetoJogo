import ImageTile from "../../game/imageTile.js";
import Direction from "../../util/direction.js";
import Engine from "../../game/engine.js";
import maps from "../../game/maps.js";
import engine from "../../game/engine.js";
import Moveables from "./moveables.js";
import Interface from "../../game/interface.js";
import Position from "../../util/position.js";

class Hero extends Moveables {
    attackPower = 2;
    lifePoints = 8; //deveria estar no construtor?
    initialPosition;


    static #instance;

    static getInstance() {
        if (Hero.#instance === undefined) {
            Hero.#instance = new Hero();
        }
        return Hero.#instance;
    }
    constructor(position) {
        super(position);
        this.initialPosition = position
    }


    get image() {
        return "Hero.png";
    }

    resetPosition() {
        this.position = this.initialPosition;
    }

    addPowerEquipment(power){
        // this.attackPower += power;
        this.attackPower = this.attackPower + power;
        Interface.getInstance().showMessage("It's hammer time!");
        console.log('hero power', this.attackPower);
    }

    losePowerEquipment(power) {
        this.attackPower = this.attackPower - power;
    }


    takeDamage(attackPower, map) {
        this.lifePoints = this.lifePoints - attackPower;
        console.log("fui atacado. minha vida agora é", this.lifePoints);
        // this.resetPosition()
        if (this.lifePoints <= 0) {
            console.log("MORRI");
            Interface.getInstance().removeImage(this)
            Interface.getInstance().showMessage("!! GAME OVER !!")
            // map.disappearTile(this.position);
        }
    }
}

export default Hero;
