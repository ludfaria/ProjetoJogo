import ImageTile from "../game/imageTile.js";
import Firetile from "../game/firetile.js";
import Position from "../util/position.js";
import Direction from "../util/direction.js";

class Fireball extends Firetile {

    activeMap;
    // isTileFree;

    constructor(position, direction, activeMap) {
        super(position, direction);
        this.activeMap = activeMap;
        // this.isTileFree = isTileFree;
    }

    validateImpact(){
        // let nextPosition = this.position.plus(Direction.UP.asVector())
        let test = !this.activeMap.isTileFree(this.position);
        console.log('validate isTileFree', test);
        return test;
    }

    // A função
    // validateImpact() é chamada automaticamente pelo motor de jogo e deve validar a
    // existência de um impacto. Caso devolva true, o tile é removido do jogo. Esta função deve
    // ser implementada adequadamente na subclasse

    get image() {
        return "Fire.gif";
    }

}

export default Fireball;