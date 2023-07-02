import SolidObject from "../solidObjects/solidObject.js";
import Meat from "../notSolidObjects/meat.js";

class Moveables extends SolidObject {
    constructor(position) {
        super(position);
    }




    moves(direction, map) {
        // console.log('this position', this.position)
        let newPosition = this.position.plus(direction.asVector());
        console.log("ESSA É A MOVEABLE NEW POSITION", newPosition)
        //  console.log('map.isTileFree(newPosition', map.isTileFree(newPosition))
        if (map.isTileFree(newPosition)) {
            // return this.position = newPosition;
            this.position = newPosition;
        }

        let tile = map.buildRoom.find(function (tile) { //PQ .BUILDROOM?
            return tile.position.equals(newPosition)
        })

        if (tile instanceof Meat) {
            console.log("COME A CARNE, MALDITO");
            map.disappearTile(newPosition);
        } else {

            let tile = map.buildRoom.find(function (tile) { //PQ .BUILDROOM?
                return tile.position.equals(newPosition)
            })

            if (tile instanceof Moveables) {

                this.collision(tile)//se for instancia de moveable, acontece a colisão

                // }else{
                //
                //     return this.position
            }

            // if (tile instanceof Meat) {
            //     console.log("COME A CARNE, MALDITO");
            // }


        }

    }

    collision(target) {
        console.log("TARGET", target);
        console.log("ME ATACA QUE EU TE ATACO");
        //FAZER O TAKE DAMAGE
    }

}

export default Moveables;
