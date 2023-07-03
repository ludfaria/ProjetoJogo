import ImageTile from "../game/imageTile.js";

class LifeGreen extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Green.png";
    }

}

export default LifeGreen;