
function bullet() {
    fill(50, 40, 40);
    ellipse(0, 0, 19, 19);
}

function smallBullet() {
    fill(50, 40, 40);
    ellipse(0, 0, 14, 14);
}

function bigBullet() {
    fill(50, 40, 40);
    ellipse(0, 0, 27, 27);
}

function waterBullet() {
    fill(130, 170, 220);
    ellipse(0, 0, 15, 15);
}

function energyBall() {
    fill(100, 40, 180);
    ellipse(0, 0, 24, 24);
}

function sting() {
    fill(55, 55, 55);
    triangle(10, 0, -10, -7, -10, 7);
}

function shockwave(s) {
    stroke(230, 230, 230);
    strokeWeight(7 * s);
    push();
    for (let i = 0; i < 6; i++) {
        line(-17, 30, 0, 25);
        line(0, 25, 17, 30);
        rotate(60);
    }
    pop();
    noStroke();
}

function snowball() {
    fill(230, 230, 230);
    ellipse(0, 0, 16, 16);
}

function gooBall() {
    fill(150, 40, 150);
    ellipse(0, 0, 15, 15);
}

function waterWave(s) {
    noFill();
    stroke(130, 170, 220, 255 * (s + 0.4));
    strokeWeight(5 * s);
    ellipse(0, 0, 60, 60);
    ellipse(0, 0, 52, 52);
    noStroke();
}

function starBullet() {
    strokeWeight(5);
    stroke(200, 100, 200, 180);
    line(0, 0, -45, 0);
    stroke(230, 100, 140, 180);
    line(0, 0, -40, 9);
    stroke(140, 100, 230, 180);
    line(0, 0, -40, -9);
    stroke(230, 230, 180);
    strokeWeight(6);
    push();
    for (let i = 0; i < 5; i++) {
        line(0, 0, 10, 0);
        rotate(72);
    }
    pop();
    noStroke();
}

function firework() {
    fill(230, 70, 70);
    triangle(9, 0, -1, 9, -1, -9);
    rect(0, -5, -14, 10);
}

function redSpark() {
    stroke(250, 130, 130);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function orangeSpark() {
    stroke(250, 190, 130);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function yellowSpark() {
    stroke(220, 220, 130);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function greenSpark() {
    stroke(130, 250, 130);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function cyanSpark() {
    stroke(120, 220, 220);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function blueSpark() {
    stroke(130, 130, 250);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function purpleSpark() {
    stroke(180, 130, 250);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function pinkSpark() {
    stroke(250, 130, 190);
    strokeWeight(4);
    line(-4, 0, 4, 0);
    line(0, -4, 0, 4);
}

function heatBullet() {
    fill(230, 50, 40);
    ellipse(0, 0, 19, 19);
}
