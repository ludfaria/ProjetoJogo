import Position from "./util/position.js";
import Vector2d from "./util/vector2d.js";

console.log("hello");

let pos1 = new Position(1,2);

let pos2 = pos1.plus(new Vector2d(1,1))

console.log(pos1.toString())
console.log(pos2.toString())
console.log(pos1 === pos2)