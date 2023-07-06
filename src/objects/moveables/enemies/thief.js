import Enemies from "./enemies.js";
import Direction from "../../../util/direction.js";

import Hammer from "../../notSolidObjects/hammer.js";


class Thief extends Enemies {
    attackPower = 1;
    lifePoints = 5;
    thiefPocket =[];


    constructor(position) {
        super(position);

    }

    get image() {
        return "Thief.gif";
    }

    fillPocket(){


    // if  (this.position === instanceof Hammer.position){
    //
    // }


    //     if (tile instanceof Hammer) {
    // map.disappearTile(newPosition);
    // this.thiefPocket.push(new Hammer() )
}



    randomMove(activeMap) {


        let random = Math.floor(Math.random() * 4) + 1;
        switch (random) {
            case 1:
                this.moves(Direction.RIGHT, activeMap);
                this.moves(Direction.UP, activeMap);

                break;

            case 2:
                this.moves(Direction.LEFT, activeMap);
                this.moves(Direction.UP, activeMap);

                break;

            case 3:
                this.moves(Direction.DOWN, activeMap);
                this.moves(Direction.RIGHT, activeMap);

                break;

            case 4:
                // console.log(this.activeMap)
                this.moves(Direction.DOWN, activeMap);
                this.moves(Direction.LEFT, activeMap);

        }


    }
}

export default Thief;