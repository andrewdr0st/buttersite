
var buttons = [];

function drawButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
}

function checkButtonClick() {
    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        if (b.canClick()) {
            b.onClick();
            return;
        }
    }
}

function updateButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].update();
    }
}

function addButton(b) {
    buttons.push(b);
}

function clearButtons() {
    buttons = [];
}



class Button {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.enabled = false;
    }

    checkHover() {
        return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    }

    onClick() {
        
    }

    canClick() {
        return this.checkHover() && this.enabled;
    }

    draw() {
        
    }

    update() {
        
    }
}


class SidebarButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    checkHover() {
        if (sidebarButtonsEnabled) {
            return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
        }
    }
}


class TurretButton extends SidebarButton {
    constructor(x, y, w, h, t, id, r, hOffset) {
        super(x, y, w, h);
        this.turret = t;
        this.id = id;
        this.r = r;
        this.hOffset = hOffset;
    }

    onClick() {
        if (placingTower && this.id == selectedTower) {
            placingTower = false;
        } else {
            placingTower = true;
            selectedTower = this.id;
            selectedTurret = null;
        }
    }

    draw() {
        if (this.checkHover() && this.enabled) {
            fill(175, 175, 175);
        } else {
            fill(140, 140, 140);
        }
        rect(this.x, this.y, this.w, this.h);
        drawSprite(this.turret.sprite, this.x + this.w / 2, this.y + this.h / this.hOffset, this.r, uiScale);
        if (!this.enabled) {
            fill(0, 0, 0, 150);
            rect(this.x, this.y, this.w, this.h);
        }
    }

    update() {
        this.enabled = tidbits >= this.turret.cost;
        if (this.turret.unavailable || this.turret.banned) {
            this.enabled = false;
        }
    }
}


class PlayButton extends SidebarButton {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        if (this.checkHover()) {
            fill(80, 230, 80);
        } else {
            fill(70, 200, 70);
        }
        rect(this.x, this.y, this.w, this.h, this.w / 10);
        fill(230, 230, 230);
        if (waveInProgress && timeScale > 0) {
            let x1 = this.x + this.w / 24 * 11;
            let x2 = this.x + this.w / 24 * 13;
            let y1 = this.y + this.h / 4;
            rect(x1, y1, this.w / -6, this.h / 2);
            rect(x2, y1, this.w / 6, this.h / 2);
        } else {
            let x1 = this.x + this.w / 3;
            let x2 = this.x + this.w / 3 * 2;
            let y1 = this.y + this.h / 4;
            let y2 = this.y + this.h / 4 * 3;
            let y3 = this.y + this.h / 2;
            triangle(x1, y1, x1, y2, x2, y3);
        }
    }

    onClick() {
        if (!waveInProgress) {
            beginSpawning();
            waveInProgress = true;
            gameSpeedChange = 2;
        } else {
            if (timeScale == 0) {
                gameSpeedChange = 2;
            } else {
                gameSpeedChange = 1;
            }
        }
    }
}


class LaunchButton extends SidebarButton {
    constructor(x, y, w, h, final) {
        super(x, y, w, h);
        this.final = final;
    }

    draw() {
        if (waveInProgress) {
            if (this.checkHover() && this.enabled) {
                fill(70, 170, 230);
            } else {
                fill(50, 150, 210);
            }
            rect(this.x, this.y, this.w, this.h, this.w / 10);
            if (fastForward) {
                fill(160, 245, 255);
            } else {
                fill(230, 230, 230);
            }
            let x1 = this.x + this.w / 10 * 3;
            let x2 = this.x + this.w / 10 * 6;
            let x3 = this.x + this.w / 10 * 5;
            let x4 = this.x + this.w / 10 * 8;
            let y1 = this.y + this.h / 4;
            let y2 = this.y + this.h / 4 * 3;
            let y3 = this.y + this.h / 2;
            triangle(x1, y1, x1, y2, x2, y3);
            triangle(x3, y1, x3, y2, x4, y3);
        } else if (this.final) {
            fill(180, 40, 70);
            rect(this.x, this.y, this.w, this.h, this.w / 10);
            textSize(45 * uiScale);
            textAlign(CENTER, CENTER);
            fill(230, 230, 230);
            text(11 - waveCount, this.x + this.w / 2, this.y + this.h / 2 + 2 * uiScale);
        } else {
            if (this.checkHover() && this.enabled) {
                fill(230, 70, 70);
            } else {
                fill(200, 50, 50);
            }
            rect(this.x, this.y, this.w, this.h, this.w / 10);
            fill(230, 230, 230);
            let lr = this.w / 9;
            let flr = this.w / 5;
            let u = -this.h / 4;
            let d = this.h / 3;
            let top = -this.h / 2;
            push();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            rotate(50);
            beginShape();
            vertex(0, top);
            vertex(-lr, u);
            vertex(-lr, 0);
            vertex(-flr, d);
            vertex(-lr, d * 0.8);
            vertex(-lr, d);
            vertex(lr, d);
            vertex(lr, d * 0.8);
            vertex(flr, d);
            vertex(lr, 0);
            vertex(lr, u);
            endShape();
            pop();
        }
    }

