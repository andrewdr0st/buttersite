

var stars = [];

function drawStars() {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        fill(220, 220, 160);
        ellipse(star[0], star[1], star[2], star[2]);
    }
}

function setupStars(maxCount) {
    let count = random(25, 50);
    for (let i = 0; i < count; i++) {
        let star = [random(0, width), random(0, height), random(2, 6) * uiScale];
        stars.push(star);
    }
}

function clearStars() {
    stars = [];
}



function letterA() {
    fill(220, 220, 220);
    /*
    beginShape();
    vertex(-40, 60);
    vertex(-20, -60);
    vertex(20, -60);
    vertex(40, 60);
    vertex(18, 60);
    vertex(0, -36);
    vertex(-18, 60);
    endShape();
    rect(-20, 10, 40, 20);
    */
    beginShape();
    vertex(-40, 60);
    vertex(-40, -30);
    vertex(-15, -60);
    vertex(15, -60);
    vertex(40, -30);
    vertex(40, 60);
    vertex(20, 60);
    vertex(20, -20);
    vertex(5, -40);
    vertex(-5, -40);
    vertex(-20, -20);
    vertex(-20, 60);
    endShape();
    rect(-20, 0, 40, 20);
}

function letterD() {
    fill(220, 220, 220);
    rect(-40, -60, 20, 120);
    beginShape();
    vertex(-20, -60);
    vertex(15, -60);
    vertex(40, -35);
    vertex(40, 35);
    vertex(15, 60);
    vertex(-20, 60);
    vertex(-20, 40);
    vertex(5, 40);
    vertex(20, 25);
    vertex(20, -25);
    vertex(5, -40);
    vertex(-20, -40);
    endShape();
}

function letterE() {
    fill(220, 220, 220);
    rect(-40, -60, 20, 120);
    rect(-20, -60, 60, 20);
    rect(-20, -10, 40, 20);
    rect(-20, 40, 60, 20);
}

function letterF() {
    fill(220, 220, 220);
    rect(-40, -60, 20, 120);
    rect(-20, -60, 60, 20);
    rect(-20, -10, 40, 20);
}

function letterG() {
    fill(220, 220, 220);
    beginShape();
    vertex(-40, 1);
    vertex(-40, -40);
    vertex(-20, -60);
    vertex(20, -60);
    vertex(40, -40);
    vertex(40, -30);
    vertex(20, -30);
    vertex(10, -40);
    vertex(-10, -40);
    vertex(-20, -30);
    vertex(-20, 1);
    endShape();
    beginShape();
    vertex(-40, 0);
    vertex(-40, 40);
    vertex(-20, 60);
    vertex(20, 60);
    vertex(40, 40);
    vertex(40, 0);
    vertex(10, 0);
    vertex(10, 20);
    vertex(20, 20);
    vertex(20, 30);
    vertex(10, 40);
    vertex(-10, 40);
    vertex(-20, 30);
    vertex(-20, 0);
    endShape();
}

function letterN() {
    fill(220, 220, 220);
    rect(-40, -60, 20, 120);
    rect(20, -60, 20, 120);
    beginShape();
    vertex(-20, -60);
    vertex(-20, -20);
    vertex(20, 60);
    vertex(20, 20);
    endShape();
}

function letterO() {
    fill(220, 220, 220);
    beginShape();
    vertex(-40, 0);
    vertex(-40, -40);
    vertex(-20, -60);
    vertex(20, -60);
    vertex(40, -40);
    vertex(40, 0);
    vertex(20, 0);
    vertex(20, -30);
    vertex(10, -40);
    vertex(-10, -40);
    vertex(-20, -30);
    vertex(-20, 0);
    endShape();
    beginShape();
    vertex(-40, -1);
    vertex(-40, 40);
    vertex(-20, 60);
    vertex(20, 60);
    vertex(40, 40);
    vertex(40, -1);
    vertex(20, -1);
    vertex(20, 30);
    vertex(10, 40);
    vertex(-10, 40);
    vertex(-20, 30);
    vertex(-20, -1);
    endShape();
    
}


function happyFace() {
    fill(80, 180, 100);
    ellipse(0, 0, 140, 140);
    fill(50, 120, 80);
    ellipse(-25, -20, 32, 32);
    ellipse(25, -20, 32, 32);
    noFill();
    stroke(50, 120, 80);
    strokeWeight(14);
    arc(0, 10, 70, 60, 10, 170);
    noStroke();
}

function midFace() {
    fill(190, 190, 80);
    ellipse(0, 0, 140, 140);
    fill(120, 120, 60);
    ellipse(-25, -20, 32, 32);
    ellipse(25, -20, 32, 32);
    noFill();
    stroke(120, 120, 60);
    strokeWeight(14);
    line(-35, 26, 35, 26);
    noStroke();
}

function sadFace() {
    fill(190, 80, 80);
    ellipse(0, 0, 140, 140);
    fill(120, 60, 80);
    ellipse(-25, -20, 32, 32);
    ellipse(25, -20, 32, 32);
    noFill();
    stroke(120, 60, 80);
    strokeWeight(14);
    arc(0, 47, 70, 60, 200, 340);
    noStroke();
}

