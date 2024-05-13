//name, sprite, range, damage, fire rate, cost, proj sprite, p speed, p radius

var startingPicks = [2, 3, 4, 5, 6, 7, 8];
var availiableTowers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22];
var storeTowerList = [15, 16, 23, 24, 25, 26];

function getRandomTowerId() {
    let index = floor(random(0, availiableTowers.length));
    return availiableTowers[index];
}

function removeTowerId(id) {
    for (let i = 0; i < availiableTowers.length; i++) {
        if (availiableTowers[i] == id) {
            availiableTowers.splice(i, 1);
            break;
        }
    }
}

function getTower(id) {
    if (id == 0) {
        return new Miner();
    } else if (id == 1) {
        return new Cannon();
    } else if (id == 2) {
        return new MachineGunner();
    } else if (id == 3) {
        return new Sniper();
    } else if (id == 4) {
        return new TriShooter();
    } else if (id == 5) {
        return new Shotgunner();
    } else if (id == 6) {
        return new Sentry();
    } else if (id == 7) {
        return new Shockwave();
    } else if (id == 8) {
        return new Stinger();
    } else if (id == 9) {
        return new MiniCannon();
    } else if (id == 10) {
        return new Bruiser();
    } else if (id == 11) {
        return new GrowthCannon();
    } else if (id == 12) {
        return new WaveBreaker();
    } else if (id == 13) {
        return new ChargeBlaster();
    } else if (id == 14) {
        return new IceBlaster();
    } else if (id == 15) {
        return new SnowballLauncher();
    } else if (id == 16) {
        return new Glubba();
    } else if (id == 17) {
        return new BigShot();
    } else if (id == 18) {
        return new ShootingStar();
    } else if (id == 19) {
        return new UltimateWeapon();
    } else if (id == 20) {
        return new Splitter();
    } else if (id == 21) {
        return new Firecracker();
    } else if (id == 22) {
        return new Gazer();
    } else if (id == 23) {
        return new PrototypeY();
    } else if (id == 24) {
        return new ScrapCannon();
    } else if (id == 25) {
        return new MiningRig();
    } else if (id == 26) {
        return new HeatBlaster();
    }
}


class Miner extends Turret {
    constructor() {
        super("Miner", miner, 0, 0, 0, 250);
        this.canAttack = false;
        this.canRotate = false;
        this.description = "Produces 100 tidbits each wave.";
    }

    startOfTurn() {
        tidbits += minerTidbitGain;
    }

    onPurchase() {
        ownedTowers[0].cost += 50;
        ownedTowers[0].baseCost += 50;
        placedMiners++;
        for (let i = 0; i < turrets.length; i++) {
            if (turrets[i].gizmo1 != null && (turrets[i].gizmo1.name == "Naturalization" || turrets[i].gizmo1.name == "Industrialization")) {
                turrets[i].gizmo1.onMinerPlaced(turrets[i]);
            }
            if (turrets[i].gizmo2 != null && (turrets[i].gizmo2.name == "Naturalization" || turrets[i].gizmo2.name == "Industrialization")) {
                turrets[i].gizmo2.onMinerPlaced(turrets[i]);
            }
        }
    }
}

class Cannon extends Turret {
    constructor() {
        super("Cannon", cannon, 7, 10, 1, 200, bullet, 14, 10);
        this.description = "A basic turret.";
        this.color = color(220, 50, 50);
    }
}

class MachineGunner extends Turret {
    constructor() {
        super("Machine Gun", repeater, 6, 6, 0.25, 400, bullet, 14, 10);
        this.description = "Fires very quickly, but deals little damage.";
        this.color = color(20, 170, 220);
    }
    
}

class Sniper extends Turret {
    constructor() {
        super("Sniper", sniper, 12, 45, 3, 300, smallBullet, 24, 7);
        this.description = "Deals large damage over a long range.";
        this.color = color(50, 50, 50);
        //this.dmgText = " \u0D9E"
    }
}

class TriShooter extends Turret {
    constructor() {
        super("Tri-Shooter", triShooter, 7, 10, 1.25, 350, smallBullet, 14, 7);
        this.description = "Fires three shots at once.";
        this.color = color(220, 50, 50);
        this.dmgText = " \u00D7 3";
    }

    fire() {
        let fireR = this.r - 30;
        for (let i = 0; i < 3; i++) {
            let p = this.createProjectile();
            p.launch(this.x, this.y, fireR);
            projectiles.push(p);
            fireR += 30;
        }
    }
}

class Shotgunner extends Turret {
    constructor() {
        super("Shotgunner", shotgunner, 6, 12, 2.25, 600, smallBullet, 12, 7);
        this.pLifespan = 0.5;
        this.description = "Fires a spread of bullets over a short range.";
        this.color = color(195, 100, 10);
        this.dmgText = " \u00D7 8";
    }

    fire() {
        for (let i = 0; i < 8; i++) {
            let p = this.createProjectile();
            p.launch(this.x, this.y, random(this.r - 20, this.r + 20));
            projectiles.push(p);
        }
    }
}

