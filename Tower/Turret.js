
class Turret {
    constructor(name, sprite, range, damage, fireRate, cost, pSprite, pSpeed, pRadius) {
        this.sprite = sprite;
        this.range = range;
        this.baseRange = range;
        this.damage = damage;
        this.baseDamage = damage;
        this.damageMod = 0;
        this.fireRate = fireRate;
        this.baseFireRate = fireRate;
        this.fireCountdown = 0;
        this.cost = cost;
        this.baseCost = cost;
        this.tempCostMod = 0;
        this.sellAmount = 0;
        this.pSprite = pSprite;
        this.pSpeed = pSpeed;
        this.pRadius = pRadius;
        this.pLifespan = 5;
        this.pierce = false;
        this.ignoreArmor = false;
        this.areaProjectile = false;
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.target = null;
        this.targetMode = 0;
        this.canAttack = true;
        this.canRotate = true;
        this.canSell = true;
        this.name = name;
        this.description = "";
        this.dmgText = "";
        this.gizmo1 = null;
        this.gizmo2 = null;
        this.unique = false;
        this.forceUnique = false;
        this.unavailable = false;
        this.banned = false;
        this.haywire = false;
        this.haywireSpeed = 0;
        this.haywireDuration = 0;
        this.sigma = false;
        this.shortCircuit = false;
        this.scCount = 0;
        this.plural = "";
    }

    draw() {
        drawObject(this.sprite, this.x, this.y, this.r);
    }

    inRange(x, y) {
        return pointInCircle(x, y, this.x, this.y, this.range / 2 + 0.4);
    }

    findTarget() {
        if (this.targetMode == 0) {
            for (let i = 0; i < enemies.length; i++) {
                let e = enemies[i];
                if (this.inRange(e.x, e.y) && e.targetable) {
                    this.target = e;
                    return;
                }
            }
        } else if (this.targetMode == 1) {
            for (let i = enemies.length - 1; i >= 0; i--) {
                let e = enemies[i];
                if (this.inRange(e.x, e.y) && e.targetable) {
                    this.target = e;
                    return;
                }
            }
        } else if (this.targetMode == 2) {
            for (let i = 0; i < enemiesHpSorted.length; i++) {
                let e = enemiesHpSorted[i];
                if (this.inRange(e.x, e.y) && e.targetable) {
                    this.target = e;
                    return;
                }
            }
        } else if (this.targetMode == 3) {
            for (let i = 0; i < enemiesDangerSorted.length; i++) {
                let e = enemiesDangerSorted[i];
                if (this.inRange(e.x, e.y) && e.targetable) {
                    this.target = e;
                    return;
                }
            }
        }
        this.target = null;
    }

    lookAtTarget() {
        this.r = atan2(this.target.forwardY - this.y, this.target.forwardX - this.x);
    }

    update() {
        if (!this.canAttack) {
            return;
        }
        if (this.haywire) {
            this.r += this.haywireSpeed * deltaTime;
            this.haywireDuration -= deltaTime;
            if (this.haywireDuration <= 0) {
                this.haywire = false;
                this.r = 0;
            }
            return;
        }
        if (this.shortCircuit && waveInProgress) {
            console.log(this.scCount)
            this.scCount -= deltaTime;
            if (this.scCount <= 0) {
                this.goHaywire(random(1.25, 2));
                this.scCount = random(11, 14);
            }
        }
        this.fireCountdown -= deltaTime;
        this.findTarget();
        if (this.target != null) {
            if (this.canRotate) {
                this.lookAtTarget();
            }
            if (this.fireCountdown <= 0) {
                this.fireCountdown = this.fireRate;
                this.fire();
            }
        }
    }

    createProjectile() {
        if (this.areaProjectile) {
            return new AreaProjectile(this.pSprite, this.damage, this.pSpeed, this.pRadius, this.range, this.ignoreArmor);
        } else {
            return new Projectile(this.pSprite, this.damage, this.pSpeed, this.pLifespan, this.pRadius, this.pierce, this.ignoreArmor);
        }
    }

    fire() {
        let p = this.createProjectile();
        p.launch(this.x, this.y, this.r);
        projectiles.push(p);
    }

