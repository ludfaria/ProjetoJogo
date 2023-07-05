import ImageTile from "../../game/imageTile.js";

class Door extends ImageTile {

    // doorRule;
    constructor(position) {
        super(position);
        // this.doorRule = doorRule;
    }

    get image() {
        return "DoorClosed.png";
    }
}

export default Door;
