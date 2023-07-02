import ImageTile from "../../game/imageTile.js";

class Door extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "DoorClosed.png";
    }
}

export default Door;
