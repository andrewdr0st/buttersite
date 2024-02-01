
function redDot() {
    fill(255, 0, 0);
    ellipse(0, 0, 7, 7);
}

function iconBackground() {
    fill(65, 65, 65);
    rect(-20, -20, 40, 40, 5);
}

function tidbitIcon() {
    fill(30, 120, 220);
    rect(-8, -13, 14, 14);
    fill(220, 220, 30);
    triangle(-1, 8, 17, 8, 8, -9);
    fill(220, 50, 50);
    ellipse(-6, 5, 18, 18);
}

function polygonIcon() {
    fill(50, 200, 130);
    beginShape();
    vertex(-16, -15);
    vertex(-10, -2);
    vertex(13, -2);
    vertex(7, -15);
    endShape();
    fill(210, 100, 60);
    triangle(18, -18, 15, 12, -12, 16);
    fill(160, 50, 190);
    beginShape();
    vertex(-4, -8);
    vertex(-18, 2);
    vertex(-12, 18);
    vertex(4, 18);
    vertex(10, 2);
    endShape();
}

function livesIcon() {
    fill(220, 50, 110);
    /*
    rect(-14, -6, 28, 4, 2);
    triangle(0, 15, -14.5, -3, 14.5, -3);
    arc(-7, -5, 15, 18, 165, 360);
    arc(7, -5, 15, 18, 180, 375);
    */
    beginShape();
    let size = 25;
    let x = 0;
    let y = -10;
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
}

function damageIcon() {
    fill(175, 15, 30);
    beginShape();
    vertex(15, -15);
    vertex(4, -15);
    vertex(-6, -1);
    vertex(-11, -6);
    vertex(-13, -4);
    vertex(-9, 4);
    vertex(-15, 10);
    vertex(-10, 15);
    vertex(-4, 9);
    vertex(4, 13);
    vertex(6, 11);
    vertex(1, 6);
    vertex(15, -4);
    endShape();
}

function reloadIcon() {
    stroke(30, 110, 220);
    strokeWeight(3);
    noFill();
    arc(0, 0, 24, 24, 30, 180);
    arc(0, 0, 24, 24, 210, 360);
    line(-12, 0, -15, 4);
    line(-12, 0, -7, 3);
    line(12, 0, 15, -4);
    line(12, 0, 7, -3);
    noStroke();
}

function rangeIcon() {
    stroke(200, 100, 20);
    strokeWeight(4);
    noFill();
    ellipse(0, 0, 24, 24);
    line(0, -12, 0, -16);
    line(0, 12, 0, 16);
    line(12, 0, 16, 0);
    line(-12, 0, -16, 0);
    noStroke();
    fill(200, 100, 50);
    ellipse(0, 0, 8, 8);
}

function plusSymbol() {
    fill(10, 215, 80);
    rect(-3, -9, 6, 18);
    rect(-9, -3, 18, 6);
}

function upArrow() {
    fill(10, 215, 80);
    beginShape();
    vertex(0, -8);
    vertex(-8, 0);
    vertex(-8, 8);
    vertex(0, 0);
    vertex(8, 8);
    vertex(8, 0);
    endShape();
}

function gizmoGear() {
    fill(135, 135, 135);
    ellipse(0, 0, 40, 40);
    push();
    for (i = 0; i < 9; i++) {
        rect(-5, -16, 10, -10);
        rotate(40);
    }
    pop();
}

function darkGizmo() {
    fill(105, 105, 105);
    ellipse(0, 0, 40, 40);
    push();
    for (i = 0; i < 9; i++) {
        rect(-5, -16, 10, -10);
        rotate(40);
    }
    pop();
}

function mysteryGizmo() {
    darkGizmo();
    textSize(36);
    textAlign(CENTER, CENTER);
    fill(30, 90, 100);
    text("?", 0, 3);
}

function tidbitStash() {
    drawSprite(tidbitIcon, -18, -15, 0, 0.9);
    drawSprite(tidbitIcon, 15, -18, 0, 0.9);
    drawSprite(tidbitIcon, 0, 0, 0, 0.9);
    drawSprite(tidbitIcon, -15, 18, 0, 0.9);
    drawSprite(tidbitIcon, 18, 15, 0, 0.9);
}

function tidbitGathering() {
    drawSprite(tidbitIcon, 9, -12, 0, 1.1);
    drawSprite(tidbitIcon, -13, 10, 0, 1.1);
    drawSprite(plusSymbol, 18, 10, 0, 1.2);
}

function miningEfficiency() {
    drawSprite(miner, 0, 0, 0, 1);
    drawSprite(upArrow, 18, 22, 0, 1.2);
}

