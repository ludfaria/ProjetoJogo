import SolidObject from "../solidObjects/solidObject.js";
import NotSolidObjects from "../notSolidObjects/notSolidObjects.js";
import Hero from "./hero.js";
import Blood from "../notSolidObjects/blood.js";
import Interface from "../../game/interface.js";
import Door from "../door.js";


class Moveables extends SolidObject {
    attackPower = 1;
    lifePoints = 2;

    constructor(position) {
        super(position);
    }


    changeToNewPosition(newHeroPosition) {
        Interface.getInstance().addImage(this);
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
            } else if (tile instanceof Door && this instanceof Hero) {
                map.changeRoom(tile);
                return;
            }

            //Todos podem se mover dentro do grid
            if (newPosition.x > 0 && newPosition.x < 10 && newPosition.y > 0 && newPosition.y < 10) {

                this.position = newPosition;
            }

        } else {

            if (tile instanceof Moveables) {
                //para evitar que os inimigos se ataquem. Inimigo tem o próprio método de ataque.

                if (this instanceof Hero) {

                    this.attack(tile, map);
                }
            }

        }

    }

    attack(target, map) {
        target.takeDamage(this.attackPower, map)

    }

    takeDamage(attackPower, map) {

        this.lifePoints = this.lifePoints - attackPower;
        console.log("fui atacado. minha vida agora é", this.lifePoints);

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