    onClick() {
        if (waveInProgress) {
            fastForward = !fastForward;
            if (timeScale != 0) {
                gameSpeedChange = 2;
            }
        } else {
            if (!this.final) {
                leaveGameplay();
            }
        }
    }
}


class TowerPickButton extends Button {
    constructor(x, y, w, h, id, start) {
        super(x, y, w, h);
        this.id = id;
        this.start = start;
    }

    onClick() {
        if (checkHighlight(this.id)) {
            for (let i = 0; i < highlightTowers.length; i++) {
                if (highlightTowers[i] == this.id) {
                    highlightTowers.splice(i, 1);
                }
            }
        } else if (this.start) {
            if (highlightTowers.length == 2) {
                highlightTowers[0] = highlightTowers[1];
                highlightTowers[1] = this.id;
            } else {
                highlightTowers.push(this.id);
            }
        } else {
            if (highlightTowers.length == 1) {
                highlightTowers[0] = this.id;
            } else {
                highlightTowers.push(this.id);
            }
        }
        updateButtons();
    }
}


class EmbarkButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    onClick() {
        if (currentScreen == "map") {
            clearButtons();
            gameplaySetup();
            clearStars();
        } else if (initialPick) {
            clearButtons();
            let id1 = towerPreviews[highlightTowers[0]];
            let id2 = towerPreviews[highlightTowers[1]]
            ownedTowers.push(getTower(id1));
            ownedTowers.push(getTower(id2));
            removeTowerId(id1);
            removeTowerId(id2);
            initialPick = false;
            clearStars();
            gameplaySetup();
        } else if (rewardPick) {
            let rPick = highlightTowers[0] == 0 ? rewardTypes[0] : rewardTypes[1];
            if (rPick == 0) {
                changeLives(15);
            } else if (rPick == 1) {
                obtainGizmo(getSpecialGizmo());
            } else if (rPick == 2) {
                scaleneScales = true;
            } else if (rPick == 3) {
                lifeInsurance = true;
            } else if (rPick == 4) {
                acidRain = true;
            } else if (rPick == 5) {
                blizzard = true;
            } else if (rPick == 6) {
                blueprints = true;
            } else {
                spareParts = true;
            }
            if (rPick > 1) {
                rewardTypes = [0, 1];
            } else {
                clearButtons();
                clearStars();
                rewardPick = false;
                setupStore();
                setupGalaxyMap();
                setupMapScreen();
                currentScreen = "map";
            }
        } else {
            clearButtons();
            let id = towerPreviews[highlightTowers[0]];
            ownedTowers.push(getTower(id));
            removeTowerId(id);
            rewardPick = true;
            setupRewardChoices();
        }
        towerPreviews = [];
        highlightTowers = [];
    }

    draw() {
        if (this.checkHover() && this.enabled) {
            fill(70, 200, 70);
        } else {
            fill(50, 180, 50);
        }
        rect(this.x, this.y, this.w, this.h, this.w / 20);
        fill(220, 220, 220);
        textAlign(CENTER, CENTER);
        textSize(40 * uiScale);
        let t = "Continue";
        if (initialPick) {
            t = "Embark";
        } else if (currentScreen == "map") {
            t = "Next Planet";
        }
        text(t, this.x + this.w/2, this.y + this.h/2);
        if (!this.enabled) {
            fill(0, 0, 0, 140);
            rect(this.x, this.y, this.w, this.h, this.w / 20);
        }
    }

    update() {
        if (initialPick) {
            this.enabled = (highlightTowers.length == 2);
        } else {
            this.enabled = (highlightTowers.length == 1);
        }
    }
}


