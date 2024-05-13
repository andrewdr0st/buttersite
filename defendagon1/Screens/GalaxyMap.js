
var galaxyRotation = 0;
var levelMarkers = [
    [true, true, -250, -100],
    [false, true, -170, -150],
    [false, true, 0, -160],
    [false, true, 100, -80],
    [false, true, 50, 30],
    [false, true, 0, 0]
];

function mapScreen() {
    background(25, 15, 50);
    drawStars();
    drawGalaxy();
    drawLevelMarkers();
    
    drawSprite(livesIcon, 30 * uiScale, 30 * uiScale, 0, uiScale * 1.2);
    textAlign(LEFT, CENTER);
    textSize(26 * uiScale);
    fill(220, 220, 220);
    text(lives, 55 * uiScale, 36 * uiScale);
}

function setupMapScreen() {
    if (!songPlaying) {
        workshopSongIntro.play();
        songPlaying = true;
    }
    clearButtons();
    let leftButton = new WorkshopScreenButton(0, 650 * uiScale, 280 * uiScale, 70 * uiScale, false);
    let rightButton = new StoreScreenButton(1000 * uiScale, 650 * uiScale, 280 * uiScale, 70 * uiScale, true);
    leftButton.enabled = true;
    rightButton.enabled = true;
    addButton(leftButton);
    addButton(rightButton);
    let embarkButton = new EmbarkButton(1020 * uiScale, 20 * uiScale, 240 * uiScale, 60 * uiScale);
    embarkButton.enabled = true;
    addButton(embarkButton);
}

function setupGalaxyMap() {
    currentPlanet++;
    setupStars();
    levelMarkers[currentPlanet - 1][0] = true;
    levelMarkers[currentPlanet - 2][1] = false;
}

function drawGalaxy() {
    push();
    translate(width / 2, height / 2);
    scale(uiScale);
    let rVal = 170 + (10 * currentPlanet);
    let bVal = 150 - (5 * currentPlanet);
    fill(rVal, 50, bVal, 6);
    for (let i = 10; i < 60; i++) {
        ellipse(0, 0, i * 12, i * 12);
    }
    rotate(galaxyRotation);
    stroke(105, 75, 200);
    strokeWeight(9);
    for (let i = 0; i < 3; i++) {
        line(-295, -85, -250, -100);
        rotate(120);
    }
    stroke(120, 65, 195);
    strokeWeight(10);
    for (let i = 0; i < 3; i++) {
        line(-230, -210, -250, -100);
        line(-10, -260, 140, -250);
        rotate(120);
    }
    stroke(130, 55, 180);
    strokeWeight(11);
    for (let i = 0; i < 3; i++) {
        line(-230, -210, -110, -240);
        line(-80, -185, 10, -220);
        line(170, -130, 140, -250);
        rotate(120);
    }
    stroke(140, 50, 170);
    strokeWeight(11);
    for (let i = 0; i < 3; i++) {
        line(-170, -150, -110, -240);
        line(0, -160, 10, -220)
        rotate(120);
    }
    stroke(150, 45, 155);
    strokeWeight(12);
    for (let i = 0; i < 3; i++) {
        line(80, -190, 100, -80);
        line(-48, -133, -170, -150);
        rotate(120);
    }
    stroke(160, 40, 140);
    strokeWeight(13);
    for (let i = 0; i < 3; i++) {
        line(170, -130, 100, -80);
        line(0, -160, -95, -105);
        rotate(120);
    }
    stroke(170, 40, 120);
    strokeWeight(13);
    for (let i = 0; i < 3; i++) {
        line(100, 30, 100, -80);
        rotate(120);
    }
    stroke(180, 40, 100);
    strokeWeight(14);
    for (let i = 0; i < 3; i++) {
        line(100, 30, 0, -160);
        rotate(120);
    }
    stroke(200, 40, 90);
    strokeWeight(15);
    for (let i = 0; i < 3; i++) {
        line(50, 30, 100, 30);
        rotate(120);
    }
    stroke(210, 40, 80);
    strokeWeight(16);
    for (let i = 0; i < 3; i++) {
        line(-50, 30, 50, 30);
        rotate(120);
    }
    noStroke();
    pop();
}

function drawLevelMarkers() {
    push();
    translate(width / 2, height / 2);
    scale(uiScale);
    rotate(galaxyRotation);
    for (let i = 0; i < 6; i++) {
        let m = levelMarkers[i];
        if (m[0]) {
            levelMarker(m[2], m[3], m[1]);
        }
    }
    pop();
}

function levelMarker(x, y, bright) {
    if (bright) {
        fill(140, 110, 130);
    } else {
        fill(100, 80, 100);
    }
    ellipse(x, y, 20, 20);
    if (bright) {
        fill(220, 190, 210);
    } else {
        fill(160, 140, 160);
    }
    ellipse(x, y, 16, 16);
}
