import KeepObjects from "./keepObjects.js";

class Key extends KeepObjects {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Key.png";
    }
}

export default Key;