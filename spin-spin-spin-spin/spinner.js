class Spinner {
    constructor() {
        this.x;
        this.y;
        this.s = 1;
        this.r = 0;
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
            arc(0, 0, 400, 400, a - 22.5, a + 22.5);
        }
        for (let i = 0; i < 8; i++) {
            drawSector(i);
        }
        for (let i = 0; i < 8; i++) {
            let a = i * 45 + 22.5;
            if (this.highlightSector == i || (this.highlightSector - 1) % 8 == i || i == 7) {
                fill(this.highlightColor);
            } else {
                fill(this.backColor);
            }
            push();
            rotate(a);
            rect(-2.5, -195, 5, 200);
            pop();
        }
        pop();
    }
}

function drawSector(id) {
    let a = id * 45 - 90;
    fill(120, 200, 130);
    arc(0, 0, 390, 390, a - 22.5, a + 22.5);
}

function drawArrow(r) {

}