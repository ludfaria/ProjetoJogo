import Enemies from "./enemies.js";

class BadGuy extends Enemies {
    attackPower = 2;
    lifePoints = 6;
    constructor(position) {
        super(position);
    }

    get image() {
        return "BadGuy.gif";
    }


}

export default BadGuy;