class MapScreenButton extends Button {
    constructor(x, y, w, h, right) {
        super(x, y, w, h);
        this.right = right;
        this.x2 = right ? x + w / 9 : x + w / 9 * 8;
        this.y2 = y + h / 3;
    }

    onClick() {
        setupMapScreen();
        currentScreen = "map";
    }

    draw() {
        if (this.checkHover() && this.enabled) {
            fill(135, 40, 140);
        } else {
            fill(115, 30, 120);
        }
        beginShape();
        vertex(this.x, this.y + this.h);
        if (this.right) {
            vertex(this.x, this.y2);
            vertex(this.x2, this.y);
            vertex(this.x + this.w, this.y);
        } else {
            vertex(this.x, this.y);
            vertex(this.x2, this.y);
            vertex(this.x + this.w, this.y2);
        }
        vertex(this.x + this.w, this.y + this.h);
        endShape();
        textAlign(CENTER, CENTER);
        textSize(40 * uiScale);
        fill(230, 230, 230);
        let t = this.right ? "Map →" : "← Map"
        text(t, this.x + this.w / 2, this.y + this.h / 2);
    }
}


class StoreScreenButton extends Button {
    constructor(x, y, w, h, right) {
        super(x, y, w, h);
        this.right = right;
        this.x2 = right ? x + w / 9 : x + w / 9 * 8;
        this.y2 = y + h / 3;
    }

    onClick() {
        setupStoreScreen();
        currentScreen = "store";
    }

    draw() {
        if (this.checkHover() && this.enabled) {
            fill(180, 40, 95);
        } else {
            fill(155, 30, 80);
        }
        beginShape();
        vertex(this.x, this.y + this.h);
        if (this.right) {
            vertex(this.x, this.y2);
            vertex(this.x2, this.y);
            vertex(this.x + this.w, this.y);
        } else {
            vertex(this.x, this.y);
            vertex(this.x2, this.y);
            vertex(this.x + this.w, this.y2);
        }
        vertex(this.x + this.w, this.y + this.h);
        endShape();
        textAlign(CENTER, CENTER);
        textSize(40 * uiScale);
        fill(230, 230, 230);
        let t = this.right ? "Store →" : "← Store"
        text(t, this.x + this.w / 2, this.y + this.h / 2);
    }
}


class WorkshopScreenButton extends Button {
    constructor(x, y, w, h, right) {
        super(x, y, w, h);
        this.right = right;
        this.x2 = right ? x + w / 9 : x + w / 9 * 8;
        this.y2 = y + h / 3;
    }

    onClick() {
        setupWorkshopScreen();
        currentScreen = "workshop";
    }

    draw() {
        if (this.checkHover() && this.enabled) {
            fill(70, 70, 170);
        } else {
            fill(60, 60, 145);
        }
        beginShape();
        vertex(this.x, this.y + this.h);
        if (this.right) {
            vertex(this.x, this.y2);
            vertex(this.x2, this.y);
            vertex(this.x + this.w, this.y);
        } else {
            vertex(this.x, this.y);
            vertex(this.x2, this.y);
            vertex(this.x + this.w, this.y2);
        }
        vertex(this.x + this.w, this.y + this.h);
        endShape();
        textAlign(CENTER, CENTER);
        textSize(40 * uiScale);
        fill(230, 230, 230);
        let t = this.right ? "Workshop →" : "← Workshop"
        text(t, this.x + this.w / 2, this.y + this.h / 2);
    }
}


class StoreButton extends Button {
    constructor(x, y, w, h, item, itemId) {
        super(x, y, w, h);
        this.item = item;
        this.itemId = itemId;
        this.s = itemId >= 6 ? 1.3 : 1.2;
        this.r = itemId >= 3 && itemId <= 5 && item.extraObject.canRotate ? -90 : 0;
        this.yOff = itemId >= 3 && itemId <= 5 && item.extraObject.canRotate ? 9 : 0;
    }

