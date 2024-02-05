
var showTransmission = true;
var transmissionStage = 0;
var tBoxX = 310;
var tBoxY = 290;
var tBoxW = 400;
var tBoxH = 140;
var tTiming = 0;
var currentTransmission;

var commonTransmissions = [];
var rareTransmissions = [];
var enemyTransmissionCount = 0;
var rareTransmissionGot = false;

function drawTransmission() {
    if (!showTransmission) {
        return;
    }
    fill(60, 60, 60, 235);
    rect(tBoxX * uiScale, tBoxY * uiScale, tBoxW * uiScale, tBoxH * uiScale, 20 * uiScale);
    if (transmissionStage == 0) {
        if (floor(tTiming * 2.5) % 2 == 0) {
            fill(20, 160, 40);
            textSize(45 * uiScale);
            textAlign(CENTER, CENTER);
            textFont('Courier New');
            text("INCOMING\nTRANSMISSION", (tBoxX + tBoxW / 2) * uiScale, (tBoxY + tBoxH / 2) * uiScale);
            textFont('Arial');
        }
        tTiming += deltaTime;
        if (tTiming >= 2.2) {
            transmissionStage = 1;
            tTiming = 0;
        }
    } else if (transmissionStage == 1) {
        tBoxX = max(50, tBoxX - 300 * deltaTime);
        tBoxY = max(50, tBoxY - 300 * deltaTime);
        tBoxW = min(920, tBoxW + 600 * deltaTime);
        tBoxH = min(620, tBoxH + 600 * deltaTime);
        tTiming += deltaTime;
        if (tTiming >= 0.9) {
            transmissionStage = 2;
            tTiming = 0;
            let wVal = tBoxW * 0.1 * uiScale;
            let hVal = tBoxH * 0.1 * uiScale;
            let tChoice1;
            let tChoice2;
            let tChoice3;
            tChoice1 = getTransmissionChoice(currentTransmission.choices[0], currentTransmission.tower, currentTransmission.enemy);
            if (currentTransmission.choices.length > 1) {
                tChoice2 = getTransmissionChoice(currentTransmission.choices[1], currentTransmission.tower, currentTransmission.enemy);
            }
            if (currentTransmission.choices.length > 2) {
                tChoice3 = getTransmissionChoice(currentTransmission.choices[2], currentTransmission.tower, currentTransmission.enemy);
            }
            if (currentTransmission.choices.length == 1) {
                let b1 = new TransmissionButton(tBoxX * uiScale + wVal * 3.5, (tBoxY + tBoxH) * uiScale - hVal * 2.75, wVal * 3, hVal * 2.5, tChoice1);
                addButton(b1);
            } else if (currentTransmission.choices.length == 2) {
                let b1 = new TransmissionButton(tBoxX * uiScale + wVal * 1.75, (tBoxY + tBoxH) * uiScale - hVal * 2.75, wVal * 3, hVal * 2.5, tChoice1);
                addButton(b1);
                let b2 = new TransmissionButton(tBoxX * uiScale + wVal * 5.25, (tBoxY + tBoxH) * uiScale - hVal * 2.75, wVal * 3, hVal * 2.5, tChoice2);
                addButton(b2);
            } else {
                let b1 = new TransmissionButton(tBoxX * uiScale + wVal * 0.25, (tBoxY + tBoxH) * uiScale - hVal * 2.75, wVal * 3, hVal * 2.5, tChoice1);
                addButton(b1);
                let b2 = new TransmissionButton(tBoxX * uiScale + wVal * 3.5, (tBoxY + tBoxH) * uiScale - hVal * 2.75, wVal * 3, hVal * 2.5, tChoice2);
                addButton(b2);
                let b3 = new TransmissionButton(tBoxX * uiScale + wVal * 6.75, (tBoxY + tBoxH) * uiScale - hVal * 2.75, wVal * 3, hVal * 2.5, tChoice3);
                addButton(b3);
            }
        }
    } else {
        fill(20, 190, 50);
        textSize(32 * uiScale);
        textAlign(LEFT, TOP);
        textFont('Courier New');
        text(currentTransmission.text, (tBoxX + 30) * uiScale, (tBoxY + 30) * uiScale, (tBoxW - 60) * uiScale, (tBoxH - 60) * uiScale);
        textFont('Arial');
        fill(180, 180, 180);
        textAlign(CENTER, CENTER);
        text("Choose a bonus:", (tBoxX + tBoxW / 2) * uiScale, (tBoxY + 380) * uiScale);
    }
}

