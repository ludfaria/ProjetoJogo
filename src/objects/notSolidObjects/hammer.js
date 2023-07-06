import Equipments from "./equipments.js";

class Hammer extends Equipments {
    static power = 1;


    constructor(position) {
        super(position);
    }

    get image() {
        return "Hammer.png";
    }
}

export default Hammer;