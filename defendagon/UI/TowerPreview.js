
var towerPreviews = [];
var highlightTowers = [];
var initialPick = false;
var rewardPick = false;
var rewardTypes = [0, 1];

function drawTowerPreviews() {
    if (rewardPick) {
        let x = 260 * uiScale;
        let y = 250 * uiScale;
        let w = 360 * uiScale;
        let h = 180 * uiScale;
        let gap = 40 * uiScale;
        drawRewardChoice(rewardTypes[0], x, y, w, h, checkHighlight(0));
        drawRewardChoice(rewardTypes[1], x + w + gap, y, w, h, checkHighlight(1));
    } else if (towerPreviews.length == 3) {
        let x = 60 * uiScale;
        let y = 220 * uiScale;
        let w = 360 * uiScale;
        let h = 250 * uiScale;
        let gap = 40 * uiScale;
        drawPreview(towerPreviews[0], x, y, w, h, checkHighlight(0));
        drawPreview(towerPreviews[1], x + w + gap, y, w, h, checkHighlight(1));
        drawPreview(towerPreviews[2], x + w * 2 + gap * 2, y, w, h, checkHighlight(2));
    } else {
        let x = 260 * uiScale;
        let y = 40 * uiScale;
        let w = 360 * uiScale;
        let h = 250 * uiScale;
        let gap = 40 * uiScale;
        drawPreview(towerPreviews[0], x, y, w, h, checkHighlight(0));
        drawPreview(towerPreviews[1], x + w + gap, y, w, h, checkHighlight(1));
        drawPreview(towerPreviews[2], x, y + h + gap, w, h, checkHighlight(2));
        drawPreview(towerPreviews[3], x + w + gap, y + h + gap, w, h, checkHighlight(3));
    }
}



function setupTowerPreviewsInit() {
    initialPick = true;
    let x = 260 * uiScale;
    let y = 40 * uiScale;
    let w = 360 * uiScale;
    let h = 250 * uiScale;
    let gap = 40 * uiScale;
    let a = shuffleArray(startingPicks);
    towerPreviews.push(a[0]);
    towerPreviews.push(a[1]);
    towerPreviews.push(a[2]);
    towerPreviews.push(a[3]);
    for (let i = 0; i < 4; i++) {
        let b = new TowerPickButton(x + (w + gap) * (i % 2), y + (h + gap) * floor(i/2), w, h, i, true);
        b.enabled = true;
        addButton(b);
    }
    let b = new EmbarkButton(x + w + gap * 2, y + h * 2 + gap * 2, w - gap * 2, gap * 1.5);
    addButton(b);
    setupStars();
}

function setupTowerPreviews() {
    let a = shuffleArray(availiableTowers);
    towerPreviews.push(a[0]);
    towerPreviews.push(a[1]);
    towerPreviews.push(a[2]);
    let x = 60 * uiScale;
    let y = 220 * uiScale;
    let w = 360 * uiScale;
    let h = 250 * uiScale;
    let gap = 40 * uiScale;
    for (let i = 0; i < 3; i++) {
        let b = new TowerPickButton(x + (w + gap) * i, y, w, h, i, false);
        b.enabled = true;
        addButton(b);
    }
    let b = new EmbarkButton(520 * uiScale, y + h + gap * 1.5, w - gap * 3, gap * 1.5);
    addButton(b);
    setupStars();
}

function setupRewardChoices() {
    let x = 260 * uiScale;
    let y = 250 * uiScale;
    let w = 360 * uiScale;
    let h = 180 * uiScale;
    let gap = 40 * uiScale;
    if (currentPlanet == 4) {
        let a = [2, 3, 4, 5, 6];
        a = shuffle(a);
        rewardTypes = [a[0], a[1]];
    }
    for (let i = 0; i < 2; i++) {
        let b = new TowerPickButton(x + (w + gap) * i, y, w, h, i, false);
        b.enabled = true;
        addButton(b);
    }
    let b = new EmbarkButton(520 * uiScale, y + h + gap * 2.5, w - gap * 3, gap * 1.5);
    addButton(b);
}

function clearTowerPreviews() {
    towerPreviews = [];
}

function checkHighlight(id) {
    for (i = 0; i < highlightTowers.length; i++) {
        if (highlightTowers[i] == id) {
            return true;
        }
    }
    return false;
}


