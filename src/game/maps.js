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
import StatusBar from "../objects/statusItems/statusBar.js";
import OpenDoor from "../objects/openDoor.js";
import Thief from "../objects/moveables/enemies/thief.js";
import Engine from "./engine.js";
import CloseDoor from "../objects/closeDoor.js";

const initialRoom = "2";


class Map {
    buildRoom = [];
    heroPosition;
    statusBar = StatusBar.getInstance();

    static #instance;

    static getInstance() {
        if (Map.#instance === undefined) {
            Map.#instance = new Map();
        }
        return Map.#instance;
    }

    constructor(room) {
        let activeRoom = this.selectRoom(room || initialRoom);
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
            default:
                return room0;
                break;
        }
    }

    changeRoom(door) {

        let currentRoom = Engine.getInstance().currentRoomNumber;
        let nextDoorNumber;
        let nextRoom;

        if (currentRoom === '0') {
            if (door.doorNumber === '0') {
                if (StatusBar.getInstance().keysToEscape()) {

                    Interface.getInstance().showMessage('Parabens! Está livre!');
                } else {
                    Interface.getInstance().showMessage('Porta trancada com 2 cadeados!');
                }
                return;
            }
            if (door.doorNumber === '2') {
                nextDoorNumber = '2';
                nextRoom = '1';

            }
        } else if (currentRoom === '1') {
            if (door.doorNumber === '0') {
                nextDoorNumber = '1';
                nextRoom = '2';
            }
            if (door.doorNumber === '1') {
                nextDoorNumber = '0';
                nextRoom = '2';

            }
            if (door.doorNumber === '2') {
                nextDoorNumber = '2';
                nextRoom = '0';

            }
        } else if (currentRoom === '2') {
            if (door.doorNumber === '0') {
                nextDoorNumber = '1';
                nextRoom = '1';
            }
            if (door.doorNumber === '1') {
                nextDoorNumber = '0';
                nextRoom = '1';
            }

        }

        Engine.getInstance().updateMap(nextRoom, nextDoorNumber);
    }


    initiateRoom(room) {

        let roomLines = room.split('\n').filter((line) => {
            return !line.startsWith("#")
        });


        for (let y = 0; y < roomLines.length; y++) {
            let linha = roomLines[y];
            let caractere = linha.split("");

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
                    case "T":
                        this.buildRoom.push(new Thief(position));
                        break;
                    case "0":
                        this.buildRoom.push(new CloseDoor(position, '0'));
                        break;
                    case "1":
                        this.buildRoom.push(new CloseDoor(position, '1'));
                        break;
                    case "2":
                        this.buildRoom.push(new OpenDoor(position, '2'));
                        break;

                }

            }
        }
    }


    get buildRoom() {
        return this.buildRoom;
    }

    isTileFree(newPosition) {

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


        if (tile instanceof Meat) {
            this.buildRoom.splice(indexToRemove, 1);
            Interface.getInstance().removeImage(tile)
            Hero.getInstance().eatMeat();
        }

        if (tile instanceof Equipments) {

            if (StatusBar.getInstance().inventory.length < 3) {
                this.statusBar.addItems(tile);
                this.buildRoom.splice(indexToRemove, 1);

                Interface.getInstance().removeImage(tile)
                Interface.getInstance().showMessage("Novo item")

            } else {
                Interface.getInstance().showMessage('Inventário está cheio!')
            }

        }

        if (tile instanceof Enemies) {
            this.buildRoom.splice(indexToRemove, 1);
            Interface.getInstance().removeImage(tile)
            Interface.getInstance().showMessage("Inimigo derrotado!")

        }

        if (tile instanceof Hero) {
            this.buildRoom.splice(indexToRemove, 1);
            Interface.getInstance().removeImage(tile)
            Interface.getInstance().showMessage("Morri!!")

        }

    }


}

export default Map;