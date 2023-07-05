import Engine from "../../../game/engine.js";
import SolidObject from "../../solidObjects/solidObject.js";
import Direction from "../../../util/direction.js";
import Moveables from "../moveables.js";
import Position from "../../../util/position.js";
import Hero from "../hero.js";


class Enemies extends Moveables {
    chase = false;

    constructor(position) {
        super(position);
    }


    get image() {
        return "";
    }

    enemyBehaviour(hero, activeMap) {

        // console.log('hero on enemy', hero.position)


        let a = hero.position.x - this.position.x;
        let b = hero.position.y - this.position.y;
        // Pitagoras
        // let distP = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        // Manhathan distance
        let distance = Math.abs(a) + Math.abs(b);

        // if (distance < 3) {
        if (distance < 4 && distance > 1) {
            // this.chase = true;
            console.log("PERSEGUIR O HERÓI")
            this.chaseHero(hero, activeMap);
            // this.colisao(hero);
        }

        else if (distance === 1){    // se não tiver o else esse if vira condição do outro else. e o inimigo da dois passos
            //e anda na diagonal. preciso melhorar o movimento de chase pra não virar trenzinho da alegria
            console.log('enemies - hero', hero);
            console.log('enemies - Hero.getInstance()', Hero.getInstance());


            this.attack(hero, activeMap); // coloquei o ataque no lugar certo???
            // this.attack(hero, activeMap); // coloquei o ataque no lugar certo???

        } else {
            console.log("inimigo a andar de forma aleatória")
            this.randomMove(activeMap); // se o singleton funcionar, não precisa como parametro
        }

    }

    chaseHero(hero, activeMap) {
        // let hero.position.x = hero.position.x;
        // let actualHeroYPosition = hero.position.y;
        console.log('CHaseHero -> activeMap:', activeMap);


        // if ((hero.position.x = this.position.x) && (actualHeroYPosition = this.position.y)){
        //     this.attack(hero, activeMap);
        // }

        if ( (hero.position.x - this.position.x) > (hero.position.y - this.position.y)) {

            if (hero.position.x > this.position.x) {
                this.moves(Direction.RIGHT, activeMap);
                return;
            }
            if (hero.position.x < this.position.x) {
                this.moves(Direction.LEFT, activeMap);
                return;
            }
        } else {

            if (hero.position.y < this.position.y) {
                this.moves(Direction.UP, activeMap);
                return;
            }
            if (hero.position.y > this.position.y) {
                this.moves(Direction.DOWN, activeMap);
                return;
            }
        }

    }

//TODO: COLOCAR ANTES SE A DIFERENÇA DOS Y FOREM MENOR QUE A DO X, DAR PREFERENCIA A SUBIR E DESCER
    //TODO: E NÃO DIREITA E ESQUERDA

    randomMove(activeMap) {

        // if (this.chase === false) {
        let random = Math.floor(Math.random() * 4) + 1;
        switch (random) {
            case 1:
                this.moves(Direction.RIGHT, activeMap);
                break;

            case 2:
                this.moves(Direction.LEFT, activeMap);
                break;

            case 3:
                this.moves(Direction.UP, activeMap);
                break;

            case 4:
                // console.log(this.activeMap)
                this.moves(Direction.DOWN, activeMap);
                break;
        }
        // }

        // console.log("RANDOM ESTA FUNCIONANDO?", random);
    }


    colisao(hero) {

        // if (this.engine.hero.position.plus(Direction.RIGHT.asVector()).equals(this.position) ||
        //     this.engine.hero.position.plus(Direction.LEFT.asVector()).equals(this.position) ||
        //     this.engine.hero.position.plus(Direction.UP.asVector()).equals(this.position) ||
        //     this.engine.hero.position.plus(Direction.DOWN.asVector()).equals(this.position)
        // ){
        //     console.log("HEROI PERDE VIDA")
        // }
        // TODO: PQ O SINGLETON NÃO FUNCIONOU?

        // console.log((this.position.x - hero.position.x) + (this.position.y - hero.position.y));
        console.log("posicao do inimigo", this.position)
        //heroPosition ou hero aqui da undefined
        console.log(hero);

        if (this.position.plus(Direction.RIGHT.asVector()).equals(hero.position) ||
            this.position.plus(Direction.LEFT.asVector()).equals(hero.position) ||
            this.position.plus(Direction.UP.asVector()).equals(hero.position) ||
            this.position.plus(Direction.DOWN.asVector()).equals(hero.position)
        ) {

            console.log("HEROI PERDE VIDA")
        }


    }


}

export default Enemies;
