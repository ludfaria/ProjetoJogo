import NotSolidObjects from "./notSolidObjects.js";

class Blood extends NotSolidObjects {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Blood.gif";
    }
}

export default Blood;