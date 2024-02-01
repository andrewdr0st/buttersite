//Sprite, hp, armor, speed, liveCost

var enemyNames = ["circles", "squares", "triangles", "hexagons", "pluses", "gliders", "trapezoids"];

class Circle extends Enemy {
    constructor() {
        super(circleBoi, 25, 0, 2, 1);
    }

    powerUp() {
        this.sprite = strongCircleBoi;
        this.setHp(75);
        this.liveCost = 3;
    }

    chadUp() {
        this.sprite = chadCircle;
        this.setHp(180);
        this.liveCost = 6;
    }

    sigmaUp() {
        this.sprite = sigmaCircle;
        this.setHp(360);
        this.liveCost = 10;
    }
}



class Square extends Enemy {
    constructor() {
        super(squareBoi, 65, 2, 1.5, 2);
    }

    powerUp() {
        this.sprite = strongSquareBoi;
        this.setHp(165);
        this.armor = 3;
        this.liveCost = 4;
    }

    chadUp() {
        this.sprite = chadSquare;
        this.setHp(360);
        this.armor = 4;
        this.liveCost = 8;
    }

    sigmaUp() {
        this.sprite = sigmaSquare;
        this.setHp(600);
        this.armor = 5;
        this.liveCost = 12;
    }
}



class Triangle extends Enemy {
    constructor() {
        super(triangleBoi, 20, 0, 3.5, 1);
        this.rotator = true;
    }

    powerUp() {
        this.sprite = strongTriangleBoi;
        this.setHp(40);
        this.liveCost = 3;
        this.speed = 3.7;
    }

    chadUp() {
        this.sprite = chadTriangle;
        this.setHp(90);
        this.liveCost = 5;
        this.speed = 3.85;
    }

    sigmaUp() {
        this.sprite = sigmaTriangle;
        this.setHp(180);
        this.liveCost = 10;
        this.speed = 4;
    }
}



class Hexagon extends Enemy {
    constructor() {
        super(hexagonBoi, 175, 1, 1.15, 3);
    }

    powerUp() {
        this.sprite = strongHexagonBoi;
        this.setHp(400);
        this.liveCost = 6;
    }

    chadUp() {
        this.sprite = chadHexagon;
        this.setHp(900);
        this.liveCost = 10;
    }

    sigmaUp() {
        this.sprite = sigmaHexagon;
        this.setHp(1750);
        this.liveCost = 15;
    }
}



class Plus extends Enemy {
    constructor() {
        super(plusBoi, 60, 0, 1.75, 2);
        this.shieldRecharge = 2.25;
        this.shieldCooldown = 0;
        this.shielded = true;
    }

    draw() {
        super.draw();
        if (this.shielded) {
            drawObject(plusShield, this.x, this.y, 0);
        }
    }

    takeDamage(amount) {
        if (this.shielded) {
            this.shielded = false;
            this.shieldCooldown = this.shieldRecharge;
        } else {
            super.takeDamage(amount);
        }
    }

    move() {
        super.move();
        if (!this.shielded) {
            this.shieldCooldown -= deltaTime;
            if (this.shieldCooldown <= 0) {
                this.shielded = true;
            }
        }
    }

    powerUp() {
        this.sprite = strongPlusBoi;
        this.setHp(125);
        this.liveCost = 4;
        this.shieldRecharge = 2;
    }

    chadUp() {
        this.sprite = chadPlus;
        this.setHp(250);
        this.liveCost = 8;
        this.shieldRecharge = 1.75;
    }

    sigmaUp() {
        this.sprite = sigmaPlus;
        this.setHp(420);
        this.liveCost = 12;
        this.shieldRecharge = 1.5;
    }
}


class Glider extends Enemy {
    constructor() {
        super(gliderBoi, 10, 0, 3, 1);
        this.rotator = true;
        this.speedBoost = 3;
        this.boostDuration = 3.5;
        this.boosting = true;
        this.applyBoost();
    }

    move() {
        super.move();
        if (this.boosting) {
            this.boostDuration -= deltaTime;
            if (this.boostDuration <= 0) {
                this.boosting = false;
                this.speed -= this.speedBoost;
            }
        }
    }

    applyBoost() {
        this.speed = 3 + this.speedBoost;
    }

