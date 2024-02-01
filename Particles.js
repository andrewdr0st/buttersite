

var particles = [];

class Particle {
    constructor(sprite, x, y, r, s, xVel, yVel, rChange, sChange, lifespan) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.r = r;
        this.s = s;
        this.xVel = xVel;
        this.yVel = yVel;
        this.rChange = rChange;
        this.sChange = sChange;
        this.lifespan = lifespan;
        this.active = true;
    }

    draw() {
        drawObjectScaled(this.sprite, this.x, this.y, this.r, this.s);
    }

    update() {
        this.x += this.xVel * deltaTime;
        this.y += this.yVel * deltaTime;
        this.s += this.sChange * deltaTime;
        this.lifespan -= deltaTime;
        if (this.lifespan <= 0) {
            this.active = false;
        }
    }
}

function runParticles() {
    for (let i = 0; i < particles.length; i++) {
        if (!particles[i].active) {
            particles.splice(i, 1);
            i--;
            continue;
        }
        particles[i].update();
        particles[i].draw();
    }
}

function addParticle(p) {
    particles.push(p);
}

function createStaticParticle(sprite, x, y, s, lifespan) {
    let p = new Particle(sprite, x, y, 0, s, 0, 0, 0, 0, lifespan);
    addParticle(p);
}



function trapStun() {
    fill(230, 230, 50, 40);
    ellipse(0, 0, 60, 60);
}

function scrapBit() {
    fill(80, 40, 10);
    triangle(0, -4, -4, 2, 3, 3);
}

function blueBit() {
    fill(40, 150, 200);
    ellipse(0, 0, 15, 15);
}

function purpleBit() {
    fill(150, 40, 200);
    ellipse(0, 0, 15, 15);
}

function pinkBit() {
    fill(210, 40, 150);
    ellipse(0, 0, 15, 15);
}

function redBit() {
    fill(220, 40, 80);
    ellipse(0, 0, 15, 15);
}
