
var turretButtonClicked = false;
var showInfo = false;
var infoX = 0;
var infoY = 0;
let temperateChance = 2;

var scaleneScales = false;
var lifeInsurance = false;
var acidRain = false;
var blizzard = false;
var blueprints = false;
var spareParts = false;

var ritual = 0;
var unstableGround = false;
var allHaywire = false;
var allHaywireTime = 15;

function gameplaySetup() {
    clearButtons();
    resetPowerLevels();
    setupNextPlanet();
    waveCount = 1;
    resetSpawner();
    addNextWave();
    tidbits = startingTidbits;
    ownedTowers[0].cost = 250;
    ownedTowers[0].baseCost = 250;
    placedMiners = 0;
    if (spareParts) {
        ownedTowers[0].cost = 200;
        ownedTowers[0].baseCost = 200;
    }
    if (blueprints) {
        for (i = 1; i < ownedTowers.length; i++) {
            ownedTowers[i].tempCostMod -= 0.1;
            ownedTowers[i].calculateStats();
        }
    }
    currentScreen = "gameplay";
    setupSidebarButtons();
    setupTransmission();
}

function setupNextPlanet() {
    let p;
    if (currentPlanet == 1) {
        waves = planet1Waves;
        biasList = planet1Bias;
        p = pickNormalPath();
    } else if (currentPlanet == 2) {
        waves = planet2Waves;
        biasList = planet2Bias;
        p = pickNormalPath();
    } else if (currentPlanet == 3) {
        waves = planet3Waves;
        biasList = planet3Bias;
        p = pickHardPath();
    } else if (currentPlanet == 4) {
        waves = planet4Waves;
        biasList = planet4Bias;
        p = pickEasyPath();
    } else {
        waves = planet6Waves;
        biasList = planet6Bias;
        p = pickBossPath();
        createMap(p, 9);
        return;
    }
    let r = random(0, 2);
    let c = 0;
    if (r < temperateChance) {
        c = getTemperateColor();
        temperateChance--;
    } else {
        c = getMoonColor();
        temperateChance++;
    }
    createMap(p, c);
}

function leaveGameplay() {
    gameSpeedChange = 2;
    fastForward = false;
    changeGameSpeed();
    clearButtons();
    clearTurrets();
    enemyBonus = 1;
    ritual = 0;
    unstableGround = false;
    allHaywire = false;
    selectedTower = 0;
    placingTower = false;
    fastForward = false;
    sigmaBonus = 0;
    massProductionValue = 0;
    ownedTowers[0].banned = false;
    for (let i = 1; i < ownedTowers.length; i++) {
        ownedTowers[i].unavailable = false;
        ownedTowers[i].unique = false;
        ownedTowers[i].forceUnique = false;
        ownedTowers[i].banned = false;
        ownedTowers[i].tempCostMod = 0;
        ownedTowers[i].calculateStats();
    }
    if (difficultyLevel == 0) {
        changeLives(5);
    }
    setupTowerPreviews();
    currentScreen = "towerSelect";
}

function endWave() {
    if (!spawning && enemies.length == 0 && waveInProgress) {
        waveCount++;
        tidbits += tidbitsPerWave;
        if (ritual > 0) {
            performRitual();
        }
        if (unstableGround) {
            for (let i = 0; i < ownedTowers.length; i++) {
                ownedTowers[i].banned = (waveCount % 2) == 0;
            }
        }
        turretsStartOfTurn();
        waveInProgress = false;
        polygons++;
        updateButtons();
        resetSpawner();
        addNextWave();
        for (let i = 1; i < ownedTowers.length && i < 9; i++) {
            let t = ownedTowers[i];
            if (t.gizmo1 != null) {
                if (t.gizmo1.name == "Investment") {
                    t.tempCostMod -= 0.1;
                    t.calculateStats();
                } else if (t.gizmo1.name == "Free Shipping" && waveCount == 6) {
                    t.unavailable = false;
                    setupSidebarButtons();
                }
            }
            if (t.gizmo2 != null) {
                if (t.gizmo2.name == "Investment") {
                    t.tempCostMod -= 0.1;
                    t.calculateStats();
                } else if (t.gizmo2.name == "Free Shipping" && waveCount == 6) {
                    t.unavailable = false;
                    setupSidebarButtons();
                }
            } 
        }
        if (scaleneScales) {
            changeLives(3);
        }
    }
}

function previewTower() {
    if (mouseX < tileSize * 17 && placingTower) {
        let m = getMouseTile();
        let t = Object.create(ownedTowers[selectedTower]);
        drawObject(t.sprite, m[0], m[1], 0);
        if (checkPlacement(m[0], m[1]) == 0) {
            drawObjectScaled(rangeMarker, m[0], m[1], 0, t.range);
        } else {
            drawObjectScaled(rangeMarkerRed, m[0], m[1], 0, t.range);
            if (selectedTower == 0) {
                drawObject(minerNoPlace, m[0], m[1], 0);
            }
        }
    }
}

function placeTower(x, y) {
    if (checkPlacement(x, y) == 0) {
        let t = Object.create(ownedTowers[selectedTower]);
        if (ownedTowers[selectedTower].unique) {
            ownedTowers[selectedTower].unavailable = true;
        }
        t.cost += 0;
        t.copyGizmos();
        t.setPosition(x, y);
        addTurret(t);
        setPlacement(x, y);
        tidbits -= t.cost;
        ownedTowers[selectedTower].tempCostMod = 0;
        ownedTowers[selectedTower].calculateStats();
        placingTower = false;
        t.onPurchase();
        updateButtons();
    }
}

