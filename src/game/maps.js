import ImageTile from "./imageTile.js";
import SolidObject from "../objects/solidObjects/solidObject.js";
import room0 from "../../rooms/room0.js";
import Position from "../util/position.js";
import Wall from "../objects/solidObjects/wall.js";
import Skeleton from "../objects/moveables/enemies/skeleton.js";
import Hero from "../objects/moveables/hero.js";
import room1 from "../../rooms/room1.js";
import room2 from "../../rooms/room2.js";
import Enemies from "../objects/moveables/enemies/enemies.js";
import Bat from "../objects/moveables/enemies/bat.js";
import BadGuy from "../objects/moveables/enemies/badGuy.js";
import Meat from "../objects/notSolidObjects/meat.js";
import Hammer from "../objects/notSolidObjects/hammer.js";
import Key from "../objects/notSolidObjects/key.js";
import Equipments from "../objects/notSolidObjects/equipments.js";
import Interface from "./interface.js";
import StatusBar from "../objects/statusBar.js";
import Door from "../objects/solidObjects/door.js";
import OpenDoor from "../objects/solidObjects/openDoor.js";


// selectRoom(stringRoom){
//
// }

const initialRoom = "0";


class Map {
    buildRoom = [];
    heroPosition;
    statusBar = StatusBar.getInstance();

    constructor() {
        let activeRoom = this.selectRoom("1");
        this.initiateRoom(activeRoom);
    }

    selectRoom(room) {
        switch (room) {
            case "0":
                return room0;
                break;
            case "1":
                return room1;
                break;
            case "2":
                return room2;
                break;
        }
    }

    extractDoorRules(roomRule) {
        let doorRule = {
            doorNumber: roomRule.charAt(2),
            doorType: roomRule.charAt(4),
            nextRoom: roomRule.charAt(10),
            nextEntrance: roomRule.charAt(16),
            keyToOpen: roomRule.charAt(21) || undefined,
        }

        // console.log('doorRule', doorRule);
        return doorRule;
    }

    initiateRoom(room) {

        //pegar apenas as linhas com informaçoes das portas
        let roomRules = room.split('\n').filter((line) => {
            return line.startsWith("#") && line.length > 1
        });

        //extrair as informacoes de cada porta
        roomRules.map((rule) => {
            console.log('map - rule', rule);
            //TODO: precisa salvar essas rules nas portas
            let doorRule = this.extractDoorRules(rule);
            console.log('map - doorRule', doorRule);
        })


        let roomLines = room.split('\n').filter((line) => {
            return !line.startsWith("#")
        });

        // para selecionar as linhas que não começam com #.
        //line é roomLines[i]. e tbm mesma coisa de linha. mas só existe nessa função do filter

        for (let y = 0; y < roomLines.length; y++) {
            let linha = roomLines[y];
            //linha é uma string apenaxxxx

            let caractere = linha.split("");
            //caractere é um array de arrays, aparentemente
            console.log(linha)
            console.log(caractere);
            for (let x = 0; x < caractere.length; x++) {
                let char = caractere[x];
                let position = new Position(x, y);

                switch (char) {
                    case "W":
                        this.buildRoom.push(new Wall(position));
                        break;
                    case "S":
                        this.buildRoom.push(new Skeleton(position));
                        break;
                    case "H":
                        this.heroPosition = position;
                        // this.buildRoom.push(new Hero(position));
                        break;
                    case "B":
                        this.buildRoom.push(new Bat(position));
                        break;
                    case "G":
                        this.buildRoom.push(new BadGuy(position));
                        break;
                    case "m":
                        this.buildRoom.push(new Meat(position));
                        break;
                    case "h":
                        this.buildRoom.push(new Hammer(position));
                        break;
                    case "k":
                        this.buildRoom.push(new Key(position));
                        break;
                    case "0":
                        this.buildRoom.push(new Door(position));
                        break;
                    case "1":
                        this.buildRoom.push(new Door(position));
                        break;
                    case "2":
                        this.buildRoom.push(new OpenDoor(position));
                        break;





                }

            }
        }
    }

    addHero(heroTile) {
        let tile = this.buildRoom.find(function (tile) {
            return tile.position.equals(heroTile.position)
        })
        let indexToChange = this.buildRoom.indexOf(tile);
        this.buildRoom[indexToChange] = heroTile;
        console.log('hero tile:', this.buildRoom[indexToChange])

    }


    get buildRoom() {
        return this.buildRoom;
    }

    isTileFree(newPosition) {

        //OBS: Filter retorna um array, find retorna diretamente o objeto!
        // let tile = this.buildRoom.filter(function (tile) {
        //     return tile.position.equals(newPosition);
        //
        // })

        let tile = this.buildRoom.find(function (tile) {
            return tile.position.equals(newPosition)
        })

        if (tile instanceof SolidObject) {
            return false;
        } else {
            return true;
        }

    }


    disappearTile(newPosition) {
        let tile = this.buildRoom.find(function (tile) {
            return tile.position.equals(newPosition)
        })
        let indexToRemove = this.buildRoom.indexOf(tile);
        console.log('disappearTile tile:', this.buildRoom[indexToRemove])

        if (tile instanceof Meat) {
            this.buildRoom.splice(indexToRemove, 1);
            Interface.getInstance().removeImage(tile)
            Interface.getInstance().showMessage("Recuperou vida")

        }

        if (tile instanceof Equipments) {

            this.statusBar.addItems(tile);
            this.buildRoom.splice(indexToRemove, 1);
            Interface.getInstance().addStatusImages(this.statusBar.inventory);

            Interface.getInstance().removeImage(tile)
            Interface.getInstance().showMessage("Novo item")

        }

        if (tile instanceof Enemies) {
            this.buildRoom.splice(indexToRemove, 1);
            Interface.getInstance().removeImage(tile)
            Interface.getInstance().showMessage("Se eu pudesse eu matava mil")

        }

        if (tile instanceof Hero) {
            this.buildRoom.splice(indexToRemove, 1);
            Interface.getInstance().removeImage(tile)
            Interface.getInstance().showMessage("Morri!!")

        }
        console.log("a carne sumiu?", this.buildRoom);
        //              this.buildRoom.splice(Meat, 1);
        // console.log(array);
    }



}

export default Map;