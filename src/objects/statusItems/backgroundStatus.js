import ImageTile from "../../game/imageTile.js";

class BackgroundStatus extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Black.png";
    }

}

export default BackgroundStatus;