function selectTower(x, y) {
    if (checkPlacement(x, y) == 1) {
        for (let i = 0; i < turrets.length; i++) {
            let t = turrets[i];
            if (t.x == x && t.y == y && t.name != "Miner") {
                selectedTurret = t;
                let sellXAdjust = -0.333;
                if (selectedTurret.x <= 0) {
                    sellXAdjust = 0.1;
                } else if (selectedTurret.x >= 16) {
                    sellXAdjust = -0.65;
                }
                let sellYAdjust = t.y < 11 ? 1.05 : -0.75;
                let sellB = new SellButton((t.x + sellXAdjust) * tileSize, (t.y + sellYAdjust) * tileSize, 95 * uiScale, 40 * uiScale);
                sellB.enabled = true;
                addButton(sellB);
                if (t.canRotate) {
                    let targetXAdjust = t.x < 15 ? 1.2 : -1.3;
                    let targetB = new TargetButton((t.x + targetXAdjust) * tileSize, (t.y + 0.15) * tileSize, 75 * uiScale, 40 * uiScale);
                    targetB.enabled = true;
                    addButton(targetB);
                }
                let infoXAdjust = -0.65;
                let infoYAdjust = 0.25;
                if (t.canRotate) {
                    if (t.y == 11 && (t.x == 0 || t.x >= 15)) {
                        infoYAdjust = -0.65;
                        if (t.x == 0) {
                            infoXAdjust = 1.85;
                        } else {
                            infoXAdjust = -1.3;
                        }
                    } else if (t.x == 0) {
                        infoYAdjust = 1.1;
                        infoXAdjust = 1.85;
                    } else if (t.x == 16) {
                        infoXAdjust = -1.3;
                        infoYAdjust = 1.1;
                    } else if (t.x == 15) {
                        infoXAdjust = -1.1;
                        infoYAdjust = 1.1;
                    }
                } else if (t.x == 0) {
                    infoXAdjust = 1.1;
                }
                let infoB = new InfoButton((t.x + infoXAdjust) * tileSize, (t.y + infoYAdjust) * tileSize, 30 * uiScale, 30 * uiScale);
                infoB.enabled = true;
                addButton(infoB);
                break;
            }
        }
    }
}

function gameplayClick() {
    if (turretButtonClicked) {
        turretButtonClicked = false;
        return;
    }
    selectedTurret = null;
    showInfo = false;
    clearButtons();
    setupSidebarButtons();
    if (mouseX < tileSize * 17) {
        let m = getMouseTile();
        if (placingTower) {
            placeTower(m[0], m[1]);
        } else {
            selectTower(m[0], m[1]);
        }
    }
}

function drawRangeOverlay() {
    if (selectedTurret != null) {
        selectedTurret.drawRange();
    } else if (highlightedTurret != null) {
        highlightedTurret.drawRange();
    }
}

function drawInfoPanel() {
    if (showInfo) {
        fill(80, 80, 80);
        rect(infoX, infoY, 110 * uiScale, 90 * uiScale, 10 * uiScale);
        drawSprite(damageIcon, infoX + 25 * uiScale, infoY + 25 * uiScale, 0, 0.9 * uiScale);
        drawSprite(reloadIcon, infoX + 25 * uiScale, infoY + 65 * uiScale, 0, 0.9 * uiScale);
        fill(230, 230, 230);
        textSize(22 * uiScale);
        textAlign(LEFT, CENTER);
        text(selectedTurret.damage, infoX + 47 * uiScale, infoY + 27 * uiScale);
        text(selectedTurret.fireRate + "s", infoX + 47 * uiScale, infoY + 67 * uiScale);
    }
}

function changeLives(amount, lethal = true) {
    let eb = emergencyBonus;
    let pLives = lives;
    let minVal = lethal ? 0 : 1;
    lives = max(minVal, lives + amount);
    emergencyBonus = lives <= 20;
    if (emergencyBonus != eb) {
        for (let i = 0; i < turrets.length; i++) {
            if (turrets[i].gizmo1 != null && turrets[i].gizmo1.name == "Emergency Protocol") {
                turrets[i].gizmo1.updateGiveBonus();
                turrets[i].calculateStats();
            } else if (turrets[i].gizmo2 != null && turrets[i].gizmo2.name == "Emergency Protocol") {
                turrets[i].gizmo2.updateGiveBonus();
                turrets[i].calculateStats();
            }
        }
        for (let i = 1; i < ownedTowers.length; i++) {
            if (ownedTowers[i].gizmo1 != null && ownedTowers[i].gizmo1.name == "Emergency Protocol") {
                ownedTowers[i].gizmo1.updateGiveBonus();
            } else if (ownedTowers[i].gizmo2 != null && ownedTowers[i].gizmo2.name == "Emergency Protocol") {
                ownedTowers[i].gizmo2.updateGiveBonus();
            }
        }
    }
    if (lifeInsurance) {
        livesLost = max(0, pLives - lives);
        tidbits += 15 * livesLost;
        setupSidebarButtons();
    }
}

function performRitual() {
    let t = null;
    for (let i = 0; i < turrets.length; i++) {
        if (turrets[i].name != "Miner") {
            t = turrets[i];
            break;
        }
    }
    if (!t) {
        return;
    }
    if (ritual == 5) {
        removeTurret(t.x, t.y);
    } else {
        sellTurret(t);
    }
    changeLives(ritual);
}
