
var tileSize = 60;
var gameScale = 1;

var currentScreen = "towerSelect";
var gamePaused = false;

var lives = 50;
var tidbits = 500;
var polygons = 0;

var startingTidbits = 500;
var tidbitsPerWave = 200;
var minerTidbitGain = 100;

var ownedTowers = [];

var selectedTower = 0;
var placingTower = false;
var placedMiners = 0;

var waveInProgress = false;
var waveCount = 1;
var waveList = [];
var currentPlanet = 1;

var gameSpeedChange = 0;
var fastForward = false;

var difficultyLevel = 1;


function setup() {

    var wVal = floor((min(windowWidth, 1280) * 9 / 16) / 72);
    var hVal = floor(min(windowHeight, 720) / 72);

    gameScale = min(wVal, hVal);
    tileSize = 6 * gameScale;

    createCanvas(tileSize * 12 / 9 * 16, tileSize * 12);

    galaxyRotation = random(0, 360);

    ownedTowers = [new Miner(), new Cannon()];

    setupUI();
    updateButtons();

    noStroke();
    angleMode(DEGREES);

    waves = planet1Waves;

    //createMap(pickNormalPath(), getTemperateColor());
    //currentScreen = "gameplay";
    //createMap(path12, 9);
    //console.log(calcPathLength(path1));

    resetSpawner();
    addNextWave();

    //setupTowerPreviewsInit();
    //currentScreen = "towerSelect";
    //setupTowerPreviews();
    //setupSidebarButtons();

    /*
    currentScreen = "store";
    setupStore();
    setupStoreScreen();
    */

    //obtainGizmo(getGizmo(6));
    //obtainGizmo(getGizmo(28));
    //obtainGizmo(getGizmo(43));
    
    //ownedTowers = [new Miner(), new Cannon(), new Sniper(), new MachineGunner(), new BigShot(), new Sentry(), new TriShooter(), new Glubba(), new IceBlaster(), new Shotgunner(), new PrototypeY(), new Splitter(), new WaveBreaker(),
    //new Stinger(), new ShootingStar(), new HeatBlaster(), new SnowballLauncher(), new ScrapCannon(), new MiniCannon()];

    //currentScreen = "workshop";
    //setupWorkshopScreen();

    //setupGalaxyMap();
    //setupMapScreen();
    //currentScreen = "map";

    setupTitle();
    currentScreen = "title";

    document.addEventListener("visibilitychange", () => {
        if (waveInProgress) {
            gameSpeedChange = 1;
        }
    });

    document.getElementsByClassName("p5Canvas")[0].addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}




function draw() {
    changeGameSpeed();
    calculateDeltaTime();
    
    if (currentScreen == "gameplay") {
        gameplay();
    } else if (currentScreen == "towerSelect") {
        towerSelect();
    } else if (currentScreen == "workshop") {
        workshop();
    } else if (currentScreen == "store") {
        store();
    } else if (currentScreen == "map") {
        mapScreen();
    } else if (currentScreen == "title") {
        titleScreen();
    }

    drawButtons();
}

function beginGame() {
    difficultyLevel = difficultyHighlight;
    difficultyMod = difficultyLevel >= 2 ? 1 : 0.8;
    
    lives = difficultyLevel == 0 ? 75 : 50;
    tidbits = 500;
    polygons = 0;
    startingTidbits = 500;
    tidbitsPerWave = 200;
    minerTidbitGain = 100;
    currentPlanet = 1;

    gameSpeedChange = 0;
    fastForward = false;

    galaxyRotation = random(0, 360);
    ownedTowers = [new Miner(), new Cannon()];
    ownedGizmos = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    nextGizmoId = 1;
    resetSpecialGizmos();
    shuffleArray(storeTowerList);
    setupTransmissions();
    
    setupTowerPreviewsInit();
    currentScreen = "towerSelect";

    waves = planet1Waves;
    biasList = planet1Bias;
    createMap(pickNormalPath(), getTemperateColor());
}

function gameplay() {
    drawMap();
    runSpawner();

    updateProjectiles();
    drawProjectiles(0);

    updateTurrets();
    drawTurrets();
    checkTurretsHover();
    drawRangeOverlay();

    updateEnemies();
    drawEnemies();

    drawProjectiles(1);

    sortEnemies();

    runParticles();

    previewTower();

    drawInfoPanel();

    drawSidebar();

    drawTransmission();

    endWave();
}

function towerSelect() {
    background(40, 50, 110);
    fill(70, 20, 70, 6);
    for (let i = 0; i < 48; i++) {
        rect(0, height, width, -tileSize * i / 4);
    }
    drawStars();
    drawTowerPreviews();
    if (!initialPick) {
        drawSprite(livesIcon, 30 * uiScale, 30 * uiScale, 0, uiScale * 1.2);
        textAlign(LEFT, CENTER);
        textSize(26 * uiScale);
        fill(220, 220, 220);
        text(lives, 55 * uiScale, 36 * uiScale);
    }
    textAlign(CENTER, CENTER);
    fill(220, 220, 220);
    textSize(36 * uiScale);
    if (initialPick) {
        text("Select two towers", width * 0.345, height * 0.9);
    } else if (rewardPick) {
        text("Select a reward", width * 0.5, height * 0.225);
    } else {
        text("Select a tower", width * 0.5, height * 0.225);
    }
}

function workshop() {
    workshopScreen();
}

function store() {
    highlightedStoreItem = -1;
    updateButtons();
    drawStore();
}

function changeGameSpeed() {
    if (gameSpeedChange == 1) {
        timeScale = 0;
    } else if (gameSpeedChange == 2) {
        timeScale = fastForward ? 0.002 : 0.001;
    }
    gameSpeedChange = 0;
}

function mouseClicked() {
    checkButtonClick();
    if (currentScreen == "gameplay" && sidebarButtonsEnabled) {
        gameplayClick();
    } else if (currentScreen == "workshop") {
        workshopClick();
    }
}

function keyPressed() {
    if (keyCode == 32) {
        if (currentScreen == "gameplay") {
            if (waveInProgress) {
                gameSpeedChange = timeScale == 0 ? 2 : 1;
            }
        }
    }
}

function drawSettingsScreen() {
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
}

function setupSettingsScreen() {
    
}