function setupTransmission() {
    sidebarButtonsEnabled = false;
    showTransmission = true;
    transmissionStage = 0;
    tBoxX = 310;
    tBoxY = 290;
    tBoxW = 400;
    tBoxH = 140;
    tTiming = 0;
    pickTransmission();
    //currentTransmission = new UnstableGroundsTransmission();
}

function pickTransmission() {
    if (currentPlanet == 1) {
        currentTransmission = new StartTransmission();
    } else if (currentPlanet == 5) {
        currentTransmission = new FinalTransmission();
    } else {
        let r = random(0, 1);
        if (r < 0.4 && enemyTransmissionCount < 2) {
            currentTransmission = new EnemyBonusTransmission();
            enemyTransmissionCount++;
        } else if (r > 0.85 && !rareTransmissionGot) {
            currentTransmission = rareTransmissions[0];
            rareTransmissions.splice(0, 1);
            rareTransmissionGot = true;
        } else {
            currentTransmission = commonTransmissions[0];
            commonTransmissions.splice(0, 1);
        }
    }
}

function setupTransmissions() {
    commonTransmissions = [new TowerConvertTransmission(), new EnergyTransmission(), new CheaperMinersTransmission(), new DrillTransmission(), new UnstableGroundsTransmission(), new AtmosphereDrainTransmission()];
    commonTransmissions = shuffle(commonTransmissions);
    rareTransmissions = [new RitualTransmission(), new HealthWealthTransmission()];
    rareTransmissions = shuffle(rareTransmissions);
}



class Transmission {
    constructor() {
        this.text = "";
        this.choices = [0, 0, 0];
        this.tower = null;
        this.enemy = null;
    }
}

class StartTransmission extends Transmission {
    constructor() {
        super();
        this.text = "Captain, our scans have detected large numbers of enemy shapes in this sector, and it appears they are preparing a massive invasion. If you can bring our prototype bomb - the DEFENDAGON - into the middle of the sector, we can eradicate these shapes and save the entire galaxy. Good luck.";
        let a = [1, 2, 3, 4, 5, 6, 7, 8];
        let r = floor(random(0, 4));
        this.choices[0] = a[r];
        a.splice(r, 1);
        r = floor(random(3, 7));
        this.choices[2] = a[r];
        a.splice(r, 1);
        this.choices[1] = a[floor(random(0, 6))];
    }
}

class FinalTransmission extends Transmission {
    constructor() {
        super();
        this.text = "Captain, you've reached the heart of the enemy's base. The DEFENDAGON is ready to begin its detonation sequence. If you can survive for 10 waves, the DEFENDAGON should be properly primed and will be able to demolish the entire sector. The galaxy is counting on you.";
        this.choices = [0];
    }
}

class TowerConvertTransmission extends Transmission {
    constructor() {
        super();
        this.tower = getRandomOwnedTower();
        let t = this.tower.getPluralName();
        this.text = "It appears your " + t + " could be repurposed to mine a nearby asteroid for polygons. However, this would put them our of comission for a bit.";
        this.choices = [9, 10, 0];
    }
}

class EnergyTransmission extends Transmission {
    constructor() {
        super();
        this.text = "This planet contains gysers spouting raw energy. Perhaps that energy could be channeled to forge a polygon or some tidbits. It could even be used to generate some life force.";
        this.choices = [17, 18, 19];
    }
}

class CheaperMinersTransmission extends Transmission {
    constructor() {
        super();
        this.text = "An odd, but durable material is scatterd around the planet. Some testing shows that it could be used to reduce the cost of building miners. It could also easily be converted into a polygon.";
        this.choices = [20, 17];
    }
}

class DrillTransmission extends Transmission {
    constructor() {
        super();
        this.text = "There is an old quarry nearby containing an unusual mining drill. It could be powered on to quickly gain some tidbits, or it could be dismantled and examined to potentially improve your miners.";
        this.choices = [21, 18];
    }
}

class UnstableGroundsTransmission extends Transmission {
    constructor() {
        super();
        this.text = "The ground on this planet is slowly cracking apart. There are some polygons that could easily be grabbed, but doing so will disturb the ground even more, making it harder to build anything.";
        this.choices = [22, 0];
    }
}

