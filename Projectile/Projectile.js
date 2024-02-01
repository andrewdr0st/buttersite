var projectiles = [];

class Projectile {
    constructor(sprite, damage, speed, lifespan, hitboxRadius, pierce, ignoreArmor) {
        this.sprite = sprite;
        this.damage = damage;
        this.speed = speed;
        this.lifespan = lifespan;
        this.hBox = hitboxRadius / 60;
        this.pierce = pierce;
        this.ignoreArmor = ignoreArmor;
        this.slow = 0;
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.active = false;
        this.hitEnemies = [];
        this.travelDistance = 0;
        this.drawOrder = 0;
    }

    launch(x, y, r) {
        this.active = true;
        this.r = r;
        this.xVelocity = this.speed * cos(r);
        this.yVelocity = this.speed * sin(r);
        this.x = x + this.xVelocity * 0.03;
        this.y = y + this.yVelocity * 0.03;
    }

    draw() {
        drawObject(this.sprite, this.x, this.y, this.r);
    }

    update() {
        this.x += this.xVelocity * deltaTime * 0.5;
        this.y += this.yVelocity * deltaTime * 0.5;
        this.lifespan -= deltaTime * 0.5;
        this.travelDistance += this.speed * deltaTime * 0.5;
        if (this.lifespan <= 0) {
            this.active = false;
        } else if (this.x <= -2 || this.x >= mapWidth + 2 || this.y <= -2 || this.y >= mapHeight + 2) {
            this.active = false;
        }
    }

    checkCollision() {
        for (let i = 0; i < enemies.length; i++) {
            let e = enemies[i];
            if (!e.active || !e.targetable || e.id == this.hitEnemies[0]) {
                continue;
            }
            if (this.pierce) {
                let skipE = false;
                for (let j = 0; j < this.hitEnemies.length; j++) {
                    if (e.id == this.hitEnemies[j]) {
                        skipE = true;
                        break;
                    }
                }
                if (skipE) {
                    continue;
                }
            }
            if (pointInCircle(e.x, e.y, this.x, this.y, 0.4 + this.hBox)) {
                e.takeDamage(this.damage, this.ignoreArmor);
                e.addSlow(this.slow);
                this.hitEnemies.push(e.id);
                if (!this.pierce) {
                    this.active = false;
                }
                break;
            }
        }
    }

}

class AreaProjectile extends Projectile {
    constructor(sprite, damage, speed, startScale, maxScale, ignoreArmor) {
        super(sprite, damage, speed, 0, startScale * 30, true, ignoreArmor);
        this.s = startScale;
        this.maxScale = maxScale + 0.1;
    }

    launch(x, y) {
        this.active = true;
        this.x = x;
        this.y = y;
    }

    draw() {
        drawObjectScaledArgs(this.sprite, this.x, this.y, 0, this.s, 2 / this.s);
    }

    update() {
        this.s += this.speed * deltaTime;
        this.travelDistance += this.speed * deltaTime;
        this.hBox = this.s * 0.5;
        if (this.s > this.maxScale) {
            this.active = false;
        }
    }
}

class BurstProjectile extends Projectile {
    constructor(sprite, damage, speed, lifespan, hitboxRadius, burstSprites, burstAngles, burstDamage, burstLifespan, burstRadius, ignoreArmor) {
        super(sprite, damage, speed, lifespan, hitboxRadius, false, ignoreArmor);
        this.burstSprites = burstSprites;
        this.burstAngles = burstAngles;
        this.burstDamage = burstDamage;
        this.burstLifespan = burstLifespan;
        this.burstRadius = burstRadius;
    }

    checkCollision() {
        super.checkCollision();
        if (!this.active) {
            for (let i = 0; i < this.burstSprites.length; i++) {
                let p = new Projectile(this.burstSprites[i], this.burstDamage, this.speed, this.burstLifespan, this.burstRadius, false);
                p.hitEnemies.push(this.hitEnemies[0]);
                console.log(p.hitEnemies);
                p.launch(this.x, this.y, this.r + this.burstAngles[i]);
                projectiles.push(p);
            }
        }
    }
}

function drawProjectiles(drawOrder) {
    for (let i = 0; i < projectiles.length; i++) {
        if (projectiles[i].drawOrder == drawOrder) {
            projectiles[i].draw();
        }
    }
}

function updateProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        if (!projectiles[i].active) {
            projectiles.splice(i, 1);
            i--;
            continue;
        }
        projectiles[i].update();
        projectiles[i].checkCollision();
        if (!projectiles[i].active) {
            projectiles.splice(i, 1);
            i--;
            continue;
        }
        projectiles[i].update();
        projectiles[i].checkCollision();
        if (projectiles[i].travelDistance > 0.4) {
            projectiles[i].drawOrder = 1;
        }
    }
}