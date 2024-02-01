
var highlightedStoreItem = -1;
var storeItems = [];
var storeTowers = [];
var storeTowerIds = [];
var storeGizmos = [];
var priceValues = [2, 2, 2];
var storeTowerListIndex = 0;

function drawStore() {
    background(70, 62, 66);
    fill(90, 82, 86);
    rect(15 * uiScale, 15 * uiScale, 905 * uiScale, 580 * uiScale, 15 * uiScale);
    fill(58, 50, 54);
    rect(930 * uiScale, 15 * uiScale, 335 * uiScale, 580 * uiScale, 15 * uiScale);
    drawSprite(polygonIcon, 55 * uiScale, 50 * uiScale, 0, uiScale * 1.25);
    drawSprite(tidbitStash, 425 * uiScale, 50 * uiScale, 0, uiScale * 0.75);
    drawSprite(tidbitGathering, 600 * uiScale, 50 * uiScale, 0, uiScale * 0.75);
    drawSprite(miningEfficiency, 775 * uiScale, 50 * uiScale, 0, uiScale * 0.8);
    fill(220, 220, 220);
    textAlign(LEFT, CENTER);
    textSize(26 * uiScale);
    text(polygons, 88 * uiScale, 53 * uiScale);
    textSize(22 * uiScale);
    text(startingTidbits, 460 * uiScale, 54 * uiScale);
    text(tidbitsPerWave, 635 * uiScale, 54 * uiScale);
    text(minerTidbitGain, 810 * uiScale, 54 * uiScale);
    drawStoreItemDescription();
    fill(205, 200, 200);
    textAlign(CENTER, CENTER);
    textSize(55 * uiScale);
    text("Store", 640 * uiScale, 670 * uiScale);
}

function setupStore() {
    storeItems = [];
    storeTowers = [];
    storeTowerIds = [];
    storeGizmos = [];

    let s1 = new StoreItem(0, "Tidbit Stash", "Start each planet with 100 extra tidbits.", priceValues[0], tidbitStash);
    let s2 = new StoreItem(1, "Tidbit Gathering", "Gain 25 more tidbits at the end of each wave.", priceValues[1], tidbitGathering);
    let s3 = new StoreItem(2, "Mining Efficiency", "Miners produce 15 more tidbits each wave.", priceValues[2], miningEfficiency);
    storeItems.push(s1);
    storeItems.push(s2);
    storeItems.push(s3);
    let a = shuffleArray(availiableTowers);
    for (let i = 0; i < 2; i++) {
        let t = getTower(a[i]);
        storeTowers.push(t);
        storeTowerIds.push(a[i]);
        let item = new StoreItem(i + 3, t.name, t.description, 2, t.sprite);
        item.extraObject = t;
        storeItems.push(item);
    }
    let t = getTower(storeTowerList[storeTowerListIndex]);
    storeTowers.push(t);
    storeTowerIds.push(storeTowerList[storeTowerListIndex]);
    let item = new StoreItem(5, t.name, t.description, t.storeCost, t.sprite);
    item.extraObject = t;
    storeItems.push(item);
    storeTowerListIndex++;
    let saleGiz = floor(random(0, 6));
    a = shuffleArray(basicGizmoValues);
    for (let i = 0; i < 3; i++) {
        let g = getGizmo(a[i]);
        storeGizmos.push(g);
        let item = new StoreItem(i + 6, g.name, g.description, g.cost, g.sprite);
        if (i == saleGiz) {
            item.sale = true;
            item.cost--;
        }
        storeItems.push(item);
    }
    for (let i = 0; i < 3; i++) {
        let g = getSpecialGizmo();
        storeGizmos.push(g);
        let item = new StoreItem(i + 6, g.name, g.description, g.cost, g.sprite);
        if (i + 3 == saleGiz) {
            item.sale = true;
            item.cost--;
        }
        storeItems.push(item);
    }
}

