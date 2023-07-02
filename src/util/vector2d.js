class Vector2d {
    #i;
    #j;

    constructor(i, j) {
        this.#i = i;
        this.#j = j;
    }

    plus(vector) {
        if(!vector)
            throw new Error("Obrigatório indicar vetor")
        return new Vector2d(this.#i + vector.i, this.#j + vector.j );
    }

    minus(vector) {
        if(!vector)
            throw new Error("Obrigatório indicar vetor")
        return new Vector2d(this.#i - vector.i, this.#j - vector.j);
    }

    get i() {
        return this.#i;
    }

    get j() {
        return this.#j;
    }

    equals(vector) {
        return this.#i === vector?.i && this.#j === vector?.j;
    }

    toString() {
        return "[" + this.#i + ", " + this.#j + "]";
    }
}

export default Vector2d;
