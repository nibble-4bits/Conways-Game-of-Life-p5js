let scale = 10;
let started = false;
let previousGen;
let nextGen;
let rows;

function setup() {
    document.addEventListener("contextmenu", e => e.preventDefault());
    createCanvas(600, 600).mousePressed(addCell);
    createButton("Start simulation!").mousePressed(startSimulation);
    createButton("Stop simulation").mousePressed(stopSimulation);
    createButton("Randomize").mousePressed(randomizeCanvas);

    rows = floor(width / scale);
    previousGen = create2DArray(rows);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            previousGen[i][j] = false;//random(1) > 0.9 ? true : false;
            stroke(200);
            rect(i * scale, j * scale, scale, scale);
        }
    }
}

function draw() {
    if (started) {
        nextGen = calculateNextGeneration();

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

function calculateNextGeneration() {
    nextGen = create2DArray(rows);

    for (let i = 0; i < nextGen.length; i++) {
        for (let j = 0; j < nextGen[i].length; j++) {
            var neighbors = checkNeighbors(previousGen, i, j);

            // If cell is dead and has 3 neighbors, cell becomes alive
            if (!previousGen[i][j] && neighbors == 3)
                nextGen[i][j] = true;
            // If cell is alive and has less than 2 or more than 3 neighbors, cell becomes dead
            else if (previousGen[i][j] && (neighbors < 2 || neighbors > 3))
                nextGen[i][j] = false;
            // If cell is alive and has exactly 2 or 3 neighbors, cell stays alive
            else
                nextGen[i][j] = previousGen[i][j];
        }
    }

    return nextGen;
}

function checkNeighbors(array, x, y) {
    let count = 0;
    let row;
    let col;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            row = x + i;
            col = y + j;
            if (!(i == 0 && j == 0) && (row >= 0 && row < rows) && (col >= 0 && col < rows)) {
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

    if (mouseButton == LEFT) {
        previousGen[xCoord][yCoord] = true;

        fill(0);
        rect(xCoord * scale, yCoord * scale, scale, scale);
    }
    else if (mouseButton == RIGHT) {
        previousGen[xCoord][yCoord] = false;

        fill(255);
        rect(xCoord * scale, yCoord * scale, scale, scale);
    }
}

function create2DArray(length) {
    let array = new Array(length);
    for (let i = 0; i < length; i++) {
        array[i] = new Array(length);
    }

    return array;
}

function randomizeCanvas() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            previousGen[i][j] = random(1) > 0.9 ? true : false;
            if (previousGen[i][j]) fill(0);
            else fill(255);
            stroke(200);
            rect(i * scale, j * scale, scale, scale);
        }
    }
}

function startSimulation() {
    started = true;
}

function stopSimulation() {
    started = false;
}