class AtmosphereDrainTransmission extends Transmission {
    constructor() {
        super();
        this.text = "This planet's rich atmosphere could be drained to create a large amount of life force. However, it would also expose your towers to harmful radition.";
        this.choices = [23, 0];
    }
}

class EnemyBonusTransmission extends Transmission {
    constructor() {
        super();
        this.enemy = getBonusEnemy();
        let t = enemyNames[this.enemy];
        this.text = "This planet appears to house many dormant " + t + ". There are some polygons that you could grab, but doing so may disturb the " + t + " here.";
        this.choices = [12, 11, 0];
    }
}

class RitualTransmission extends Transmission {
    constructor() {
        super();
        this.text = "This planet was once controlled by an ancient cult. Perhaps you could sacrifice some of your towers to harness the power left behind by the ancient civilization.";
        this.choices = [14, 13, 0];
    }
}

class HealthWealthTransmission extends Transmission {
    constructor() {
        super();
        this.text = "You recieve a message from an unown source. It says \"Which of these dertermines one\'s success? Wealth? Health? Or perahaps true success is found in a balance of both?\" Maybe a new outlook on your mission could change the odds in your favor.";
        this.choices = [15, 16, 0];
    }
}


function getTransmissionChoice(id, tower, enemy) {
    if (id == 0) {
        return new SkipChoice();
    } else if (id == 1) {
        return new StartingTidbitsChoice();
    } else if (id == 2) {
        return new TidbitGainChoice();
    } else if (id == 3) {
        return new MinerBonusChoice();
    } else if (id == 4) {
        return new LivesBonusChoice();
    } else if (id == 5) {
        let g = getGizmo(0);
        let t = " gain +20% damage";
        return new GizEquipChoice(getRandomOwnedTower(), g, t);
    } else if (id == 6) {
        let g = getGizmo(3);
        let t = " gain +15% attack speed";
        return new GizEquipChoice(getRandomOwnedTower(), g, t);
    } else if (id == 7) {
        let g = getGizmo(5);
        let t = " gain +1 range";
        return new GizEquipChoice(getRandomOwnedTower(), g, t);
    } else if (id == 8) {
        let g = getGizmo(6);
        let t = " cost 10% less";
        return new GizEquipChoice(getRandomOwnedTower(), g, t);
    } else if (id == 9) {
        return new TowerDisabledChoice(tower);
    } else if (id == 10) {
        return new TowerUniqueChoice(tower);
    } else if (id == 11) {
        return new EnemyBonusChoice(enemy);
    } else if (id == 12) {
        return new EnemyBigBonusChoice(enemy);
    } else if (id == 13) {
        return new RitualChoice();
    } else if (id == 14) {
        return new DeadlyRitualChoice();
    } else if (id == 15) {
        return new WealthChoice();
    } else if (id == 16) {
        return new HealthChoice();
    } else if (id == 17) {
        return new PolygonSupplyChoice();
    } else if (id == 18) { 
        return new TidbitSupplyChoice();
    } else if (id == 19) {
        return new HealthSupplyChoice();
    } else if (id == 20) {
        return new CheapMinersChoice();
    } else if (id == 21) {
        return new DrillUpgradeChoice();
    } else if (id == 22) {
        return new UnstableChoice();
    } else if (id == 23) {
        return new DrainChoice();
    }
}


class TransmissionChoice {
    constructor() {
        this.textSize = 26;
        this.polygons = 0;
        this.lives = 0;
        this.supply = 0;
    }

    getText() {

    }

    effect() {

    }
}

class SkipChoice extends TransmissionChoice {
    constructor() {
        super();
        this.textSize = 32;
    }

    getText() {
        return "Skip";
    }
}

class GizEquipChoice extends TransmissionChoice {
    constructor(tower, gizmo, t) {
        super();
        this.tower = tower;
        this.gizmo = gizmo;
        this.t = t;
    }

    getText() {
        let t = this.tower.getPluralName();
        t += this.t;
        return t;
    }

    effect() {
        this.tower.equipGizmo(this.gizmo, 1);
    }
}

class StartingTidbitsChoice extends TransmissionChoice {
    getText() {
        return "Start each planet with 100 extra tidbits";
    }

    effect() {
        startingTidbits += 100;
        tidbits += 100;
    }
}

class TidbitGainChoice extends TransmissionChoice {
    getText() {
        return "Gain 25 more tidbits after each wave";
    }

    effect() {
        tidbitsPerWave += 25;
    }
}