    onClick() {
        purchaseItem(this.itemId);
    }

    draw() {
        if (this.checkHover() && this.enabled) {
            fill(165, 150, 155);
        } else {
            fill(140, 130, 135);
        }
        rect(this.x, this.y, this.w, this.h, 8 * uiScale);
        if (this.checkHover() && this.enabled) {
            fill(195, 195, 195);
        } else {
            fill(170, 170, 170);
        }
        rect(this.x + 5 * uiScale, this.y + 5 * uiScale, 100 * uiScale, 100 * uiScale, 5 * uiScale);
        drawSprite(this.item.sprite, this.x + 55 * uiScale, this.y + (55 + this.yOff) * uiScale, this.r, uiScale * this.s);
        textAlign(LEFT, CENTER);
        if (this.item.name.length > 16) {
            textSize(20 * uiScale);
        } else {
            textSize(22 * uiScale);
        }
        fill(220, 220, 220);
        text(this.item.name, this.x + 115 * uiScale, this.y + 25 * uiScale);
        textSize(24 * uiScale);
        if (this.item.purchased) {
            text("Sold Out", this.x + 140 * uiScale, this.y + 75 * uiScale);
        } else if (this.item.cost == 0) {
            fill(100, 220, 210);
            text("Free!", this.x + 125 * uiScale, this.y + 75 * uiScale);
        } else {
            if (this.item.cost > polygons) {
                fill(230, 20, 20);
            } else if (this.item.sale) {
                fill(100, 220, 210);
            }
            if (this.item.sale) {
                text("Sale!", this.x + 205 * uiScale, this.y + 75 * uiScale);                
            }
            text(this.item.cost, this.x + 160 * uiScale, this.y + 75 * uiScale);
            drawSprite(polygonIcon, this.x + 135 * uiScale, this.y + 75 * uiScale, 0, uiScale * 0.9);
        }
        if (!this.enabled) {
            fill(0, 0, 0, 140);
            rect(this.x, this.y, this.w, this.h, 8 * uiScale);
        }
    }

    update() {
        this.enabled = polygons >= this.item.cost && !this.item.purchased;
        if (this.checkHover()) {
            highlightedStoreItem = this.itemId;
        }
    }
}


class SellButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        if (this.checkHover()) {
            fill(220, 70, 70);
        } else {
            fill(200, 50, 50);
        }
        rect(this.x, this.y, this.w, this.h, 8 * uiScale);
        textSize(20 * uiScale);
        fill(230, 230, 230);
        if (selectedTurret.canSell) {
            textAlign(LEFT, CENTER);
            text("Sell: " + selectedTurret.sellAmount, this.x + 6 * uiScale, this.y + this.h / 2 + 2 * uiScale);
        } else {
            textAlign(CENTER, CENTER);
            text("Destroy", this.x + this.w / 2, this.y + this.h / 2 + 2 * uiScale);
        }
    }

    onClick() {
        sellTurret(selectedTurret);
        turretButtonClicked = true;
    }
    
}


class TargetButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        if (this.checkHover()) {
            fill(170, 60, 210);
        } else {
            fill(150, 40, 190);
        }
        rect(this.x, this.y, this.w, this.h, 8 * uiScale);
        let t = "";
        if (selectedTurret.targetMode == 0) {
            t = "First";
        } else if (selectedTurret.targetMode == 1) {
            t = "Last";
        } else if (selectedTurret.targetMode == 2) {
            t = "Health";
        } else {
            t = "Danger";
        }
        textAlign(CENTER, CENTER);
        textSize(20 * uiScale);
        fill(230, 230, 230);
        text(t, (this.x + this.w / 2), this.y + this.h / 2 + 2 * uiScale);
    }

    onClick() {
        turretButtonClicked = true;
        selectedTurret.targetMode = (selectedTurret.targetMode + 1) % 4;
    }
}


class InfoButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        if (this.checkHover()) {
            fill(85, 150, 235);
        } else {
            fill(65, 130, 215);
        }
        rect(this.x, this.y, this.w, this.h, uiScale * 4);
        fill(230, 230, 230);
        ellipse(this.x + this.w / 2, this.y + uiScale * 7, 7 * uiScale, 7 * uiScale);
        rect(this.x + this.w / 2 - uiScale * 3, this.y + uiScale * 13, uiScale * 6, uiScale * 13);
    }

    onClick() {
        turretButtonClicked = true;
        showInfo = !showInfo;
        infoX = selectedTurret.x * tileSize - 25 * uiScale;
        infoY = selectedTurret.y * tileSize - 90 * uiScale;
        if (selectedTurret.x == 0) {
            infoX += 30 * uiScale;
        } else if (selectedTurret.x == 16) {
            infoX -= 30 * uiScale;
        }
        if (selectedTurret.y <= 1) {
            infoY += 200 * uiScale;
        } else if (selectedTurret.y == 11) {
            infoY -= 50 * uiScale;
        }
    }
}


class WavePreview extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.baseY = y;
        this.baseH = h;
    }

    draw() {
        let spawnDetails = [];
        for (let i = 0; i < spawns.length; i++) {
            let s = spawns[i];
            if (s[1] == 0) {
                continue;
            }
            if (spawnDetails.length > 0 && s[0] == spawnDetails[spawnDetails.length - 1][0] && s[3] - 1 == spawnDetails[spawnDetails.length - 1][1]) {
                spawnDetails[spawnDetails.length - 1][2] += s[1];
                continue;
            }
            spawnDetails.push([s[0], s[3] - 1, s[1]]);
        }
        let spawnExtras = floor((spawnDetails.length - 1) / 5);
        if (this.checkHover()) {
            this.y = this.baseY - 45 * uiScale * spawnExtras;
            this.h = this.baseH * (spawnExtras + 1);
        } else {
            this.y = this.baseY;
            this.h = this.baseH;
        }
        fill(65, 65, 65);
        rect(this.x, this.y, this.w, this.h, 10 * uiScale);
        textSize(18 * uiScale);
        textAlign(CENTER, CENTER);
        for (let i = 0; i < spawnDetails.length && (i < 5 || this.checkHover()); i++) {
            let x = 30 + i % 5 * 50;
            let y = floor(i / 5) * 45 + 593;
            if (this.checkHover()) {
                y -= 45 * spawnExtras;
            }
            drawSidebarSprite(enemySpriteList[spawnDetails[i][0]][spawnDetails[i][1]], x, y, 0.75);
            fill(230, 230, 230);
            sidebarText(spawnDetails[i][2], x + 18, y + 13);
        }
    }
}


class StartButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        if (this.checkHover()) {
            fill(250, 250, 250);
        } else {
            fill(220, 220, 220);
        }
        rect(this.x, this.y, this.w, this.h, this.w / 15);
        fill(50, 50, 50);
        textAlign(CENTER, CENTER);
        textSize(48 * uiScale);
        text("Play", this.x + this.w / 2, this.y + this.h / 2 + 2 * uiScale);
    }

    onClick() {
        clearButtons();
        titleView = "difficulty";
        setupDifficultyScreen();
    }
}

class SettingsButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        if (this.checkHover()) {
            fill(250, 250, 250);
        } else {
            fill(220, 220, 220);
        }
        rect(this.x, this.y, this.w, this.h, this.w / 15);
        fill(50, 50, 50);
        textAlign(CENTER, CENTER);
        textSize(42 * uiScale);
        text("Settings", this.x + this.w / 2, this.y + this.h / 2 + 2 * uiScale);
    }

    onClick() {
        
    }
}


class BeginButton extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        if (this.checkHover()) {
            fill(250, 250, 250);
        } else {
            fill(220, 220, 220);
        }
        rect(this.x, this.y, this.w, this.h, this.w / 15);
        fill(50, 50, 50);
        textAlign(CENTER, CENTER);
        textSize(46 * uiScale);
        text("Begin", this.x + this.w / 2, this.y + this.h / 2 + 2 * uiScale);
    }

    onClick() {
        clearButtons();
        beginGame();
    }
}

