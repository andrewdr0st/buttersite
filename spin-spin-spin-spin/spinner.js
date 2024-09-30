class Spinner {
    constructor() {
        this.x;
        this.y;
        this.s = 1;
        this.r = 0;
        this.spinV = 0;
        this.spinSlow = 180;
        this.spinning = false;
        this.sectors = [0, 0, 0, 0, 0, 0, 0, 0];
        this.backColor = color(30, 30, 30);
        this.highlightColor = color(220, 220, 220);
        this.highlightSector = 0;
    }

    draw() {
        push();
        translate(this.x, this.y);
        scale(this.s);
        fill(this.backColor);
        ellipse(0, 0, 400, 400);
        if (this.highlightSector >= 0) {
            let a = this.highlightSector * 45 - 90;
            fill(this.highlightColor);
            arc(0, 0, 402, 402, a - 23, a + 23);
        }
        for (let i = 0; i < 8; i++) {
            drawSector(i);
        }
        for (let i = 0; i < 8; i++) {
            let a = i * 45 + 22.5;
            if (this.highlightSector == i || (this.highlightSector + 7) % 8 == i) {
                fill(this.highlightColor);
            } else {
                fill(this.backColor);
            }
            push();
            rotate(a);
            rect(-2.5, -200, 5, 180);
            pop();
        }
        drawArrow(this.r);
        pop();
    }

    spin(v) {
        this.spinV = v;
        this.spinning = true;
    }

    update() {
        if (this.spinning) {
            this.r = (this.r + this.spinV * deltaTime) % 360;
            this.spinV -= this.spinSlow * deltaTime;
            if (this.spinV <= 0) {
                this.spinV = 0;
                this.spinning = false
            }
            this.highlightSector = Math.floor((this.r + 22.5) / 45) % 8;
        }
    }
}

function drawSector(id) {
    let a = id * 45 - 90;
    fill(120, 200, 130);
    arc(0, 0, 390, 390, a - 22.5, a + 22.5);
}

function drawArrow(r) {
    fill(50, 50, 50);
    ellipse(0, 0, 50, 50);
    push();
    rotate(r);
    triangle(-25, 0, 25, 0, 0, -60);
    pop();
}