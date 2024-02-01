
var basicGizmoValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var specialGizmoValues;

function getGizmo(id) {
    let g = null;
    if (id == 0) {
        g = new Gizmo("Damage Up", "+20% damage.", damageUp1, 2);
        g.damageBonus = 0.2;
    } else if (id == 1) {
        g = new Gizmo("Damage Up II", "+35% damage.", damageUp2, 3);
        g.damageBonus = 0.35;
    } else if (id == 2) {
        g = new Gizmo("Damage Up III", "+50% damage.", damageUp3, 4);
        g.damageBonus = 0.5;
    } else if (id == 3) {
        g = new Gizmo("Speed Up", "+15% attack speed.", attackSpeedUp1, 2);
        g.attackSpeedBonus = 0.15;
    } else if (id == 4) {
        g = new Gizmo("Speed Up II", "+25% attack speed.", attackSpeedUp2, 3);
        g.attackSpeedBonus = 0.25;
    } else if (id == 5) {
        g = new Gizmo("Range Up", "+1 range.", rangeUp1, 2);
        g.rangeBonus = 1;
    } else if (id == 6) {
        g = new Gizmo("Cost Down", "-10% cost.", costDecrease1, 2);
        g.costChange = -0.1;
    } else if (id == 7) {
        g = new Gizmo("Cost Down II", "-20% cost.", costDecrease2, 4);
        g.costChange = -0.2;
    } else if (id == 8) {
        g = new Gizmo("Power Up", "+15% damage. +10% attack speed.", powerUp, 3);
        g.damageBonus = 0.15;
        g.attackSpeedBonus = 0.1;
    } else if (id == 10) {
        g = new WaveGizmo("Alpha", "+20% attack speed and +30% damage on the first three waves of each planet.", alphaGiz, 3, 1, 3);
        g.damageBonus = 0.3;
        g.attackSpeedBonus = 0.2;
    } else if (id == 11) {
        g = new WaveGizmo("Beta", "+20% attack speed and +30% damage from waves four to seven.", betaGiz, 3, 4, 7);
        g.damageBonus = 0.3;
        g.attackSpeedBonus = 0.2;
    } else if (id == 12) {
        g = new WaveGizmo("Omega", "+20% attack speed and +30% damage from wave eight and onward.", omegaGiz, 3, 8, 100);
        g.damageBonus = 0.3;
        g.attackSpeedBonus = 0.2;
    } else if (id == 13) {
        g = new Gizmo("Pi", "+3 range. +14% attack speed. +15% damage. Unique.", piGiz, 3);
        g.damageBonus = 0.15;
        g.attackSpeedBonus = 0.14;
        g.rangeBonus = 3;
        g.unique = true;
    } else if (id == 14) {
        g = new WaveGizmo("Theta", "+2 range for 3 waves.", thetaGiz, 2, 3, -1);
        g.rangeBonus = 2;
    } else if (id == 15) {
        g = new LambdaGizmo("Lambda", "All towers gain +10% damage.", lambdaGiz, 3);
    } else if (id == 16) {
        g = new SigmaGizmo("Sigma", "Gains +15% damage for each placed tower of this type. (Max of +75%)", sigmaGiz, 3);
    } else if (id == 17) {
        g = new GrowthGizmo("Delta", "Gains +5% damage and +5% attack speed at the end of each wave.", deltaGiz, 3, 0.05, 0.05, 0);
    } else if (id == 18) {
        g = new ImaginaryGizmo("Imaginary", "+20% attack speed. -30% cost. Disappears after four waves.", imaginaryGiz, 2);
        g.attackSpeedBonus = 0.2;
        g.costChange = -0.3;
    } else if (id == 19) {
        g = new IrrationalGizmo("Irrational", "+35% damage. +1 range. Lose one life when this tower is purchased.", irrationalGiz, 2);
        g.damageBonus = 0.35;
        g.rangeBonus = 1;
    } else if (id == 20) {
        g = new Gizmo("Lead Alloy", "+50% damage. -10% cost. -25% attack speed.", leadGiz, 2);
        g.damageBonus = 0.5;
        g.attackSpeedBonus = -0.25;
        g.costChange = -0.1;
    }  else if (id == 21) {
        g = new Gizmo("Aluminum Alloy", "+25% attack speed. -20% cost. -30% damage.", aluminumGiz, 2);
        g.damageBonus = -0.3;
        g.attackSpeedBonus = 0.25;
        g.costChange = -0.2;
    } else if (id == 22) {
        g = new Gizmo("Silver Alloy", "+20% damage. +15% attack speed. +10% cost.", silverGiz, 2);
        g.damageBonus = 0.2;
        g.attackSpeedBonus = 0.15;
        g.costChange = 0.1;
    } else if (id == 23) {
        g = new Gizmo("Gold Alloy", "+30% attack speed. +1 range. +20% cost.", goldGiz, 2);
        g.attackSpeedBonus = 0.3;
        g.rangeBonus = 1;
        g.costChange = 0.2;
    } else if (id == 24) {
        g = new Gizmo("Titanium Alloy", "+25% damage. +1 range. +10% cost.", titaniumGiz, 2);
        g.damageBonus = 0.25;
        g.rangeBonus = 1;
        g.costChange = 0.1;
    } else if (id == 25) {
        g = new Gizmo("Copper Alloy", "+15% attack speed. +1 range. -10% damage.", copperGiz, 2);
        g.damageBonus = -0.1;
        g.attackSpeedBonus = 0.15;
        g.rangeBonus = 1;
    } else if (id == 26) {
        g = new Gizmo("Iron Alloy", "+20% damage. -10% cost. -1 range.", ironGiz, 2);
        g.damageBonus = 0.2;
        g.costChange = -0.1;
        g.rangeBonus = -1;
    } else if (id == 27) {
        g = new Gizmo("Diamond", "+50% damage. +25% attack speed. +30% cost. Unique.", diamondGiz, 3);
        g.damageBonus = 0.5;
        g.attackSpeedBonus = 0.25;
        g.costChange = 0.3;
        g.unique = true;
    } else if (id == 28) {
        g = new Gizmo("Ruby", "+80% damage. +20% cost. Unique.", rubyGiz, 3);
        g.damageBonus = 0.8;
        g.costChange = 0.2;
        g.unique = true;
    } else if (id == 29) {
        g = new Gizmo("Emerald", "+40% attack speed. +20% cost. Unique.", emeraldGiz, 3);
        g.attackSpeedBonus = 0.4;
        g.costChange = 0.2;
        g.unique = true;
    } else if (id == 30) {
        g = new GrowthGizmo("Radioactive Decay", "+25% damage and -1 range after each wave.", nuclearGiz, 2, 0.25, 0, -1);
    } else if (id == 31) {
        g = new ShortCircuitGizmo("Short Circuit", "+15% damage. +15% attack speed. Will occasionally go haywire.", shortCircuitGiz, 1);
        g.damageBonus = 0.15;
        g.attackSpeedBonus = 0.15;
    } else if (id == 32) {
        g = new MassProductionGizmo("Mass Production", "Decrease the cost of this tower by 10% when purchased. (Max of -30%)", massProductionGiz, 3);
    } else if (id == 33) {
        g = new Gizmo("Investment", "This tower costs 10% less after each wave. Resets once purchased.", investmentGiz, 3);
    } else if (id == 34) {
        g = new RecyclingGizmo("Recycling", "This tower sells for 30% more.", recycleGiz, 1);
    } else if (id == 35) {
        g = new MiniShovelGizmo("Mini Shovel", "Gain 15 tidbits each wave.", miniShovelGiz, 3);
    } else if (id == 36) {
        g = new GlubGooGizmo("Glub Goo", "Attacks ignore enemy armor.", glubGooGiz, 2);
    } else if (id == 37) {
        g = new WaveGizmo("Rage", "+40% damage for 2 waves.", rageGiz, 1, 2, -1);
        g.damageBonus = 0.4;
    } else if (id == 38) {
        g = new FreeShippingGizmo("Free Shipping", "-20% cost. Cannot be purchased until after wave 5.", freeShippingGiz, 2);
        g.costChange = -0.2;
    } else if (id == 39) {
        g = new EmergencyProtocolGizmo("Emergency Protocol", "+25% damage and +25% attack speed while you have 20 or fewer lives.", emergencyGiz, 3);
        g.attackSpeedBonus = 0.25;
        g.damageBonus = 0.25;
    } else if (id == 40) {
        g = new Gizmo("Scope", "+2 range. -10% attack speed.", scopeGiz, 2);
        g.rangeBonus = 2;
        g.attackSpeedBonus = -0.1;
    } else if (id == 41) {
        g = new MinerGizmo("Naturalization", "+50% damage. -10% damage for each placed miner.", naturalGiz, 3, 0.5, -0.1);
        g.damageBonus = 0.5;
    } else if (id == 42) {
        g = new MinerGizmo("Industrialization", "+15% damage for each placed miner.", idustryGiz, 3, 0, 0.15);
    } else if (id == 43) {
        g = new Gizmo("Legendary", "-50% cost. Unique.", legendGiz, 3);
        g.costChange = -0.5;
        g.unique = true;
    }
    g.assignId();
    return g;
}