class Sentry extends Turret {
    constructor() {
        super("Sentry", sentry, 10, 18, 0.5, 700, bullet, 18, 10);
        this.description = "Attacks quickly over a large range.";
        this.plural = "Sentries";
        this.color = color(50, 50, 50);
    }
}

class Shockwave extends Turret {
    constructor() {
        super("Shockwave", shockwaveT, 4, 10, 1.5, 450, shockwave, 12, 0.8);
        this.description = "Damages all enemies in range."
        this.color = color(140, 60, 130);
        this.canRotate = false;
        this.areaProjectile = true;
    }
}

class Stinger extends Turret {
    constructor() {
        super("Stinger", stinger, 9, 7, 1.5, 250, sting, 20, 9);
        this.description = "Attacks can pierce through enemies.";
        this.color = color(210, 210, 60);
        this.pierce = true;
    }
}

class MiniCannon extends Turret {
    constructor() {
        super("Mini Cannon", miniCannon, 5, 5, 0.75, 100, smallBullet, 13, 7);
        this.description = "Very cheap, but very weak.";
        this.color = color(220, 50, 50);
    }
}

class Bruiser extends Turret {
    constructor() {
        super("Bruiser", bruiser, 7, 50, 1.5, 500, bullet, 14, 10);
        this.description = "Deals heavy damage.";
        this.color = color(220, 50, 50);
    }
}

class GrowthCannon extends Turret {
    constructor() {
        super("Growth Cannon", growthCannon, 8, 14, 0.75, 400, bullet, 16, 10);
        this.description = "Gets stronger after each wave.";
        this.color = color(10, 200, 140);
    }

    startOfTurn() {
        super.startOfTurn();
        this.damageMod += 0.075;
        this.calculateStats();
    }
}

class WaveBreaker extends Turret {
    constructor() {
        super("Wave Breaker", waveBreaker, 15, 10, 2, 1000, waterWave, 15, 1);
        this.canRotate = false;
        this.areaProjectile = true;
        this.description = "Damages all enemies in a large range.";
        this.color = color(20, 170, 220);
    }
}

class ChargeBlaster extends Turret {
    constructor() {
        super("Charge Blaster", chargeBlaster, 6, 25, 1.75, 100, energyBall, 16, 12);
        this.charges = 4;
        this.spriteList = [chargeBlaster0, chargeBlaster1, chargeBlaster2, chargeBlaster3];
        this.description = "Can only fire four times each wave.";
        this.color = color(50, 50, 50);
    }

    startOfTurn() {
        super.startOfTurn();
        this.sprite = chargeBlaster;
        this.charges = 4;
        this.canAttack = true;
        this.canRotate = true;
    }

    fire() {
        super.fire();
        this.charges--;
        this.sprite = this.spriteList[this.charges];
        if (this.charges == 0) {
            this.canAttack = false;
            this.canRotate = false;
        }
    }
}

class IceBlaster extends Turret {
    constructor() {
        super("Ice Blaster", iceBlaster, 8, 25, 2, 350, snowball, 18, 9);
        this.description = "Attacks slow down enemies.";
        this.color = color(50, 110, 230);
        this.slow = 6;
    }

    fire() {
        let p = this.createProjectile();
        p.slow = this.slow;
        p.launch(this.x, this.y, this.r);
        projectiles.push(p);
    }
}

class SnowballLauncher extends Turret {
    constructor() {
        super("Snowballer", snowballLauncher, 8, 7, 0.75, 800, snowball, 18, 9);
        this.pLifespan = 0.8;
        this.description = "Launches a spread of snowballs that slow enemies.";
        this.color = color(230, 230, 230);
        this.dmgText = " \u00D7 4";
        this.slow = 1.5;
        this.storeCost = 2;
    }

    fire() {
        for (let i = 0; i < 4; i++) {
            let p = this.createProjectile();
            p.slow = this.slow;
            p.launch(this.x, this.y, random(this.r - 15, this.r + 15));
            projectiles.push(p);
        }
    }
}

class Glubba extends Turret {
    constructor() {
        super("Glubba", glubba, 10, 12, 0.25, 900, gooBall, 20, 8);
        this.description = "Quickly fires goo that ignores enemy armor.";
        this.color = color(150, 40, 150);
        this.storeCost = 2;
        this.ignoreArmor = true;
    }
}

class BigShot extends Turret {
    constructor() {
        super("Big Shot", bigShot, 5, 120, 3.5, 400, bigBullet, 12, 14);
        this.description = "Deals absurd damage but fires slowly.";
        this.color = color(150, 30, 30);
    }
}

class ShootingStar extends Turret {
    constructor() {
        super("Shooting Star", shootingStar, 10, 20, 1.75, 750, starBullet, 21, 10);
        this.description = "Fires a powerful piercing star.";
        this.color = color(210, 210, 60);
        this.pierce = true;
    }
}

class UltimateWeapon extends Turret {
    constructor() {
        super("Ultimate Weapon", ultimateWeapon, 12, 18, 0.25, 1250, bullet, 25, 10);
        this.description = "Destroys everything it sees.";
        this.color = color(20, 170, 220);
    }
}

