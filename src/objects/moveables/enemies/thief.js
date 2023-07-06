import Enemies from "./enemies.js";
import Direction from "../../../util/direction.js";
import Hammer from "../../notSolidObjects/hammer.js";
import NotSolidObjects from "../../notSolidObjects/notSolidObjects.js";
import Blood from "../../notSolidObjects/blood.js";
import Interface from "../../../game/interface.js";


class Thief extends Enemies {
    attackPower = 1;
    lifePoints = 5;
    thiefPocket = [];


    constructor(position) {
        super(position);

    }

    get image() {
        return "Thief.gif";
    }

    fillPocket(equip) {

        this.thiefPocket.push(equip);
    }

    dropPocket() {
        //a ideia era correr o array, conferir os itens para retornar ao mapa após ser derrotado.
        //simplifiquei pela falta de tempo :)

        if( this.thiefPocket.length > 0) {

            this.thiefPocket.pop();
            return new Hammer(this.position);
        }
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
                this.moves(Direction.DOWN, activeMap);
                this.moves(Direction.LEFT, activeMap);

        }


    }

    moves(direction, map) {

        let newPosition = this.position.plus(direction.asVector());


        let tile = map.buildRoom.find(function (tile) {
            return tile.position.equals(newPosition)
        })

        if (map.isTileFree(newPosition)) {

            //sobrepor o metodo para o thief pegar equip no chao

            if (tile instanceof NotSolidObjects) {

                let indexToRemove = map.buildRoom.indexOf(tile);
                map.buildRoom.splice(indexToRemove, 1);

                Interface.getInstance().removeImage(tile);
                Interface.getInstance().showMessage('Ladrão roubou um item')
                this.fillPocket()
            }


            if (newPosition.x > 0 && newPosition.x < 10 && newPosition.y > 0 && newPosition.y < 10) {

                this.position = newPosition;
            }

        }

    }



    takeDamage(attackPower, map) {
        this.lifePoints = this.lifePoints - attackPower;

        if (this.lifePoints <= 0) {
            let item = this.dropPocket();
            if (item) {
                map.buildRoom.push(item);
                Interface.getInstance().addImage(item);
            }


            map.disappearTile(this.position);
            let blood = new Blood(this.position);
            Interface.getInstance().addImage(blood);
            map.buildRoom.push(blood);
        }
    }


}

export default Thief;