import Equipments from "./equipments.js";

class Key extends Equipments {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Key.png";
    }
}

export default Key;