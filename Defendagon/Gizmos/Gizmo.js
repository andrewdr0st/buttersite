
var ownedGizmos = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
let nextGizmoId = 1;

class Gizmo {
    constructor(name, desc, sprite, cost) {
        this.name = name;
        this.description = desc;
        this.sprite = sprite;
        this.cost = cost;
        this.id = 0;
        this.damageBonus = 0;
        this.attackSpeedBonus = 0;
        this.rangeBonus = 0;
        this.costChange = 0;
        this.giveBonus = true;
        this.unique = false;
        this.statsUpdated = false;
    }

    draw(x, y) {
        drawSprite(this.sprite, x, y, 0, uiScale);
    }

    assignId() {
        this.id = nextGizmoId;
        nextGizmoId++;
    }

    onPurchase(tower) {
        
    }

    onSell() {
        
    }

    onStartOfTurn() {
        
    }

    onEquip(tower) {
        
    }

    onUnequip(tower) {
        
    }
}

function calculateGizmoDamageBonus(g1, g2) {
    let bonus = 0;
    if (g1 != null && g1.giveBonus) {
        bonus += g1.damageBonus;
    }
    if (g2 != null && g2.giveBonus) {
        bonus += g2.damageBonus;
    }
    return bonus;
}

function calculateGizmoAttackSpeedBonus(g1, g2) {
    let bonus = 0;
    if (g1 != null && g1.giveBonus) {
        bonus += g1.attackSpeedBonus;
    }
    if (g2 != null && g2.giveBonus) {
        bonus += g2.attackSpeedBonus;
    }
    return bonus;
}

function calculateGizmoRangeBonus(g1, g2) {
    let bonus = 0;
    if (g1 != null && g1.giveBonus) {
        bonus += g1.rangeBonus;
    }
    if (g2 != null && g2.giveBonus) {
        bonus += g2.rangeBonus;
    }
    return bonus;
}

function calculateGizmoCostChange(g1, g2) {
    let multiplier = 1;
    if (g1 != null && g1.giveBonus) {
        multiplier += g1.costChange;
    }
    if (g2 != null && g2.giveBonus) {
        multiplier += g2.costChange;
    }
    return multiplier;
}

function checkUnique(g1, g2) {
    let u = false;
    if (g1 != null && g1.unique) {
        u = true;
    }
    if (g2 != null && g2.unique) {
        u = true;
    }
    return u;
}

function obtainGizmo(g) {
    for (let i = 0; i < ownedGizmos.length; i++) {
        if (ownedGizmos[i] == null) {
            ownedGizmos[i] = g;
            break;
        }
    }
}



class WaveGizmo extends Gizmo {
    //set waveEnd < 0 for set amount of waves
    constructor(name, desc, sprite, cost, waveBegin, waveEnd) {
        super(name, desc, sprite, cost);
        this.waveBegin = waveBegin;
        this.waveEnd = waveEnd;
        this.setWaves = waveEnd < 0;
        this.giveBonus = this.setWaves;
    }

    onPurchase(tower) {
        this.setGiveBonus();
    }

    onStartOfTurn() {
        if (this.setWaves) {
            this.waveBegin--;
        }
        this.setGiveBonus();
    }

    setGiveBonus() {
        let update = this.giveBonus;
        if (this.setWaves) {
            this.giveBonus = this.waveBegin > 0;
        } else {
            this.giveBonus = (this.waveBegin <= waveCount && this.waveEnd >= waveCount);
        }
        this.statsUpdated = update != this.giveBonus;
    }
}

class GrowthGizmo extends Gizmo {
    constructor(name, desc, sprite, cost, damageChange, speedChange, rangeChange) {
        super(name, desc, sprite, cost);
        this.damageChange = damageChange;
        this.speedChange = speedChange;
        this.rangeChange = rangeChange;
    }

    onStartOfTurn() {
        this.damageBonus += this.damageChange;
        this.attackSpeedBonus += this.speedChange;
        this.rangeBonus += this.rangeChange;
        this.statsUpdated = true;
    }
}