    drawRange() {
        drawObjectScaled(rangeMarker, this.x, this.y, 0, this.range);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    startOfTurn() {
        if (this.gizmo1 != null) {
            this.gizmo1.onStartOfTurn();
        }
        if (this.gizmo2 != null) {
            this.gizmo2.onStartOfTurn();
        }
        this.gizmoUpdate();
    }

    onPurchase() {
        this.sellAmount = floor(this.cost / 2);
        if (this.gizmo1 != null) {
            this.gizmo1.onPurchase(this);
        }
        if (this.gizmo2 != null) {
            this.gizmo2.onPurchase(this);
        }
        this.gizmoUpdate();
    }

    onSell() {
        if (this.gizmo1 != null) {
            this.gizmo1.onSell();
        }
        if (this.gizmo2 != null) {
            this.gizmo2.onSell();
        }
        if (this.canSell) {
            tidbits += this.sellAmount;
        }
        if (this.unique && !this.banned) {
            for (let i = 1; i < ownedTowers.length; i++) {
                if (ownedTowers[i].name == this.name) {
                    ownedTowers[i].unavailable = false;
                    break;
                }
            }
        }
    }

    equipGizmo(gizmo, slot) {
        if (slot == 1) {
            if (this.gizmo1 != null) {
                this.gizmo1.onUnequip(this);
            }
            this.gizmo1 = gizmo;
        } else {
            if (this.gizmo2 != null) {
                this.gizmo2.onUnequip(this);
            }
            this.gizmo2 = gizmo;
        }
        if (gizmo != null) {
            gizmo.onEquip(this);
        }
        this.calculateStats();
    }

    copyGizmos() {
        if (this.gizmo1 != null) {
            this.gizmo1 = Object.create(this.gizmo1);
        }
        if (this.gizmo2 != null) {
            this.gizmo2 = Object.create(this.gizmo2);
        }
    }

    gizmoUpdate() {
        let updateStats = false;
        if (this.gizmo1 != null && this.gizmo1.statsUpdated) {
            updateStats = true;
        }
        if (this.gizmo2 != null && this.gizmo2.statsUpdated) {
            updateStats = true;
        }
        if (updateStats) {
            this.calculateStats();
            if (this.gizmo1 != null) {
                this.gizmo1.statsUpdated = false;
            }
            if (this.gizmo2 != null) {
                this.gizmo2.statsUpdated = false;
            }
        }
    }

    calculateStats() {
        this.damage = this.baseDamage;
        this.fireRate = this.baseFireRate;
        this.range = this.baseRange;
        this.cost = this.baseCost;
        this.unique = checkUnique(this.gizmo1, this.gizmo2);
        if (this.forceUnique) {
            this.unique = true;
        }

        let damageBonus = calculateGizmoDamageBonus(this.gizmo1, this.gizmo2);
        if (lambdaBonus) {
            damageBonus += 0.1;
        }
        if (this.sigma) {
            damageBonus += min(sigmaBonus, 0.75);
        }
        damageBonus += this.damageMod;
        this.damage = floor((1.0001 + damageBonus) * this.damage);

        let attackSpeedBonus = calculateGizmoAttackSpeedBonus(this.gizmo1, this.gizmo2);
        this.fireRate = floor((1.0001 - attackSpeedBonus) * this.fireRate * 100) / 100;

        let rangeBonus = calculateGizmoRangeBonus(this.gizmo1, this.gizmo2);
        this.range += rangeBonus;

        let costMultiplier = calculateGizmoCostChange(this.gizmo1, this.gizmo2);
        costMultiplier += this.tempCostMod;
        this.cost = round(this.cost * costMultiplier);
    }

    goHaywire(duration) {
        if (!this.haywire) {
            this.haywire = true;
            let speedMult = random(0, 1) > 0.5 ? 1 : -1;
            this.haywireSpeed = random(270, 630) * speedMult;
        }
        this.haywireDuration = min(this.haywireDuration + duration, 3);
    }

    getPluralName() {
        return this.plural == "" ? this.name + "s" : this.plural;
    }
}

var turrets = [];
var highlightedTurret = null;;
var selectedTurret = null;

function clearTurrets() {
    turrets = [];
}

function addTurret(t) {
    turrets.push(t);
}

function removeTurret(x, y) {
    for (let i = 0; i < turrets.length; i++) {
        let t = turrets[i];
        if (t.x == x && t.y == y) {
            turrets.splice(i, 1);
            removePlacement(t.x, t.y);
            break;
        }
    }
}

function drawTurrets() {
    for (let i = 0; i < turrets.length; i++) {
        turrets[i].draw();
    }
}

function checkTurretsHover() {
    if (placingTower) {
        return;
    }
    highlightedTurret = null;
    for (let i = 0; i < turrets.length; i++) {
        m = getMouseTile();
        t = turrets[i];
        if (t.x == m[0] && t.y == m[1]) {
            highlightedTurret = t;
            break;
        }
    }
}

function updateTurrets() {
    for (let i = 0; i < turrets.length; i++) {
        turrets[i].update();
    }
}

function turretsStartOfTurn() {
    for (let i = 0; i < turrets.length; i++) {
        let l = turrets.length;
        turrets[i].startOfTurn();
        if (l > turrets.length) {
            i--;
        }
    }
}

function getRandomOwnedTower() {
    return ownedTowers[floor(random(1, min(ownedTowers.length, 9)))];
}
