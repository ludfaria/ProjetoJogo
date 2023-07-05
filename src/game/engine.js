import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/moveables/hero.js";
import Interface from "./interface.js";
import Door from "../objects/solidObjects/door.js";
import Wall from "../objects/solidObjects/wall.js";
import OpenDoor from "../objects/solidObjects/openDoor.js";
import room0 from "../../rooms/room0.js";
import Skeleton from "../objects/moveables/enemies/skeleton.js";
import Direction from "../util/direction.js";
import Vector2d from "../util/vector2d.js";
import solidObject from "../objects/solidObjects/solidObject.js";
import wall from "../objects/solidObjects/wall.js";
import Map from "./maps.js";
import hero from "../objects/moveables/hero.js";
import Enemies from "../objects/moveables/enemies/enemies.js";
import skeleton from "../objects/moveables/enemies/skeleton.js";
import statusBar from "../objects/statusBar.js";
import StatusBar from "../objects/statusBar.js";
import Fireball from "../objects/fireball.js";
import fireball from "../objects/fireball.js";
import position from "../util/position.js";
import Hammer from "../objects/notSolidObjects/hammer.js";
import Key from "../objects/notSolidObjects/key.js";
import hammer from "../objects/notSolidObjects/hammer.js";


class Engine {
    gui = Interface.getInstance();
    hero = Hero.getInstance();
    tiles = [];
    activeMap = Map.getInstance();
    lastDirections = Direction.UP;


    static #instance;

    static getInstance() {
        if (Engine.#instance === undefined) {
            Engine.#instance = new Engine();
        }
        return Engine.#instance;
    }

//essa classe não tem construtor. precisa colocar o hero como atributo?
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


        console.log(statusTiles.background)
        this.gui.addStatusImages(statusTiles.background);
        this.gui.addStatusImages(statusTiles.fireball);
        this.gui.addStatusImages(statusTiles.lifeBar);


        // let mapRoom = new Map();
        this.tiles = this.activeMap.buildRoom;

        // this.activeMap = mapRoom;


        this.gui.addImages(this.tiles);

        //TODO: Arrumar esse new hero

        // this.hero = new Hero(mapRoom.heroPosition);
        // this.hero = new Hero(new Position(4, 6));
        // this.activeMap.addHero(this.hero);


        this.gui.addImage(this.hero);


        // let hero = new Hero(new Position(4, 3));
        // this.gui.addImage(hero);

        //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
        //this.gui.addImage(fireball);
        //fireball.start();

        this.gui.start();
    }

    // updateMap(newTiles, newHeroPosition) {
    //     console.log(`this.tiles.length`,this.tiles.length)
    //     console.log(`this.tiles`,this.tiles)
    //     while (this.tiles.length > 0) {
    //         this.gui.removeImage(this.tiles[this.tiles.length - 1]);
    //         this.tiles.pop();
    //     }
    //     console.log(`this.tiles.length`,this.tiles.length)
    //     this.tiles = []
    //     this.gui.addImages(newTiles);
    //     // this.tiles = newTiles;
    //     this.gui.update();
    //
    //     console.log('hero position - before', this.hero.position);
    //     this.hero.changeToNewPosition(newHeroPosition);
    //     console.log('hero position - after', this.hero.position);
    //     this.gui.update();
    // }


    keyPressed(key) {
        console.log("User pressed key", key);

        let listOfEnemies = this.tiles.filter(function (tile) {
            return tile instanceof Enemies;
        })
        // for (let enemy of listOfEnemies) {
        //
        //     // enemy.randomMove(this.activeMap);
        //     enemy.enemyBehaviour(this.hero, this.activeMap);
        //     //  enemy.colisao(this.hero);
        //
        //
        // }

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

        // this.gui.addImage(fireball);
    }

    createNewItemOnFloor(deletedItemType) {
        if (deletedItemType === 'hammer') {
            let hammer = new Hammer(this.hero.position);
            this.gui.addImage(hammer);
            this.activeMap.buildRoom.push(hammer)
        } else if (deletedItemType === 'key'){
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
