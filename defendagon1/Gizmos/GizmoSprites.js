

function damageUp1() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(damageIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 10, 0, 0.85);
}

function damageUp2() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(damageIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 12, 0, 0.75);
    drawSprite(upArrow, 10, 4, 0, 0.75);
}

function damageUp3() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(damageIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 14, 0, 0.6);
    drawSprite(upArrow, 10, 8, 0, 0.6);
    drawSprite(upArrow, 10, 2, 0, 0.6);
}

function attackSpeedUp1() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(reloadIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 10, 0, 0.85);
}

function attackSpeedUp2() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(reloadIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 12, 0, 0.75);
    drawSprite(upArrow, 10, 4, 0, 0.75);
}

function rangeUp1() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(rangeIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 10, 0, 0.85);
}

function costDecrease1() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(tidbitIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 12, 180, 0.85);
}

function costDecrease2() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(tidbitIcon, 0, 0, 0, 0.85);
    drawSprite(upArrow, 10, 12, 180, 0.75);
    drawSprite(upArrow, 10, 4, 180, 0.75);
}

function powerUp() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(reloadIcon, 3, -4, 0, 0.85);
    drawSprite(damageIcon, -6, 0, 0, 0.7);
    drawSprite(upArrow, 10, 12, 0, 0.75);
}

function alphaGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(200, 10, 120);
    textSize(45);
    textAlign(CENTER, CENTER);
    text("α", 0, 1);
}

function betaGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(0, 110, 180);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("β", 1, 1);
}

function omegaGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(190, 60, 0);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Ω", 0, 3);
}

function piGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(170, 0, 180);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("π", 0, 1);
}

function thetaGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(210, 190, 30);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("θ", 0, 3);
}

function deltaGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(20, 120, 80);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Δ", 0, 1);
}

function imaginaryGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(70, 20, 100);
    textSize(38);
    textAlign(CENTER, CENTER);
    text("𝒊", 0, 2);
}

function sigmaGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(170, 30, 60);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Σ", -1, 3);
}

function lambdaGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(120, 210, 100);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("λ", 0, 2);
}

function irrationalGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    stroke(40, 40, 140);
    strokeWeight(4);
    line(-16, 2, -12, 0);
    line(-11, 1, -4, 10);
    line(-4, 9, 0, -10);
    line(0, -10, 12, -10);
    noStroke();
}


function drawAlloy(c1, c2, c3) {
    fill(c1);
    beginShape();
    vertex(-2, -2);
    vertex(0, 16);
    vertex(14, 8);
    vertex(14, -8);
    endShape();
    fill(c2);
    beginShape();
    vertex(0, -2);
    vertex(0, 16);
    vertex(-14, 8);
    vertex(-14, -8);
    endShape();
    fill(c3);
    beginShape();
    vertex(0, 0);
    vertex(-14, -8);
    vertex(0, -16);
    vertex(14, -8);
    endShape();
}

function leadGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawAlloy(color(25, 15, 55), color(40, 30, 80), color(60, 45, 100));
}

function aluminumGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawAlloy(color(155, 155, 175), color(175, 175, 195), color(195, 195, 220));
}

function silverGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawAlloy(color(195, 205, 205), color(210, 220, 220), color(230, 240, 240));
}

function goldGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawAlloy(color(200, 175, 100), color(220, 195, 120), color(240, 215, 140));
}

function titaniumGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawAlloy(color(115, 145, 205), color(130, 170, 220), color(150, 190, 240));
}

function copperGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawAlloy(color(205, 125, 85), color(220, 140, 100), color(240, 160, 120));
}

function ironGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawAlloy(color(65, 50, 50), color(85, 65, 65), color(105, 85, 85));
}

function gemStone(c1, c2, c3) {
    fill(c1);
    beginShape();
    vertex(0, 15);
    vertex(-15, -2);
    vertex(-10, -12);
    vertex(10, -12);
    vertex(15, -2);
    endShape();
    fill(c2);
    beginShape();
    vertex(0, 15);
    vertex(-15, -2);
    vertex(-10, -12);
    vertex(-3, -12);
    vertex(-6, -2);
    endShape();
    fill(c3);
    beginShape();
    vertex(0, 15);
    vertex(15, -2);
    vertex(10, -12);
    vertex(3, -12);
    vertex(6, -2);
    endShape();
}

function diamondGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    gemStone(color(120, 190, 240), color(110, 170, 230), color(130, 210, 250));
}

function rubyGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    gemStone(color(240, 100, 110), color(230, 85, 95), color(250, 115, 125));
}

function emeraldGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    gemStone(color(90, 240, 110), color(75, 230, 95), color(105, 250, 125));
}

function nuclearGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(10, 110, 10);
    for (let i = 0; i < 3; i++) {
        arc(0, 0, 32, 32, i * 120 + 60, i * 120 + 120);
    }
    fill(135, 135, 135);
    ellipse(0, 0, 12, 12);
    fill(10, 110, 10);
    ellipse(0, 0, 8, 8);
}

function shortCircuitGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(230, 230, 70);
    beginShape();
    vertex(-6, -14);
    vertex(-6, -2);
    vertex(0, -3);
    vertex(-6, 14);
    vertex(-6, 2);
    vertex(-12, 3);
    endShape();
    beginShape();
    vertex(6, -14);
    vertex(6, -2);
    vertex(12, -3);
    vertex(6, 14);
    vertex(6, 2);
    vertex(0, 3);
    endShape();
}

function massProductionGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    push();
    translate(2, 0);
    rotate(45);
    fill(90, 60, 50);
    rect(-3, -16, 6, 32);
    fill(50, 50, 50);
    rect(-10, -14, 20, 8);
    pop();
    push();
    translate(-2, 0);
    rotate(-45);
    fill(80, 80, 80);
    beginShape();
    vertex(0, -10);
    vertex(3, -10);
    vertex(3, -16);
    vertex(5, -16);
    vertex(7, -14);
    vertex(7, -7);
    vertex(3, -4);
    vertex(3, 16);
    vertex(-3, 16);
    vertex(-3, -4);
    vertex(-7, -7);
    vertex(-7, -14);
    vertex(-5, -16);
    vertex(-3, -16);
    vertex(-3, -10);
    endShape();
    pop();
}

function investmentGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    stroke(10, 110, 50);
    strokeWeight(4);
    line(-10, 10, -4, 0);
    line(-2, 0, 4, 4);
    line(10, -10, 4, 4);
    strokeWeight(3);
    line(10, -10, 4, -9);
    line(10, -10, 12, -5);
    noStroke();
}

function recycleGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(110, 210, 80);
    push();
    for (let i = 0; i < 3; i++) {
        beginShape();
        vertex(-2, 8);
        vertex(4, 14);
        vertex(4, 11);
        vertex(12, 11);
        vertex(16, 5);
        vertex(4, 5);
        vertex(4, 2);
        endShape();
        rect(-12, 5, 8, 6);
        rotate(120);
    }
    pop();
}

function miniShovelGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    push();
    rotate(-45);
    stroke(130, 70, 40);
    strokeWeight(3);
    line(-8, -14, 8, -14);
    line(-8, -14, 0, -7);
    line(8, -14, 0, -7);
    line(0, -7, 0, 1);
    noStroke();
    fill(210, 210, 210);
    beginShape();
    vertex(-8, 1);
    vertex(-7, 10);
    vertex(-5, 13);
    vertex(0, 15);
    vertex(5, 13);
    vertex(7, 10);
    vertex(8, 1);
    endShape();
    pop();
}

function glubGooGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(130, 20, 170);
    ellipse(-3, -5, 16, 16);
    ellipse(6, 1, 18, 18);
    ellipse(-5, 7, 12, 12);
}

function rageGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    drawSprite(damageIcon, -7, 7, 0, 0.4);
    drawSprite(damageIcon, -7, -7, 90, 0.4);
    drawSprite(damageIcon, 7, -7, 180, 0.4);
    drawSprite(damageIcon, 7, 7, 270, 0.4);
}

function freeShippingGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(210, 210, 210);
    rect(-14, -10, 20, 16);
    fill(230, 100, 20);
    beginShape();
    vertex(6, -8);
    vertex(12, -8);
    vertex(16, 0);
    vertex(16, 6);
    vertex(6, 6);
    endShape();
    fill(50, 50, 50);
    ellipse(7, 8, 8, 8);
    ellipse(-7, 8, 8, 8);
}

function emergencyGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(200, 70, 80);
    triangle(15, 11, -15, 11, 0, -16);
    fill(220, 220, 220);
    ellipse(0, 7, 4, 4);
    ellipse(0, -3, 4, 12);
}

function scopeGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    noFill();
    stroke(40, 40, 40);
    strokeWeight(3);
    ellipse(0, 0, 27, 27);
    strokeWeight(2);
    stroke(60, 60, 60);
    line(0, -12, 0, -6);
    line(0, 12, 0, 6);
    line(-12, 0, -6, 0);
    line(12, 0, 6, 0);
    line(-2, 0, 2, 0);
    line(0, -2, 0, 2);
    noStroke();
}

function naturalGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(65, 45, 35);
    rect(4, 5, 8, 5);
    rect(-12, 5, 8, 5);
    fill(70, 50, 30);
    rect(-4, 9, 8, 5);
    fill(5, 90, 60);
    triangle(-8, -16, -17, 5, 1, 5);
    triangle(8, -16, -1, 5, 17, 5);
    fill(5, 95, 65);
    triangle(0, -12, -9, 9, 9, 9);
}

function idustryGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    fill(60, 50, 55);
    rect(-15, -2, 30, 15);
    triangle(-15, -2, -7, -1, -7, -8);
    triangle(-8, -2, 1, -1, 1, -8);
    rect(3, -15, 5, 17);
    rect(9, -12, 5, 14);
}

function legendGiz() {
    drawSprite(gizmoGear, 0, 0, 0, 1);
    push();
    for(let i = 0; i < 5; i++) {
        fill(120, 110, 225);
        beginShape();
        vertex(0, 0);
        vertex(-5, -7);
        vertex(0, -20);
        endShape();
        fill(100, 100, 200);
        beginShape();
        vertex(0, 0);
        vertex(5, -7);
        vertex(0, -20);
        endShape();
        rotate(72);
    }
    pop();
}
