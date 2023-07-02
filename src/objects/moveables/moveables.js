import SolidObject from "../solidObjects/solidObject.js";
import Meat from "../notSolidObjects/meat.js";
import NotSolidObjects from "../notSolidObjects/notSolidObjects.js";
import Hero from "./hero.js";

class Moveables extends SolidObject {
    attackPower = 1;
    lifePoints = 2;

    constructor(position) {
        super(position);
    }


    moves(direction, map) {

        let newPosition = this.position.plus(direction.asVector());
        console.log("ESSA É A MOVEABLE NEW POSITION", newPosition)

        let tile = map.buildRoom.find(function (tile) { //PQ .BUILDROOM?
            return tile.position.equals(newPosition)
        })

        if (map.isTileFree(newPosition)) {
            //Apenas o Heroi pode pegar os itens
            if (tile instanceof NotSolidObjects && this instanceof Hero) {
                map.disappearTile(newPosition);
            }
            //Todos podem se mover
            this.position = newPosition;

        } else {

            if (tile instanceof Moveables) {
                this.attack(tile, map)//se for instancia de moveable, acontece a colisão
            }
        }

            // let tile = map.buildRoom.find(function (tile) { //PQ .BUILDROOM?
            //     return tile.position.equals(newPosition)
            // })

        //     if (tile instanceof NotSolidObjects) {
        //         map.disappearTile(newPosition);
        //
        //     } else {
        //
        //         // let tile = map.buildRoom.find(function (tile) { //PQ .BUILDROOM?
        //         //     return tile.position.equals(newPosition)
        //         // })
        //
        //         if (tile instanceof Moveables) {
        //
        //             this.attack(tile, map)//se for instancia de moveable, acontece a colisão
        //
        //             // }else{
        //             //
        //             //     return this.position
        //         }
        //
        //         // if (tile instanceof Meat) {
        //         //     console.log("COME A CARNE, MALDITO");
        //         // }
        //
        //
        //     }
        // }

    }

    attack(target, map) {
        console.log('attack -> this moveable:', this);
        console.log("TARGET", target);
        target.takeDamage(this.attackPower, map)
        console.log("SE ME ATACAR, EU VOU ATACAR");
        //FAZER O TAKE DAMAGE
    }

    takeDamage(attackPower, map) {
        this.lifePoints = this.lifePoints - attackPower;
        console.log("fui atacado. minha vida agora é", this.lifePoints );
        if (this.lifePoints <= 0) {
            console.log("MORRI");
            map.disappearTile(this.position);
        }
    }


}

export default Moveables;
