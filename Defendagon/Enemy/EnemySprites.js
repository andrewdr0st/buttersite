
var enemySpriteList = [
    [circleBoi, strongCircleBoi, chadCircle, sigmaCircle],
    [squareBoi, strongSquareBoi, chadSquare, sigmaSquare],
    [triangleBoi, strongTriangleBoi, chadTriangle, sigmaTriangle],
    [hexagonBoi, strongHexagonBoi, chadHexagon, sigmaHexagon],
    [plusBoi, strongPlusBoi, chadPlus, sigmaPlus],
    [gliderBoi, strongGliderBoi, chadGlider, sigmaGlider],
    [trapezoidBoi, strongTrapezoidBoi, chadTrapezoid, sigmaTrapezoid],
    [octogonBoi, strongOctogonBoi, chadOctogon, sigmaOctogon],
    [ringBoi, strongRingBoi, chadRing, sigmaRing]
];

//Circle
function circleBoi() {
    fill(30, 100, 120);
    ellipse(0, 0, 44, 44);
    fill(40, 150, 200);
    ellipse(0, 0, 40, 40);
}

function strongCircleBoi() {
    fill(100, 30, 120);
    ellipse(0, 0, 44, 44);
    fill(150, 40, 200);
    ellipse(0, 0, 40, 40);
}

function chadCircle() {
    fill(130, 30, 100);
    ellipse(0, 0, 44, 44);
    fill(210, 40, 150);
    ellipse(0, 0, 40, 40);
}

function sigmaCircle() {
    fill(140, 30, 50);
    ellipse(0, 0, 44, 44);
    fill(220, 40, 80);
    ellipse(0, 0, 40, 40);
}

//Square
function squareBoi() {
    fill(30, 100, 120);
    rect(-22, -22, 44, 44);
    fill(40, 150, 200);
    rect(-20, -20, 40, 40);
}

function strongSquareBoi() {
    fill(100, 30, 120);
    rect(-22, -22, 44, 44);
    fill(150, 40, 200);
    rect(-20, -20, 40, 40);
}

function chadSquare() {
    fill(130, 30, 100);
    rect(-22, -22, 44, 44);
    fill(210, 40, 150);
    rect(-20, -20, 40, 40);
}

function sigmaSquare() {
    fill(140, 30, 50);
    rect(-22, -22, 44, 44);
    fill(220, 40, 80);
    rect(-20, -20, 40, 40);
}

//Triangle
function triangleBoi() {
    fill(30, 100, 120);
    triangle(-22, -22, -22, 22, 20, 0);
    fill(40, 150, 200);
    triangle(-20, -20, -20, 20, 17, 0);
}

function strongTriangleBoi() {
    fill(100, 30, 120);
    triangle(-22, -22, -22, 22, 20, 0);
    fill(150, 40, 200);
    triangle(-20, -20, -20, 20, 17, 0);
}

function chadTriangle() {
    fill(130, 30, 100);
    triangle(-22, -22, -22, 22, 20, 0);
    fill(210, 40, 150);
    triangle(-20, -20, -20, 20, 17, 0);
}

function sigmaTriangle() {
    fill(140, 30, 50);
    triangle(-22, -22, -22, 22, 20, 0);
    fill(220, 40, 80);
    triangle(-20, -20, -20, 20, 17, 0);
}


//Hexagon
function hexagonBoi() {
    fill(30, 100, 120);
    beginShape();
    vertex(-13, -24);
    vertex(-27, 0);
    vertex(-13, 24);
    vertex(13, 24);
    vertex(27, 0);
    vertex(13, -24);
    endShape();
    fill(40, 150, 200);
    beginShape();
    vertex(-11, -22);
    vertex(-24, 0);
    vertex(-11, 22);
    vertex(11, 22);
    vertex(24, 0);
    vertex(11, -22);
    endShape();
}

function strongHexagonBoi() {
    fill(100, 30, 120);
    beginShape();
    vertex(-13, -24);
    vertex(-27, 0);
    vertex(-13, 24);
    vertex(13, 24);
    vertex(27, 0);
    vertex(13, -24);
    endShape();
    fill(150, 40, 200);
    beginShape();
    vertex(-11, -22);
    vertex(-24, 0);
    vertex(-11, 22);
    vertex(11, 22);
    vertex(24, 0);
    vertex(11, -22);
    endShape();
}

function chadHexagon() {
    fill(130, 30, 100);
    beginShape();
    vertex(-13, -24);
    vertex(-27, 0);
    vertex(-13, 24);
    vertex(13, 24);
    vertex(27, 0);
    vertex(13, -24);
    endShape();
    fill(210, 40, 150);
    beginShape();
    vertex(-11, -22);
    vertex(-24, 0);
    vertex(-11, 22);
    vertex(11, 22);
    vertex(24, 0);
    vertex(11, -22);
    endShape();
}

