import Moveables from "./moveables.js";
import Interface from "../../game/interface.js";
import Position from "../../util/position.js";
import StatusBar from "../statusItems/statusBar.js";


class Hero extends Moveables {
    attackPower = 2;
    fullTotalLife = 8;
    lifePoints = 8;
    initialPosition;


    static #instance;

    static getInstance() {
        if (Hero.#instance === undefined) {
            Hero.#instance = new Hero(new Position(4, 6));
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

    addPowerEquipment(power) {

        this.attackPower = this.attackPower + power;
        Interface.getInstance().showMessage("It's hammer time!");

    }

    losePowerEquipment(power) {
        this.attackPower = this.attackPower - power;
    }


    takeDamage(attackPower, map) {

        this.lifePoints = this.lifePoints - attackPower;
        StatusBar.getInstance().loseLifeBar(attackPower)
        console.log("fui atacado. minha vida agora é", this.lifePoints);

        if (this.lifePoints <= 0) {
            console.log("MORRI");
            Interface.getInstance().removeImage(this)

            Interface.getInstance().showMessage("!! GAME OVER !!")

        }
    }

    eatMeat() {
        this.lifePoints = this.fullTotalLife;
        StatusBar.getInstance().addLifeBar();
        Interface.getInstance().showMessage("Recuperou vida")
        Interface.getInstance().addStatusImages(StatusBar.getInstance().lifeBar);
    }
}
    export default Hero;
