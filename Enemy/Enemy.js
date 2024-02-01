
var enemies = [];
var enemiesHpSorted = [];
var enemiesDangerSorted = [];
var nextEnemyId = 1;

class Enemy {
    constructor(sprite, hp, armor, speed, liveCost) {
        this.sprite = sprite;
        this.hp = hp;
        this.maxHp = hp;
        this.armor = armor;
        this.speed = speed;
        this.liveCost = liveCost;
        this.baseLiveCost = liveCost;
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.forwardX = 0;
        this.forwardY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.travelX = 0;
        this.travelY = 0;
        this.distTraveled = 0;
        this.r = 0;
        this.pathStage = 0;
        this.active = false;
        this.targetable = true;
        this.rotator = false;
        this.slow = 0;
        this.dangerValue = 0;
        this.particleSprite = blueBit;
    }

    draw() {
        drawObject(this.sprite, this.x, this.y, this.r);
    }

    reset() {
        this.pathStage = 0;
        this.active = true;
        this.x = path[0][0] - 1;
        this.y = path[0][1] - 1;
        this.forwardX = this.x;
        this.forwardY = this.y;
        this.baseLiveCost = this.liveCost;
        this.updatePath();
        this.lastMillis = millis();
    }

    move() {
        let moveMod = 1;
        if (this.slow > 0) {
            this.slow = max(0, this.slow - deltaTime);
            moveMod = 0.6;
        }
        if (this.travelX != 0) {
            let lastX = this.x;
            this.x += deltaTime * this.speed * this.travelX * moveMod;
            if (this.travelX == -1) {
                this.x = max(this.x, this.targetX);
                this.forwardX = max(this.x + this.travelX * (0.18 * this.speed), this.targetX);
            } else {
                this.x = min(this.x, this.targetX);
                this.forwardX = min(this.x + this.travelX * (0.18 * this.speed), this.targetX);
            }
            if (this.x == this.targetX) {
                this.updatePath();
            }
            this.distTraveled += abs(lastX - this.x);
            this.forwardY = this.y + this.travelY * (0.18 * this.speed);
        }
        if (this.travelY != 0) {
            let lastY = this.y;
            this.y += deltaTime * this.speed * this.travelY * moveMod;
            if (this.travelY == -1) {
                this.y = max(this.y, this.targetY);
                this.forwardY = max(this.y + this.travelY * (0.18 * this.speed), this.targetY);
            } else {
                this.y = min(this.y, this.targetY);
                this.forwardY = min(this.y + this.travelY * (0.18 * this.speed), this.targetY);
            }
            if (this.y == this.targetY) {
                this.updatePath();
            }
            this.distTraveled += abs(lastY - this.y);
            this.forwardX = this.x + this.travelX * (0.18 * this.speed);
        }
        this.updateLiveCost();
    }

    updatePath() {
        this.pathStage++;
        if (this.pathStage == path.length) {
            this.active = false;
            changeLives(-this.liveCost);
            return;
        }
        let distance = path[this.pathStage][1];
        if (this.pathStage == path.length - 1) {
            distance++;
        }
        switch(path[this.pathStage][0]) {
            case 0:
                this.targetY = this.y - distance;
                this.travelX = 0;
                this.travelY = -1;
                break;
            case 1:
                this.targetX = this.x + distance;
                this.travelX = 1;
                this.travelY = 0;
                break;
            case 2:
                this.targetY = this.y + distance;
                this.travelX = 0;
                this.travelY = 1;
                break;
            case 3:
                this.targetX = this.x - distance;
                this.travelX = -1;
                this.travelY = 0;
                break;
        }
        if (this.rotator) {
            this.r = ((path[this.pathStage][0] + 3) % 4) * 90;
        }
    }

    updateLiveCost() {
        this.liveCost = ceil(this.baseLiveCost * (this.hp / this.maxHp));
        this.dangerValue = this.liveCost * 2 + max(0, this.distTraveled - 16);
    }

    takeDamage(amount, ignoreArmor) {
        let originalHp = this.hp;
        if (ignoreArmor) {
            this.hp -= amount
        } else {
            this.hp -= max(0, amount - this.armor);
        }
        if (this.hp <= 0) {
            this.active = false;
        }
        let pCount = 0;
        let damageTaken = originalHp - this.hp;
        if (damageTaken > 70) {
            pCount = 4;
        } else if (damageTaken > 30) {
            pCount = 3;
        } else if (damageTaken > 8) {
            pCount = 2;
        } else if (damageTaken > 0) {
            pCount = 1;
        }
        if (this.hp <= 0) {
            pCount += 3;
        }
        for (let i = 0; i < pCount; i++) {
            let r = random(0, 360);
            let p = new Particle(this.particleSprite, this.x + cos(r) * 0.4, this.y + sin(r) * 0.4, 0, random(0.6, 1), cos(r) * 2, sin(r) * 2, 0, random(-1, -1.75), 0.25);
            addParticle(p);
        }
    }

    setHp(value) {
        this.hp = value;
        this.maxHp = value;
    }

    addSlow(amount) {
        this.slow += amount;
    }

    powerUp() {
        
    }

    chadUp() {
        
    }

    sigmaUp() {
        
    }
}

function addEnemy(e) {
    e.id = nextEnemyId;
    nextEnemyId++;
    enemies.push(e);
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function updateEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        if (!enemies[i].active) {
            enemies.splice(i, 1);
            i--;
            continue;
        }
        enemies[i].move();
    }
}

function sortEnemies() {
    enemies.sort((a, b) => b.distTraveled - a.distTraveled);
    enemiesHpSorted = Array.from(enemies);
    enemiesHpSorted.sort((a, b) => b.hp - a.hp);
    enemiesDangerSorted = Array.from(enemies);
    enemiesDangerSorted.sort((a, b) => b.dangerValue - a.dangerValue);
}

