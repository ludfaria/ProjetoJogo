import NotSolidObjects from "./notSolidObjects.js";

class Meat extends NotSolidObjects {
    constructor(position) {
        super(position);
    }

    get image() {
        return "GoodMeat.png";
    }
}

export default Meat;