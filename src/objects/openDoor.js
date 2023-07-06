import Door from "./door.js";

class OpenDoor extends Door {

    constructor(position, doorNumber) {
        super(position, doorNumber);
    }

    get image() {
        return "DoorOpen.png";
    }
}

export default OpenDoor;