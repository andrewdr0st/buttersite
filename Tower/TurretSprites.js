
function rangeMarker() {
    fill(90, 90, 90, 95);
    ellipse(0, 0, 60, 60);
};

function rangeMarkerRed() {
    fill(210, 70, 70, 95);
    ellipse(0, 0, 60, 60);
}

function minerNoPlace() {
    fill(230, 70, 70, 110);
    rect(-28, -28, 56, 56, 6);
}

function miner() {
    fill(100, 100, 100);
    rect(-28, -28, 56, 56, 6);
    fill(190, 190, 190);
    ellipse(2, -2, 40, 40);
    fill(100, 100, 100);
    ellipse(-2, 2, 44, 44);
    push();
    rotate(45);
    fill(100, 60, 30);
    rect(-3, -26, 6, 50, 2);
    pop();
}

function cannon() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(220, 50, 50);
    ellipse(0, 0, 40, 40);
}

function repeater() {
    fill(100, 100, 100);
    rect(0, -9, 28, 18);
    fill(20, 170, 220);
    ellipse(0, 0, 35, 35);
    fill(190, 190, 200);
    triangle(10, 0, 0, -6, 0, 6);
    triangle(4, 0, -6, -6, -6, 6);
}

function sniper() {
    fill(100, 100, 100);
    rect(0, -7, 31, 14);
    fill(50, 50, 50);
    ellipse(0, 0, 28, 28);
}

function triShooter() {
    push();
    fill(100, 100, 100);
    rotate(-30);
    for (let i = 0; i < 3; i++) {
        rect(0, -6, 32, 12);
        rotate(30);
    }
    pop();
    fill(220, 50, 50);
    ellipse(0, 0, 40, 40);
}

function shotgunner() {
    fill(100, 100, 100);
    rect(0, -13, 32, 26);
    fill(70, 70, 70);
    rect(0, -1, 32, 2);
    fill(195, 100, 10);
    ellipse(0, 0, 40, 40);
}

function sentry() {
    fill(100, 100, 100);
    rect(0, -9, 34, 18);
    fill(50, 50, 50);
    ellipse(0, 0, 36, 36);
    push();
    rotate(45);
    fill(100, 100, 100);
    rect(-8, -8, 16, 16);
    pop();
}

function shockwaveT() {
    fill(140, 60, 130);
    ellipse(0, 0, 48, 48);
    drawSpriteArgs(shockwave, 0, 0, 0, 0.5, 1.5);
}

function stinger() {
    fill(100, 100, 100);
    rect(0, -8, 32, 16);
    fill(210, 210, 60);
    ellipse(0, 0, 30, 30);
}

function miniCannon() {
    fill(100, 100, 100);
    rect(0, -7, 27, 14);
    fill(220, 50, 50);
    ellipse(0, 0, 30, 30);
}

function bruiser() {
    fill(100, 100, 100);
    rect(0, -12, 33, 24);
    fill(220, 50, 50);
    ellipse(0, 0, 44, 44);
    push();
    fill(50, 50, 50);
    rotate(45);
    rect(-12, -4, 24, 8);
    rect(-4, -12, 8, 24);
    pop();
}

function growthCannon() {
    fill(100, 100, 100);
    rect(0, -10, 32, 20);
    fill(10, 200, 140);
    ellipse(0, 0, 40, 40);
}

function waveBreaker() {
    fill(20, 170, 220);
    ellipse(0, 0, 50, 50);
    stroke(200, 200, 200);
    strokeWeight(5);
    line(0, 2, -5, 7);
    line(-5, 7, -10, 2);
    line(-10, 2, -15, 7);
    line(0, 2, 5, 7);
    line(5, 7, 10, 2);
    line(10, 2, 15, 7);
    
    line(0, -9, -5, -4);
    line(-5, -4, -10, -9);
    line(-10, -9, -15, -4);
    line(0, -9, 5, -4);
    line(5, -4, 10, -9);
    line(10, -9, 15, -4);
    noStroke();
}

function chargeBlaster() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(50, 50, 50);
    ellipse(0, 0, 40, 40);
    fill(130, 40, 190);
    rect(-13, -8, 4, 16);
    rect(-6, -8, 4, 16);
    rect(1, -8, 4, 16);
    rect(8, -8, 4, 16);
}
function chargeBlaster3() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(50, 50, 50);
    ellipse(0, 0, 40, 40);
    fill(90, 20, 150);
    rect(-13, -8, 4, 16);
    fill(130, 40, 190);
    rect(-6, -8, 4, 16);
    rect(1, -8, 4, 16);
    rect(8, -8, 4, 16);
}
function chargeBlaster2() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(50, 50, 50);
    ellipse(0, 0, 40, 40);
    fill(90, 20, 150);
    rect(-13, -8, 4, 16);
    rect(-6, -8, 4, 16);
    fill(130, 40, 190);
    rect(1, -8, 4, 16);
    rect(8, -8, 4, 16);
}
function chargeBlaster1() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(50, 50, 50);
    ellipse(0, 0, 40, 40);
    fill(90, 20, 150);
    rect(-13, -8, 4, 16);
    rect(-6, -8, 4, 16);
    rect(1, -8, 4, 16);
    fill(130, 40, 190);
    rect(8, -8, 4, 16);
}
function chargeBlaster0() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(50, 50, 50);
    ellipse(0, 0, 40, 40);
    fill(90, 20, 150);
    rect(-13, -8, 4, 16);
    rect(-6, -8, 4, 16);
    rect(1, -8, 4, 16);
    rect(8, -8, 4, 16);
}