function setupStoreScreen() {
    clearButtons();
    let leftButton = new MapScreenButton(0, 650 * uiScale, 280 * uiScale, 70 * uiScale, false);
    let rightButton = new WorkshopScreenButton(1000 * uiScale, 650 * uiScale, 280 * uiScale, 70 * uiScale, true);
    leftButton.enabled = true;
    rightButton.enabled = true;
    addButton(leftButton);
    addButton(rightButton);

    for (let i = 0; i < storeItems.length; i++) {
        let yAdjust = i >= 9 ? -15 : 0;
        let b = new StoreButton(((i % 3) * 290 + 35) * uiScale, (floor(i / 3) * 130 + 90 + yAdjust) * uiScale, 285 * uiScale, 110 * uiScale, storeItems[i], i);
        addButton(b);
    }
    updateButtons();
}

function drawStoreItemDescription() {
    let item = null;
    if (highlightedStoreItem >= 0) {
        item = storeItems[highlightedStoreItem];
    } else {
        return;
    }

    fill(230, 230, 230);
    textAlign(CENTER, CENTER);
    textSize(36 * uiScale);
    text(item.name, 1097.5 * uiScale, 60 * uiScale);
    textAlign(LEFT, TOP);
    textSize(28 * uiScale);
    text(item.description, 945 * uiScale, 105 * uiScale, 305 * uiScale, 400 * uiScale);
    textAlign(LEFT, CENTER);
    if (highlightedStoreItem == 0) {
        text(startingTidbits + " → " + (startingTidbits + 100), 1035 * uiScale, 238 * uiScale);
        drawSprite(tidbitStash, 1000 * uiScale, 235 * uiScale, 0, 0.75 * uiScale);
    } else if (highlightedStoreItem == 1) {
        text(tidbitsPerWave + " → " + (tidbitsPerWave + 25), 1035 * uiScale, 238 * uiScale);
        drawSprite(tidbitGathering, 1000 * uiScale, 235 * uiScale, 0, 0.75 * uiScale);
    } else if (highlightedStoreItem == 2) {
        text(minerTidbitGain + " → " + (minerTidbitGain + 15), 1035 * uiScale, 238 * uiScale);
        drawSprite(miningEfficiency, 1000 * uiScale, 235 * uiScale, 0, 0.8 * uiScale);
    } else if (highlightedStoreItem <= 5) {
        let t = item.extraObject;
        textSize(24 * uiScale);
        text(t.cost, 990 * uiScale, 261 * uiScale);
        text(t.damage + t.dmgText, 1150 * uiScale, 261 * uiScale);
        text(t.fireRate + "s", 990 * uiScale, 321 * uiScale);
        text(t.range, 1150 * uiScale, 321 * uiScale);
        drawSprite(tidbitIcon, 960 * uiScale, 260 * uiScale, 0, uiScale);
        drawSprite(damageIcon, 1120 * uiScale, 260 * uiScale, 0, uiScale);
        drawSprite(reloadIcon, 960 * uiScale, 320 * uiScale, 0, uiScale);
        drawSprite(rangeIcon, 1120 * uiScale, 320 * uiScale, 0, uiScale);
    }
}


class StoreItem {
    constructor(type, name, desc, cost, sprite) {
        this.type = type;
        this.name = name;
        this.description = desc;
        this.cost = cost;
        this.sprite = sprite;
        this.extraObject = null;
        this.purchased = false;
        this.sale = false;
    }
}

function purchaseItem(id) {
    polygons -= storeItems[id].cost;
    if (id == 0) {
        startingTidbits += 100;
        priceValues[0] = 3;
        storeItems[0].cost += 1;
    } else if (id == 1) {
        tidbitsPerWave += 25;
        priceValues[1] = 3;
        storeItems[1].cost += 1;
    } else if (id == 2) {
        minerTidbitGain += 15;
        priceValues[2] = 3;
        storeItems[2].cost += 1;
    } else if (id < 6) {
        ownedTowers.push(storeTowers[id - 3]);
        removeTowerId(storeTowerIds[id - 3]);
        storeItems[id].purchased = true;
    } else {
        obtainGizmo(storeGizmos[id - 6]);
        storeItems[id].purchased = true;
    }
}
