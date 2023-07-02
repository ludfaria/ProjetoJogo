import ImageTile from "../game/imageTile.js";
import Firetile from "../game/firetile.js";

class Fireball extends Firetile {

    constructor(position, direction) {
        super(position, direction);
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