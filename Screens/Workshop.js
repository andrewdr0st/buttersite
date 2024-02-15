
var gizmoBoxes = [];
var highlightedBoxInfo = [-1, -1];
var selectedGizmo = null;
var grabbedGizmoInfo = [-1, -1];
var tSwitchIndex = 0;

function workshopScreen() {
    background(55, 55, 70);
    fill(45, 45, 55);
    rect(15 * uiScale, 15 * uiScale, 1250 * uiScale, 430 * uiScale, 15 * uiScale);
    fill(90, 90, 100);
    rect(15 * uiScale, 460 * uiScale, 1250 * uiScale, 150 * uiScale, 15 * uiScale);
    let x = 50 * uiScale;
    let y = 470 * uiScale;
    let s = 60 * uiScale;
    let gap = 10 * uiScale;
    fill(65, 65, 70);
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 2; j++) {
            rect(x + (s + gap) * i, y + (s + gap) * j, s, s, gap);
        }
    }
    rect(x + (s + gap) * 10.5, y, 470 * uiScale, 130 * uiScale, gap);
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
            let g = ownedGizmos[i * 10 + j]
            if (g != null) {
                if (selectedGizmo != null && selectedGizmo.id == g.id) {
                    continue;
                }
                g.draw(x + (gap + s) * j + s / 2, y + (gap + s) * i + s / 2);
            }
        }
    }
    fill(200, 200, 210);
    textAlign(CENTER, CENTER);
    textSize(55 * uiScale);
    text("Workshop", 640 * uiScale, 670 * uiScale);
    drawWorkshopTowers();
    highlightGizmoBox();
    drawGizmoDescription();
    drawSelectedGizmo();
}

function drawWorkshopTowers() {
    let x = 25 * uiScale;
    let y = 25 * uiScale;
    let w = 300 * uiScale;
    let h = 200 * uiScale;
    let gap = 10 * uiScale;
    for (let i = 1; i < ownedTowers.length && i < 9; i++) {
        let j = floor((i - 1) / 4);
        let k = (i - 1) % 4;
        if (i != tSwitchIndex) {
            let t = ownedTowers[i];
            drawWorkshopTower(t, x + (w + gap) * k, y + (h + gap) * j, w, h);
        } else {
            fill(85, 85, 85);
            rect(x + (w + gap) * k, y + (h + gap) * j, w, h, 11.25 * uiScale);
        }
    }
}

function setupWorkshopScreen() {
    tSwitchIndex = 0;
    setupGizmoBoxes();
    setupWorkshopButtons();
}

function setupWorkshopButtons() {
    clearButtons();
    let leftButton = new StoreScreenButton(0, 650 * uiScale, 280 * uiScale, 70 * uiScale, false);
    let rightButton = new MapScreenButton(1000 * uiScale, 650 * uiScale, 280 * uiScale, 70 * uiScale, true);
    leftButton.enabled = true;
    rightButton.enabled = true;
    addButton(leftButton);
    addButton(rightButton);
    if (ownedTowers.length > 9) {
        for (let i = 1; i < 9; i++) {
            if (tSwitchIndex != i) {
                let swapButton = new TowerSwitchButton((310 * ((i - 1) % 4) + 295) * uiScale, (210 * floor((i - 1) / 4) + 195) * uiScale, i);
                swapButton.enabled = true;
                addButton(swapButton);
            }
        }
    }
    if (tSwitchIndex > 0) {
        if (ownedTowers.length > 12) {
            let x = (46 + ((tSwitchIndex - 1) % 4) * 310) * uiScale;
            let y = (29 + floor((tSwitchIndex - 1) / 4) * 210) * uiScale;
            let w = 60 * uiScale;
            let h = 60 * uiScale;
            let gap = 6 * uiScale;
            let mtb = new MiniTowerButton(x, y, w, h, ownedTowers[tSwitchIndex], tSwitchIndex, 0.8);
            mtb.enabled = true;
            addButton(mtb);
            for (let i = 9; i < ownedTowers.length; i++) {
                let j = i - 8;
                mtb = new MiniTowerButton(x + (w + gap) * (j % 4), y + (h + gap) * floor(j / 4), w, h, ownedTowers[i], i, 0.8);
                mtb.enabled = true;
                addButton(mtb);
            }
        } else {
            let x = (80 + ((tSwitchIndex - 1) % 4) * 310) * uiScale;
            let y = (30 + floor((tSwitchIndex - 1) / 4) * 210) * uiScale;
            let w = 90 * uiScale;
            let h = 90 * uiScale;
            let gap = 10 * uiScale;
            let mtb = new MiniTowerButton(x, y, w, h, ownedTowers[tSwitchIndex], tSwitchIndex, 1);
            mtb.enabled = true;
            addButton(mtb);
            for (let i = 9; i < ownedTowers.length; i++) {
                let j = i - 8;
                mtb = new MiniTowerButton(x + (w + gap) * (j % 2), y + (h + gap) * floor(j / 2), w, h, ownedTowers[i], i, 1);
                mtb.enabled = true;
                addButton(mtb);
            }
        }
    }
}

