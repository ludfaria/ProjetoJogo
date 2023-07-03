import ImageTile from "../game/imageTile.js";

class LifeRed extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Red.png";
    }

}

export default LifeRed;