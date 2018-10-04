function setup() {
    createCanvas(640, 480);
}

function draw() {
    for (let i = 0; i < 12; i++) {
        ellipse(50 + i * 75, 50 + i * 25, 50, 50);
    }
}