import ImageTile from "../game/imageTile.js";
import Position from "../util/position.js";
import BackgroundStatus from "./backgroundStatus.js";
import Fireball from "./fireball.js";
import Hammer from "./notSolidObjects/hammer.js";
import Key from "./notSolidObjects/key.js";
import LifeGreen from "./lifeGreen.js";
import Hero from "./moveables/hero.js";
import hero from "./moveables/hero.js";
import halfLife from "./halfLife.js";
import HalfLife from "./halfLife.js";
import LifeRed from "./lifeRed.js";
import Engine from "../game/engine.js";
import engine from "../game/engine.js";
import Interface from "../game/interface.js";

class StatusBar {
    background = []; //fzr getter setter
    fireball = [];
    inventory = [];
    lifeBar = [];
    hero = Hero.getInstance();


    static #instance;

    static getInstance() {
        if (StatusBar.#instance === undefined) {
            StatusBar.#instance = new StatusBar();
        }
        return StatusBar.#instance;
    }

    addBackground() {
        for (let x = 0; x < 10; x++) {
            let position = new Position(x, 0);

            this.background.push(new BackgroundStatus(position));
        }

    }

    addFireball() {
        for (let x = 0; x < 3; x++) {
            let position = new Position(x, 0);

            this.fireball.push(new Fireball(position));
        }
    }

    addLifeBar() {
        for (let x = 3; x < 7; x++) {
            let position = new Position(x, 0);

            this.lifeBar.push(new LifeGreen(position));
        }
    }

    loseLifeBar(numOfLostLife) {

        //Quantidade de vezes que precisa trocar o tile
        while (numOfLostLife > 0) {

            //Verificar qual é ultimo quadrado que tenha verde
            //começando pelo ultimo
            let lastLifeItem = this.lifeBar.length - 1;
            //se o quadrado for vermelho, passar para o proximo
            while (this.lifeBar[lastLifeItem] instanceof LifeRed) {
                lastLifeItem--;
            }

            //pode quebrar se sofrer ataque dois, com 1 de vida. fazer try / catch
            try {
                //pegar a posicao x para alterar o tipo do quadrado
                let x = this.lifeBar[lastLifeItem].position.x;

                //reduzir o quadrado por nivel verde -> meio -> vermelho
                if (this.lifeBar[lastLifeItem] instanceof LifeGreen) {
                    this.lifeBar[lastLifeItem] = new halfLife(new Position(x, 0));
                }
                else if (this.lifeBar[lastLifeItem] instanceof HalfLife) {
                    this.lifeBar[lastLifeItem] = new LifeRed(new Position(x, 0));
                }
            } catch (error) {
                console.log('Heroi já morreu!')
            }

            //fazer tudo novamente enquanto tiver ataque do inimigo
            numOfLostLife--;
        }

        //Atualizar a image no status
        Interface.getInstance().addStatusImages(this.lifeBar);
    }

    addHammer() {
        //Hammer + 1 de poder
        this.hero.addPowerEquipment(1)
    }

    addKey() {
        for (let x = 9; x < 10; x++) {
            this.inventory.push(new Key(new Position(x, 0)));

        }
    }

    addItems(objetoColetado) {

        //TODO: usar um try and catch para limitar o maximo de 3 itens
        let xPosition = this.inventory.length + 7

        let position = new Position(xPosition, 0);

        if (objetoColetado instanceof Hammer) {
            this.addHammer();
            this.inventory.push(new Hammer(position));
        }

        if (objetoColetado instanceof Key) {
            this.inventory.push(new Key(position));
        }

        console.log("INVENTORY", this.inventory);

    }

    dropItems(indexToDrop) {

        console.log("INVENTORY", this.inventory);

        let coisinha = this.inventory[indexToDrop];
        console.log('coisinha antes de remover', coisinha);

        console.log("COISINHA É:", coisinha)

        if (coisinha instanceof Hammer) {

            Interface.getInstance().removeStatusImage(coisinha);
            // let pos = coisinha.position
            // this.inventory[coisinha] = new BackgroundStatus(pos)
            // Interface.getInstance().addStatusImage(this.inventory[coisinha]);
            //jogar no chao
        }
        else if (coisinha instanceof Key) {

            Interface.getInstance().removeStatusImage(coisinha);

            // let pos = coisinha.position
            // this.inventory[coisinha] = new BackgroundStatus(pos)
            // Interface.getInstance().addStatusImage(this.inventory[coisinha]);
            // Interface.getInstance().removeStatusImage(coisinha);
        }

        this.inventory.splice(indexToDrop, 1);
        if ( this.inventory.length > 0) {
            Interface.getInstance().addStatusImages(this.inventory);
        }

        console.log("FUNCIONOU O INDEX??", this.inventory);


    }


//     let tile = this.inventory.find(function (tile) {
//         return tile.position.equals(objetoColetado.position)
//     })
//
//     let indexToDrop = this.inventory.indexOf(tile);
//     this.inventory[indexToDrop] = objetoColetado;
//     console.log('hero tile:', this.inventory[indexToDrop])
//
//     let xPosition = this.inventory.length + 7
//
//     let position = new Position(xPosition, 0);
//
//     if (objetoColetado instanceof Hammer) {
//
//     this.inventory.splice(objetoColetado, 1);
// }
//
// if (objetoColetado instanceof Key) {
//     this.inventory.splice(objetoColetado, 1);
// }


}

export default StatusBar;