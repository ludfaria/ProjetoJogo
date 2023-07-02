import KeepObjects from "./keepObjects.js";

class Hammer extends KeepObjects {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Hammer.png";
    }
}

export default Hammer;