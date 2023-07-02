import ImageTile from "../../game/imageTile.js";

class NotSolidObjects extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "";
    }
}

export default NotSolidObjects;