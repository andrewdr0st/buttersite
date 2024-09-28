let lastMillis = 0;
let deltaTime = 0;

function calculateDeltaTime() {
    deltaTime = (millis() - lastMillis) * 0.001;
    lastMillis = millis();
}

let spinner;

function setup() {
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES);

    bgColor1 = color(140, 140, 140);
    bgColor2 = color(125, 125, 125);

    spinner = new Spinner();
    spinner.x = width / 2;
    spinner.y = height / 2;

    noStroke();

    calculateDeltaTime();
}

function draw() {
    calculateDeltaTime();

    drawBackground();

    spinner.draw();
}

let bgMoveSpeed = 20;
let bgOffset = -400;
let bgColor1;
let bgColor2;

function drawBackground() {
    background(bgColor1);
    fill(bgColor2);
    for (let i = bgOffset; i < width + 50; i += 100) {
        push();
        translate(i, 0); 
        rotate(-30);
        rect(0, 0, 50, height * 1.5); 
        pop();
    }
    bgOffset -= bgMoveSpeed * deltaTime;
    if (bgOffset < -500) {
        bgOffset += 100;
    }
}