function sigmaHexagon() {
    fill(140, 30, 50);
    beginShape();
    vertex(-13, -24);
    vertex(-27, 0);
    vertex(-13, 24);
    vertex(13, 24);
    vertex(27, 0);
    vertex(13, -24);
    endShape();
    fill(220, 40, 80);
    beginShape();
    vertex(-11, -22);
    vertex(-24, 0);
    vertex(-11, 22);
    vertex(11, 22);
    vertex(24, 0);
    vertex(11, -22);
    endShape();
}

//Plus
function plusBoi() {
    fill(30, 100, 120);
    rect(-20, -8, 40, 16);
    rect(-8, -20, 16, 40);
    fill(40, 150, 200);
    rect(-18, -6, 36, 12);
    rect(-6, -18, 12, 36);
}

function strongPlusBoi() {
    fill(100, 30, 120);
    rect(-20, -8, 40, 16);
    rect(-8, -20, 16, 40);
    fill(150, 40, 200);
    rect(-18, -6, 36, 12);
    rect(-6, -18, 12, 36);
}

function chadPlus() {
    fill(130, 30, 100);
    rect(-20, -8, 40, 16);
    rect(-8, -20, 16, 40);
    fill(210, 40, 150);
    rect(-18, -6, 36, 12);
    rect(-6, -18, 12, 36);
}

function sigmaPlus() {
    fill(140, 30, 50);
    rect(-20, -8, 40, 16);
    rect(-8, -20, 16, 40);
    fill(220, 40, 80);
    rect(-18, -6, 36, 12);
    rect(-6, -18, 12, 36);
}

function plusShield() {
    fill(190, 210, 200, 150);
    ellipse(0, 0, 48, 48);
}


//Glider
function gliderBoi() {
    fill(30, 100, 120);
    triangle(-22, -24, -2, 0, 21, 0);
    triangle(-22, 24, -2, 0, 21, 0);
    fill(40, 150, 200);
    triangle(-19, -22, 0, 1, 19, 0);
    triangle(-19, 22, 0, -1, 19, 0);
}

function strongGliderBoi() {
    fill(100, 30, 120);
    triangle(-22, -24, -2, 0, 21, 0);
    triangle(-22, 24, -2, 0, 21, 0);
    fill(150, 40, 200);
    triangle(-19, -22, 0, 1, 19, 0);
    triangle(-19, 22, 0, -1, 19, 0);
}

function chadGlider() {
    fill(130, 30, 100);
    triangle(-22, -24, -2, 0, 21, 0);
    triangle(-22, 24, -2, 0, 21, 0);
    fill(210, 40, 150);
    triangle(-19, -22, 0, 1, 19, 0);
    triangle(-19, 22, 0, -1, 19, 0);
}

function sigmaGlider() {
    fill(140, 30, 50);
    triangle(-22, -24, -2, 0, 21, 0);
    triangle(-22, 24, -2, 0, 21, 0);
    fill(220, 40, 80);
    triangle(-19, -22, 0, 1, 19, 0);
    triangle(-19, 22, 0, -1, 19, 0);
}


//Trapezoid
function trapezoidBoi() {
    fill(30, 100, 120);
    beginShape();
    vertex(-13, -23);
    vertex(13, -12);
    vertex(13, 12);
    vertex(-13, 23);
    endShape();
    fill(40, 150, 200);
    beginShape();
    vertex(-11, -21);
    vertex(11, -11);
    vertex(11, 11);
    vertex(-11, 21);
    endShape();
}

function strongTrapezoidBoi() {
    fill(100, 30, 120);
    beginShape();
    vertex(-13, -23);
    vertex(13, -12);
    vertex(13, 12);
    vertex(-13, 23);
    endShape();
    fill(150, 40, 200);
    beginShape();
    vertex(-11, -21);
    vertex(11, -11);
    vertex(11, 11);
    vertex(-11, 21);
    endShape();
}

function chadTrapezoid() {
    fill(130, 30, 100);
    beginShape();
    vertex(-13, -23);
    vertex(13, -12);
    vertex(13, 12);
    vertex(-13, 23);
    endShape();
    fill(210, 40, 150);
    beginShape();
    vertex(-11, -21);
    vertex(11, -11);
    vertex(11, 11);
    vertex(-11, 21);
    endShape();
}

function sigmaTrapezoid() {
    fill(140, 30, 50);
    beginShape();
    vertex(-13, -23);
    vertex(13, -12);
    vertex(13, 12);
    vertex(-13, 23);
    endShape();
    fill(220, 40, 80);
    beginShape();
    vertex(-11, -21);
    vertex(11, -11);
    vertex(11, 11);
    vertex(-11, 21);
    endShape();
}


