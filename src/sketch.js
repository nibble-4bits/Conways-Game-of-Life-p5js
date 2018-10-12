let scale = 10;
let started = false;
let previousGen;
let nextGen;
let rowLength;

function setup() {
    createCanvas(600, 600).mousePressed(addCell);
    createButton("Start sketch!").mousePressed(start);

    rowLength = floor(width / scale);
    previousGen = create2DArray(rowLength);
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            previousGen[i][j] = false;//random(1) > 0.95 ? true : false;
            if (previousGen[i][j]) fill(0);
            else fill(255);
            stroke(200);
            rect(i * scale, j * scale, scale, scale);
        }
    }
    //frameRate(10);
}

function draw() {
    if (started) {
        nextGen = create2DArray(rowLength);

        for (let i = 0; i < nextGen.length; i++) {
            for (let j = 0; j < nextGen[i].length; j++) {
                var neighbors = checkNeighbors(previousGen, i, j);
                if (previousGen[i][j]) {
                    if (neighbors < 2 || neighbors > 3) {
                        nextGen[i][j] = false;
                    }
                    else {
                        nextGen[i][j] = true;
                    }
                }
                else {
                    if (neighbors == 3) {
                        nextGen[i][j] = true;
                    }
                }
            }
        }

        for (let i = 0; i < nextGen.length; i++) {
            for (let j = 0; j < nextGen[i].length; j++) {
                if (nextGen[i][j]) fill(0);
                else fill(255);
                //stroke(200);
                noStroke();
                rect(i * scale, j * scale, scale, scale);
            }
        }

        previousGen = nextGen;
    }
}

function checkNeighbors(array, x, y) {
    let count = 0;
    let row;
    let col;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            row = x + i;
            col = y + j;
            if (!(i == 0 && j == 0) && (row >= 0 && row < rowLength) && (col >= 0 && col < rowLength)) {
                if (array[x + i][y + j]) {
                    count++;
                }
            }
        }
    }

    return count;
}

function addCell() {
    let xCoord = floor(mouseX / scale);
    let yCoord = floor(mouseY / scale);
    //console.log(`X = ${xCoord}, Y = ${yCoord}`);
    previousGen[xCoord][yCoord] = true;

    fill(0);
    rect(xCoord * scale, yCoord * scale, scale, scale);
}

function create2DArray(length) {
    let array = new Array(length);
    for (let i = 0; i < length; i++) {
        array[i] = new Array(length);
    }

    return array;
}

function start() {
    started = true;
}