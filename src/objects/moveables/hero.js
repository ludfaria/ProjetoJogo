import ImageTile from "../../game/imageTile.js";
import Direction from "../../util/direction.js";
import Engine from "../../game/engine.js";
import maps from "../../game/maps.js";
import engine from "../../game/engine.js";
import Moveables from "./moveables.js";

class Hero extends Moveables {
    attackPower = 2;
    lifePoints = 8; //deveria estar no construtor?
    initialPosition;


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


    takeDamage(attackPower, map) {
        this.lifePoints = this.lifePoints - attackPower;
        console.log("fui atacado. minha vida agora é", this.lifePoints);
        this.resetPosition()
        if (this.lifePoints <= 0) {
            console.log("MORRI");
            map.disappearTile(this.position);
        }
    }
}

export default Hero;