//Octogon
function octogonBoi() {
    fill(30, 100, 120);
    beginShape();
    vertex(-11, -25);
    vertex(11, -25);
    vertex(25, -11);
    vertex(25, 11);
    vertex(11, 25);
    vertex(-11, 25);
    vertex(-25, 11);
    vertex(-25, -11);
    endShape();
    fill(40, 150, 200);
    beginShape();
    vertex(-10, -23);
    vertex(10, -23);
    vertex(23, -10);
    vertex(23, 10);
    vertex(10, 23);
    vertex(-10, 23);
    vertex(-23, 10);
    vertex(-23, -10);
    endShape();
}

function strongOctogonBoi() {
    fill(100, 30, 120);
    beginShape();
    vertex(-11, -25);
    vertex(11, -25);
    vertex(25, -11);
    vertex(25, 11);
    vertex(11, 25);
    vertex(-11, 25);
    vertex(-25, 11);
    vertex(-25, -11);
    endShape();
    fill(150, 40, 200);
    beginShape();
    vertex(-10, -23);
    vertex(10, -23);
    vertex(23, -10);
    vertex(23, 10);
    vertex(10, 23);
    vertex(-10, 23);
    vertex(-23, 10);
    vertex(-23, -10);
    endShape();
}

function chadOctogon() {
    fill(130, 30, 100);
    beginShape();
    vertex(-11, -25);
    vertex(11, -25);
    vertex(25, -11);
    vertex(25, 11);
    vertex(11, 25);
    vertex(-11, 25);
    vertex(-25, 11);
    vertex(-25, -11);
    endShape();
    fill(210, 40, 150);
    beginShape();
    vertex(-10, -23);
    vertex(10, -23);
    vertex(23, -10);
    vertex(23, 10);
    vertex(10, 23);
    vertex(-10, 23);
    vertex(-23, 10);
    vertex(-23, -10);
    endShape();
}

function sigmaOctogon() {
    fill(140, 30, 50);
    beginShape();
    vertex(-11, -25);
    vertex(11, -25);
    vertex(25, -11);
    vertex(25, 11);
    vertex(11, 25);
    vertex(-11, 25);
    vertex(-25, 11);
    vertex(-25, -11);
    endShape();
    fill(220, 40, 80);
    beginShape();
    vertex(-10, -23);
    vertex(10, -23);
    vertex(23, -10);
    vertex(23, 10);
    vertex(10, 23);
    vertex(-10, 23);
    vertex(-23, 10);
    vertex(-23, -10);
    endShape();
}

//Ring
function ringBoi() {
    fill(30, 100, 120);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -8, 15, 16);
    rect(22, -8, -15, 16);
    fill(40, 150, 200);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -10, 11, 20);
    rect(20, -10, -11, 20);
}

function strongRingBoi() {
    fill(100, 30, 120);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -8, 15, 16);
    rect(22, -8, -15, 16);
    fill(150, 40, 200);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -10, 11, 20);
    rect(20, -10, -11, 20);
}

function chadRing() {
    fill(130, 30, 100);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -8, 15, 16);
    rect(22, -8, -15, 16);
    fill(210, 40, 150);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -10, 11, 20);
    rect(20, -10, -11, 20);
}

function sigmaRing() {
    fill(140, 30, 50);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -8, 15, 16);
    rect(22, -8, -15, 16);
    fill(220, 40, 80);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -10, 11, 20);
    rect(20, -10, -11, 20);
}

function ringBoiClear() {
    fill(30, 100, 120, 90);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -7, 15, 14);
    rect(22, -7, -15, 14);
    fill(40, 150, 200, 60);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -9, 11, 18);
    rect(20, -9, -11, 18);
}

function strongRingBoiClear() {
    fill(100, 30, 120, 90);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -7, 15, 14);
    rect(22, -7, -15, 14);
    fill(150, 40, 200, 60);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -9, 11, 18);
    rect(20, -9, -11, 18);
}

function chadRingClear() {
    fill(130, 30, 100, 90);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -7, 15, 14);
    rect(22, -7, -15, 14);
    fill(210, 40, 150, 60);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -9, 11, 18);
    rect(20, -9, -11, 18);
}

function sigmaRingClear() {
    fill(140, 30, 50, 90);
    rect(-22, -22, 44, 15);
    rect(-22, 22, 44, -15);
    rect(-22, -7, 15, 14);
    rect(22, -7, -15, 14);
    fill(220, 40, 80, 60);
    rect(-20, -20, 40, 11);
    rect(-20, 20, 40, -11);
    rect(-20, -9, 11, 18);
    rect(20, -9, -11, 18);
}


