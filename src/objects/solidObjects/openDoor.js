import ImageTile from "../../game/imageTile.js";

class OpenDoor extends ImageTile {

    // doorRule;
    constructor(position) {
        super(position);
        // this.doorRule = doorRule;
    }

    get image() {
        return "DoorOpen.png";
    }
}

export default OpenDoor;