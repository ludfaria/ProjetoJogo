import ImageTile from "../../game/imageTile.js";
import Direction from "../../util/direction.js";
import Engine from "../../game/engine.js";
import maps from "../../game/maps.js";
import engine from "../../game/engine.js";
import Moveables from "./moveables.js";

class Hero extends Moveables {
    attackPower = 2;
    lifePoints = 5; //deveria estar no construtor?



    constructor(position) {
        super(position);
    }



    get image() {
        return "Hero.png";
    }

}

export default Hero;