function drawPreview(towerId, x, y, w, h, highlight) {
    let t = getTower(towerId);
    let unit = 20 * uiScale;
    push();
    translate(x, y);
    //highlight
    if (highlight) {
        fill(220, 220, 100);
        rect(-unit/4, -unit/4, w + unit/2, h + unit/2, unit * 0.75);
    }
    //background
    fill(85, 85, 85);
    rect(0, 0, w, h, unit * 0.75);
    //tower img
    fill(140, 140, 140);
    rect(unit * 2.75, unit * 2.75, unit * 4.5, unit * 5);
    let r = t.canRotate ? -90 : 0;
    let hOffset = t.canRotate ? unit * 0.4 : 0;
    drawSprite(t.sprite, unit * 5, unit * 5.25 + hOffset, r, 1.25 * uiScale);
    //Icons
    drawSprite(tidbitIcon, unit * 12, unit * 2.5, 0, uiScale);
    drawSprite(damageIcon, unit * 12, unit * 5, 0, uiScale);
    drawSprite(reloadIcon, unit * 12, unit * 7.5, 0, uiScale);
    drawSprite(rangeIcon, unit * 12, unit * 10, 0, uiScale);
    //name text
    fill(220, 220, 220);
    textAlign(CENTER, CENTER);
    textSize(27 * uiScale);
    text(t.name, unit * 5, unit * 1.5);
    //description
    textAlign(CENTER, TOP);
    textSize(20 * uiScale);
    text(t.description, unit * 0.5, unit * 8.5, unit * 9);
    //icon text
    textAlign(LEFT, CENTER);
    textSize(24 * uiScale);
    text(t.cost, unit * 13.5, unit * 2.5);
    text(t.damage + t.dmgText, unit * 13.5, unit * 5);
    text(t.fireRate + "s", unit * 13.5, unit * 7.5);
    text(t.range, unit * 13.5, unit * 10);
    stroke(0, 0, 0);
    //line(unit * 10, 0, unit * 10, unit * 12.5);
    noStroke();
    pop();
}

function drawRewardChoice(type, x, y, w, h, highlight) {
    let unit = 20 * uiScale;
    push();
    translate(x, y);
    //highlight
    if (highlight) {
        fill(220, 220, 100);
        rect(-unit/4, -unit/4, w + unit/2, h + unit/2, unit * 0.75);
    }
    //background
    fill(85, 85, 85);
    rect(0, 0, w, h, unit * 0.75);
    fill(140, 140, 140);
    rect(unit * 1.5, unit * 1.5, unit * 6, unit * 6);
    fill(220, 220, 220);
    textAlign(LEFT, CENTER);
    textSize(28 * uiScale);
    if (type == 0) {
        text("+15 Lives", unit * 9.75, unit * 4.5);
        drawSprite(livesIcon, unit * 4.5, unit * 4.5, 0, 2.25 * uiScale);
    } else if (type == 1) {
        text("Obtain a", unit * 10, unit * 3.7);
        text("random gizmo", unit * 8.5, unit * 5.3);
        drawSprite(mysteryGizmo, unit * 4.5, unit * 4.5, 0, 1.75 * uiScale);
    } else if (type == 2) {
        text("Scalene Scales", unit * 8.1, unit * 2.25);
        textSize(24 * uiScale);
        text("Gain 3 lives after", unit * 8.2, unit * 4.75);
        text("each wave.", unit * 9.3, unit * 6.25);
        drawSprite(scaleneScalesIcon, unit * 4.5, unit * 4.5, 0, 1.75 * uiScale);
    } else if (type == 3) {
        text("Life Insurance", unit * 8.25, unit * 2.25);
        textSize(24 * uiScale);
        text("Gain 15 tidbits for", unit * 8.15, unit * 4.75);
        text("each life lost.", unit * 9.15, unit * 6.25);
        drawSprite(lifeInsuranceIcon, unit * 4.5, unit * 4.5, 0, 1.75 * uiScale);
    } else if (type == 4) {
        text("Acid Rain", unit * 9.75, unit * 2.25);
        textSize(24 * uiScale);
        text("Remove all armor", unit * 8.15, unit * 4.75);
        text("from enemies.", unit * 9, unit * 6.25);
        drawSprite(acidRainIcon, unit * 4.5, unit * 4.5, 0, 1.75 * uiScale);
    } else if (type == 5) {
        text("Blizzard", unit * 10.15, unit * 2.25);
        textSize(24 * uiScale);
        text("All enemies move", unit * 8.15, unit * 4.75);
        text("10% slower.", unit * 9.4, unit * 6.25);
        drawSprite(blizzardIcon, unit * 4.5, unit * 4.5, 0, 1.75 * uiScale);
    } else if (type == 6) {
        text("Blueprints", unit * 9.75, unit * 2.25);
        textSize(24 * uiScale);
        text("Towers cost 10%", unit * 8.25, unit * 4.35);
        text("less when first", unit * 9, unit * 5.75);
        text("purchased.", unit * 9.75, unit * 7.15);
        drawSprite(blueprintsIcon, unit * 4.5, unit * 4.5, 0, 1.75 * uiScale);
    } else if (type == 7) {
        text("Spare Parts", unit * 9, unit * 2.25);
        textSize(24 * uiScale);
        text("Miners cost 50", unit * 8.75, unit * 4.75);
        text("less tidbits.", unit * 9.75, unit * 6.25);
        drawSprite(sparePartsIcon, unit * 4.5, unit * 4.5, 0, 1.75 * uiScale);
    }
    pop();
}