function iceBlaster() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(50, 110, 230);
    ellipse(0, 0, 40, 40);
    stroke(230, 230, 230);
    strokeWeight(6);
    line(-10, 0, 10, 0);
    line(-5, 8, 5, -8);
    line(-5, -8, 5, 8);
}

function snowballLauncher() {
    fill(100, 100, 100);
    beginShape();
    vertex(10, -8);
    vertex(32, -15);
    vertex(32, 15);
    vertex(10, 8);
    endShape();
    fill(230, 230, 230);
    ellipse(5, -10, 24, 24);
    ellipse(5, 10, 24, 24);
    ellipse(-8, 0, 24, 24);
}

function glubba() {
    fill(100, 100, 100);
    rect(0, -7, 34, 14);
    fill(150, 40, 150);
    ellipse(0, 0, 30, 30);
    ellipse(0, -15, 10, 10);
    ellipse(-9, -9, 10, 10);
    ellipse(-15, 0, 10, 10);
    ellipse(-9, 9, 10, 10);
    ellipse(0, 15, 10, 10);
}

function bigShot() {
    fill(100, 100, 100);
    rect(0, -17, 33, 34);
    fill(150, 30, 30);
    ellipse(0, 0, 48, 48);
}

function shootingStar() {
    fill(100, 100, 100);
    rect(0, -12, 35, 24);
    fill(210, 210, 60);
    ellipse(0, 0, 38, 38);
    stroke(235, 235, 240);
    strokeWeight(4);
    push();
    for (let i = 0; i < 5; i++) {
        line(0, 0, 7, 0);
        rotate(72);
    }
    pop();
}

function ultimateWeapon() {
    fill(100, 100, 100);
    rect(0, -11, 34, 22);
    fill(20, 170, 220);
    ellipse(0, 0, 42, 42);
    fill(220, 220, 220);
    beginShape();
    vertex(8, 0);
    vertex(12, 12);
    vertex(0, 8);
    vertex(-12, 12);
    vertex(-8, 0);
    vertex(-12, -12);
    vertex(0, -8);
    vertex(12, -12);
    endShape();
}

function splitter() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(230, 30, 120);
    ellipse(0, 0, 40, 40);
    fill(230, 230, 230);
    push();
    for (let i = 0; i < 3; i++) {
        rect(-3, -3, -10, 6);
        rotate(120);
    }
    pop();
}

function firecracker() {
    fill(100, 100, 100);
    rect(0, -10, 36, 20);
    fill(230, 30, 120);
    ellipse(0, 0, 42, 42);
    stroke(230, 230, 230);
    strokeWeight(3);
    push();
    for (let i = 0; i < 5; i++) {
        line(6, 0, 10, 0);
        rotate(72);
    }
    pop();
    strokeWeight(2);
    push();
    for (let i = 0; i < 5; i++) {
        line(-10, 0, -14, 0);
        rotate(72);
    }
    pop();
    noStroke();
}

function gazer() {
    fill(100, 100, 100);
    rect(0, -8, 36, 16);
    fill(40, 90, 140);
    ellipse(0, 0, 34, 34);
    fill(90, 10, 100);
    ellipse(0, 0, 7, 7);
    noFill();
    stroke(90, 10, 100);
    strokeWeight(3);
    ellipse(0, 0, 10, 22);
    noStroke();
}

function prototypeY() {
    push();
    fill(100, 100, 100);
    for (let i = 0; i < 3; i++) {
        rect(0, -7, -28, 14);
        rotate(120);
    }
    pop();
    fill(220, 50, 50);
    ellipse(0, 0, 30, 30);
}

function scrapCannon() {
    fill(100, 100, 100);
    rect(0, -11, 32, 22);
    fill(80, 40, 10);
    ellipse(0, 0, 36, 36);
    triangle(-8, -16, 9, -14, 2, -26);
    triangle(-27, 3, -13, -8, -12, 12);
    triangle(-6, 17, -5, 25, 8, 13);
}

function miningRig() {
    fill(100, 100, 100);
    rect(0, -12, 30, 24);
    fill(50, 50, 50);
    ellipse(0, 0, 40, 40);
    fill(190, 190, 190);
    ellipse(2, -2, 25, 25);
    fill(50, 50, 50);
    ellipse(-2, 2, 28, 28);
    push();
    rotate(45);
    fill(100, 60, 30);
    rect(-2, -17, 4, 32, 2);
    pop();
}

function heatBlaster(r = 0) {
    fill(100, 100, 100);
    rect(0, -10, 30, 20);
    fill(50, 50, 50);
    ellipse(0, 0, 36, 36);
    push();
    rotate(45);
    fill(155 + r, 50, 45);
    rect(-7, -7, 14, 14);
    pop();
}

function phantom() {
    
}
