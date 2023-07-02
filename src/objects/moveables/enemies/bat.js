import Enemies from "./enemies.js";

class Bat extends Enemies{
    constructor(position) {
        super(position);
    }

    get image() {
        return "Bat.gif";
    }


}

export default Bat;