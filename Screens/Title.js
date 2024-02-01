
var titleLetters = [];
let letterMid;
let letterBound;

var titleView = "title";
var difficultyHighlight = 1;


function setupTitle() {
    letterMid = 160 * uiScale;
    letterBound = 12 * uiScale;
    addTitleLetter(letterD, 0);
    addTitleLetter(letterE, 1);
    addTitleLetter(letterF, 2);
    addTitleLetter(letterE, 3);
    addTitleLetter(letterN, 4);
    addTitleLetter(letterD, 5);
    addTitleLetter(letterA, 6);
    addTitleLetter(letterG, 7);
    addTitleLetter(letterO, 8);
    addTitleLetter(letterN, 9);
    
    setupStars();
    setupTitleButtons();
}

function setupTitleButtons() {
    let b = new StartButton(500 * uiScale, 380 * uiScale, 280 * uiScale, 80 * uiScale);
    b.enabled = true;
    addButton(b);
    let b2 = new SettingsButton(500 * uiScale, 480 * uiScale, 280 * uiScale, 80 * uiScale);
    b.enabled = true;
    addButton(b2);
}

function titleScreen() {
    background(40, 20, 50);
    drawStars();
    
    if (titleView == "difficulty") {
        drawDifficulty();
    } else {
        drawTitle();
    }

}

function drawTitle() {
    for (let i = 0; i < titleLetters.length; i++) {
        let l = titleLetters[i];
        drawSprite(l[0], l[1], l[2], 0, uiScale);
        l[2] = constrain(l[2] + l[3] * deltaTime, letterMid - letterBound, letterMid + letterBound);
        if (l[2] >= letterMid + letterBound || l[2] <= letterMid - letterBound) {
            l[3] *= -1;
        }
    }
}

function drawDifficulty() {
    fill(220, 220, 220);
    textAlign(CENTER, CENTER);
    textSize(60 * uiScale);
    text("Select Difficulty", 640 * uiScale, 70 * uiScale);
}

function setupDifficultyScreen() {
    let b1 = new BeginButton(500 * uiScale, 600 * uiScale, 280 * uiScale, 80 * uiScale);
    b1.enabled = true;
    addButton(b1);
    let b2 = new BackButton(20 * uiScale, 20 * uiScale, 50 * uiScale, 50 * uiScale, 0);
    b2.enabled = true;
    addButton(b2);
    let d1 = new DifficultyButton(110 * uiScale, 140 * uiScale, 320 * uiScale, 420 * uiScale, 0);
    d1.enabled = true;
    addButton(d1);
    let d2 = new DifficultyButton(480 * uiScale, 140 * uiScale, 320 * uiScale, 420 * uiScale, 1);
    d2.enabled = true;
    addButton(d2);
    let d3 = new DifficultyButton(850 * uiScale, 140 * uiScale, 320 * uiScale, 420 * uiScale, 2);
    d3.enabled = true;
    addButton(d3);
}

function addTitleLetter(letter, pos) {
    let v = random(0, 1) > 0.5 ? -1 : 1;
    titleLetters.push([letter, (190 + 100 * pos) * uiScale, letterMid, v * random(0.5, 2)]);
}