    powerUp() {
        this.sprite = strongGliderBoi;
        this.setHp(30);
        this.liveCost = 3;
        this.speedBoost = 3.5;
        this.applyBoost();
    }

    chadUp() {
        this.sprite = chadGlider;
        this.setHp(60);
        this.liveCost = 5;
        this.speedBoost = 4;
        this.applyBoost();
    }

    sigmaUp() {
        this.sprite = sigmaGlider;
        this.setHp(90);
        this.liveCost = 8;
        this.speedBoost = 4.5;
        this.applyBoost();
    }
}


class Trapezoid extends Enemy {
    constructor() {
        super(trapezoidBoi, 40, 5, 2.5, 3);
        this.rotator = true;
        this.trapRadius = 3;
        this.trapDuration = 1.5;
    }

    takeDamage(amount, ignoreArmor) {
        super.takeDamage(amount, ignoreArmor);
        if (!this.active) {
            for (let i = 0; i < turrets.length; i++) {
                let t = turrets[i];
                if (pointInCircle(t.x, t.y, this.x, this.y, this.trapRadius)) {
                    t.goHaywire(this.trapDuration);
                }
            }
            createStaticParticle(trapStun, this.x, this.y, this.trapRadius * 2, 0.2);
        }
    }

    powerUp() {
        this.sprite = strongTrapezoidBoi;
        this.setHp(70);
        this.liveCost = 6;
        this.trapDuration = 1.75;
        this.trapRadius = 3.5;
    }

    chadUp() {
        this.sprite = chadTrapezoid;
        this.setHp(110);
        this.liveCost = 9;
        this.trapDuration = 2;
        this.trapRadius = 4;
    }

    sigmaUp() {
        this.sprite = sigmaTrapezoid;
        this.setHp(150);
        this.liveCost = 12;
        this.trapDuration = 2.25;
        this.trapRadius = 4.5;
    }
}


class Octogon extends Enemy {
    constructor() {
        super(octogonBoi, 800, 2, 0.85, 5);
    }

    powerUp() {
        this.sprite = strongOctogonBoi;
        this.setHp(2000);
        this.liveCost = 10;
    }

    chadUp() {
        this.sprite = chadOctogon;
        this.setHp(3600);
        this.liveCost = 16;
    }

    sigmaUp() {
        this.sprite = sigmaOctogon;
        this.setHp(5000);
        this.liveCost = 24;
    }
}


class Ring extends Enemy {
    constructor() {
        super(ringBoi, 60, 3, 2, 3);
        this.baseSprite = ringBoi;
        this.invisSprite = ringBoiClear;
        this.invis = false;
        this.invisTime = 3.5;
        this.hpCutoff = 30;
    }

    takeDamage(amount, ignoreArmor) {
        super.takeDamage(amount, ignoreArmor);
        if (this.invisTime > 0 && this.hp <= this.hpCutoff) {
            this.invis = true;
            this.targetable = false;
            this.sprite = this.invisSprite;
        }
    }

    move() {
        super.move();
        if (this.invis) {
            this.invisTime -= deltaTime;
            if (this.invisTime <= 0) {
                this.invis = false;
                this.targetable = true;
                this.sprite = this.baseSprite;
            }
        }
    }

    powerUp() {
        this.setHp(120);
        this.liveCost = 6;
        this.hpCutoff = 60;
        this.sprite = strongRingBoi;
        this.baseSprite = strongRingBoi;
        this.invisSprite = strongRingBoiClear;
    }

    chadUp() {
        this.setHp(180);
        this.liveCost = 9;
        this.hpCutoff = 90;
        this.sprite = chadRing;
        this.baseSprite = chadRing;
        this.invisSprite = chadRingClear;
    }

    sigmaUp() {
        this.setHp(250);
        this.liveCost = 12;
        this.hpCutoff = 125;
        this.sprite = sigmaRing;
        this.baseSprite = sigmaRing;
        this.invisSprite = sigmaRingClear;
    }
}


function getBonusEnemy() {
    let maxVal = 3;
    if (currentPlanet > 3) {
        maxVal = 7;
    } else if (currentPlanet > 2) {
        maxVal = 5;
    }
    return floor(random(0, maxVal));
}

