import Enemies from "./enemies.js";



class Skeleton extends Enemies {
    attackPower = 1;
    lifePoints = 3
    constructor(position) {
        super(position);
    }

    get image() {
        return "Skeleton.gif";
    }


}


export default Skeleton;
