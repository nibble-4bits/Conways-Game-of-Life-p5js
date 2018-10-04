class Cell {
    constructor(x, y, size, isAlive) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isAlive = isAlive;
    }

    update() {

    }
    
    show() {
        if (this.isAlive) {
            fill(0);
        }
        else {
            fill(255);
        }
        stroke(0);
        rect(this.y, this.x, this.size, this.size);
    }
}