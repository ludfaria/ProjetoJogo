import Position from "../../util/position.js";
import BackgroundStatus from "./backgroundStatus.js";
import Fireball from "../fireball.js";
import Hammer from "../notSolidObjects/hammer.js";
import Key from "../notSolidObjects/key.js";
import LifeGreen from "./lifeGreen.js";
import Hero from "../moveables/hero.js";
import halfLife from "./halfLife.js";
import HalfLife from "./halfLife.js";
import LifeRed from "./lifeRed.js";


import Interface from "../../game/interface.js";

class StatusBar {
    background = [];
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

    keysToEscape() {
        let keys = 0;
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] instanceof Key) {
                keys++;
            }
        }

        if (keys >= 2) {
            return true;
        } else {
            return false;
        }
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
        this.lifeBar = [];
        for (let x = 3; x < 7; x++) {
            let position = new Position(x, 0);

            this.lifeBar.push(new LifeGreen(position));
        }
    }

    loseLifeBar(numOfLostLife) {

        //Quantidade de vezes que precisa trocar o tile
        while (numOfLostLife > 0) {

            //Verificar qual é ultimo quadrado que tenha verde, a começar pelo ultimo

            let lastLifeItem = this.lifeBar.length - 1;

            //se o quadrado for vermelho, passar para o proximo (anterior)
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
                } else if (this.lifeBar[lastLifeItem] instanceof HalfLife) {
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
        this.hero.addPowerEquipment(Hammer.power)
    }


    addItems(objetoColetado) {

        if (this.inventory.length < 3) {
            let xPosition = this.inventory.length + 7

            let position = new Position(xPosition, 0);

            if (objetoColetado instanceof Hammer) {
                this.addHammer();
                this.inventory.push(new Hammer(position));
            }

            if (objetoColetado instanceof Key) {
                this.inventory.push(new Key(position));
            }

            Interface.getInstance().addStatusImage(this.inventory[this.inventory.length - 1]);
            //posso fazer uma variavel para cada item e adicionar ele.


        } else {
            Interface.getInstance().showMessage('Inventário Cheio!');
        }

    }


    removeFireball() {
        let used = this.fireball.pop();
        Interface.getInstance().removeStatusImage(used);
    }

    dropItems(indexToDrop) {
        let deletedItem = '';
        let equip = this.inventory[indexToDrop];

        if (equip instanceof Hammer) {

            Interface.getInstance().removeStatusImage(equip);
            this.hero.losePowerEquipment(Hammer.power);
            deletedItem = 'hammer';

        } else if (equip instanceof Key) {

            Interface.getInstance().removeStatusImage(equip);
            deletedItem = 'key'

        }

        //Remover item do array de inventory
        this.inventory.splice(indexToDrop, 1);

        //remover todas as imagens
        this.inventory.map(function (equip) {
            Interface.getInstance().removeStatusImage(equip);
        })

        // Ajustar a posicao para nao sobrepor ao recolher o item novamente

        if (this.inventory[0] !== undefined && this.inventory[0].position.x !== 7) {
            this.inventory[0].position = new Position(7, 0);
        }
        if (this.inventory[1] !== undefined && this.inventory[1].position.x !== 8) {
            this.inventory[1].position = new Position(8, 0);
        }
        if (this.inventory[2] !== undefined && this.inventory[2].position.x !== 9) {
            this.inventory[2].position = new Position(9, 0);
        }

        //Adicionar todas as imanges na posicao certa
        Interface.getInstance().addStatusImages(this.inventory);


        return deletedItem;

    }


}

export default StatusBar;