function getSpecialGizmo() {
    let r = floor(random(0, specialGizmoValues.length));
    let g = getGizmo(specialGizmoValues[r]);
    specialGizmoValues.splice(r, 1);
    return g;
}

function resetSpecialGizmos() {
    specialGizmoValues = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
}


var emergencyBonus = false;

class MinerGizmo extends Gizmo {
    constructor(name, desc, sprite, cost, base, mod) {
        super(name, desc, sprite, cost);
        this.base = base;
        this.mod = mod;
    }

    onPurchase(tower) {
        this.onMinerPlaced(tower);
    }

    onMinerPlaced(tower) {
        this.damageBonus = max(0, this.base + this.mod * placedMiners);
        tower.calculateStats();
    }
}

class EmergencyProtocolGizmo extends Gizmo {
    onEquip(tower) {
        this.giveBonus = emergencyBonus;
    }

    onPurchase(tower) {
        this.giveBonus = emergencyBonus;
    }

    updateGiveBonus() {
        this.giveBonus = emergencyBonus;
    }
}

class FreeShippingGizmo extends Gizmo {
    onEquip(tower) {
        tower.unavailable = true;
    }

    onUnequip(tower) {
        tower.unavailable = false;
    }
}

class MiniShovelGizmo extends Gizmo {
    onStartOfTurn() {
        tidbits += 15;
    }
}

