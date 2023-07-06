import Direction from "../../../util/direction.js";
import Moveables from "../moveables.js";



class Enemies extends Moveables {
    chase = false;

    constructor(position) {
        super(position);
    }


    get image() {
        return "";
    }


    enemyBehaviour(hero, activeMap) {

        let a = hero.position.x - this.position.x;
        let b = hero.position.y - this.position.y;

        // Pitagoras (Formula de bhaskara)
        // let distP = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        // Manhathan distance
        let distance = Math.abs(a) + Math.abs(b);


        if (distance < 4 && distance > 1) {
            // this.chase = true;
            this.chaseHero(hero, activeMap);

        } else if (distance === 1) {
            this.attack(hero, activeMap);


        } else {
            this.randomMove(activeMap);
        }

    }


    chaseHero(hero, activeMap) {

        if ((hero.position.x - this.position.x) > (hero.position.y - this.position.y)) {

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
                this.moves(Direction.DOWN, activeMap);
                break;
        }

    }


}

export default Enemies;