function dangerIcon() {
    fill(230, 220, 100);
    triangle(0, -13, -12, 10, 12, 10);
    fill(50, 50, 50);
    ellipse(0, 7, 5, 5);
    ellipse(0, -3, 5, 12);
}

function scaleneScalesIcon() {
    fill(100, 190, 220);
    triangle(-25, 20, 5, 25, -15, -5);
    fill(160, 80, 210);
    triangle(10, 3, 25, 0, 24, -27);
    fill(220, 150, 100);
    triangle(10, 5, 25, 5, 20, 30);
    fill(180, 230, 100);
    triangle(-25, 10, -20, -20, -5, -30);
    fill(220, 110, 130);
    triangle(10, 25, -10, -10, 0, -25);
    fill(60, 120, 230);
    triangle(10, -10, 16, -22, 4, -17);
}

function lifeInsuranceIcon() {
    fill(215, 215, 215);
    push();
    translate(6, -3);
    rotate(30);
    rect(-15, -20, 30, 40);
    stroke(70, 70, 70);
    strokeWeight(2);
    line(-10, -13, 2, -13);
    line(5, -13, 10, -13);
    line(-5, -8, 8, -8);
    line(4, 0, 10, 0);
    pop();
    fill(235, 235, 235);
    push();
    translate(-4, 4);
    rotate(-10);
    rect(-15, -20, 30, 40);
    drawSprite(livesIcon, -5, -10, 0, 0.4);
    stroke(70, 70, 70);
    strokeWeight(2);
    line(-10, 2, -6, 2);
    line(-1, 2, 8, 2);
    line(-10, 7, -2, 7);
    line(-10, 12, 4, 12);
    pop();
    noStroke();
}

function acidRainIcon() {
    stroke(90, 50, 90);
    strokeWeight(3);
    line(-3, 10, -1, 18);
    line(-17, 12, -15, 20);
    line(-9, 16, -7, 24);
    line(5, 20, 7, 28);
    line(11, 14, 13, 22);
    line(3, 4, 5, 12);
    line(21, 8, 23, 16);
    line(19, 18, 21, 26);
    line(13, 0, 15, 8);
    noStroke();
    fill(50, 60, 55);
    ellipse(-14, -8, 35, 20);
    ellipse(1, -3, 40, 22);
    ellipse(-10, -1, 23, 23);
    ellipse(15, -20, 23, 11);
    ellipse(18, -22, 10, 10);
}

function snowflake() {
    line(0, -6, 0, 6);
    line(-5, -3, 5, 3);
    line(-5, 3, 5, -3);
}

function blizzardIcon() {
    stroke(215, 220, 230);
    strokeWeight(3);
    drawSprite(snowflake, 1, -4, 0, 0.9);
    drawSprite(snowflake, -21, 1, 0, 0.8);
    drawSprite(snowflake, -9, -15, 0, 0.7);
    drawSprite(snowflake, -15, 18, 0, 0.9);
    drawSprite(snowflake, -2, 11, 0, 0.6);
    drawSprite(snowflake, 17, -2, 0, 0.6);
    drawSprite(snowflake, 13, -21, 0, 1);
    drawSprite(snowflake, 19, 19, 0, 0.8);
    drawSprite(snowflake, 4, 23, 0, 0.7);
    drawSprite(snowflake, -21, -20, 0, 0.5);
    drawSprite(snowflake, 10, 9, 0, 0.4);
}

function blueprintsIcon() {
    fill(75, 90, 190);
    rect(-23, -23, 46, 46);
    stroke(210, 210, 220, 65);
    strokeWeight(1);
    line(-14, -23, -14, 22);
    line(-5, -23, -5, 22);
    line(5, -23, 5, 22);
    line(14, -23, 14, 22);
    line(-23, -14, 22, -14);
    line(-23, -5, 22, -5);
    line(-23, 5, 22, 5);
    line(-23, 14, 22, 14);
    stroke(210, 210, 220);
    strokeWeight(2);
    noFill();
    ellipse(-7, 8, 15, 15);
    line(-11, 1, -11, -5);
    line(-3, 1, -3, -5);
    line(-10, -5, -4, -5);
    ellipse(11, -10, 12, 12);
    line(8, -4, 8, 3);
    line(14, -4, 14, 3);
    line(9, 3, 13, 3);
    noStroke();
}

function sparePartsIcon() {
    fill(210, 210, 210);
    ellipse(2, -2, 40, 40);
    fill(140, 140, 140);
    ellipse(-2, 2, 44, 44);
    push();
    rotate(45);
    fill(100, 60, 30);
    rect(-2, -26, 4, 50, 2);
    pop();
}