class MinerBonusChoice extends TransmissionChoice {
    getText() {
        return "Miners produce 15 more tidbits each wave";
    }

    effect() {
        minerTidbitGain += 15;
    }
}

class LivesBonusChoice extends TransmissionChoice {
    getText() {
        return "Gain 15 lives";
    }

    effect() {
        lives += 15;
    }
}

class TowerDisabledChoice extends TransmissionChoice {
    constructor(tower) {
        super();
        this.tower = tower;
        this.textSize = 22;
        this.polygons = 3;
    }

    getText() {
        let t = this.tower.getPluralName();
        t += " cannot be purchased on this planet";
        return t;
    }

    effect() {
        this.tower.banned = true;
    }
}

class TowerUniqueChoice extends TransmissionChoice {
    constructor(tower) {
        super();
        this.tower = tower;
        this.textSize = 22;
        this.polygons = 2;
    }

    getText() {
        let t = this.tower.getPluralName();
        t += " become unique on this planet";
        return t;
    }

    effect() {
        this.tower.unique = true;
        this.tower.forceUnique = true;
    }
}

class EnemyBonusChoice extends TransmissionChoice {
    constructor(enemy) {
        super();
        this.enemy = enemy;
        this.textSize = 24;
        this.polygons = 2;
    }

    getText() {
        let t = enemyNames[this.enemy];
        return "Additional " + t + " spawn each wave";
    }

    effect() {
        enemyBonus = 2;
        enemyBonusType = this.enemy;
        spawns.push(generateBonusSpawn());
    }
}

class EnemyBigBonusChoice extends TransmissionChoice {
    constructor(enemy) {
        super();
        this.enemy = enemy;
        this.textSize = 23;
        this.polygons = 3;
    }

    getText() {
        let t = enemyNames[this.enemy];
        return "Additional, stronger " + t + " spawn each wave";
    }

    effect() {
        enemyBonus = 3;
        enemyBonusType = this.enemy;
        spawns.push(generateBonusSpawn());
    }
}

class RitualChoice extends TransmissionChoice {
    getText() {
        return "At the end of each wave, sell the oldest tower and gain 3 lives";
    }

    effect() {
        ritual = 3;
    }
}

class DeadlyRitualChoice extends TransmissionChoice {
    getText() {
        return "At the end of each wave, destroy the oldest tower and gain 5 lives";
    }

    effect() {
        ritual = 5;
    }
}

class WealthChoice extends TransmissionChoice {
    getText() {
        return "Double your tidbits and set your life count to 1";
    }

    effect() {
        changeLives(-(lives - 1));
        tidbits *= 2;
    }
}

class HealthChoice extends TransmissionChoice {
    getText() {
        return "Lose all of your tidbits and set your life count to 50";
    }

    effect() {
        changeLives(50 - lives);
        tidbits = 0;
    }
}

class PolygonSupplyChoice extends TransmissionChoice {
    constructor() {
        super();
        this.supply = 1;
        this.textSize = 30;
    }

    getText() {
        return "+1";
    }

    effect() {
        polygons++;
    }
}

class TidbitSupplyChoice extends TransmissionChoice {
    constructor() {
        super();
        this.supply = 2;
        this.textSize = 30;
    }

    getText() {
        return "+100";
    }

    effect() {
        tidbits += 100;
    }
}

class HealthSupplyChoice extends TransmissionChoice {
    constructor() {
        super();
        this.supply = 3;
        this.textSize = 30;
    }

    getText() {
        return "+10";
    }

    effect() {
        changeLives(10);
    }
}

class CheapMinersChoice extends TransmissionChoice {
    getText() {
        return "Miners cost 50 less on this planet";
    }

    effect() {
        ownedTowers[0].cost -= 50;
        ownedTowers[0].baseCost -= 50;
    }
}

class DrillUpgradeChoice extends TransmissionChoice {
    getText() {
        return "Miners produce 5 more tidbits each wave permanently";
    }

    effect() {
        minerTidbitGain += 5;
    }
}

class UnstableChoice extends TransmissionChoice {
    constructor() {
        super();
        this.polygons = 3;
        this.textSize = 22;
    }

    getText() {
        return "Towers cannot be purchased on even-numbered waves";
    }

    effect() {

    }
}

class DrainChoice extends TransmissionChoice {
    constructor() {
        super();
        this.lives = 20;
    }

    getText() {
        return "All towers occasionaly go haywire";
    }

    effect() {

    }
}