function drawWorkshopTower(t, x, y, w, h) {
    let unit = 15 * uiScale;
    push();
    translate(x, y);
    //background
    fill(85, 85, 85);
    rect(0, 0, w, h, unit * 0.75);
    fill(65, 65, 65);
    rect(unit * 1.75, unit * 9, unit * 4, unit * 4, 10 * uiScale);
    rect(unit * 6.25, unit * 9, unit * 4, unit * 4, 10 * uiScale);
    //tower img
    fill(140, 140, 140);
    rect(unit * 3.25, unit * 2.75, unit * 5.5, unit * 5.75);
    let r = t.canRotate ? -90 : 0;
    let hOffset = t.canRotate ? unit * 0.7 : 0;
    drawSprite(t.sprite, unit * 6, unit * 5.55 + hOffset, r, 1.25 * uiScale);
    //Icons
    drawSprite(tidbitIcon, unit * 13.75, unit * 2, 0, uiScale);
    drawSprite(damageIcon, unit * 13.75, unit * 5, 0, uiScale);
    drawSprite(reloadIcon, unit * 13.75, unit * 8, 0, uiScale);
    drawSprite(rangeIcon, unit * 13.75, unit * 11, 0, uiScale);
    //gizmos
    if (t.gizmo1 != null) {
        if (selectedGizmo == null || t.gizmo1.id != selectedGizmo.id) {
            t.gizmo1.draw(unit * 3.75, unit * 11);
        }
    }
    if (t.gizmo2 != null) {
        if (selectedGizmo == null || t.gizmo2.id != selectedGizmo.id) {
            t.gizmo2.draw(unit * 8.25, unit * 11);
        }
    }
    //name text
    fill(220, 220, 220);
    textAlign(CENTER, CENTER);
    textSize(25 * uiScale);
    text(t.name, unit * 6, unit * 1.5);
    //icon text
    textAlign(LEFT, CENTER);
    textSize(21 * uiScale);
    text(t.damage + t.dmgText, unit * 15.5, unit * 5.25);
    text(t.fireRate + "s", unit * 15.5, unit * 8.25);
    text(t.range, unit * 15.5, unit * 11.25);
    if (t.unique) {
        fill(210, 110, 220);
    }
    text(t.cost, unit * 15.5, unit * 2.25);
    pop();
}

function setupGizmoBoxes() {
    gizmoBoxes = [];
    let x = 25 * uiScale;
    let y = 25 * uiScale;
    let w = 300 * uiScale;
    let h = 200 * uiScale;
    let gap = 10 * uiScale;
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 4; i++) {
            if (ownedTowers.length > i + j * 4 + 1) {
                gizmoBoxes.push([x + (w + gap) * i + 26.25 * uiScale, y + (h + gap) * j + 135 * uiScale, i + j * 4 + 1, 0]);
                gizmoBoxes.push([x + (w + gap) * i + 93.75 * uiScale, y + (h + gap) * j + 135 * uiScale, i + j * 4 + 1, 1]);
            }
        }
    }
    x = 50 * uiScale;
    y = 470 * uiScale;
    let s = 70 * uiScale;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 2; j++) {
            gizmoBoxes.push([x + s * i, y + s * j, 0, i + j * 10]);
        }
    }
}

function highlightGizmoBox() {
    highlightedBoxInfo = [-1, -1];
    let s = 60 * uiScale;
    fill(200, 200, 195, 80);
    for (let i = 0; i < gizmoBoxes.length; i++) {
        let gb = gizmoBoxes[i];
        if (tSwitchIndex > 0) {
            if (tSwitchIndex * 2 - 1 == i || tSwitchIndex * 2 - 2 == i) {
                continue;
            }
        }
        if (mouseX > gb[0] && mouseX < gb[0] + s && mouseY > gb[1] && mouseY < gb[1] + s) {
            rect(gb[0], gb[1], s, s, 10 * uiScale);
            highlightedBoxInfo = [gb[2], gb[3]];
            break;
        } 
    }
}

