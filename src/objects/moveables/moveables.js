import SolidObject from "../solidObjects/solidObject.js";
import Meat from "../notSolidObjects/meat.js";
import NotSolidObjects from "../notSolidObjects/notSolidObjects.js";
import Hero from "./hero.js";
import OpenDoor from "../solidObjects/openDoor.js";
import Blood from "../notSolidObjects/blood.js";
import Interface from "../../game/interface.js";

class Moveables extends SolidObject {
    attackPower = 1;
    lifePoints = 2;

    constructor(position) {
        super(position);
    }


    changeToNewPosition(newHeroPosition) {
        this.position = newHeroPosition;
    }
    moves(direction, map) {

        let newPosition = this.position.plus(direction.asVector());


        let tile = map.buildRoom.find(function (tile) {
            return tile.position.equals(newPosition)
        })

        if (map.isTileFree(newPosition)) {
            //Apenas o Heroi pode pegar os itens
            if (tile instanceof NotSolidObjects && this instanceof Hero) {
                map.disappearTile(newPosition);
            }
            // else if (tile instanceof OpenDoor) {
            //     map.changeRoom(tile);
            //     return;
            // }

            //Todos podem se mover
            this.position = newPosition;

        } else {

            if (tile instanceof Moveables) {

                this.attack(tile, map)//se for instancia de moveable, acontece a colisão
            }

       }

    }

    attack(target, map) {
        console.log('attack -> this moveable:', this);
        console.log("TARGET", target);
        target.takeDamage(this.attackPower, map)
        console.log("SE ME ATACAR, EU VOU ATACAR");
    }

    takeDamage(attackPower, map) {
        this.lifePoints = this.lifePoints - attackPower;
        console.log("fui atacado. minha vida agora é", this.lifePoints );

        if (this.lifePoints <= 0) {
            console.log("MORRI");
            map.disappearTile(this.position);
            let blood = new Blood(this.position);
            Interface.getInstance().addImage(blood);
            map.buildRoom.push(blood);
        }
    }


}

export default Moveables;
