import ImageTile from "../game/imageTile.js";

class HalfLife extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "RedGreen.png";
    }

}

export default HalfLife;