class Splitter extends Turret {
    constructor() {
        super("Splitter", splitter, 6, 18, 1.25, 300, bullet, 18, 10);
        this.description = "Bullets split into two half damage bullets on impact.";
        this.color = color(230, 30, 120);
    }

    createProjectile() {
        return new BurstProjectile(this.pSprite, this.damage, this.pSpeed, this.pLifespan, this.pRadius, [smallBullet, smallBullet], [-30, 30], floor(this.damage / 2), this.pLifespan, 7, this.ignoreArmor);
    }

}

class Firecracker extends Turret {
    constructor() {
        super("Firecracker", firecracker, 9, 32, 1.5, 750, firework, 24, 8);
        this.description = "Fires rockets that burst into many sparks.";
        this.color = color(230, 30, 120);
        this.pLifespan = 0.25;
        this.sparkDamage = 8;
        this.minSparks = 20;
        this.maxSparks = 25;
        this.sparkSprites = [redSpark, orangeSpark, yellowSpark, greenSpark, cyanSpark, blueSpark, purpleSpark, pinkSpark];
    }

    createProjectile() {
        let sparkSprites = [];
        let sparkAngles = [];
        let r = floor(random(this.minSparks, this.maxSparks + 1));
        for (let i = 0; i < r; i++) {
            sparkSprites.push(random(this.sparkSprites));
            sparkAngles.push(random(0, 360));
        }
        return new BurstProjectile(this.pSprite, this.damage, this.pSpeed, this.pLifespan, this.pRadius, sparkSprites, sparkAngles, this.sparkDamage, 0.085, 5, this.ignoreArmor);
    }
}

class Gazer extends Turret {
    constructor() {
        super("Gazer", gazer, 16, 20, 1, 500, smallBullet, 24, 7);
        this.description = "Has an enormous range.";
        this.color = color(40, 90, 140);
    }
}

class PrototypeY extends Turret {
    constructor() {
        super("Prototype Y", prototypeY, 7, 15, 1, 150, smallBullet, 14, 7);
        this.description = "Utilizes a strange aiming method.";
        this.color = color(220, 50, 50);
        this.dmgText = " \u00D7 3";
        this.canRotate = false;
        this.storeCost = 1;
        this.plural = "Prototype Y's";
    }

    fire() {
        let fireR = this.r - 180;
        for (let i = 0; i < 3; i++) {
            let p = this.createProjectile();
            p.launch(this.x, this.y, fireR);
            projectiles.push(p);
            fireR += 120;
        }
    }

    onPurchase() {
        super.onPurchase();
        this.canRotate = true;
    }
}

class ScrapCannon extends Turret {
    constructor() {
        super("Scrap Cannon", scrapCannon, 6, 12, 1.25, 200, smallBullet, 14, 7);
        this.description = "Falls apart after three waves.";
        this.color = color(80, 40, 10);
        this.dmgText = " \u00D7 2";
        this.lifespan = 3;
        this.canSell = false;
        this.storeCost = 1;
    }

    fire() {
        let rot = -7;
        for (let i = 0; i < 2; i++) {
            let p = this.createProjectile();
            p.launch(this.x, this.y, this.r + rot);
            projectiles.push(p);
            rot += 14;
        }
    }

    startOfTurn() {
        this.lifespan--;
        if (this.lifespan <= 0) {
            for (let i = 0; i < turrets.length; i++) {
                let t = turrets[i];
                if (t.x == this.x && t.y == this.y) {
                    turrets.splice(i, 1);
                    removePlacement(t.x, t.y);
                    this.onDestroy();
                    break;
                }
            }
        }
        super.startOfTurn();
    }
}

class MiningRig extends Turret {
    constructor() {
        super("Mining Rig", miningRig, 4, 28, 1.75, 450, bullet, 14, 10);
        this.description = "Produces 75 tidbits each wave.";
        this.color = color(50, 50, 50);
        this.storeCost = 3;
    }

    startOfTurn() {
        tidbits += 75;
        super.startOfTurn();
    }
}

class HeatBlaster extends Turret {
    constructor() {
        super("Heat Blaster", heatBlaster, 6, 36, 1.5, 700, heatBullet, 16, 10);
        this.description = "Fire rate increases after each shot.";
        this.color = color(50, 50, 50);
        this.storeCost = 2;
        this.heatVal = 50;
        this.heatChange = 0;
    }

    draw() {
        drawObjectScaledArgs(this.sprite, this.x, this.y, this.r, 1, this.heatVal * 1.25);
    }

    fire() {
        super.fire();
        if (this.heatVal < 50) {
            this.heatVal += 2;
            this.fireRate = floor(this.fr * (1 - 0.01 * this.heatVal) * 100) / 100;
        }
    }

    startOfTurn() {
        this.heatVal = 0;
        this.calculateStats();
        super.startOfTurn();
        this.fr = this.fireRate;
    }

    onPurchase() {
        super.onPurchase();
        this.heatVal = 0;
        this.fr = this.fireRate;
    }
}