class BackButton extends Button {
    constructor(x, y, w, h, v) {
        super(x, y, w, h);
        this.v = v;
    }

    draw() {
        if (this.checkHover()) {
            fill(190, 80, 70);
        } else {
            fill(160, 50, 45);
        }
        rect(this.x, this.y, this.w, this.h, this.w / 10);
        fill(230, 230, 230);
        let x1 = this.x + this.w * 0.15;
        let x2 = this.x + this.w * 0.5;
        let w1 = this.w * 0.35;
        let y1 = this.y + this.h * 0.2;
        let y2 = this.y + this.h * 0.5;
        let y3 = this.y + this.h * 0.8;
        let y4 = this.y + this.h * 0.33;
        let h1 = this.h * 0.33;
        triangle(x1, y2, x2, y1, x2, y3);
        rect(x2, y4, w1, h1);
    }

    onClick() {
        if (this.v == 0) {
            clearButtons();
            titleView = "title";
            setupTitleButtons();
        }
    }
}


class DifficultyButton extends Button {
    constructor(x, y, w, h, type) {
        super(x, y, w, h);
        this.type = type;
    }

    draw() {
        if (this.type == difficultyHighlight) {
            fill(220, 220, 100);
            rect(this.x - 5 * uiScale, this.y - 5 * uiScale, this.w + 10 * uiScale, this.h + 10 * uiScale, this.w / 15);
        }
        fill(85, 85, 85);
        rect(this.x, this.y, this.w, this.h, this.w / 15);
        let difText = "";
        let descText = "";
        if (this.type == 0) {
            difText = "Algebra";
            descText = "Start with additional lives\nand gain lives after\neach planet";
            drawSprite(happyFace, this.x + this.w / 2, this.y + 170 * uiScale, 0, uiScale);
        } else if (this.type == 1) {
            difText = "Geometry";
            descText = "The intended difficulty";
            drawSprite(midFace, this.x + this.w / 2, this.y + 170 * uiScale, 0, uiScale);
        } else {
            difText = "Calculus";
            descText = "Enemy waves are much\nmore difficult";
            drawSprite(sadFace, this.x + this.w / 2, this.y + 170 * uiScale, 0, uiScale);
        }
        fill(230, 230, 230);
        textSize(42 * uiScale);
        textAlign(CENTER, CENTER);
        text(difText, this.x + this.w / 2, this.y + 50 * uiScale);
        textSize(26 * uiScale);
        textAlign(CENTER, TOP);
        text(descText, this.x + this.w / 2, this.y + 280 * uiScale);
    }

    onClick() {
        difficultyHighlight = this.type;
    }
}


class TransmissionButton extends Button {
    constructor(x, y, w, h, tChoice) {
        super(x, y, w, h);
        this.enabled = true;
        this.tChoice = tChoice;
    }

    draw() {
        if (this.checkHover()) {
            fill(180, 180, 180);
        } else {
            fill(150, 150, 150);
        }
        rect(this.x, this.y, this.w, this.h, 10 * uiScale);
        fill(30, 30, 30);
        textSize(this.tChoice.textSize * uiScale);
        if (this.tChoice.polygons == 0) {
            textAlign(CENTER, CENTER);
            text(this.tChoice.getText(), this.x + 5 * uiScale, this.y + 5 * uiScale, this.w - 10 * uiScale, this.h - 10 * uiScale);
        } else {
            textAlign(CENTER, TOP);
            text(this.tChoice.getText(), this.x + 5 * uiScale, this.y + 12 * uiScale, this.w - 10 * uiScale, this.h - 10 * uiScale);
            textAlign(CENTER, CENTER);
            textSize(32 * uiScale);
            text("+" + this.tChoice.polygons, this.x + this.w * 0.4, this.y + this.h * 0.8);
            drawSprite(polygonIcon, this.x + this.w * 0.6, this.y + this.h * 0.77, 0, uiScale * 1.3);
        }
    }

    onClick() {
        polygons += this.tChoice.polygons;
        this.tChoice.effect();
        clearButtons();
        showTransmission = false;
        setupSidebarButtons();
        sidebarButtonsEnabled = true;
    }
}
