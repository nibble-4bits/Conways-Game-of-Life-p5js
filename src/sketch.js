let cells = [];
let scale = 10;
let cellsPerRow;

function setup() {
    createCanvas(600, 600);

    cellsPerRow = floor(width / scale);
    for (let i = 0; i < cellsPerRow; i++) {
        for (let j = 0; j < cellsPerRow; j++) {
            var cell = new Cell(i * scale, j * scale, scale, false);
            cells.push(cell);
        }
    }
}

function draw() {
    for (let cell of cells) {
        cell.update();
        cell.show();
    }
}