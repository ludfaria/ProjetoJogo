import Equipments from "./equipments.js";

class Hammer extends Equipments {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Hammer.png";
    }
}

export default Hammer;