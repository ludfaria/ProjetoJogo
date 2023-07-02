import imageTile from "../../../game/imageTile.js";
import Enemies from "./enemies.js";
import Engine from "../../../game/engine.js";
import position from "../../../util/position.js";
import hero from "../hero.js";


class Skeleton extends Enemies {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Skeleton.gif";
    }

    // skeletonMoves(posicaodoheroi){
    //     //let newPosition = this.position.plus(this.position)
    //
    //     }

    movement(direction) {
        return this.position = this.position.plus(direction.asVector());
    }

}











export default Skeleton;
