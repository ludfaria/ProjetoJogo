import ImageTile from "../../game/imageTile.js";

class OpenDoor extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "DoorOpen.png";
    }
}

export default OpenDoor;