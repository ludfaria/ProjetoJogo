import ImageTile from "../game/imageTile.js";
import Firetile from "../game/firetile.js";
import Position from "../util/position.js";
import Direction from "../util/direction.js";
import Moveables from "./moveables/moveables.js";

class Fireball extends Firetile {

    activeMap;
    attackPower = 3;

    constructor(position, direction, activeMap) {
        super(position, direction);
        this.activeMap = activeMap;
    }

    validateImpact(){
        // let nextPosition = this.position.plus(Direction.UP.asVector())
        let impact = !this.activeMap.isTileFree(this.position);
        console.log('validate isTileFree', impact);

        if(impact) {
            let target = this.activeMap.buildRoom.find((tile) => {
                return tile.position.equals(this.position);
            })

            if (target instanceof Moveables) {
                console.log('fireball target', target);
                target.takeDamage(this.attackPower, this.activeMap);
            }
        }
        return impact;
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