import Enemies from "./enemies.js";

class BadGuy extends Enemies {
    constructor(position) {
        super(position);
    }

    get image() {
        return "BadGuy.gif";
    }


    // movement(direction) {
    //     return this.position = this.position.plus(direction.asVector());
    // }

}

export default BadGuy;