var massProductionValue = 0;

class MassProductionGizmo extends Gizmo {
    onPurchase(tower) {
        massProductionValue = min(0.3, massProductionValue + 0.1);
        for (let i = 0; i < ownedTowers.length; i++) {
            if (ownedTowers[i].name == tower.name) {
                ownedTowers[i].tempCostMod -= massProductionValue;
                ownedTowers[i].calculateStats(); 
            }
        }
    }
}

class RecyclingGizmo extends Gizmo {
    onPurchase(tower) {
        tower.sellAmount = floor(tower.cost * 0.8);
    }
}

class ShortCircuitGizmo extends Gizmo {
    onPurchase(tower) {
        tower.shortCircuit = true;
        tower.scCount = random(11, 14);
    }
}

class GlubGooGizmo extends Gizmo {
    onPurchase(tower) {
        tower.ignoreArmor = true;
    }
}

var sigmaBonus = 0;

class SigmaGizmo extends Gizmo {
    constructor(name, desc, sprite, cost) {
        super(name, desc, sprite, cost);
    }
    
    onPurchase(tower) {
        tower.sigma = true;
        sigmaBonus += 0.15;
        for (let i = 0; i < turrets.length; i++) {
            turrets[i].calculateStats();
        }
    }

    onSell() {
        sigmaBonus -= 0.15;
        for (let i = 0; i < turrets.length; i++) {
            turrets[i].calculateStats();
        }
    }
}

class IrrationalGizmo extends Gizmo {
    onPurchase(tower) {
        changeLives(-1, false);
    }
}

class ImaginaryGizmo extends Gizmo {
    constructor(name, desc, sprite, cost) {
        super(name, desc, sprite, cost);
        this.turnsLeft = 4;
        this.tower = null;
    }

    onPurchase(tower) {
        this.tower = tower;
        tower.canSell = false;
    }

    onStartOfTurn() {
        this.turnsLeft--;
        if (this.turnsLeft <= 0) {
            removeTurret(this.tower.x, this.tower.y);
        }
    }
}

var lambdaBonus = false;

class LambdaGizmo extends Gizmo {
    onEquip(tower) {
        lambdaBonus = true;
        this.recalc();
    }

    onUnequip(tower) {
        lambdaBonus = false;
        this.recalc();
    }

    recalc() {
        for (let i = 1; i < ownedTowers.length; i++) {
            ownedTowers[i].calculateStats();
        }
    }
}
