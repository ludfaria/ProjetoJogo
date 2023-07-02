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


class Engine {
    gui = Interface.getInstance();
    hero;
    tiles = [];
    activeMap;


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

        let statusTiles = new StatusBar();
        statusTiles.addBackground();
        statusTiles.addFireball();

        console.log(statusTiles.background)
        this.gui.addStatusImages(statusTiles.background);
        this.gui.addStatusImages(statusTiles.fireball)


        let mapRoom = new Map();
        this.tiles = mapRoom.buildRoom;

        this.activeMap = mapRoom;


        this.gui.addImages(this.tiles);

        // this.hero = new Hero(mapRoom.heroPosition);
        this.hero = new Hero(new Position(4, 6));
        //this.gui.addImages(map.buildRoom)


        this.gui.addImage(this.hero);


        // let hero = new Hero(new Position(4, 3));
        // this.gui.addImage(hero);

        //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
        //this.gui.addImage(fireball);
        //fireball.start();

        this.gui.start();
    }




    keyPressed(key) {
        console.log("User pressed key", key);

        let listOfEnemies = this.tiles.filter(function (tile) {
            return tile instanceof Enemies;
        })
        for (let enemy of listOfEnemies) {

            // enemy.randomMove(this.activeMap);
            enemy.enemyBehaviour(this.hero, this.activeMap);
            //  enemy.colisao(this.hero);


        }

        switch (key) {
            case "ArrowRight":
                this.hero.moves(Direction.RIGHT, this.activeMap);
                break;

            case "ArrowLeft":
                this.hero.moves(Direction.LEFT, this.activeMap);
                break;

            case "ArrowUp":
                this.hero.moves(Direction.UP, this.activeMap);
                break;

            case "ArrowDown":
                // console.log(this.activeMap)
                this.hero.moves(Direction.DOWN, this.activeMap);
                break;
        }

        console.log('hero pos move', this.hero.position)



    }


}

export default Engine;