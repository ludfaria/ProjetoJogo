import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/moveables/hero.js";
import Interface from "./interface.js";
import Door from "../objects/door.js";
import Direction from "../util/direction.js";
import Map from "./maps.js";
import Enemies from "../objects/moveables/enemies/enemies.js";
import statusBar from "../objects/statusItems/statusBar.js";
import StatusBar from "../objects/statusItems/statusBar.js";
import Fireball from "../objects/fireball.js";
import Hammer from "../objects/notSolidObjects/hammer.js";
import Key from "../objects/notSolidObjects/key.js";


class Engine {
    gui = Interface.getInstance();
    hero = Hero.getInstance();
    lastDirections = Direction.UP;
    tiles = [];
    room0 = new Map('0');
    room1 = new Map('1');
    room2 = new Map('2');
    activeMap;
    currentRoomNumber;


    static #instance;

    static getInstance() {
        if (Engine.#instance === undefined) {
            Engine.#instance = new Engine();
        }
        return Engine.#instance;
    }


    init() {
        console.log("Engine init");

        let floorTiles = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let position = new Position(x, y);

                floorTiles.push(new Floor(position));
            }
        }
        this.gui.addImages(floorTiles);

        let statusTiles = StatusBar.getInstance();
        // não pode ficar um new, pq fiz um singleton em maps. e só existe uma statusbar. pra ter certeza
        //que é a mesma statusbar
        statusTiles.addBackground();
        statusTiles.addFireball();
        statusTiles.addLifeBar();


        this.gui.addStatusImages(statusTiles.background);
        this.gui.addStatusImages(statusTiles.fireball);
        this.gui.addStatusImages(statusTiles.lifeBar);


        this.activeMap = this.room0;
        this.tiles = this.activeMap.buildRoom;
        this.currentRoomNumber = '0';


        this.gui.addImages(this.tiles);
        this.gui.addImage(this.hero);

        this.gui.start();
    }

    updateMap(newRoom, nextDoorNumber) {

        let temptiles = this.activeMap.buildRoom.splice(0);

        temptiles.map((tile) => {
            this.gui.removeImage(tile);
            this.activeMap.buildRoom.push(tile)
        })


        switch (newRoom) {
            case '0':
                this.activeMap = this.room0;
                this.currentRoomNumber = '0';
                break
            case '1':
                this.activeMap = this.room1;
                this.currentRoomNumber = '1';
                break
            case '2':
                this.activeMap = this.room2;
                this.currentRoomNumber = '2';
                break
        }


        this.gui.addImages(this.activeMap.buildRoom);
        this.gui.update();



        let newHeroPosition = this.activeMap.buildRoom.find(function (tile) {
            if (tile instanceof Door) {

                return tile.doorNumber === nextDoorNumber;
            }
        })



        this.gui.removeImage(this.hero);
        this.hero.changeToNewPosition(newHeroPosition.position || new Position(3, 3));
        this.gui.update();
    }



    keyPressed(key) {
        console.log("User pressed key", key);

        let listOfEnemies = this.activeMap.buildRoom.filter(function (tile) {
            return tile instanceof Enemies;
        })


        switch (key) {
            case "ArrowRight":
                this.hero.moves(Direction.RIGHT, this.activeMap);
                this.enemyTurn(listOfEnemies);
                this.lastDirections = Direction.RIGHT;
                break;

            case "ArrowLeft":
                this.hero.moves(Direction.LEFT, this.activeMap);
                this.enemyTurn(listOfEnemies);
                this.lastDirections = Direction.LEFT;
                break;

            case "ArrowUp":
                this.hero.moves(Direction.UP, this.activeMap);
                this.enemyTurn(listOfEnemies);
                this.lastDirections = Direction.UP;
                break;

            case "ArrowDown":
                // console.log(this.activeMap)
                this.hero.moves(Direction.DOWN, this.activeMap);
                this.enemyTurn(listOfEnemies)
                this.lastDirections = Direction.DOWN;
                break;

            case "1":
                let deletedItemTypeCase1 = statusBar.getInstance().dropItems(0);
                this.createNewItemOnFloor(deletedItemTypeCase1)
                break;

            case "2":
                let deletedItemTypeCase2 = statusBar.getInstance().dropItems(1);
                this.createNewItemOnFloor(deletedItemTypeCase2)
                break;

            case "3":
                let deletedItemTypeCase3 = statusBar.getInstance().dropItems(2);
                this.createNewItemOnFloor(deletedItemTypeCase3);
                break;

            case 'Space':
                if (StatusBar.getInstance().fireball.length > 0) {
                    this.gui.showMessage('FireBALL!')
                    let fireball = new Fireball(this.hero.position, this.lastDirections, this.activeMap);
                    this.gui.addImage(fireball);
                    StatusBar.getInstance().removeFireball();
                    fireball.start();
                } else {
                    this.gui.showMessage('Estou sem Fogo!')
                }
                break;

        }


    }

    createNewItemOnFloor(deletedItemType) {
        if (deletedItemType === 'hammer') {
            let hammer = new Hammer(this.hero.position);
            this.gui.addImage(hammer);
            this.activeMap.buildRoom.push(hammer)

        } else if (deletedItemType === 'key') {
            let key = new Key(this.hero.position);
            this.gui.addImage(key, this.hero.position);
            this.activeMap.buildRoom.push(key)
        }
    }

    enemyTurn(listOfEnemies) {
        for (let enemy of listOfEnemies) {
            enemy.enemyBehaviour(this.hero, this.activeMap);
        }
    }


}

export default Engine;