function drawGizmoDescription() {
    if (highlightedBoxInfo[0] == -1 && selectedGizmo == null) {
        return;
    }
    let nameText = "";
    let descText = "";
    if (selectedGizmo != null) {
        nameText = selectedGizmo.name;
        descText = selectedGizmo.description;
    } else if (highlightedBoxInfo[0] == 0) {
        let g = ownedGizmos[highlightedBoxInfo[1]];
        if (g == null) {
            return;
        }
        nameText = g.name;
        descText = g.description;
    } else {
        let g = highlightedBoxInfo[1] == 0 ? ownedTowers[highlightedBoxInfo[0]].gizmo1 : ownedTowers[highlightedBoxInfo[0]].gizmo2;
        if (g == null) {
            return;
        }
        nameText = g.name;
        descText = g.description;
    }
    fill(230, 230, 230);
    textAlign(LEFT, TOP);
    textSize(28 * uiScale);
    text(nameText, 795 * uiScale, 480 * uiScale);
    textSize(24 * uiScale);
    text(descText, 795 * uiScale, 525 * uiScale, 460 * uiScale);
}

function workshopClick() {
    if (selectedGizmo == null) {
        if (highlightedBoxInfo[0] != -1) {
            if (highlightedBoxInfo[0] == 0) {
                selectedGizmo = ownedGizmos[highlightedBoxInfo[1]];
            } else {
                selectedGizmo = highlightedBoxInfo[1] == 0 ? ownedTowers[highlightedBoxInfo[0]].gizmo1 : ownedTowers[highlightedBoxInfo[0]].gizmo2;
            }
            grabbedGizmoInfo = [highlightedBoxInfo[0], highlightedBoxInfo[1]];
        }
    } else {
        if (highlightedBoxInfo[0] != -1) {
            if (highlightedBoxInfo[0] == 0) {
                if (grabbedGizmoInfo[0] == 0) {
                    ownedGizmos[grabbedGizmoInfo[1]] = ownedGizmos[highlightedBoxInfo[1]];
                    ownedGizmos[highlightedBoxInfo[1]] = selectedGizmo;
                } else {
                    let t = ownedTowers[grabbedGizmoInfo[0]];
                    if (grabbedGizmoInfo[1] == 0) {
                        t.equipGizmo(ownedGizmos[highlightedBoxInfo[1]], 1);
                    } else {
                        t.equipGizmo(ownedGizmos[highlightedBoxInfo[1]], 2);
                    }
                    ownedGizmos[highlightedBoxInfo[1]] = selectedGizmo;
                }
            } else {
                let t = ownedTowers[highlightedBoxInfo[0]];
                if (grabbedGizmoInfo[0] == 0) {
                    if (highlightedBoxInfo[1] == 0) {
                        ownedGizmos[grabbedGizmoInfo[1]] = t.gizmo1;
                        t.equipGizmo(selectedGizmo, 1);
                    } else {
                        ownedGizmos[grabbedGizmoInfo[1]] = t.gizmo2;
                        t.equipGizmo(selectedGizmo, 2);
                    }
                } else {
                    let t2 = ownedTowers[grabbedGizmoInfo[0]];
                    if (grabbedGizmoInfo[1] == 0) {
                        if (highlightedBoxInfo[1] == 0) {
                            t2.equipGizmo(t.gizmo1, 1);
                        } else {
                            t2.equipGizmo(t.gizmo2, 1)
                        }
                    } else {
                        if (highlightedBoxInfo[1] == 0) {
                            t2.equipGizmo(t.gizmo1, 2);
                        } else {
                            t2.equipGizmo(t.gizmo2, 2)
                        }
                    }
                    if (highlightedBoxInfo[1] == 0) {
                        t.equipGizmo(selectedGizmo, 1);
                    } else {
                        t.equipGizmo(selectedGizmo, 2);
                    }
                }
            }
        }
        selectedGizmo = null;
    }
}

function drawSelectedGizmo() {
    if (selectedGizmo != null) {
        selectedGizmo.draw(mouseX, mouseY);
    }
}
