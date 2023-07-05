import Enemies from "./enemies.js";

class Bat extends Enemies{
    attackPower = 1;
    lifePoints = 2;
    constructor(position) {
        super(position);
    }

    get image() {
        return "Bat.gif";
    }


}

export default Bat;