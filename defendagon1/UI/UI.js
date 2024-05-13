
var sidebarX;
var uiScale;
var sidebarButtonsEnabled = false;

//Sidebar width = 260 at max screen size

function setupUI() {
    sidebarX = tileSize * 17;
    uiScale = gameScale / 10;
}

function drawSidebarSprite(sprite, x, y, s = 1) {
    drawSprite(sprite, sidebarX + x * uiScale, y * uiScale, 0, uiScale * s);
}

function sidebarText(t, x, y) {
    text(t, sidebarX + x * uiScale, y * uiScale);
}

function drawSidebar() {
    //Background
    fill(90, 90, 90);
    rect(sidebarX, 0, width - sidebarX, height);
    fill(65, 65, 65);
    rect(sidebarX + 5 * uiScale, 5 * uiScale, 250 * uiScale, 100 * uiScale, 10 * uiScale);

    drawSidebarSprite(livesIcon, 30, 30);
    drawSidebarSprite(tidbitIcon, 30, 81);
    drawSidebarSprite(polygonIcon, 160, 80);
    
    fill(220, 220, 220);
    textAlign(LEFT, CENTER);
    textSize(24 * uiScale);
    sidebarText(lives, 58, 32);
    sidebarText(tidbits, 58, 81);
    sidebarText(polygons, 190, 81);
    textSize(22 * uiScale);
    let waveText = waveInProgress ? "Upcoming" : "Next Wave";
    sidebarText(waveText, 8, 556);
    
    if (waveCount > 10) {
        drawSprite(dangerIcon, sidebarX + 240 * uiScale, 556 * uiScale, 0, uiScale);
    }
    
    textAlign(CENTER, CENTER);
    textSize(18 * uiScale);
    for (let i = 0; i < ownedTowers.length && i < 9; i++) {
        let t = ownedTowers[i];
        if (t.cost > tidbits || t.unavailable || t.banned) {
            fill(200, 90, 90);
        } else if (t.unique) {
            fill(210, 100, 220);
        } else {
            fill(220, 220, 220);
        }
        if (t.unavailable || t.banned) {
            sidebarText("---", 50 + (i % 3) * 80, 227 + floor(i / 3) * 125);
        } else {
            sidebarText(ownedTowers[i].cost, 50 + (i % 3) * 80, 227 + floor(i / 3) * 125);
        }
        
    }
}

function setupSidebarButtons() {
    for (let i = 0; i < ownedTowers.length && i < 9; i++) {
        let r = -90;
        let hOffset = 1.7;
        if (!ownedTowers[i].canRotate) {
            r = 0;
            hOffset = 2;
        }
        let buttonX = sidebarX + (15 + (i % 3) * 80) * uiScale;
        let buttonY = (130 + floor(i / 3) * 125) * uiScale;
        let tButton = new TurretButton(buttonX, buttonY, 70 * uiScale, 75 * uiScale, ownedTowers[i], i, r, hOffset);
        tButton.enabled = true;
        addButton(tButton);
    }

    
    let playButton = new PlayButton(sidebarX + 15 * uiScale, 630 * uiScale, 110 * uiScale, 80 * uiScale);
    playButton.enabled = true;
    addButton(playButton);

    let launchButton = new LaunchButton(sidebarX + 135 * uiScale, 630 * uiScale, 110 * uiScale, 80 * uiScale, currentPlanet == 5);
    launchButton.enabled = true;
    addButton(launchButton);

    let wavePreview = new WavePreview(sidebarX + 5 * uiScale, 570 * uiScale, 250 * uiScale, 45 * uiScale);
    addButton(wavePreview);
    
    updateButtons();
}

