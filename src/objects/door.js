import ImageTile from "../game/imageTile.js";

class Door extends ImageTile {

    doorNumber;
    constructor(position, doorNumber) {
        super(position);
        this.doorNumber = doorNumber;
    }

    get image() {
        return "DoorClosed.png";
    }
}

export default Door;
