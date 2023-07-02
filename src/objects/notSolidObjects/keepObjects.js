import NotSolidObjects from "./notSolidObjects.js";

class KeepObjects extends NotSolidObjects {
    constructor(position) {
        super(position);
    }

    get image() {
        return "";
    }
}

export default KeepObjects;