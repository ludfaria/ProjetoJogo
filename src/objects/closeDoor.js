import Door from "./door.js";

class CloseDoor extends Door {

    constructor(position, doorNumber) {
        super(position, doorNumber);
    }

    get image() {
        return "DoorClosed.png";
    }
}

export default Door;
