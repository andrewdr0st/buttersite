/******************************
 *          Controls          *
 * Arrow Keys: Movement       *
 *   Spacebar: Select/talk    *
 *        Alt: Back/Open Menu *
 *      Shift: Sprint         *   
 *          T: Show Timer     *
 *****************************/

 /***************************************************************************
  *                                    Combat                               *
  *      HP: Your life total.                                               *
  *  Energy: Energy is required to perform skills in combat.                *
  *          You regenerate energy each turn.                               *
  *   Block: Each point of block prevents one point of damage.              *
  * Stength: Each point of strength increases damage dealt by one.          *
  *  Poison: Lose HP the start of each turn equal to poison.                *
  *          Taking poison damage reduces poison by 10%                     *
  *   Wound: Each point of wound increases attack damage taken by 10%.      *
  *          Taking attack damage reduces wound by 10%.                     *
  *    Burn: Lose 10HP after using a burnt skill                            *
  *    Lock: Locked skills can't be used until the timer runs out           *
  **************************************************************************/



/**Change this to true to fight a harder version of Sheeley**/
var sigmaSheeley = false;

var gameScale = 1;
var onPhone = false;


function setup() {
    let maxSize = min(windowWidth, windowHeight);
    if (windowHeight > windowWidth) {
        onPhone = true;
        maxSize = windowWidth;
    }
    maxSize = min(maxSize, 800);
    gameScale = maxSize / 400;
    if (onPhone) {
        createCanvas(maxSize, windowHeight);
    } else {
        createCanvas(maxSize, maxSize);
    }
    noStroke();
    angleMode(DEGREES);
    textAlign(LEFT, BASELINE);

    document.addEventListener('keydown', function(event) {
        if (event.altKey) {
            event.preventDefault();
        }
    });    

    golfBallLocation = floor(random(0,4));
}




/**Variables**/
{
var playerMapId = 0;
var playerX = 0, playerY = 0;
var playerDir = 0;

var currentScreen = "move";
var menuPosX = 0, menuPosY = 0;
var menuLimitX = 0, menuLimitY = 0;

var currentEvent;
var eventStage = 0;

var mapList = [];
var cMap;

var playerSprite;

var mapEncounters;
var nextEncounter;

var encounters = true;

var battleBack;

var transitioning = false;
var tStage = 0;

}

/**Timer**/
{
var showTimer = false;
var timerStart = false;
var timerFinish = false;
var startSec = 0;
var startMin = 0;
var startHour = 0;
var endSec = 0;
var endMin = 0;
var endHour = 0;
}

/**key config**/
{
var arrows = true;
    
var leftKey = 65;
var rightKey = 68;
var upKey = 87;
var downKey = 83;
var selectKey = 75;
var backKey = 76;

var timerKey = 84;

if (arrows) {
    leftKey = 37;
    rightKey = 39;
    upKey = 38;
    downKey = 40;
    selectKey = 32;
    backKey = 18;
}
}

/** Player Stats **/
{
    var playerHP = 80;
    var playerMAXHP = 80;
    var playerE = 50;
    var playerMAXE = 50;
    var playerEGAIN = 12;
    var playerS = 0;
    var playerB = 0;
    var critChance = 10;
    var gold = 0;
    var nextXP = 10;
    var Plevel = 1;
    var skillPoints = 1;
    var potions = 3;
    var equipWeapon = 0;
    var equipArmor = 0;
    var weapons = [1, 0, 0, 0];
    var armor = [1, 0, 0, 0];
    var learnedSkills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var activeSkills = [0, 0, 0, 1, 0, 0, 0, 2];
    var playerPoison = 0;
    var playerWound = 0;
    var restAmount = 4;
    var potionBase = 50;
    var potionBonus = 0;
    var crossSlashPower = 2;
    var playerBlockGain = 0;
    var charged = 0;
    var sBoosted = false;
    var usedSkills = [0, 0, 0, 0, 0, 0];
    var initialBlock = false;
    var lockedSkills = [0, 0, 0, 0, 0, 0];
    var burntSkills = [false,false,false,false,false,false];
    var equippedArtifacts = [0, 0, 0, 0, 0];
    var playerArtifacts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var lastArmor = 0;
    var invisible = false;
    var magnified = false;
    var ogSkills;
    var critMult = 1;
    var critPower = 150;
    var xpMult = 1;
    var artifactSlots = 3;
    var tempCritChance = 0;
    var tempCritPower = 0;
    var lucky = false;
    var meditateValues = [false, false, false];
    var eBonus = 0;
    var chainValue = 0;
}

/** Enemy Stats **/
{
    var currentEnemy;
    var enemyName;
    var enemySprite;
    var enemyHP;
    var enemyMAXHP;
    var enemyS;
    var enemyB;
    var enemyPoison;
    var enemyWound;
    var enemySkills;
    var smoked = false;
    var enemyPoisonGain = 0;
    var enemyInvisible = false;
}

/** Battle Proccessing **/
{
    var turnStage = 0;
    /*
    0 - start of turn 
    1 - player selects skill
    2 - player skill effect
    3 - player skill text display
    4 - enemy skill effect
    5 - enemy skill text display
    */
    var turnCount = 0;
    
    var battleText = "";
    var enemyText = ["A ", "The "];

    var playerAnimation;
    var playerAnimationStage = 0;
    var playerAnimationMax = 0;
    var playerUsedSkill;
    
    var critHappened = false;

    var woundEffect = 0.1;
    
    var enemyActing = 0;
    var enemyActionDirection = 2;
    var enemyActionFrame = 0;
    var enemyActionType = 0;
    var enemyUsedSkill;
    var enemyFinished = true;
    
    var dilemmad = false;
}

/**Event Variables**/
{
    var questionAnswer = 0;
    var momTalked = false;
    var sheeleyLeft = false;
    var sheeleyRan = false;
    var shadyRandom;
    var shadyRandomise = true;
    var shadyCount = 0;
    var buggyBeat = false;
    var cultistBeat = false;
    var vampireBeat = false;
    var jigsawBeat = false;
    var rockBeat = false;
    var sheeleyTalk = false;
    var graveDiggerTalk = 0;
    var subManTalkStage = 0;
    var gotDaStuff = false;
    var goblinsFought = 0;
    var ghostsFought = 0;
    var scorpionsFought = 0;
    var chonkersFought = 0;
    var snowmenFought = 0;
    var gameBeat = false;
    var dummyFight = false;
    var golfBallLocation = 0;
    var golfGot = false;
    var pickaxeGot = false;
    var hammerGot = false;
}

/**Skill Tree Variables**/
{
    var skillTreeScreen = 1;
    var secondSkillTreeScreenUnlocked = false;
    var meditateQuest = -1;
}

var drawSprite = function(x, y, s, f, c) {
    push();
    translate(x, y);
    scale(s);
    f(c);
    pop();
};

/** Sprites **/
{
    /** Player **/
    {
        var playerDown = function(c) {
            fill(c);
            ellipse(0, -20, 30, 50);
            fill(227, 200, 173);
            ellipse(0, -40, 30, 30);
            fill(237, 237, 237);
            ellipse(-5, -35, 6, 5);
            ellipse(5, -35, 6, 5);
            fill(126, 197, 199);
            ellipse(-4, -35, 4, 3);
            ellipse(4, -35, 4, 3);
       };
       
        var playerLeft = function(c) {
            fill(c);
            ellipse(0, -20, 30, 50);
            fill(227, 200, 173);
            ellipse(0, -40, 30, 30);
            fill(237, 237, 237);
            ellipse(-7, -37, 6, 5);
            fill(126, 197, 199);
            ellipse(-8, -37, 4, 3);
       };
       
        var playerRight = function(c) {
            fill(c);
            ellipse(0, -20, 30, 50);
            fill(227, 200, 173);
            ellipse(0, -40, 30, 30);
            fill(237, 237, 237);
            ellipse(7, -37, 6, 5);
            fill(126, 197, 199);
            ellipse(8, -37, 4, 3);
       };
       
        var playerUp = function(c) {
            fill(c);
            ellipse(0, -20, 30, 50);
            fill(227, 200, 173);
            ellipse(0, -40, 30, 30);
       };
    }
    
    /**Artifacts**/
    {
        /**blank**/
        {
            var blankA = function() {
                
            };
        }
        
        /**Watermelon**/
        {
            var watermelon = function(c) {
                fill(30, 120, 25);
                arc(0, -5, 40, 40, 0, 180);
                fill(224, 58, 58);
                arc(0, -5, 35, 35, 0, 180);
            };
        }
        
        /**Shank**/
        {
            var goblinShank = function(c) {
                push();
                rotate(60);
                fill(100, 100, 100);
                rect(-4, 10, 8, 12);
                fill(200, 200, 200);
                triangle(-9, 10, 9, 10, 0, -25);
                pop();
            };
        }
        
        /**Body Fat**/
        {
            var bodyFat = function() {
                fill(51, 79, 189);
                ellipse(-1, -2, 30, 30);
                ellipse(12, 5, 15, 15);
                ellipse(-6, 12, 12, 12);
                ellipse(0, -12, 17, 17);
            };
        }
        
        /**Invisibility Cloak**/
        {
            var invisA = 200;
            var invisC = -2;
            var invisibilityCloak = function() {
                fill(200, 220, 240, invisA);
                rect(-15, -9, 30, 29);
                rect(-20, -17, 15, 8);
                rect(5, -17, 15, 8);
                if (invisA > 210) {
                    invisC = -2;
                } else if (invisA < -50) {
                    invisC = 2;
                }
                invisA += invisC;
            };
        }
        
        /**Reactor**/
        {
            var reactor = function() {
                fill(90, 90, 90);
                ellipse(0, 0, 45, 45);
                fill(25, 145, 15);
                arc(0, 0, 40, 40, 60, 120);
                arc(0, 0, 40, 40, 180, 240);
                arc(0, 0, 40, 40, 300, 360);
                fill(90, 90, 90);
                ellipse(0, 0, 15, 15);
                fill(25, 145, 15);
                ellipse(0, 0, 10, 10);
            };
        }
        
        /**Cocoon**/
        {
            var cocoon = function() {
                fill(150, 65, 15);
                ellipse(0, 12, 18, 10);
                fill(175, 70, 25);
                ellipse(0, 6, 22, 12);
                fill(190, 75, 35);
                ellipse(0, 0, 26, 14);
                fill(205, 80, 45);
                ellipse(0, -6, 22, 12);
                fill(220, 85, 55);
                ellipse(0, -12, 18, 10);
            };
        }
        
        /**Orb**/
        {
            var orb = function() {
                fill(140, 110, 210, 140);
                ellipse(0, 0, 35, 35);
                fill(80, 80, 80);
                rect(-15, 9, 30, 11);
            };
        }
        
        /**Dumbbell**/
        {
            var dumbbell = function() {
                fill(190, 190, 190);
                rect(-21, -3, 42, 6);
                fill(50, 50, 50);
                rect(-17, -8, 4, 16);
                rect(-13, -12, 4, 24);
                rect(13, -8, 4, 16);
                rect(9, -12, 4, 24);
            };
        }
        
        /**Mask**/
        {
            var mask = function(c) {
                fill(230, 230, 240);
                ellipse(-10, 0, 20, 16);
                ellipse(10, 0, 20, 16);
                fill(c);
                ellipse(-8, 0, 20, 16);
                ellipse(8, 0, 20, 16);
                fill(230, 230, 240);
                rect(-11, -9, 22, 18);
                fill(70, 170, 210);
                rect(-10, -8, 20, 16);
                fill(65, 150, 180);
                rect(-10, -4, 20, 2);
                rect(-10, 4, 20, 2);
            };
        }
        
        /**Vampire Fang**/
        {
            var vampireFang = function() {
                fill(230, 230, 230);
                triangle(-10, -15, 10, -15, 0, 15);
                fill(190, 50, 50);
                ellipse(7, 17, 4, 4);
                ellipse(4, 11, 6, 6);
            };
        }
        
        /**Magnifying Glass**/
        {
            var magnifyingGlass = function(c) {
                push();
                rotate(-45);
                fill(20, 20, 20);
                ellipse(0, -8, 30, 30);
                rect(-3, 3, 6, 20);
                fill(c);
                ellipse(0, -8, 25, 25);
                fill(255, 255, 255, 50);
                ellipse(0, -8, 25, 25);
                pop();
            };
        }
        
        /**Pickaxe**/
        {
            var pickaxe = function(c) {
                push();
                rotate(-45);
                fill(210, 210, 210);
                ellipse(0, -5, 40, 30);
                fill(c);
                ellipse(0, 0, 40, 30);
                fill(140, 90, 55);
                rect(-3, -15, 7, 40);
                pop();
            };
        }
        
        /**Scary Mask**/
        {
            var scaryMask = function() {
                fill(170, 50, 40);
                ellipse(0, 0, 30, 32);
                triangle(-16, -20, -5, -10, -15, -4);
                triangle(16, -20, 5, -10, 15, -4);
                fill(235, 204, 112);
                ellipse(-6, -2, 8, 4);
                ellipse(6, -2, 8, 4);
                ellipse(0, 10, 14, 7);
            };
        }
        
        /**Energy Drink**/
        {
            var energyDrink = function() {
                fill(70, 70, 70);
                ellipse(0, 15, 20, 15);
                rect(-10, -15, 20, 30);
                fill(85, 85, 85);
                ellipse(0, -15, 20, 15);
                fill(40, 130, 35);
                beginShape();
                vertex(-2, -5);
                vertex(5, -5);
                vertex(1, 3);
                vertex(7, 6);
                vertex(1, 18);
                vertex(1, 10);
                vertex(-6, 6);
                endShape();
            };
        }
        
        /**Loaded Dice**/
        {
            var loadedDice = function() {
                fill(210, 210, 210);
                quad(0, 0, 0, 20, -18, 10, -18, -10);
                fill(235, 235, 235);
                quad(0, 0, 0, 20, 18, 10, 18, -10);
                fill(250, 250, 250);
                quad(0, 0, -18, -10, 0, -20, 18, -10);
                fill(20, 20, 20);
                ellipse(0, -11, 4, 4);
                ellipse(0, -6, 4, 4);
                ellipse(0, -16, 4, 4);
                ellipse(8, -11, 4, 4);
                ellipse(-8, -11, 4, 4);
                ellipse(9, 5, 4, 4);
                ellipse(14, -2, 4, 4);
                ellipse(5, 1, 4, 4);
                ellipse(14, 8, 4, 4);
                ellipse(6, 12, 4, 4);
                ellipse(-9, 5, 4, 4);
                ellipse(-14, -2, 4, 4);
                ellipse(-5, 1, 4, 4);
                ellipse(-14, 8, 4, 4);
                ellipse(-6, 12, 4, 4);
            };
        }
        
        /**Ruby**/
        {
            var ruby = function() {
                fill(200, 50, 50);
                beginShape();
                vertex(20, -20);
                vertex(20, 0);
                vertex(0, 20);
                vertex(-20, 20);
                vertex(-20, 0);
                vertex(0, -20);
                endShape();
                fill(240, 60, 60);
                beginShape();
                vertex(15, -15);
                vertex(15, 0);
                vertex(0, 15);
                vertex(-15, 15);
                vertex(-15, 0);
                vertex(0, -15);
                endShape();
            };
        }
        
        /**Honey**/
        {
            var honey = function() {
                fill(250, 220, 100);
                rect(-15, -5, 30, 20);
                fill(255, 255, 255, 70);
                rect(-17, -12, 34, 30);
                fill(138, 89, 32);
                rect(-17, -18, 34, 6);
            };
        }
        
        /**Running Shoes**/
        {
            var runningShoes = function(c) {
                fill(230, 230, 230);
                rect(-18, 10, 36, 4);
                fill(30, 115, 240);
                arc(0, 10, 36, 26, 180, 270);
                rect(0, -3, 18, 13);
                fill(c);
                ellipse(9, -8, 18, 15);
            };
        }
        
        /**Cheese**/
        {
            var cheese = function() {
                fill(240, 210, 80);
                quad(-15, 15, -15, -5, 15, -10, 15, 10);
                fill(250, 220, 80);
                triangle(-15, -5, 15, -10, 3, -18);
            };
        }
        
        /**Natural Log**/
        {
            var naturalLog = function() {
                fill(185, 125, 45);
                ellipse(0, -8, 30, 30);
                rect(-15, -8, 30, 16);
                fill(180, 115, 40);
                ellipse(0, 8, 30, 30);
                fill(200, 140, 90);
                ellipse(0, 8, 24, 24);
                fill(180, 130, 100);
                ellipse(0, 8, 18, 18);
                fill(200, 140, 90);
                ellipse(0, 8, 12, 12);
            };
        }
        
        /**Triangle Circle**/
        {
            var tca = 0;
            var tcc = 1.5;
            var triangleCircle = function() {
                fill(255, 155, 65, tca + 50);
                ellipse(0, 0, 40, 40);
                fill(65, 225, 255, -tca + 50);
                triangle(0, -20, -16, 14, 16, 14);
                if (tca > 200) {
                    tcc = -1.5;
                } else if (tca < -200) {
                    tcc = 1.5;
                }
                tca += tcc;
            };
        }
        
        /**Scorpion Venom**/
        {
            var scorpionVenom = function() {
                fill(50, 135, 50);
                ellipse(-5, 0, 20, 20);
                ellipse(11, 11, 17, 17);
                ellipse(8, -15, 11, 11);
                ellipse(-13, 18, 7, 7);
                ellipse(19, -4, 7, 7);
            };
        }
        
        /**Hammer**/
        {
            var hammer = function() {
                push();
                rotate(45);
                fill(130, 82, 47);
                rect(-5, -23, 10, 48);
                fill(60, 60, 60);
                rect(-15, -18, 30, 20);
                pop();
            };
        }
        
        /**Ice Cream**/
        {
            var iceCream = function() {
                fill(212, 142, 91);
                triangle(0, 21, -11, -2, 11, -2);
                fill(237, 237, 237);
                ellipse(0, -8, 24, 24);
            };
        }
        
        /**Pizza**/
        {
            var pizza = function() {
                fill(153, 92, 49);
                triangle(0, 18, -15, -20, 15, -20);
                fill(217, 206, 52);
                triangle(0, 20, -12, -13, 12, -13);
                fill(196, 59, 28);
                ellipse(-4, -6, 8, 8);
                arc(5, 5, 9, 8, 105, 300);
            };
        }
        
        /**Fast Food**/
        {
            var fastFood = function() {
                fill(207, 160, 95);
                arc(0, -8, 36, 18, 180, 360);
                rect(-18, 5, 36, 6);
                fill(115, 52, 38);
                rect(-18, -3, 36, 6);
                fill(217, 206, 52);
                rect(-18, 3, 36, 2);
                fill(255, 0, 0);
                rect(-18, -8, 36, 3); 
                fill(37, 196, 40);
                rect(-18, -5, 36, 2);
                fill(59, 59, 59);
                ellipse(-12, 15, 16, 16);
                ellipse(12, 15, 16, 16);
            };
        }
        
        /**Chocolate**/
        {
            var chocolate = function() {
                fill(94, 37, 12);
                rect(-10, -20, 20, 40);
                fill(120, 54, 28);
                for (var x = 0; x < 2; x++) {
                    for (var y = 0; y < 4; y++) {
                        rect(10 * x - 9, y * 10 - 19, 8, 8);
                    }
                }
            };
        }
        
        /**Golf Ball**/
        {
            var golfBall = function() {
                fill(240, 240, 240);
                ellipse(0, 0, 40, 40);
                fill(220, 220, 220);
                for (var i = 0; i < 6; i++) {
                    push();
                    rotate(60 * i);
                    ellipse(0, -16, 6, 6);
                    ellipse(0, -8, 6, 6);
                    ellipse(0, 0, 6, 6);
                    rotate(30);
                    ellipse(0, -14, 6, 6);
                    pop();
                }
            };
        }
        
        /**Rusty Nail**/
        {
            var rustyNail = function() {
                push();
                rotate(-45);
                fill(189, 84, 13);
                rect(-7, -20, 14, 4);
                rect(-2, -16, 4, 32);
                triangle(-2, 16, 2, 16, 0, 24);
                pop();
            };
        }
        
        /**Calculator**/
        {
            var calculator = function() {
                fill(91, 100, 168);
                rect(-15, -20, 30, 40, 3);
                fill(40, 40, 40);
                rect(-11, -16, 22, 8);
                fill(196, 196, 196);
                for (var x = 0; x < 4; x++) {
                    for (var y = 0; y < 4; y++) {
                        rect(x * 6 - 11, y * 6 - 5, 4, 4);
                    }
                }
            };
        }
        
        /**Blockcoin**/
        {
            var blockcoin = function() {
                fill(55, 118, 212);
                ellipse(0, 0, 42, 42);
                push();
                for (var i = 0; i < 12; i++) {
                    triangle(0, -24, -10, -15, 10, -15);
                    rotate(30);
                }
                pop();
                fill(42, 147, 222);
                ellipse(0, 0, 36, 36);
                fill(220, 220, 240);
                textSize(32);
                text("B", -10, 11);
            };
        }
        
        /**Sapphire**/
        {
            var sapphire = function() {
                fill(50, 80, 190);
                beginShape();
                vertex(20, -20);
                vertex(20, 0);
                vertex(0, 20);
                vertex(-20, 20);
                vertex(-20, 0);
                vertex(0, -20);
                endShape();
                fill(60, 110, 240);
                beginShape();
                vertex(15, -15);
                vertex(15, 0);
                vertex(0, 15);
                vertex(-15, 15);
                vertex(-15, 0);
                vertex(0, -15);
                endShape();
            };
        }
        
        /**Amethyst**/
        {
            var amethyst = function() {
                fill(150, 30, 180);
                beginShape();
                vertex(20, -20);
                vertex(20, 0);
                vertex(0, 20);
                vertex(-20, 20);
                vertex(-20, 0);
                vertex(0, -20);
                endShape();
                fill(180, 50, 240);
                beginShape();
                vertex(15, -15);
                vertex(15, 0);
                vertex(0, 15);
                vertex(-15, 15);
                vertex(-15, 0);
                vertex(0, -15);
                endShape();
            };
        }
        
        /**Jigsaw Piece**/
        {
            var jigsawPiece = function(c) {
                push();
                rotate(45);
                fill(255, 147, 31);
                rect(-14, -14, 28, 28);
                ellipse(0, -18, 12, 12);
                fill(c);
                ellipse(-10, 0, 12, 12);
                pop();
            };
        }
        
        /**Gas Can**/
        {
            var gasCan = function() {
                fill(199, 36, 36);
                rect(-15, -10, 35, 30);
                beginShape();
                vertex(-4, -10);
                vertex(0, -10);
                vertex(4, -12);
                vertex(12, -12);
                vertex(16, -10);
                vertex(20, -10);
                vertex(14, -15);
                vertex(2, -15);
                endShape();
                fill(60, 60, 60);
                beginShape();
                vertex(-12, -10);
                vertex(-7, -10);
                vertex(-12, -16);
                vertex(-20, -20);
                vertex(-20, -16);
                vertex(-15, -14);
                endShape();
            };
        }
        
        /**Top Hat**/
        {
            var topHat = function() {
                fill(30, 30, 30);
                ellipse(0, 12, 40, 20);
                fill(42, 42, 42);
                ellipse(0, 10, 40, 20);
                fill(30, 30, 30);
                ellipse(0, 7, 30, 15);
                rect(-15, 7, 30, -20);
                fill(42, 42, 42);
                ellipse(0, -13, 30, 15);
            };
        }
    }
    
    /**Enemies**/
    {
        /**Spider**/
        {
        var spiderLeg = function(x, y, d){
            stroke(65, 65, 65);
            strokeWeight(5);
            
            line(x, y, x + 12 * d, y - 20);
            line(x + 12 * d, y - 20, x + 30 * d, y + 30);
            
            noStroke();
        };
        
        var spider = function(c) {
            fill(60, 60, 60);
            ellipse(0, 0, 50, 55);
            fill(65, 65, 65);
            ellipse(0, 20, 30, 30);
            fill(230, 50, 50);
            ellipse(-10, 20, 5, 5);
            ellipse(10, 20, 5, 5);
            ellipse(-5, 25, 4, 4);
            ellipse(5, 25, 4, 4);
            ellipse(-9, 26, 2, 2);
            ellipse(9, 26, 2, 2);
            ellipse(-3, 29, 2, 2);
            ellipse(3, 29, 2, 2);
            spiderLeg(15, 0, 1);
            spiderLeg(20, -12, 1);
            spiderLeg(14, -18, 1);
            spiderLeg(-15, 0, -1);
            spiderLeg(-20, -12, -1);
            spiderLeg(-14, -18, -1);
        };
        
        var caveSpiderLeg = function(x, y, d){
            stroke(90, 30, 110);
            strokeWeight(5);
            
            line(x, y, x + 12 * d, y - 20);
            line(x + 12 * d, y - 20, x + 30 * d, y + 30);
            
            noStroke();
        };
        var caveSpider = function(c) {
            fill(90, 30, 90);
            ellipse(0, 0, 50, 55);
            fill(90, 30, 110);
            ellipse(0, 20, 30, 30);
            fill(60, 190, 40);
            ellipse(-10, 20, 5, 5);
            ellipse(10, 20, 5, 5);
            ellipse(-5, 25, 4, 4);
            ellipse(5, 25, 4, 4);
            ellipse(-9, 26, 2, 2);
            ellipse(9, 26, 2, 2);
            ellipse(-3, 29, 2, 2);
            ellipse(3, 29, 2, 2);
            caveSpiderLeg(15, 0, 1);
            caveSpiderLeg(20, -12, 1);
            caveSpiderLeg(14, -18, 1);
            caveSpiderLeg(-15, 0, -1);
            caveSpiderLeg(-20, -12, -1);
            caveSpiderLeg(-14, -18, -1);
        };
        }
        
        /**Chonker**/
        {
            var chonker = function(c) {
                fill(40, 50, 220);
                ellipse(0, 0, 60, 60);
                ellipse(-15, 30, 25, 30);
                ellipse(15, 30, 25, 30);
                ellipse(-30, 0, 25, 30);
                ellipse(30, 0, 25, 30);
                ellipse(0, -30, 30, 30);
                fill(0, 0, 0);
                ellipse(0, -30, 20, 20);
            };
            
            var heckinColor = 0;
            var heckinChonker = function(c) {
                colorMode(HSB);
                fill(heckinColor, 240, 160);
                ellipse(0, 0, 60, 60);
                ellipse(-15, 30, 25, 30);
                ellipse(15, 30, 25, 30);
                ellipse(-30, 0, 25, 30);
                ellipse(30, 0, 25, 30);
                ellipse(0, -30, 30, 30);
                colorMode(RGB);
                fill(0, 0, 0);
                ellipse(0, -30, 20, 20);
                heckinColor += 0.5;
                if (heckinColor > 360) {
                    heckinColor = 1;
                }
            };
        }
        
        /**Goblin**/
        {
        var goblin = function() {
            fill(180, 140, 120);
            ellipse(0, 0, 30, 50);
            fill(50, 200, 90);
            ellipse(0, -30, 30, 30);
            triangle(-20, -50, -10, -30, -5, -40);
            triangle(20, -50, 10, -30, 5, -40);
            ellipse(-15, -2, 10, 10);
            ellipse(15, -2, 10, 10);
            fill(0, 0, 0);
            ellipse(-5, -32, 5, 5);
            ellipse(5, -32, 5, 5);
        };
        
        var goblinThug = function() {
            fill(50, 50, 50);
            ellipse(0, 0, 30, 50);
            fill(70, 100, 70);
            ellipse(0, -30, 30, 30);
            triangle(-20, -50, -10, -30, -5, -40);
            triangle(20, -50, 10, -30, 5, -40);
            ellipse(-15, -2, 10, 10);
            ellipse(15, -2, 10, 10);
            fill(0, 0, 0);
            ellipse(-5, -32, 5, 5);
            ellipse(5, -32, 5, 5);
        };
        }
        
        /**Flower**/
        {
            var flower = function() {
                fill(40, 140, 40);
                rect(-4, 30, 8, -43);
                push();
                rotate(60);
                rect(7, -16, 6, 24);
                rotate(60);
                rect(13, -6, 6, 24);
                pop();
                push();
                fill(200, 100, 230);
                translate(0, -30);
                rotate(22.5);
                for (var i = 0; i < 8; i++) {
                    rotate((i * 45));
                    ellipse(0, 16, 14, 22);
                }
                pop();
                fill(220, 220, 100);
                ellipse(0, -30, 15, 15);
            };
        }
        
        /**Zombie**/
        {
            var zombie = function() {
            push();
            translate(0, 10);
            scale(1.3);
            fill(100, 120, 160);
            ellipse(0, -20, 30, 50);
            fill(100, 190, 130);
            ellipse(0, -40, 30, 30);
            fill(250, 190, 190);
            ellipse(-5, -35, 6, 5);
            ellipse(5, -35, 6, 5);
            fill(20, 20, 20);
            ellipse(-4, -35, 4, 3);
            ellipse(4, -35, 4, 3);
            pop();
            };
        }
        
        /**Ghost**/
        {
            var ghost = function() {
                push();
                scale(1.2);
                fill(140, 220, 160, 180);
                rect(-20, -25, 40, 42);
                arc(0, -25, 40, 40, 180, 360);
                for (var i = 0; i < 4; i++) {
                    triangle(-20 + i * 10, 16.8, -10 + i * 10, 16.8, -15 + i * 10, 25);
                }
                fill(0, 0, 0, 150);
                ellipse(-10, -18, 8, 6);
                ellipse(10, -18, 8, 6);
                ellipse(0, 0, 12, 8);
                pop();
            };
            
            var clyde = function() {
                push();
                scale(1.2);
                fill(220, 140, 40, 180);
                rect(-20, -25, 40, 42);
                arc(0, -25, 40, 40, 180, 360);
                for (var i = 0; i < 4; i++) {
                    triangle(-20 + i * 10, 16.8, -10 + i * 10, 16.8, -15 + i * 10, 25);
                }
                fill(220, 240, 250, 190);
                ellipse(-10, -18, 12, 12);
                ellipse(10, -18, 12, 12);
                fill(40, 120, 170, 190);
                ellipse(-10, -16, 7, 7);
                ellipse(10, -16, 7, 7);
                pop();
            };
        }
        
        /**Scorpion**/
        {
            var pinsir = function(x, y, r) {
                push();
                translate(x, y);
                rotate(r);
                fill(80, 60, 95);
                arc(3, 0, 15, 25, -90, 90);
                arc(-3, 0, 15, 25, 90, 270);
                rect(4, -7, -8, -21);
                pop();
            };
            
            var scorpion = function() {
                pinsir(25, 32, -30);
                pinsir(-25, 32, 30);
                stroke(80, 60, 95);
                strokeWeight(6);
                line(-24, -2, 24, -2);
                line(0, -10, -20, -16);
                line(0, -10, 20, -16);
                line(-20, -16, -22, -24);
                line(20, -16, 22, -24);
                noStroke();
                fill(60, 45, 75);
                ellipse(0, -25, 15, 15);
                fill(80, 55, 95);
                ellipse(0, -30, 12, 12);
                fill(90, 65, 105);
                ellipse(0, -35, 10, 10);
                fill(70, 50, 85);
                ellipse(0, 0, 30, 50);
                fill(220, 180, 60);
                ellipse(-5, 16, 5, 5);
                ellipse(5, 16, 5, 5);
                fill(100, 90, 110);
                triangle(-4, -36, 4, -36, 0, -45);
            };
            
            var pinsir2 = function(x, y, r) {
                push();
                translate(x, y);
                rotate(r);
                fill(165, 230, 210);
                arc(3, 0, 15, 25, -90, 90);
                arc(-3, 0, 15, 25, 90, 270);
                rect(4, -7, -8, -21);
                pop();
            };
            
            var scorpion2 = function() {
                pinsir2(25, 32, -30);
                pinsir2(-25, 32, 30);
                stroke(160, 230, 200);
                strokeWeight(6);
                line(-24, -2, 24, -2);
                line(0, -10, -20, -16);
                line(0, -10, 20, -16);
                line(-20, -16, -22, -24);
                line(20, -16, 22, -24);
                noStroke();
                fill(130, 200, 190);
                ellipse(0, -25, 15, 15);
                fill(140, 210, 195);
                ellipse(0, -30, 12, 12);
                fill(150, 220, 200);
                ellipse(0, -35, 10, 10);
                fill(170, 240, 220);
                ellipse(0, 0, 30, 50);
                fill(230, 85, 40);
                ellipse(-5, 16, 5, 5);
                ellipse(5, 16, 5, 5);
                fill(180, 210, 220);
                triangle(-4, -36, 4, -36, 0, -45);
            };
        }
        
        /**Flame Runner**/
        {
            var birdLeg = function(x, y) {
                push();
                translate(x, y);
                stroke(240, 200, 30);
                strokeWeight(4);
                line(0, 0, 0, 10);
                line(0, 0, 0, -30);
                line(0, 0, -8, 5);
                line(0, 0, 8, 5);
                noStroke();
                pop();
            };
            
            var flameRunner = function() {
                push();
                scale(1.2); 
                birdLeg(-13, 30);
                birdLeg(13, 30);
                fill(185, 95, 50);
                ellipse(0, 0, 35, 35);
                stroke(220, 155, 135);
                strokeWeight(8);
                line(0, -6, 0, -20);
                noStroke();
                fill(190, 100, 60);
                ellipse(0, -30, 20, 20);
                fill(240, 200, 30);
                triangle(-4, -25, 4, -25, 0, -20);
                fill(40, 70, 70);
                ellipse(-6, -30, 5, 5);
                ellipse(6, -30, 5, 5);
                pop();
            };
        }
        
        /**Dummy**/
        {
            var dummy = function() {
                fill(117, 117, 117);
                rect(-15, 30, 29, 10);
                fill(97, 58, 29);
                rect(-4, 10, 8, 20);
                fill(184, 163, 101);
                ellipse(0, -5, 30, 45);
                ellipse(-18, -15, 20, 15);
                ellipse(18, -13, 19, 16);
                fill(199, 174, 104);
                ellipse(1, -33, 24, 26);
                fill(46, 46, 46);
                ellipse(-5, -32, 5, 5);
                ellipse(6, -31, 5, 5);
                fill(181, 65, 53);
                ellipse(0, 0, 20, 20);
                fill(184, 163, 101);
                ellipse(0, 0, 14, 14);
                fill(181, 65, 53);
                ellipse(0, 0, 8, 8);
                
            };
        }
        
        /**Unfunguy**/
        {
            var redUnfunguy = function() {
                fill(227, 211, 199);
                rect(-20, -20, 40, 40, 5);
                fill(184, 33, 33);
                arc(0, -15, 80, 70, 181, 360);
                fill(255, 255, 255);
                ellipse(-16, -33, 14, 14);
                ellipse(8, -28, 18, 18);
                ellipse(-30, -24, 8, 8);
                ellipse(-2, -42, 8, 8);
                ellipse(27, -26, 10, 10);
                ellipse(-7, -22, 6, 6);
                ellipse(17, -40, 6, 6);
                fill(54, 22, 12);
                rect(-12, -5, 10, 5);
                rect(12, -5, -10, 5);
                rect(-6, 5, 12, 3);
            };
            
            var blueUnfunguy = function() {
                fill(227, 211, 199);
                rect(-20, -20, 40, 40, 5);
                fill(31, 79, 191);
                arc(0, -15, 80, 70, 181, 360);
                fill(255, 255, 255);
                ellipse(-16, -33, 14, 14);
                ellipse(8, -28, 18, 18);
                ellipse(-30, -24, 8, 8);
                ellipse(-2, -42, 8, 8);
                ellipse(27, -26, 10, 10);
                ellipse(-7, -22, 6, 6);
                ellipse(17, -40, 6, 6);
                fill(54, 22, 12);
                rect(-12, -5, 10, 5);
                rect(12, -5, -10, 5);
                rect(-6, 5, 12, 3);
            };
            
            var purpleUnfunguy = function() {
                fill(227, 211, 199);
                rect(-20, -20, 40, 40, 5);
                fill(119, 33, 184);
                arc(0, -15, 80, 70, 181, 360);
                fill(255, 255, 255);
                ellipse(-16, -33, 14, 14);
                ellipse(8, -28, 18, 18);
                ellipse(-30, -24, 8, 8);
                ellipse(-2, -42, 8, 8);
                ellipse(27, -26, 10, 10);
                ellipse(-7, -22, 6, 6);
                ellipse(17, -40, 6, 6);
                fill(54, 22, 12);
                rect(-12, -5, 10, 5);
                rect(12, -5, -10, 5);
                rect(-6, 5, 12, 3);
            };
        }
        
        /**Snowman**/
        {
            var snowman = function() {
                fill(255, 255, 255);
                ellipse(0, 25, 60, 60);
                ellipse(0, -15, 45, 45);
                drawSprite(0, -43, 0.9, topHat);
                fill(50, 50, 50);
                ellipse(-10, -15, 8, 8);
                ellipse(10, -15, 8, 8);
                ellipse(0, 15, 6, 6);
                ellipse(0, 25, 6, 6);
                ellipse(0, 35, 6, 6);
                strokeWeight(5);
                stroke(255, 132, 0);
                line(0, -5, 12, -5);
                stroke(148, 88, 48);
                line(-25, 15, -41, 4);
                line(-33, 3, -40, 12);
                line(25, 15, 41, 4);
                line(33, 3, 40, 12);
                noStroke();
            };
            
            var peeman = function() {
                fill(232, 225, 90);
                ellipse(0, 25, 60, 60);
                ellipse(0, -15, 45, 45);
                drawSprite(0, -43, 0.9, topHat);
                fill(50, 50, 50);
                ellipse(-12, -14, 8, 8);
                ellipse(12, -16, 8, 8);
                ellipse(0, 15, 6, 6);
                ellipse(0, 25, 6, 6);
                ellipse(0, 35, 6, 6);
                strokeWeight(7);
                stroke(255, 132, 0);
                line(0, -5, 12, -5);
                strokeWeight(4);
                stroke(148, 88, 48);
                line(-25, 15, -41, 4);
                line(-33, 3, -40, 12);
                line(25, 15, 41, 4);
                line(33, 3, 40, 12);
                noStroke();
            };
        }
        
    }
    
    /**Boss**/
    {
        
        /**The Rock**/
        {
        var theRock = function(c) {
            fill(80, 80, 80);
            ellipse(0, -20, 30, 50);
            fill(161, 128, 95);
            ellipse(0, -40, 30, 30);
            fill(237, 237, 237);
            ellipse(-5, -35, 6, 5);
            ellipse(5, -35, 6, 5);
            fill(71, 52, 19);
            ellipse(-4, -35, 4, 3);
            ellipse(4, -35, 4, 3);
       };
       
       var rockBoss = function(c) {
           push();
           translate(0, 25);
           scale(1.3);
           theRock();
           pop();
       };
        }
        
        /**Sheeley**/
        {
        var sheeleyBoss = function(c) {
            push();
            translate(0, 25);
            scale(1.4);
            fill(48, 48, 48);
            ellipse(0, -20, 30, 50);
            fill(227, 200, 173);
            ellipse(0, -40, 30, 30);
            fill(237, 237, 237);
            ellipse(-5, -35, 6, 5);
            ellipse(5, -35, 6, 5);
            fill(230, 50, 40);
            ellipse(-4, -35, 4, 3);
            ellipse(4, -35, 4, 3);
            pop();
       };
        }
       
       /**Fire Moth**/
        {
            var caterpillar = function() {
                fill(175, 70, 25);
                ellipse(0, -37, 20, 20);
                fill(150, 65, 15);
                ellipse(0, -30, 25, 25);
                fill(205, 80, 45);
                ellipse(0, -20, 30, 30);
                fill(190, 75, 35);
                ellipse(0, -10, 35, 35);
                fill(220, 85, 55);
                ellipse(0, 0, 40, 40);
                fill(40, 30, 30);
                ellipse(-8, 0, 14, 14);
                ellipse(8, 0, 14, 14);
                fill(240, 230, 230);
                ellipse(-6, -2, 4, 4);
                ellipse(6, -2, 4, 4);
                stroke(150, 65, 15);
                strokeWeight(5);
                line(-12, -10, -24, -20);
                line(12, -10, 24, -20);
                noStroke();
            };
            
            var bigCocoon = function() {
                fill(150, 65, 15);
                ellipse(0, 20, 32, 18);
                fill(175, 70, 25);
                ellipse(0, 10, 38, 22);
                fill(190, 75, 35);
                ellipse(0, 0, 46, 26);
                fill(205, 80, 45);
                ellipse(0, -10, 38, 22);
                fill(220, 85, 55);
                ellipse(0, -20, 32, 18);
            };
            
            var fireMoth = function() {
                fill(205, 80, 45);
                ellipse(-22, 5, 40, 40);
                ellipse(22, 5, 40, 40);
                fill(205, 115, 55);
                ellipse(-10, 0, 20, 20);
                ellipse(10, 0, 20, 20);
                fill(220, 85, 55);
                ellipse(-22, -25, 45, 45);
                ellipse(22, -25, 45, 45);
                fill(220, 120, 60);
                ellipse(-15, -20, 23, 23);
                ellipse(15, -20, 23, 23);
                fill(150, 65, 15);
                ellipse(0, -10, 20, 50);
                stroke(110, 45, 5);
                strokeWeight(4);
                line(-3, -30, -7, -40);
                line(3, -30, 7, -40);
                noStroke();
            };
        }
        
        /**Cultist**/
        {
            var cultistText = false;
        var cultist = function() {
            push();
            translate(0, 25);
            scale(1.4);
            fill(58, 58, 58);
            ellipse(0, -20, 30, 50);
            fill(87, 87, 87);
            ellipse(0, -38, 32, 30);
            fill(227, 200, 173);
            ellipse(0, -36, 26, 20);
            fill(224, 224, 224);
            ellipse(-5, -35, 6, 5);
            ellipse(5, -35, 6, 5);
            fill(120, 40, 210);
            ellipse(-4, -35, 4, 3);
            ellipse(4, -35, 4, 3);
            fill(30, 30, 30, 80);
            ellipse(0, -36, 26, 20);
            if (cultistText) {
                fill(137, 99, 194);
            ellipse(0, -16, 12, 12);
                textAlign(CENTER, CENTER);
                textSize(8);
                fill(200, 200, 230);
                text(10 - turnCount, 0, -16);
                textAlign(LEFT, BASELINE);
            }
            pop();
        };
        }
        
        /**Vampire**/
        {
            var vampire = function() {
            push();
            translate(0, 25);
            scale(1.4);
            fill(122, 35, 47);
            triangle(-20, 3, 0, -6, -12, -30);
            triangle(-25, -5, 0, -15, -10, -35);
            triangle(20, 3, 0, -6, 12, -30);
            triangle(25, -5, 0, -15, 10, -35);
            fill(84, 21, 84);
            ellipse(0, -20, 30, 50);
            fill(227, 200, 173);
            ellipse(0, -40, 30, 30);
            fill(237, 237, 237);
            ellipse(-5, -35, 6, 5);
            ellipse(5, -35, 6, 5);
            fill(160, 210, 40);
            ellipse(-4, -35, 4, 3);
            ellipse(4, -35, 4, 3);
            fill(122, 23, 23);
            ellipse(0, -28, 12, 5);
            fill(240, 245, 230);
            triangle(-3, -20, -5, -30, -2, -31);
            triangle(3, -20, 5, -30, 2, -31);
            pop();
            };
        }
        
        /**Jigsaw**/
        {
            var jigsaw = function() {
                push();
                rotate(45);
                fill(255, 147, 31);
                rect(0, 0, 40, 40);
                fill(33, 133, 255);
                rect(0, 0, -40, 40);
                ellipse(5, 20, 18, 18);
                fill(33, 255, 52);
                rect(0, 0, -40, -40);
                ellipse(-20, 5, 18, 18);
                fill(211, 33, 255);
                rect(0, 0, 40, -40);
                ellipse(-5, -20, 18, 18);
                fill(255, 147, 31);
                ellipse(20, -5, 18, 18);
                pop();
            };
        }
        
        /**Sussy Baka**/
        {
            var sussyBaka = function() {
                fill(207, 41, 41);
                ellipse(0, -10, 80, 80);
                rect(-40, -10, 30, 50);
                rect(10, -10, 30, 50);
                fill(206, 236, 242);
                ellipse(0, -20, 50, 30);
            };
        }
    }
    
    /**Menu Icons**/
    {
        /**Items**/
        {
            /**Weapons**/
            {
            var greatsword = function(c) {
                push();
                rotate(45);
                fill(140, 80, 40);
                rect(-8, 0, 16, 30);
                rect(-14, 0, 28, 10);
                fill(180, 180, 180);
                rect(-10, 0, 20, -60);
                triangle(-10, -59, 10, -59, 0, -75);
                pop();
            };
            
            var katana = function(c) {
                push();
                rotate(45);
                fill(40, 40, 40);
                rect(-6, 10, 12, 20);
                fill(160, 160, 160);
                rect(-7, 10, 14, -70);
                triangle(-7, -59, 7, -59, -7, -75);
                pop();
            };
            
            var toxicBlade = function(c) {
                push();
                rotate(45);
                fill(60, 60, 60);
                rect(-8, 0, 16, 30);
                rect(-14, 0, 28, 10);
                fill(40, 130, 40);
                rect(-10, 0, 20, -60);
                triangle(-10, -59, 10, -59, 0, -75);
                pop();
            };
            
            var lightsaberColor = 0;
            var lightsaber = function(c) {
                push();
                rotate(45);
                colorMode(HSB);
                lightsaberColor += 0.15;
                if (lightsaberColor > 360) {
                    lightsaberColor = 0;
                }
                fill(lightsaberColor, 255, 255);
                ellipse(0, -30, 14, 90);
                colorMode(RGB);
                fill(60, 60, 60);
                rect(-6, 0, 12, 30);
                pop();
            };
            }
            
            /**Armor**/
            {
            var leatherTunic = function(c) {
                fill(150, 100, 30);
                rect(-20, -30, 40, 55);
                rect(-30, -35, 20, 20);
                rect(10, -35, 20, 20);
            };
            
            var ironMail = function(c) {
                fill(190, 190, 190);
                rect(-20, -30, 40, 55);
                rect(-30, -35, 20, 20);
                rect(10, -35, 20, 20);
            };
            
            var barbarianArmor = function(c) {
                fill(110, 60, 30);
                rect(-20, -30, 40, 55);
                rect(-30, -35, 20, 20);
                rect(10, -35, 20, 20);
                fill(200, 200, 200);
                triangle(-24, -35, -16, -35, -20, -28);
                triangle(24, -35, 16, -35, 20, -28);
                triangle(-11, -30, -3, -30, -7, -23);
                triangle(11, -30, 3, -30, 7, -23);
            };
            
            var prismColor = 149;
            var prismaticArmor = function(c) {
                colorMode(HSB);
                prismColor += 0.17;
                if (prismColor > 360) {
                    prismColor = 0;
                }
                fill(prismColor, 255, 255);
                rect(-20, -30, 40, 55);
                rect(-30, -35, 20, 20);
                rect(10, -35, 20, 20);
                colorMode(RGB);
            };
            
            var jigsawArmor = function(c) {
                fill(189, 189, 189);
                rect(-20, -30, 40, 55);
                rect(-30, -35, 20, 20);
                rect(10, -35, 20, 20);
                drawSprite(0, -2, 0.3, jigsaw);
            };
            }

        }
    
        /**Indicators**/
        {
            var energyBulb = function(c) {
                fill(150, 50, 200);
                ellipse(0, 0, 25, 25);
                textSize(15);
                textAlign(CENTER, CENTER);
                fill(255, 255, 255);
                text(c, 0, 0);
                textAlign(LEFT, BASELINE);
            };
            
            var shield = function(c) {
                fill(50, 160, 220);
                quad(-10, -15, 0, -15, 0, 10, -10, 0);
                fill(60, 140, 220);
                quad(10, -15, 0, -15, 0, 10, 10, 0);
                textSize(12);
                textAlign(CENTER, CENTER);
                fill(255, 255, 255);
                text(c, 0, -4);
                textAlign(LEFT, BASELINE);
            };
            
            var strength = function(c) {
                fill(220, 50, 40);
                push();
                rotate(45);
                rect(-4, 0, 8, -15);
                triangle(-4, -14, 4, -14, 0, -22);
                rect(-5, 0, 10, 4);
                rect(-3, 4, 6, 6);
                pop();
                fill(255, 255, 255);
                textSize(12);
                textAlign(CENTER, CENTER);
                text(c, 4, -4);
                textAlign(LEFT, BASELINE);
            };
            
            var poison = function(c) {
                fill(40, 100, 40);
                ellipse(8, -6, 20, 20);
                ellipse(-4, 4, 10, 10);
                ellipse(-10, -7, 13, 13);
                textSize(15);
                textAlign(CENTER, CENTER);
                fill(255, 255, 255);
                text(c, 0, -2);
                textAlign(LEFT, BASELINE);
            };
            
            var wound = function(c) {
                fill(150, 40, 40);
                ellipse(3, 0, 22, 5);
                ellipse(-4, -6, 22, 5);
                ellipse(-1, 6, 22, 5);
                textSize(13);
                textAlign(CENTER, CENTER);
                fill(255, 255, 255);
                text(c, 0, 0);
                textAlign(LEFT, BASELINE);
            };
            
            var bullseye = function(c) {
                fill(220, 90, 60);
                ellipse(0, 0, 30, 30);
                fill(c);
                ellipse(0, 0, 20, 20);
                fill(220, 90, 60);
                rect(-2, -17, 4, 34);
                rect(-17, -2, 34, 4);
            };
            
            var lock = function(c) {
                fill(190, 190, 190);
                ellipse(0, 0, 16, 16);
                fill(125, 125, 125);
                ellipse(0, 0, 10, 10);
                fill(190, 190, 190);
                rect(-8, 0, 16, 10);
                textAlign(CENTER, CENTER);
                fill(20, 20, 20);
                textSize(14);
                text(c, 0, 5);
                textAlign(LEFT, BASELINE);
            };
        }
        
        /**Skill Tree**/
        {
            var skillTreeText = function(t, x, y) {
                fill(220, 220, 220);
                textSize(13);
                text(t, x, y);
            };
            
            /**Slash**/
            {
                var slashIcon = function() {
                    drawSprite(9, 21, 0.32, greatsword);
                };
            }
            
            /**Cross Slash**/
            {
                var crossSlashIcon = function() {
                    drawSprite(12, 21, 0.32, greatsword);
                    push();
                    rotate(-90);
                    drawSprite(-21, 22, 0.32, greatsword);
                    pop();  
                };
            }
            
            /**Wound Slash**/
            {
                var woundSlashIcon = function() {
                    drawSprite(16, 15, 1, wound);
                    drawSprite(11, 21, 0.32, greatsword);
                };
            }
            
            /**Triple Slash**/
            {
                var tripleSlashIcon = function() {
                    drawSprite(11, 20, 0.32, greatsword);
                    skillTreeText("x3", 17, 30);
                };
            }
            
            /**Precise Strike**/
            {
                var preciseStrikeIcon = function() {
                    drawSprite(19, 19, 0.6, bullseye, color(140, 140, 140));
                    drawSprite(9, 20, 0.32, greatsword);
                };
            }
            
            /**Shield**/
            {
                var shieldIcon = function() {
                    drawSprite(16, 19, 1, shield);
                };
            }
            
            /**Shield + Strength**/
            {
                var bulkIcon = function() {
                    drawSprite(15, 19, 1, shield);
                    drawSprite(14, 19, 0.75, strength);
                };
            }
            
            /**Strength**/
            {
                var strengthIcon = function() {
                    drawSprite(12, 20, 1, strength);
                };
            }
            
            /**Sharpen Blade**/
            {
                var sharpenIcon = function() {
                    drawSprite(12, 13, 0.7, bullseye, color(140, 140, 140));
                    drawSprite(18, 23, 0.8, strength);
                };
            }
            
            /**Energy Shield**/
            {
                var energyShieldIcon = function() {
                    drawSprite(16, 16, 1.13, energyBulb);
                    drawSprite(16, 20, 0.9, shield);
                };
            }
            
            /**Smokescreen**/
            {
                var smokeIcon = function() {
                    fill(70, 70, 70);
                    ellipse(16, 16, 29, 29);
                    drawSprite(16, 20, 1, shield);
                };
            }
            
            /**Poison**/
            {
                var poisonIcon = function() {
                    drawSprite(15, 20, 0.8, poison);
                };
            }
            
            /**HP+**/
            {
                var hpBoostIcon = function() {
                    fill(40, 230, 40);
                    rect(12, 4, 8, 24);
                    rect(4, 12, 24, 8);
                    skillTreeText("+", 23, 31); 
                };
            }
            
            /**Energy+**/
            {
                var energyIcon = function() {
                    drawSprite(16, 16, 0.9, energyBulb);
                    skillTreeText("+", 21, 28);
                };
            }
            
            /**Crit+**/
            {
                var critIcon = function() {
                    drawSprite(16, 16, 0.75, bullseye, color(140, 140, 140));
                    skillTreeText("+", 21, 29);
                };
                var critBuffIcon = function() {
                    drawSprite(16, 16, 0.75, bullseye, color(140, 140, 140));
                };
            }
            
            /**Artifact+**/
            {
                var collectorIcon = function() {
                    fill(220, 220, 220);
                    push();
                    translate(16, 17);
                    for (var i = 0; i < 5; i++) {
                        triangle(0, -15, -4, 0, 4, 0);
                        rotate(72);
                    }
                    pop();
                };
            }
            
            /**Strength+**/
            {
                var strengthBoostIcon = function() {
                    drawSprite(13, 20, 1, strength);
                    skillTreeText("+", 23, 28);
                };
            }
            
            /**Block+**/
            {
                var blockBoostIcon = function() {
                    drawSprite(16, 20, 1, shield);
                    skillTreeText("+", 23, 30);
                };
            }
            
            /**Rest+**/
            {
                var restIcon = function() {
                    skillTreeText("Z", 4, 28);
                    skillTreeText("z", 12, 18);
                    skillTreeText("z", 19, 14);
                    skillTreeText("+", 21, 27);
                };
            }
            
            /**XP+**/
            {
                var xpIcon = function() {
                    fill(43, 113, 204);
                    ellipse(16, 16, 20, 20);
                    skillTreeText("+", 21, 28);
                };
            }
            
            /**Energy Skill**/
            {
                var energySkillIcon = function() {
                    drawSprite(16, 16, 1, energyBulb);
                };
            }
        }
    }
    
    
    
    var diceGot = false;
    var spinnerR = 0;
    var spinner = function() {
        fill(196, 88, 232);
        arc(0, 0, 100, 100, 10, 90);
        fill(49, 230, 85);
        arc(0, 0, 100, 100, 90, 170);
        arc(0, 0, 100, 100, 255, 285);
        fill(207, 64, 64);
        arc(0, 0, 100, 100, 170, 255);
        arc(0, 0, 100, 100, 285, 370);
        fill(38, 148, 42);
        textSize(20);
        text("$", -24, 28);
        text("$", -4, -20);
        text("$", -8, -33);
        if (!diceGot) {
            drawSprite(20, 22, 0.7, loadedDice);
        }
        push();
        rotate(spinnerR);
        fill(40, 40, 40);
        ellipse(0, 0, 15, 15);
        triangle(0, -20, -5, 0, 5, 0);
        pop();
    };
    
}

/**Artifacts**/
{
    var artifactSprites = [
        blankA,
        watermelon,
        goblinShank,
        bodyFat,
        invisibilityCloak,
        reactor,
        cocoon,
        orb,
        dumbbell,
        mask,
        vampireFang,
        magnifyingGlass,
        pickaxe,
        scaryMask,
        energyDrink,
        loadedDice,
        ruby,
        honey,
        runningShoes,
        cheese,
        naturalLog,
        triangleCircle,
        scorpionVenom,
        hammer,
        iceCream,
        pizza,
        chocolate,
        fastFood,
        golfBall,
        rustyNail,
        calculator,
        blockcoin,
        sapphire,
        amethyst,
        jigsawPiece,
        gasCan,
        topHat
    ];
    
    var artifactNames = [
        "",
        "Watermelon",
        "Goblin Shank",
        "Body Fat",
        "Invisibility Cloak",
        "Reactor",
        "Cocoon",
        "Orb",
        "Dumbbell",
        "Mask",
        "Vampire Fang",
        "Magnifying Glass",
        "Pickaxe",
        "Scary Mask",
        "Energy Drink",
        "Loaded Dice",
        "Ruby",
        "Honey",
        "Running Shoes",
        "Cheese",
        "Natural Log",
        "Triangle = Circle",
        "Scorpion Venom",
        "Hammer",
        "Ice Cream",
        "Pizza",
        "Chocolate",
        "Fast Food",
        "Strange Sphere",
        "Rusty Nail",
        "Calculator",
        "Blockcoin",
        "Sapphire",
        "Amethyst",
        "Jigsaw Piece",
        "Gas Can",
        "Top Hat"
    ];
    
    var artifactDescriptions = [
        "",
        "Heal 4 HP at the start of each turn.",
        "Apply 3 wound to the enemy at the start of battle.",
        "Gain 5 block after gaining strength.",
        "The enemy's first attack deals 0 damage.",
        "Gain +5 energy each turn. Gain 2 poison at the start of each turn.",
        "Gain 2 block at the start of each turn. Gain 4 additional block if your HP is below 50%.",
        "Deal 150 damage on the 10th turn of combat.",
        "Gain 2 strength each turn. Start combat with -15 energy.",
        "Block can prevent poison damage.",
        "Heal HP equal to the enemy's wound when attacking. (Max of 10)",
        "The first attack each combat is always a critical hit.",
        "Remove 10 block from the enemy when attacking.",
        "Prevents random encounters.",
        "+10 max energy.",
        "Landing a critical hit increases critical hit chance by 10% for the rest of combat.",
        "If an attack would deal more than 40 damage, it deals 25% more damage.",
        "Enemies drop 50% more gold and 25% more xp.",
        "Sprinting is faster.",
        "+50HP. Potions restore -20HP during combat.",
        "Each poison on the enemy increases critical hit chance and damage by 1%.",
        "At the start of each turn, swap your bottom row of skills with random skills.",
        "Start each combat with 5 poison.",
        "Gain 4 block whenever you attack.",
        "Gain +2 energy each turn.",
        "+20% crit damage.",
        "+7% crit chance.",
        "Gain 15 energy at the start of combat.",
        "+20HP. +10% crit damage. +5 max energy. Gain +1 energy each turn.",
        "When you attack, apply 5 posion to the enemy if they have any wound.",
        "On odd turns your attacks deal 4 additional damage. On even turns the enemy deals 4 less damage.",
        "Double your block on the 3rd turn of combat.",
        "If you have at least 25 block, attacks deal 25% more damage.",
        "If you have at least 50 energy, attacks deal 25% more damage.",
        "Gain jigsaw armor. Jigsaw armor has the abilities of all armor that you own.",
        "+15% crit chance. +25% crit damage. Burn a random skill each turn.",
        "At the start of each turn, you have a chance to gain 6 HP and 4 energy equal to your critical chance."
    ];
    
    var artifactEquipped = function(artifactId) {
        for (var i = 0; i < artifactSlots; i++) {
            if (equippedArtifacts[i] === artifactId) {
                return true;
            }
        }
        return false;
    };
    
    var gainArtifact = function(artifactId) {
        for (var i = 0; i < playerArtifacts.length; i++) {
            if (playerArtifacts[i] === 0) {
                playerArtifacts[i] = artifactId;
                break;
            }
            
        }
    };
    
    var unequipArtifacts = function() {
        var id = 0;
        for (var i = 0; i < 5; i++) {
            while (equippedArtifacts[i] !== 0) {
                if (playerArtifacts[id] === 0) {
                    playerArtifacts[id] = equippedArtifacts[i];
                    equippedArtifacts[i] = 0;
                }
                id++;
            }
        }
    };
}

/**Equipment**/
{
var swordIcons = [greatsword, katana, toxicBlade, lightsaber];
var armorIcons = [leatherTunic, ironMail, barbarianArmor, prismaticArmor];
var equipDescriptions = [
    "Critical hits apply 2 wound.",
    "Critical hits increase strength by 4.",
    "Critical hits apply 6 poison.",
    "Critical hits restore 50% of your max energy.",
    "Start combat with 15 block.",
    "Gain 4 block at the start of each turn.",
    "Taking damage increases strength by 2.",
    "Reflect all blocked damage."
];
}

/**Battle**/
{

var Skill = function(name, description, energyCost, effect, animation, icon) {
    this.skillName = name;
    this.description = description;
    this.energyCost = energyCost;
    this.effect = effect;
    this.animation = animation;
    this.icon = icon;
};

var ESkill = function(name, effect, statBoost) {
    this.skillName = name;
    this.effect = effect;
    this.statBoost = statBoost;
};

var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

var burnSkill = function() {
    var burner = shuffle([0,1,2,3,4,5]);
    for (var i = 0; i < 6; i++) {
        if(!burntSkills[burner[i]] && activeSkills[burner[i]+floor(burner[i]/3)] !== 0) {
            burntSkills[burner[i]] = true;
            break;
        }
    }
};

var lockSkills = function(count, effect) {
    var a = shuffle([0,1,2,3,4,5]);
    for (var i = 0; i < 6; i++) {
        if (activeSkills[a[i] + floor(i/3)] !== 0) {
            lockedSkills[a[i]] += effect;
            count--;
        }
        if (count === 0) {
            break;
        }
    }
};

var playerGainS = function(amount) {
    if (artifactEquipped(3)) {
        playerB += 5;
    }
    playerS += amount;
};

var changeEnemyHP = function(amount) {
    return constrain(amount, 0, enemyMAXHP);
};

var changePlayerHP = function(amount) {
    if (amount < playerHP && (equipArmor===2 || (artifactEquipped(34) && armor[2]===1))) {
        playerGainS(2);
    }
    return constrain(amount, 0, playerMAXHP);
};

var changeEnergy = function(amount) {
    playerE = constrain(playerE + amount, 0, playerMAXE);
};

var reflectDamage = function(amount) {
    var newAmount = constrain(amount - enemyB, 0, amount);
    enemyB = constrain(enemyB - amount, 0, enemyB);
    enemyHP = changeEnemyHP(enemyHP - newAmount);
};

var damageEnemy = function(amount) {
    var eOldHP = enemyHP;
    var eOldB = enemyB;
    if (artifactEquipped(12)) {
        enemyB = max(0, enemyB - 10);
    }
    if (artifactEquipped(10)) {
        playerHP = changePlayerHP(min(playerHP + enemyWound, playerHP + 10));   
    }
    amount += playerS;
    if (enemyInvisible) {
        enemyInvisible = false;
        amount = 0;
    }
    if (artifactEquipped(23)) {
        playerB += 4;
    }
    var gemBonus = 1;
    if (artifactEquipped(16) && amount >= 40) {
        gemBonus += 0.25;
    }
    if (artifactEquipped(32) && playerB >= 25) {
        gemBonus += 0.25;
    }
    if (artifactEquipped(33) && playerE + playerUsedSkill.cost >= 50) {
        gemBonus += 0.25;
    }
    amount = floor(amount * gemBonus);
    var critRandom = random(0, 100);
    var critNorm = tempCritChance;
    var woundLater = false;
    if (artifactEquipped(20)) {
        tempCritChance += enemyPoison;
    }
    if (magnified && amount > 0) {
        tempCritChance += 100;
        magnified = false;
    }
    if (critRandom < tempCritChance) {
        if (!critHappened) {
        battleText += " - It's a critical hit!";
        critHappened = true;
        }
        amount = floor(amount * tempCritPower);
        if (equipWeapon === 0) {
            woundLater = true;
        } else if (equipWeapon === 1) {
            playerGainS(4);
        } else if (equipWeapon === 2) {
            enemyPoison += 6;
        } else {
            changeEnergy(floor(playerMAXE/2));
        }
        if (artifactEquipped(20)) {
            amount = floor(amount * (1 + enemyPoison * 0.01));
        }
        if (artifactEquipped(15)) {
            critNorm += 10;
        }
    }
    tempCritChance = critNorm;
    if (artifactEquipped(29) && enemyWound > 0) {
        enemyPoison += 5;
    }
    if (artifactEquipped(30) && turnCount % 2 === 0) {
        amount += 4;
    }
    var newAmount = constrain(amount - enemyB, 0, amount);
    enemyB = constrain(enemyB - amount, 0, enemyB);
    newAmount += ceil(newAmount * (enemyWound * woundEffect));
    enemyWound = max(0, floor(enemyWound - enemyWound/10));
    if (woundLater) {
        enemyWound += 2;
    }
    enemyHP = changeEnemyHP(enemyHP - newAmount);
    return eOldHP - enemyHP + eOldB - enemyB;
};

var damagePlayer = function(amount) {
    var pOldHP = playerHP;
    var pOldB = playerB;
    amount += enemyS;
    if (invisible) {
        invisible = false;
        amount = 0;
    }
    if (smoked && amount > 0) {
        amount = floor(amount/2);
        smoked = false;
    }
    if (artifactEquipped(30) && turnCount % 2 === 1) {
        amount = max(0, amount - 4);
    }
    var newAmount = constrain(amount - playerB, 0, amount);
    playerB = constrain(playerB - amount, 0, playerB);
    newAmount += floor(newAmount * (playerWound * woundEffect));
    playerWound = max(0, floor(playerWound - playerWound/10));
    if (equipArmor === 3 || (artifactEquipped(34) && armor[3] === 1)) {
        reflectDamage(pOldB - playerB);
    }
    playerHP = changePlayerHP(playerHP - newAmount);
    return pOldHP - playerHP + pOldB - playerB;
};

}

/**Skill Animations**/
{
    /**Restore**/
    {
        var restoreAnimation = function() {
            playerAnimationMax = 40;
            fill(50, 200, 100, 10 * (-abs(playerAnimationStage - 20) + 20));
            rect(0, 0, 400, 400);
        };
    }
    
    /**Buff**/
    {
        var buffAnimation = function() {
            playerAnimationMax = 40;
            fill(60, 100, 210, 10 * (-abs(playerAnimationStage - 20) + 20));
            rect(0, 0, 400, 400);
        };
        
        var buffStrengthAnimation = function() {
            playerAnimationMax = 40;
            fill(230, 60, 40, 10 * (-abs(playerAnimationStage - 20) + 20));
            rect(0, 0, 400, 400);
        };
        
        var buffEnergyAnimation = function() {
            playerAnimationMax = 40;
            fill(130, 70, 210, 10 * (-abs(playerAnimationStage - 20) + 20));
            rect(0, 0, 400, 400);
        };
        
        var smokescreenAnimation = function() {
            playerAnimationMax = 40;
            fill(0, 0, 0, 10 * (-abs(playerAnimationStage - 20) + 20));
            rect(0, 0, 400, 400);
        };
    }
    
    /**Slash**/
    {
        var slashAnimation = function() {
            playerAnimationMax = 50;
            fill(230, 230, 230);
            var b = 140;
            var o = 90;
            var m = playerAnimationStage;
            var l = -abs(playerAnimationStage - 25) + 35;
            triangle(o+b-m+l, b + m - l, o+b - m - 2, b + m - 2, o+b - m + 2, b + m + 2);
            triangle(o+b-m-l, b + m + l, o+b - m - 2, b + m - 2, o+b - m + 2, b + m + 2);
        };
        
        var sCount;
        var tripleSlashAnimation = function() {
            playerAnimationMax = 30;
            if (playerAnimationStage === 0) {
                sCount = 1;
            }
            fill(230, 230, 230);
            var b = 160;
            var o = 60;
            var m = playerAnimationStage;
            var l = (-abs(playerAnimationStage - 10) + 20) * 1.5;
            if (playerAnimationStage <= 24) {
            triangle(o+b-m+l, b + m - l, o+b - m - 2, b + m - 2, o+b - m + 2, b + m + 2);
            triangle(o+b-m-l, b + m + l, o+b - m - 2, b + m - 2, o+b - m + 2, b + m + 2);
            } else if (sCount < 3 && playerAnimationStage === 29) {
                sCount++;
                playerAnimationStage = 1;
            }
        };
        var crossSlashAnimation = function() {
            playerAnimationMax = 50;
            fill(230, 230, 230);
            var b = 140;
            var o = 85;
            var m = playerAnimationStage;
            var l = -abs(playerAnimationStage - 25) + 35;
            triangle(o+b-m+l, b + m - l, o+b - m - 2, b + m - 2, o+b - m + 2, b + m + 2);
            triangle(o+b-m-l, b + m + l, o+b - m - 2, b + m - 2, o+b - m + 2, b + m + 2);
            
            var o = 35;
            triangle(b+o+m-l, b-l+m, b+o+m-2, b+m+2, b+o+m+2, b+m-2);
            triangle(b+o+m+l, b+l+m, b+o+m-2, b+m+2, b+o+m+2, b+m-2);
        };
    }
    
    /**Poison**/
    {
        var poisonAnimation = function() {
            playerAnimationMax = 50;
            var s = playerAnimationStage;
            fill(20, 140, 20, 150);
            ellipse(170, 160, s + 10, s + 10);
            if (s > 15) {
                ellipse(220, 200, s - 10, s - 10);
            }
            if (s > 25) {
                ellipse(230, 150, s - 20, s - 20);
            }
        };
    }
    
    /**Epic**/
    {
        var circleAnimation = function() {
            playerAnimationMax = 120;
            fill(220, 50, 50, 220);
            var cR = min(playerAnimationStage, 40) * 1.5;
            if (playerAnimationStage > 100) {
                cR += (playerAnimationStage - 100) * 5;
            }
            ellipse(200, 180, cR, cR);
            if (playerAnimationStage > 70) {
                fill(240, 240, 240);
                textSize(45);
                text("\u03c0", 185, 195);
            }
        };
        
        var equilateral = function(x, y, s, c) {
            push();
            translate(x, y);
            scale(s);
            fill(c);
            triangle(0, -1.5, -1.5, 1, 1.5, 1);
            pop();
        };
        
        var triangleAnimation = function() {
            playerAnimationMax = 100;
            equilateral(200, 170, playerAnimationStage * 0.6, color(255, 0, 0, 150));
            equilateral(170, 220, playerAnimationStage * 0.6, color(0, 255, 0, 150));
            equilateral(230, 220, playerAnimationStage * 0.6, color(0, 0, 255, 150));
        };
    }
}

/**Player Skills**/
{
    /**Rest**/
    {
        var restEffect = function() {
            var cHP = playerHP;
            var cE = playerE;
            var cW = playerWound;
            var cP = playerPoison;
            playerHP = changePlayerHP(restAmount + playerHP);
            changeEnergy(restAmount);
            battleText += "You restored " + (playerHP - cHP) + "HP and " + (playerE - cE) + " energy\n";
            if (restAmount > 4) {
                playerWound = max(playerWound - 2, 0);
                playerPoison = max(playerPoison - 2, 0);
                if (playerWound !== cW && playerPoison !== cP) {
                    battleText += "You restored " + (cW - playerWound) + " wound and " + (cP - playerPoison) + " poison\n";
                } else if (playerWound !== cW) {
                    battleText += "You restored " + (cW - playerWound) + " wound\n";
                } else if (playerPoison !== cP) {
                    battleText += "You restored " + (cP - playerPoison) + " poison\n";
                }
            }
        };
        var rest = new Skill("Rest", 0, 0, restEffect, restoreAnimation);
    }
    
    /**Potion Drink**/
    {
        var drinkEffect = function() {
            var cH = playerHP;
            if (artifactEquipped(19)) {
                potionBonus -= 2;
            }
            playerHP = changePlayerHP(potionBase + playerHP + (potionBonus * 10));
            battleText += "You drank a potion and restored " + (playerHP - cH) + "HP\n";
            if (artifactEquipped(19)) {
                potionBonus += 2;
            }
            var cP = playerPoison;
            var cW = playerWound;
            playerPoison = max(playerPoison - (2 * potionBonus), 0);
            playerWound = max(playerWound - (2 * potionBonus), 0);
            if (playerPoison !== cP && playerWound !== cW) {
                battleText += "You restored " + (cW - playerWound) + " wound and " + (cP - playerPoison) + " poison\n";
            } else if (playerWound !== cW) {
                battleText += "You restored " + (cW - playerWound) + " wound\n";
            } else if (playerPoison !== cP) {
                battleText += "You restored " + (cP - playerPoison) + " poison\n";
            }
        };
        
        var potionDrink = new Skill("PD", 0, 0, drinkEffect, restoreAnimation);
    }
    
    /**Combat Skills**/
    {
    /**Slash**/
    {
    var slashEffect = function() {
        var d = damageEnemy(10);
        battleText += "\nYou dealt " + d + " damage\n";
    };
    var slashDescription = function() {
        return "Deal 10 damage.";
    };
    var slash = new Skill("Slash", slashDescription, 4, slashEffect, slashAnimation, slashIcon);
    }
    
    /**Bulk Up**/
    {
    var bulkUpEffect = function() {
        playerB += 8;
        playerGainS(2);
        battleText += "\nYou gained 8 block and 2 strength\n";
    };
    var bulkUpDescription = function() {
        return "Gain 8 block and 2 strength.";  
    };
    var bulkUp = new Skill("Bulk Up", bulkUpDescription, 10, bulkUpEffect, buffAnimation, bulkIcon);
    }
    
    /**Heavy Strike**/
    {
    var heavyStrikeEffect = function() {
            var d = damageEnemy(20);
            enemyWound += 4;
            battleText += "\nYou dealt "+ d + " damage and applied 4 wound\n";
        };
    var heavyStrikeDescription = function() {
            return "Deal 20 Damage. Apply 4 wound.";
        };
    var heavyStrike = new Skill("Heavy Strike", heavyStrikeDescription, 20, heavyStrikeEffect, slashAnimation, woundSlashIcon);
    }
    
    /**tree 1**/
    {
    /**Triple Slash**/
    {
        var tripleSlashEffect = function() {
            var d1 = damageEnemy(5);
            var d2 = damageEnemy(5);
            var d3 = damageEnemy(5);
            battleText += "\nYou dealt " + (d1 + d2 + d3) + " damage\n";
        };
        var tripleSlashDescription = function() {
            return "Deal 5 damage 3 times.";
        };
        var tripleSlash = new Skill("Triple Slash", tripleSlashDescription, 10, tripleSlashEffect, tripleSlashAnimation, tripleSlashIcon);
    }
    
    /**Precise Strike**/
    {
        var preciseStrikeEffect = function() {
            tempCritChance += 100;
            var d = damageEnemy(16);
            tempCritChance -= 100;
            battleText += "\nYou dealt " + d + " damage\n";
        };
        var preciseStrikeDescription = function() {
            return "Deal 16 damage. Will always be a critical hit.";
        };
        var preciseStrike = new Skill("Precise Strike", preciseStrikeDescription, 12, preciseStrikeEffect, slashAnimation, preciseStrikeIcon);
    }
    
    /**Execute**/
    {
        var executeEffect = function() {
            var bonus = false;
            if (enemyHP <= enemyMAXHP/2) {
                tempCritChance += 100;
                bonus = true;
            }
            var d = damageEnemy(80);
            battleText += "\nYou dealt " + d + " damage\n";
            if (bonus) {
                tempCritChance -= 100;
            }
        };
        var executeDescription = function() {
            return "Deal 80 damage. Guaranteed critical hit if the enemy's HP is below 50%.";
        };
        var execute = new Skill("Execute", executeDescription, 50, executeEffect, crossSlashAnimation, crossSlashIcon);
    }
    
    /**Cross Slash**/
    {
        var crossSlashEffect = function() {
            var d = 0;
            d += damageEnemy(crossSlashPower);
            d += damageEnemy(crossSlashPower);
            crossSlashPower *= 2;
            battleText += "\nYou dealt " + d + " damage";
        };
        var crossSlashDescription = function() {
            return "Deal 5 damage twice. Double the power of Cross Slash for the rest of combat.";
        };
        var crossSlash = new Skill("Cross Slash", crossSlashDescription, 20, crossSlashEffect, crossSlashAnimation, crossSlashIcon);
    }
    
    /**Last Stand**/
    {
        var lastStandEffect = function() {
            var bonus = false;
            if (playerHP < playerMAXHP / 2) {
                bonus = true;
                tempCritChance += 100;
            }
            var d = damageEnemy(ceil((playerMAXHP - playerHP) / 2));
            battleText += "\nYou dealt " + d + " damage";
            if (bonus) {
                tempCritChance -= 100;
            }
        };
        var lastStandDescription = function() {
            return "Deal damage equal to half of your missing HP. Guaranteed critical hit if your HP is below 50%.";
        };
        var lastStand = new Skill("Last Stand", lastStandDescription, 20, lastStandEffect, slashAnimation, slashIcon);
    }
    
    /**Finisher**/
    {
        var finisherEffect = function() {
            var d = damageEnemy(15);
            var bonus = true;
            for (var i = 0; i < 6; i++) {
                if (usedSkills[i] !== 0) {
                    if (activeSkills[i + floor(i / 3)].skillName !== "Finisher") {
                        d += damageEnemy(5);
                    }
                }
            }
            battleText += "\nYou dealt " + d + " damage";
        };
        var finisherDescription = function() {
            return "Deal 15 damage. Deals an additional 5 damage hit for each other skill used this combat.";
        };
        var finisher = new Skill("Finisher", finisherDescription, 18, finisherEffect, crossSlashAnimation, crossSlashIcon);
    }
    
    }
    
    /**tree 2**/
    {
    /**Sharpen Blade**/
    {
        var sharpenBladeEffect = function() {
            playerGainS(4);
            tempCritChance += 20;
            battleText += "\nYou gained 4 strength\nCritical chance increased by 20%";
        };
        var sharpenBladeDescription = function() {
            return "Gain 4 strength. Increase critical hit chance by 20%";
        };
        var sharpenBlade = new Skill("Sharpen Blade", sharpenBladeDescription, 10, sharpenBladeEffect, buffStrengthAnimation, sharpenIcon);
    }
    
    /**Forge**/
    {
        var forgeEffect = function() {
            battleText += "\nYou lost " + playerB + " block\nYou gained " + playerB + " strength";
            var b = playerB;
            playerGainS(playerB);
            playerB -= b;
        };
        var forgeDescription = function() {
            return "Convert all of your block into strength";
        };
        var forge = new Skill("Forge", forgeDescription, 24, forgeEffect, buffStrengthAnimation, strengthIcon);
    }
    
    /**Fortify**/
    {
        var fortifyEffect = function() {
            playerB += 12;
            playerBlockGain += 2;
            battleText += "\nYou gained 12 block and fortified yourself\n";
        };
        var fortifyDescription = function() {
            return "Gain 12 block. Gain 2 block at the start of each turn.";
        };
        var fortify = new Skill("Fortify", fortifyDescription, 18, fortifyEffect, buffAnimation, shieldIcon);
    }
    
    /**Energy Shield**/
    {
        var energyShieldEffect = function() {
            playerB += 25;
            charged += 2;
            battleText +="\nYou gained 25 block.\nYou feel energy flow through your body";
        };
        var energyShieldDescription = function() {
            return "Gain 25 block. Gain energy equal to your block for the next two turns.";
        };
        var energyShield = new Skill("Energy Shield", energyShieldDescription, 40, energyShieldEffect, buffEnergyAnimation, energyShieldIcon);
    }
    
    /**Body Build**/
    {
        var bodybuildEffect = function() {
            playerB += playerS;
            battleText += "\nYou gained " + playerS + " block\n";
        };
        var bodybuildDescription = function() {
            return "Gain block equal to your strength.";
        };
        var bodybuild = new Skill("Bodybuild", bodybuildDescription, 15, bodybuildEffect, buffAnimation, bulkIcon);
    }
    
    /**Smokescreen**/
    {
        var smokescreenEffect = function() {
            playerB += 20;
            smoked = true;
            battleText += "\nYou gained 20 block\n" + enemyText[1] + enemyName + " is covered in smoke";
        };
        var smokescreenDescription = function() {
            return "Gain 20 block. The enemy's next attack is half as strong.";
        };
        var smokescreen = new Skill("Smokescreen", smokescreenDescription, 20, smokescreenEffect, smokescreenAnimation, smokeIcon);
    }
    }
    
    /**tree 3**/
    {
    /**Stab**/
    {
        var stabEffect = function() {
            woundEffect = 0.15;
            var d = damageEnemy(12);
            woundEffect = 0.1;
            battleText += "\nYou dealt " + d + " damage";
        };
        var stabDescription = function() {
            return "Deal 12 damage. Wound is 50% more effective.";
        };
        var stab = new Skill("Stab", stabDescription, 8, stabEffect, slashAnimation, slashIcon);
    }
    
    /**Impale**/
    {
        var impaleEffect = function() {
            var ph = enemyHP;
            var d = damageEnemy(18);
            var w = enemyWound;
            enemyWound += ceil((ph - enemyHP) / 3);
            battleText += "\nYou dealt " + d + " damage";
            battleText += "\nYou applied " + (enemyWound - w) + " wound";
        };
        var impaleDescription = function() {
            return "Deal 18 damage. Apply wound equal to one third of the HP that the enemy lost.";
        };
        var impale = new Skill("Impale", impaleDescription, 24, impaleEffect, slashAnimation, woundSlashIcon);
    }
    
    /**Poison Bomb**/
    {
        var poisonBombEffect = function() {
            playerB += 5;
            enemyPoison += 5;
            battleText += "\nYou gained 5 block\nYou applied 5 poison";
        };
        var poisonBombDescription = function() {
            return "Apply 5 poison. Gain 5 block.";
        };
        var poisonBomb = new Skill("Poison Bomb", poisonBombDescription, 10, poisonBombEffect, poisonAnimation, poisonIcon);
    }
    
    /**Alchemy**/
    {
        var alchemyEffect = function() {
            var p = enemyPoison;
            enemyPoison *= 2;
            potionBonus++;
            battleText += "\nYou applied " + (enemyPoison - p) + " poison";
            battleText += "\nPotions are more effective";
        };
        var alchemyDescription = function() {
            return "Double the enemy's poison. For the rest of combat, potions heal +10 HP, +2 wound, and +2 poison.";  
        };
        var alchemy = new Skill("Alchemy", alchemyDescription, 35, alchemyEffect, poisonAnimation, poisonIcon);
    }
    
    /**Slice Through**/
    {
        var sliceThroughEffect = function() {
            var b = enemyB;
            enemyB = 0;
            var d = damageEnemy(30);
            enemyB = b;
            enemyWound += 2;
            battleText += "\nYou dealt " + d + " damage and applied 2 wound";
        };
        var sliceThroughDescription = function() {
            return "Deal 30 damage. Apply 2 wound. This attack ignores block.";
        };
        var sliceThrough = new Skill("Slice Through", sliceThroughDescription, 24, sliceThroughEffect, slashAnimation, slashIcon);
    }
    
    /**Poison Fumes**/
    {
        var poisonFumeEffect = function() {
            enemyPoison += 4;
            enemyPoisonGain += 2;
            battleText += "\nYou applied 4 poison\n" + enemyText[1] + enemyName + " is engulfed in toxins";
        };
        var poisonFumeDescription = function() {
            return "Apply 4 poison. Apply 2 poison to the enemy at the start of each turn.";
        };
        var poisonFumes = new Skill("Poison Fumes", poisonFumeDescription, 18, poisonFumeEffect, poisonAnimation, poisonIcon);
    }
    }
    
    /**tree 4**/
    {
        /**Meditate**/
        {
        var meditateEffect = function() {
            meditateValues[2] = true;
            battleText += "\nYou cleared your mind\n";
        };
        var meditateDescription = function() {
            return "Gain 25 energy in 3 turns.";
        };
        var meditate = new Skill("Meditate", meditateDescription, 5, meditateEffect, buffEnergyAnimation, energySkillIcon);
        }
        
        /**Perseverance**/
        {
        var persEffect = function() {
            playerB += 15;
            eBonus += 3;
            battleText += "\nYou gained 15 block\nYou feel much more focused\n";
        };
        var persDescription = function() {
            return "Gain 15 block. Gain +3 energy each turn.";
        };
        var perseverance = new Skill("Perseverance", persDescription, 25, persEffect, buffEnergyAnimation, energyShieldIcon);
        }
        
        /**Charge Slash**/
        {
        var chargeSlashEffect = function() {
        var d = damageEnemy(playerE + 20);
        battleText += "\nYou dealt " + d + " damage\n";
        };
        var chargeSlashDescription = function() {
            return "Deal damage equal to your energy.";
        };
        var chargeSlash = new Skill("Charge Slash", chargeSlashDescription, 20, chargeSlashEffect, slashAnimation, slashIcon);
        }
        
        /**Chain Srike**/ 
        {
        var chainStrikeEffect = function() {
            var power = chainValue > 0 ? 200 : 50;
            var d = damageEnemy(power);
            battleText += "\nYou dealt " + d + " damage\n";
            chainValue = 2;
        };
        var chainStrikeDescription = function() {
            return "Deal 50 damage. If you used Chain Strike last turn, this attack deals 200 damage instead.";
        };
        var chainStrike = new Skill("Chain Strike", chainStrikeDescription, 45, chainStrikeEffect, slashAnimation, slashIcon);
        }
        
        /**Critical Focus**/
        {
        var critFocusEffect = function() {
            magnified = true;
            tempCritPower += 0.5;
            battleText += "\nYou feel much more focused\n";
        };
        var critFocusDescription = function() {
            return "Critical hits do +50% damage. Your next attack is guaranteed to be a critical hit.";
        };
        var critFocus = new Skill("Critical Focus", critFocusDescription, 18, critFocusEffect, buffStrengthAnimation, critBuffIcon);
        }
        
        /**Giga Slash**/
        {
        var gigaSlashEffect = function() {
            var d = damageEnemy(40);
            var bonus = (tempCritPower - 1);
            tempCritPower += bonus;
            battleText += "\nYou dealt " + d + " damage\n";
            tempCritPower -= bonus;
        };
        var gigaSlashDescription = function() {
            return "Deal 40 damage. Critical hits are twice as powerful.";
        };
        var gigaSlash = new Skill("Giga Slash", gigaSlashDescription, 30, gigaSlashEffect, slashAnimation, preciseStrikeIcon);
        }
        
        /**Lucky Strike**/
        {
        var luckyStrikeEffect = function() {
            var d = damageEnemy(7);
            battleText += "\nYou dealt " + d + " damage\n";
            if (critHappened) {
                lucky = true;
                battleText += "\nYou're feeling super lucky\n";
            }
        };
        var luckyStrikeDescription = function() {
            return "Deal 7 damage. If this is a critical hit, all skills cost 7 energy next turn.";
        };
        var luckyStrike = new Skill("Lucky Strike", luckyStrikeDescription, 7, luckyStrikeEffect, slashAnimation, slashIcon);
        }
        
    }
    }
    
    /**Stat Boosts**/
    {
    /**Crit Boost**/
    {
        var critBoostEffect = function() {
            critChance += 10;
        };
        var critBoostDescription = function() {
            return "+10% critical hit chance.";
        };
        var critBoost = new Skill("Crit Boost", critBoostDescription, "", critBoostEffect, "StatBoost", critIcon);
    }
    /**Energy Gain**/
    {
        var eGainBoost = function() {
            playerEGAIN += 3;
        };
        var eGainDescription = function() {
            return "+3 energy per turn.";
        };
        var eGain = new Skill("Energy Gain Boost", eGainDescription, "", eGainBoost, "StatBoost", energyIcon);
    }
    /**Health Boost**/
    {
        var hpBoostEffect = function() {
            playerMAXHP += 40;
            playerHP += 40;
        };
        var hpBoostD = function() {
            return "+40 HP";
        };
        var hpBoost = new Skill("HP Boost", hpBoostD, "", hpBoostEffect, "StatBoost", hpBoostIcon);
    }
    /**Strength Boost**/
    {
        var sBoostE = function() {
            sBoosted = true;
        };
        var sBoostD = function() {
            return "Gain 3 strength at the start of combat.";
        };
        var sBoost = new Skill("Strength Boost", sBoostD, "", sBoostE, "StatBoost", strengthBoostIcon);
    }
    /**Max energy**/
    {
        var mEBoostE = function() {
            playerMAXE += 10;
        };
        var mEBoostD = function() {
            return "+10 max energy.";
        };
        var maxEnergyBoost = new Skill("Energy Boost",mEBoostD, "", mEBoostE, "StatBoost", energyIcon);
    }
    /**Rest Boost**/
    {
        var restBoostE = function() {
            restAmount = 6;
        };
        var restBoostD = function() {
            return "Resting now restores 6 HP, 6 energy, 2 wound, and 2 poison.";
        };
        var restBoost = new Skill("Rest Boost", restBoostD, "", restBoostE, "StatBoost", restIcon);
    }
    /**Defence Boost**/
    {
        var blockBoostE = function() {
            initialBlock = true;
        };
        var blockBoostD = function() {
            return "Gain 10 block at the start of combat.";
        };
        var blockBoost = new Skill("Defensive Stance", blockBoostD, "", blockBoostE, "StatBoost", blockBoostIcon);
    }
    /**Health Boost2**/
    {
        var hpBoost2Effect = function() {
            playerMAXHP += 30;
            playerHP += 30;
            potionBase += 20;
        };
        var hpBoost2D = function() {
            return "+30 HP. Potions Restore +20 HP.";
        };
        var hpBoost2 = new Skill("HP Boost", hpBoost2D, "", hpBoost2Effect, "StatBoost", hpBoostIcon);
    }
    /**Collector**/
    {
        var collectorE = function() {
            artifactSlots++;
        };
        var collectorD = function() {
            return "Gain an additional artifact slot.";
        };
        var collector = new Skill("Collector", collectorD, "", collectorE, "StatBoost", collectorIcon);
    }
    /**xp boost**/
    {
        var xpboostE = function() {
            xpMult += 0.5;
        };
        var xpboostD = function() {
            return "Gain 50% more XP from enemies.";
        };
        var xpBoost = new Skill("XP Boost", xpboostD, "", xpboostE, "StatBoost", xpIcon);
    }
    /**Crit Damage Boost**/
    {
        var critDamageBoostEffect = function() {
            critPower += 25;
        };
        var critDamageBoostDescription = function() {
            return "Critical hits deal +25% damage.";
        };
        var critDamageBoost = new Skill("Crit Boost", critDamageBoostDescription, "", critDamageBoostEffect, "StatBoost", critIcon);
    }
    }
    
    /**Circle Triangle**/
    {
        var unitCircleE = function() {
            var d = 0;
            for (var i = 0; i < 5; i++) {
                enemyWound++;
                d += damageEnemy(5);
            }
            battleText += "\nYou dealt " + d + " damage\n";
        };
        var unitCircleD = function() {
            return "Deal 5 damage 5 times.";
        };
        var unitCircle = new Skill("Unit Circle", unitCircleD, 5, unitCircleE, circleAnimation);
        
        var sctE = function() {
            playerGainS(10);
            playerB += 20;
            enemyWound += 5;
            battleText += "\nYou gained 20 block, 10 strength, and applied\n5 wound";
        };
        var sctD = function() {
            return "Gain 20 block, 10 strength, and apply 5 wound";
        };
        var sohcahtoa = new Skill("SohCahToa", sctD, 5, sctE, triangleAnimation);
    }
    var skillTreeValues = [
           0,        0,        0,
        1, 1, 1,  1, 1, 1,  1, 1, 1,
        2, 2, 2,  2, 2, 2,  2, 2, 2,
        2, 2, 2,  2, 2, 2,  2, 2, 2,
                     0,            
                  1, 1, 1,
                  2, 2, 2,
                  2, 2, 2
    ];
    var skillTreeSkills = [
        slash, bulkUp, heavyStrike,
        preciseStrike, critBoost, tripleSlash,
        sharpenBlade, hpBoost, fortify,
        stab, maxEnergyBoost, poisonBomb,
        execute, eGain, crossSlash,
        forge, sBoost, energyShield,
        impale, restBoost, alchemy,
        lastStand, collector, finisher,
        bodybuild, blockBoost, smokescreen,
        sliceThrough, hpBoost2, poisonFumes,
        meditate,
        critFocus, xpBoost, perseverance,
        gigaSlash, critDamageBoost, chargeSlash,
        luckyStrike, collector, chainStrike
    ];
    var randomizerSkills = [slash, bulkUp, heavyStrike, preciseStrike, tripleSlash, sharpenBlade, fortify, stab, poisonBomb, execute, crossSlash, forge, energyShield, impale, alchemy, lastStand, finisher, bodybuild, smokescreen, sliceThrough, poisonFumes, unitCircle, meditate, perseverance, chargeSlash, chainStrike, critFocus, gigaSlash, luckyStrike, sohcahtoa
    ];
}

/** Enemies **/
{
    
/**Forest**/
{
    /** Spider **/
    {
        var spiderBiteEffect = function() {
            var tHp = playerHP;
            var d = damagePlayer(10);
            var pHP = enemyHP;
            enemyHP = changeEnemyHP(enemyHP + tHp - playerHP + playerPoison);
            battleText += "The spider dealt " + d + " damage and restored " + (enemyHP - pHP) + "HP\n";
        };
        var spiderBite = new ESkill("Spider Bite", spiderBiteEffect, 0);
        var entangleEffect = function() {
            enemyB += 8;
            playerE = constrain(playerE - 6, 0, playerMAXE);
            battleText += "The spider gained 8 block\nYou lost 6 energy\n";
        };
        var entangle = new ESkill("Entangle", entangleEffect, 1);
        var venomStingEffect = function() {
            var d = damagePlayer(7);
            playerPoison += 3;
            battleText += "The spider dealt " + d + " damage and applied 3 poison\n";
        };
        var venomSting = new ESkill("Venomous Sting", venomStingEffect, 0);
        var spiderE = ["Spider", spider, 90, 200, 15, spiderBite, entangle, venomSting];
    }
    
    /**Goblin**/ 
    {
        var shankEffect = function() {
            var d = damagePlayer(8);
            playerWound += 3;
            battleText += "The goblin dealt " + d + " damage and applied 3 wound\n";
        };
        var shank = new ESkill("Shank", shankEffect, 0);
        var battleChantEffect = function() {
            enemyS += 4;
            battleText += "The goblin gained 4 strength\n";
        };
        var battleChant = new ESkill("Battle Chant", battleChantEffect, 1);
        var violentStabbingEffect = function() {
            var d = damagePlayer(12);
            battleText += "The goblin dealt " + d + " damage\n";
        };
        var massStabbing = new ESkill("Violent Stabbing", violentStabbingEffect, 0);
        var goblinE = ["Goblin", goblin, 100, 200, 15, shank, battleChant, massStabbing];
    }
    
    /**Flower**/
    {
        var pollenPowderEffect = function() {
            playerPoison += 3;
            battleText += "The flower applied 3 poison\n";
        };
        var pollenPowder = new ESkill("Pollen Powder", pollenPowderEffect, 0);
        var photosynthesisEffect = function() {
            var cH = enemyHP;
            var cP = enemyPoison;
            var cW = enemyWound;
            changeEnemyHP(enemyHP + 8);
            if (enemyHP !== cH) {
                battleText += "The flower restored " + (enemyHP - cH) + "HP\n";   
            }
            enemyPoison = max(enemyPoison - 2, 0);
            enemyWound = max(enemyWound - 2, 0);
            if (enemyPoison !== cP && enemyWound !== cW) {
                battleText += "The flower restored " + (cP - enemyPoison) + " poison and " + (cW - enemyWound) + " wound\n";
            } else if (enemyPoison !== cP) {
                battleText += "The flower restored " + (cP - enemyPoison) + " poison\n";
            } else if (enemyWound !== cW) {
                battleText += "The flower restored " + (cW - enemyWound) + " wound\n";
            }
        };
        var photosynthesis = new ESkill("Photosynthesis", photosynthesisEffect, 1);
        var vineSlapEffect = function() {
            var d = damagePlayer(7 + playerPoison);
            battleText += "The flower dealt " + d + "damage\n";
        };
        var vineSlap = new ESkill("Vine Slap", vineSlapEffect, 0);
        var flowerE =["Flower",flower,100,150,10,pollenPowder, photosynthesis, vineSlap];
    }
    
    /**Goblin Thug**/
    {
        var massShankingE = function() {
            var d = damagePlayer(12);
            playerWound += 3;
            battleText += "The goblin thug dealt " + d + " damage and applied\n4 wound";
        };
        var massShanking = new ESkill("Mass Shanking", massShankingE, 0);
        var mugE = function() {
            var d = damagePlayer(14);
            var e = playerE;
            playerE = max(0, playerE - 4);
            battleText = "The goblin thug dealt " + d + " damage\n";
            if (playerE !== e) {
                battleText += "You lost " + (e - playerE) + " energy";
            }
        };
        var mug = new ESkill("Mug", mugE, 0);
        var violentClubbingE = function() {
            var w = playerWound;
            var d = damagePlayer(10);
            playerWound = w;
            enemyS += 3;
            battleText += "The goblin thug dealt " + d + " damage and gained\n3 strength";
        };
        var violentClubbing = new ESkill("Violent Clubbing", violentClubbingE, 0);
        var goblinThugE = ["Goblin Thug",goblinThug,140,400,30,massShanking,mug,violentClubbing];
    }
    
    /**Buggy**/
    {
        var flutterFuryE = function() {
            var d = damagePlayer(8);
            d += damagePlayer(9);
            battleText += "The fire moth dealt " + d + " damage\n";
        };
        var flutterFury = new ESkill("Flutter Fury", flutterFuryE, 0);
        var emberWingE = function() {
            var d = damagePlayer(9);
            burnSkill();
            battleText += "The fire moth dealt " + d + " damage\nYou've been burnt";
        };
        var emberWing = new ESkill("Ember Wing", emberWingE, 0);
        var whirlwindE = function() {
            lockSkills(3, 1);
            enemyS += 5;
            battleText += "The fire moth gained 5 strength\nThe blowing winds have made you dizzy\n";
        };
        var whirlwind = new ESkill("Whirlwind", whirlwindE, 1);
        var metamorphE = function() {
            battleText += "A fire moth emerged!\n";
            enemyName = "Fire Moth";
            enemySprite = fireMoth;
            enemySkills = [flutterFury, emberWing, whirlwind];
        };
        var metamorph = new ESkill("Metamorph", metamorphE, 1);
        var hardenE = function() {
            enemyB += 50;
            battleText += "The caterpillar built itself a cocoon\nThe cocoon gained 50 block\n";
            enemySprite = bigCocoon;
            enemyName = "Cocoon";
            enemySkills[0] = metamorph;
        };
        var harden = new ESkill("Harden", hardenE, 1);
        var stringShotE = function() {
            lockSkills(3, 3);
            battleText += "You've been caught in a web of strings\n";
            enemySkills[0] = harden;
        };
        var stringShot = new ESkill("String Shot", stringShotE, 1);
        var tackleE = function() {
            var d = damagePlayer(5);
            battleText += "The caterpillar dealt " + d + " damage\n";
            enemySkills[0] = stringShot;
        };
        var tackle = new ESkill("Tackle", tackleE, 0);
        var curlUpE = function() {
            enemyB += 10;
            enemyS += 3;
            battleText += "The caterpillar gained 10 block and 3 strength\n";
            enemySkills[0] = tackle;
        };
        var curlUp = new ESkill("Curl Up", curlUpE, 1);
        var buggyE = ["Caterpillar", caterpillar, 200, 600, 60, curlUp];
    }
    
    /**Unfunguy**/
    {
        var sporeEffect = function() {
            playerPoison += 6;
            battleText += "The unfunguy applied 6 poison\n";
        };
        var spore = new ESkill("Spore", sporeEffect, 1);
        var headBonkEffect = function() {
            var d = damagePlayer(15);
            battleText += "The unfunguy dealt " + d + " damage\n";
        };
        var headBonk = new ESkill("Head Bonk", headBonkEffect, 0);
        var poisonDustEffect = function() {
            enemyB += 10;
            playerPoison += 3;
            battleText += "The unfungut applied 3 poison and gained 10 block";
        };
        var poisonDust = new ESkill("Poison Dust", poisonDustEffect, 1);
        var redUnfunguyE = ["unfunguy", redUnfunguy, 140, 400, 25, spore, headBonk, poisonDust];
        var blueUnfunguyE = ["unfunguy", blueUnfunguy, 140, 400, 50, spore, headBonk, poisonDust];
        var purpleUnfunguyE = ["unfunguy", purpleUnfunguy, 140, 400, 100, spore, headBonk, poisonDust];
    }
}
    
/**Cemetary**/
{
    /**Zombie**/
    {
        var infectEffect = function() {
            playerPoison += 4;
            playerWound += 3;
            battleText += "The zombie applied 4 poison and 3 wound\n";
        };
        var infect = new ESkill("Infect", infectEffect, 1);
        var fleshSlapEffect = function() {
            woundEffect = 0.2;
            var d = damagePlayer(10);
            woundEffect = 0.1;
            battleText += "The zombie dealt " + d + " damage\n";
        };
        var fleshSlap = new ESkill("Flesh Slap", fleshSlapEffect, 0);
        var mutilateEffect = function() {
            var d = damagePlayer(12);
            playerWound += 5;
            battleText += "The zombie dealt " + d + " damage and applied \n5 wound\n";
        };
        var mutilate = new ESkill("Mutilate", mutilateEffect, 0);
        var zombieE = ["zombie", zombie, 150, 400, 25, infect, fleshSlap, mutilate];
    }
    
    /**Ghost**/
    {
        var apparateE = function() {
            var cW = enemyWound;
            enemyB += 10;
            enemyWound = max(0, enemyWound - 2);
            battleText += "The ghost gained 10 block";
            if (cW !== enemyWound) {
                battleText += " and restored\n" + (cW - enemyWound) + " wound\n";
            }
        };
        var apparate = new ESkill("Apparate", apparateE, 1);
        var hauntingStrikeE = function() {
            var d = damagePlayer(12);
            var cS = playerS;
            playerS = max(playerS - 2, 0);
            battleText += "The ghost dealt " + d + " damage\n";
            if (playerS !== cS) {
                battleText += "You lost " + (cS - playerS) + " strength\n";
            }
        };
        var hauntingStrike = new ESkill("Haunting Strike", hauntingStrikeE, 0);
        var spiritAssaultE = function() {
            var d = damagePlayer(12);
            battleText += "The ghost dealt " + d + " damage\n";
                var cP = enemyPoison;
                enemyPoison = max(0, enemyPoison - 3);
                playerPoison = playerPoison + 3;
                battleText += "The ghost transfered 3 poison to you\n";
        };
        var spiritAssault = new ESkill("Spirit Assault", spiritAssaultE, 0);
        var ghostE = ["Ghost",ghost,110,400, 25, apparate, hauntingStrike, spiritAssault];
    }
    
    /**Clyde**/
    {
        var cloakE = function() {
            if (enemyInvisible) {
                enemyB += 10;
                battleText += "Clyde gained 10 block";
            } else {
                enemyInvisible = true;
                battleText += "Clyde became invisible\n";
            }
        };
        var cloak = new ESkill("Cloak", cloakE, 1);
        var spiritStrikeE = function() {
            var d = damagePlayer(12);
            playerPoison += 4;
            battleText += "Clyde dealt " + d + " damage and applied\n4 poison";
        };
        var spiritStrike = new ESkill("Spirit Strike", spiritStrikeE, 0);
        var soulSapE = function() {
            var d = damagePlayer(15);
            enemyB += playerS;
            battleText += "Clyde dealt " + d + " damage and gained\n" + playerS + " block";
        };
        var soulSap = new ESkill("Soul Sap", soulSapE, 0);
        var clydeE = ["Clyde", clyde, 140, 600, 50, cloak, soulSap, spiritStrike];
    }
    
    /**Cultist**/
    {
        var fungalKickE = function() {
            var d = damagePlayer(12);
            playerPoison += 3;
            battleText += "The cultist dealt " + d + " damage and applied\n3 poison";
        };
        var fungalKick = new ESkill("Fungal Kick", fungalKickE, 0);
        var meditateE = function() {
            enemyB += 10;
            var w = enemyWound;
            var p = enemyPoison;
            battleText += "The cultist gained 10 block\n";
            enemyPoison = max(0, enemyPoison - 4);
            enemyWound = max(0, enemyWound - 2);
            if (enemyPoison !== p && enemyWound !== w) {
                battleText += "The cultist recovered " + (p - enemyPoison) + " poison and "+ (w - enemyWound) + " wound\n";
            } else if (enemyPoison !== p) {
                battleText += "The cultist recovered " + (p - enemyPoison) + " poison\n";
            } else if (enemyWound !== w) {
                battleText += "The cultist recovered " + (w - enemyWound) + " wound\n";
            }
        };
        var meditate = new ESkill("Meditate", meditateE, 1);
        var poisonCloudE = function() {
            playerPoison += 3;
            enemyB += 10;
            battleText += "The cultist gained 10 block and applied\n3 poison";
        };
        var poisonCloud = new ESkill("Poison Cloud", poisonCloudE, 1);
        var backflipKickE = function() {
            var d = damagePlayer(15);
            enemyB += 10;
            battleText += "The cultist dealt " + d + " damage and gained\n10 block";
        };
        var backflipKick = new ESkill("Backflip Kick", backflipKickE, 0);
        var armageddonE = function() {
            var d = damagePlayer(100);
            battleText += "The cultist dealt " + d + " damage\n";
            enemySkills = [backflipKick, fungalKick, meditate, poisonCloud];
            cultistText = false;
        };
        var armageddon = new ESkill("Armageddon", armageddonE, 1);
        var foretellE = function() {
            enemySkills = [backflipKick, fungalKick, meditate, poisonCloud];
            cultistText = true;
            battleText += "An eerie presence fills the air...\nand your feet...";
        };
        var foretell = new ESkill("Foretell", foretellE, 1);
        var cultistE = ["Cultist", cultist, 500, 1000, 150, foretell];
    }
}
    
/**Cave**/
{
    /**Chonker**/
    {
        var fatUpE = function() {
            enemyS += 5;
            enemyB += enemyS;
            battleText += "The chonker gained 5 strength and " +(enemyS)+ " block\n";
        };
        var fatUp = new ESkill("Fatten Up", fatUpE, 1);
        var bodySlamE = function() {
            var d = damagePlayer(15);
            enemyB += 4 + floor(enemyS / 2);
            battleText += "The chonker dealt " + d + " damage and gained\n" + (4 + floor(enemyS / 2)) + " block\n";
        };
        var bodySlam = new ESkill("Body Slam", bodySlamE, 0);
        var steamrollE = function() {
            var d = damagePlayer(10);
            playerWound += 5;
            battleText += "The chonker dealt " + d + " damage and applied\n5 wound\n";
        };
        var steamRoll = new ESkill("Steamroll", steamrollE, 0);
        var chonkerE = ["Chonker", chonker, 280, 800, 70, fatUp, bodySlam, steamRoll];
    }
    
    /**Heckin Chonker**/
    {
        var chonkCannonE = function() {
            var d = damagePlayer (10 + floor(enemyB/2));
            battleText += "The heckin chonker dealt " + d + " damage";
        };
        var chonkCannon = new ESkill("Chonk Cannon", chonkCannonE, 0);
        var gluttonyE = function() {
            enemyS += 5;
            enemyB += 20;
            battleText += "The heckin chonker gained 20 block and\n5 strength";
        };
        var gluttony = new ESkill("Gluttony", gluttonyE, 1);
        var flattenE = function() {
            var d = damagePlayer(20);
            battleText += "The heckin chonker dealt " + d + " damage";
        };
        var flatten = new ESkill("Flatten", flattenE, 0);
        var heckinChonkerE = ["Heckin Chonker", heckinChonker, 360, 1000, 100, chonkCannon, gluttony, flatten];
    }
    
    /**Cave Spider**/
    {
        var webShieldE = function() {
            enemyB += 20;
            battleText += "The cave spider gained 20 block\n";
        };
        var webShield = new ESkill("Web Shield", webShieldE, 1);
        var venomSplatterE = function() {
            var d = damagePlayer(15);
            playerPoison += 5;
            battleText += "The cave spider dealt "+d+ " damage and applied \n5 poison\n";
        };
        var venomSplat = new ESkill("Venom Splatter", venomSplatterE, 0);
        var nerveToxinE = function() {
            playerPoison += 3;
            var cE = playerE;
            playerE -= min(12, floor(playerE / 2));
            battleText += "The cave spider applied 3 poison\n";
            battleText += "You lost " + (cE - playerE) + " energy\n";
        };
        var nerveToxin = new ESkill("Nerve Toxin", nerveToxinE, 0);
        var caveSpiderE = ["Cave Spider", caveSpider, 300, 800, 70, webShield, venomSplat, nerveToxin];
    }
    
    /**The Rock**/
    {
        var suplexE = function() {
            var b = playerB;
            playerB = 0;
            var d = damagePlayer(12);
            battleText += "The Rock dealt " + d + " damage\n";
            playerB = b;
        };
        var suplex = new ESkill("Suplex", suplexE, 0);
        var uppercutE = function() {
            lockSkills(1,2);
            var d = damagePlayer(16);
            battleText += "The Rock dealt " + d + " damage\nYou were knocked dizzy";
        };
        var uppercut = new ESkill("Uppercut", uppercutE, 0);
        var boneCrunchE = function() {
            var d = damagePlayer(12);
            playerWound += 4;
            battleText += "The Rock dealt " + d + " damage and applied\n4 wound\n";
        };
        var boneCrunch = new ESkill("Bone Crunch", boneCrunchE, 0);
        var rockE = ["The Rock", rockBoss, 500, 1600, 200, suplex, uppercut, boneCrunch];
    }
}

/**Desert**/
{
    /**Scorpion**/
    {
        var pinchE = function() {
            var d = damagePlayer(20);
            lockSkills(1, 3);
            battleText += "The scorpion dealt " + d + " damage.\nYou've been trapped by the scorpion's claw\n";
        };
        var pinch = new ESkill("Pinch", pinchE, 0);
        var tailStingE = function() {
            var d = damagePlayer(16);
            playerPoison += 4;
            battleText += "The scorpion dealt " + d + " damage and applied \n4 poison\n";
        };
        var tailSting = new ESkill("Tail Sting", tailStingE, 0);
        var shedSkinE = function() {
            enemyB += 15;
            lockSkills(2, 1);
            battleText += "The scorpion gained 15 block\nThe scorpion's old skin is getting in your way\n";
        };
        var shedSkin = new ESkill("Shed Skin", shedSkinE, 1);
        var scorpionE = ["Scorpion", scorpion, 180, 600, 50, pinch, tailSting, shedSkin];
    }
    
    /**Dripion**/
    {
        var dizzyStingE = function() {
            playerPoison += 3;
            lockSkills(3, 1);
            lockSkills(2, 1);
            battleText += "The dripion applied 3 poison\nYou feel incredibly dizzy";
        };
        var dizzySting = new ESkill("Dizzy Sting", dizzyStingE, 0);
        var poisonStabE = function() {
            var d = damagePlayer(15);
            playerPoison += 3;
            battleText += "The dripion dealt " + d + " damage and applied\n3 poison";
        };
        var poisonStab = new ESkill("Poison Stab", poisonStabE, 0);
        var searingToxinsE = function() {
            burnSkill();
            burnSkill();
            playerPoison += 3;
            battleText += "The dripion applied 3 poison\nYou've been burnt badly";
        };
        var searingToxins = new ESkill("Searing Toxins", searingToxinsE, 1);
        var dripion = ["Dripion", scorpion2, 240, 800, 80, dizzySting, poisonStab, searingToxins];
    }
    
    /**Flame Runner**/
    {
        var doubleKickE = function() {
            var d1 = damagePlayer(10);
            var d2 = damagePlayer(10);
            battleText += "The flame runner dealt " + (d1 + d2) + " damage\n";
        };
        var doubleKick = new ESkill("Double Kick", doubleKickE, 0);
        var flameDashE = function() {
            var d = damagePlayer(16);
            burnSkill();
            battleText += "The flame runner dealt " + d + " damage\nYou've been burnt\n";
        };
        var flameDash = new ESkill("Flame Dash", flameDashE, 0);
        var scorchE = function() {
            if (playerB === 0) {
                burnSkill();
            }
            burnSkill();
            playerB = 0;
            enemyS += 3;
            battleText += "Your block melted away and you've been burnt\nThe flame runner gained 3 strength\n";
        };
        var scorch = new ESkill("Scorch", scorchE, 1);
        var flameRunnerE = ["Flame Runner", flameRunner, 180, 600, 50, doubleKick, flameDash, scorch];
    }
    
    /**Vampire**/
    {
        var bite;
        var bloodStrikeE = function() {
            var d = damagePlayer(ceil(enemyHP/5));
            battleText += "The vampire dealt " + d + " damage\n";
            enemySkills[0] = bite;
        };
        var bloodStrike = new ESkill("Blood Strike", bloodStrikeE, 0);
        var biteE = function() {
            var h = playerHP;
            var d = damagePlayer(25);
            enemyHP = changeEnemyHP(enemyHP + h - playerHP);
            battleText += "The vampire dealt " + d + " damage and restored\n" + (h - playerHP) + "HP\n";
            enemySkills[0] = bloodStrike;
        };
        bite = new ESkill("Bite", biteE, 0);
        var vampireE = ["Vampire", vampire, 250, 1000, 150, bloodStrike];
    }
}

/**Snow**/
{
    /**Snowman**/
    {
        var snowballE = function() {
            var d = damagePlayer(10);
            enemyS += 5;
            battleText += "The snowman dealt " + d + " damage and gained\n5 strength\n";
        };
        var snowball = new ESkill("Snowball", snowballE, 0);
        var blizzardE = function() {
            var d = damagePlayer(25);
            lockSkills(2, 2);
            battleText += "The snowman dealt " + d + " damage.\nYou've been frozen in the snow.";
        };
        var blizzard = new ESkill("Blizzard", blizzardE, 1);
        var iceShieldE = function() {
            enemyB += 20;
            playerE = constrain(playerE - 15, 0, playerMAXE);
            battleText += "The snowman gained 20 block.\nYou lost 15 energy.";
        };
        var iceShield = new ESkill("Ice Shield", iceShieldE, 1);
        var snowmanE = ["Snowman", snowman, 200, 600, 50, snowball, blizzard, iceShield];
    }
    
    /**Peeman**/
    {
        var yellowSnowballE = function() {
            var d = damagePlayer(12);
            playerPoison += 6;
            battleText += "The gooman dealt " + d + " damage and applied\n6 poison\n";
        };
        var yellowSnowball = new ESkill("Yellow Snowball", yellowSnowballE, 0);
        var sblizzardE = function() {
            var d = damagePlayer(30);
            lockSkills(1, 1);
            lockSkills(4, 1);
            battleText += "The gooman dealt " + d + " damage.\nYou've been frozen in the snow.";
        };
        var sblizzard = new ESkill("Blizzard", sblizzardE, 1);
        var snowGoopE = function() {
            playerPoison += 4;
            playerE = constrain(playerE - 20, 0, playerMAXE);
            battleText += "The gooman applied 4 poison.\nYou lost 20 energy.";
        };
        var snowGoop = new ESkill("Snow Goop", snowGoopE, 0);
        var goomanE = ["Gooman", peeman, 240, 1000, 75, yellowSnowball, sblizzard,snowGoop];
    }
    
    /**Jigsaw**/
    {
        var quadStrikeE = function() {
            var d = damagePlayer(5);
            d += damagePlayer(5);
            d += damagePlayer(5);
            d += damagePlayer(5);
            battleText += "Jigsaw dealt " + d + " damage.\n";
        };
        var quadStrike = new ESkill("Quad Strike", quadStrikeE, 0);
        var educationInsightE = function() {
            enemyS += 1;
            battleText += "Jigsaw gained 1 strength.\n";
        };
        var educationalInsight = new ESkill("Educational Insight", educationInsightE, 1);
        var puzzleSpearE = function() {
            var d = damagePlayer(30);
            var wApply = 1 + enemyS;
            playerWound += wApply;
            battleText += "Jigsaw dealt " + d + " damage and applied\n" + wApply + " wound.";
        };
        var puzzleSpear = new ESkill("Puzzle Spear", puzzleSpearE, 0);
        var jigsawE = ["Jigsaw", jigsaw, 360, 1500, 100, quadStrike, educationalInsight, puzzleSpear];
    }
}
    
    /**Sheeley**/
    {
        var fiftyPer = function() {
            var h = playerHP;
            playerHP = floor(max(1, playerHP / 2));
            battleText += "You lost " + (h - playerHP) + "HP\n";
        };
        var fiftyP = new ESkill("Fifty Percent", fiftyPer, 0);
        var dropkickE = function() {
            var d = damagePlayer(25);
            playerWound += 5;
            battleText += "Sheeley dealt " + d + " damage and applied\n5 wound\n";
        };
        var dropKick = new ESkill("Bare Foot Dropkick", dropkickE, 0);
        var urinalE = function() {
            playerPoison += 8;
            battleText += "Sheeley applied 8 poison\n";
        };
        var urinal = new ESkill("Center Urinal Take-Over", urinalE, 1);
        var quadE = function() {
            var d = damagePlayer(24);
            enemyB += 12;
            enemyS += 4;
            battleText += "Sheeley dealt " + d + " damage\n";
            battleText += "Sheeley gained 12 block and 4 strength";
        };
        var quadratic = new ESkill("Quadratic Equation", quadE, 0);
        var milkE = function() {
            enemyB += 20;
            var w = enemyWound;
            var p = enemyPoison;
            battleText += "Sheeley gained 20 block\n";
            enemyPoison = floor(enemyPoison*0.7);
            enemyWound = floor(enemyWound*0.7);
            if (enemyPoison !== p && enemyWound !== w) {
                battleText += "Sheeley recovered " + (p - enemyPoison) + " poison and "+ (w - enemyWound) + " wound\n";
            } else if (enemyPoison !== p) {
                battleText += "Sheeley recovered " + (p - enemyPoison) + " poison\n";
            } else if (enemyWound !== w) {
                battleText += "Sheeley recovered " + (w - enemyWound) + " wound\n";
            }
        };
        var milk = new ESkill("Milk Abstinence", milkE, 1);
        var blockCoinE = function() {
            enemyB += 10;
            battleText += "Sheeley gained 10 block\nHis investment will grow over time";
            enemySkills = [fiftyP, dropKick, urinal, quadratic, milk];
        };
        var blockCoin = new ESkill("Blockcoin Investment", blockCoinE, 1);
        var dilemmaE = function() {
            burnSkill();
            burnSkill();
            burnSkill();
            burnSkill();
            burnSkill();
            burnSkill();
            lockSkills(1, 5);
            battleText += "You are reminded of the power of the\nSocial Dilemma";
            enemySkills = [fiftyP, dropKick, urinal, quadratic, milk];
        };
        var dilemma = new ESkill("Ultimate Dilemma", dilemmaE, 1);
        var sheeleyHP = sigmaSheeley ? 2000 : 1000;
        var sheeleyE = ["Sheeley", sheeleyBoss, sheeleyHP, 2000, 300, blockCoin];
    }
    
    /**Dummy**/
    {
        var rebuildE = function() {
            enemyHP = changeEnemyHP(enemyMAXHP);
            battleText += "The traing dummy rebuilt itself\n";
        };
        var rebuild = new ESkill("Rebuild", rebuildE, 1);
        var dummyE = ["Training Dummy", dummy, 10000000000000, 200, 5, rebuild];
    }
    
    /**Mogus**/
    {
        var sabo = function() {
            lockSkills(6, 1);
            enemyS += 5;
            battleText += "When the impostor is sus";
        };
        var sabotage = new ESkill("Sabotage", sabo, 0);
        var vente = function() {
            enemyB += 100;
            enemyS += 10;
            battleText += "The impostor is venting!!";
        };
        var vent = new ESkill("Vent", vente, 0);
        var susstab = function() {
            damagePlayer(20);
            battleText += "mogus";
        };
        var susStab = new ESkill("Sus Stab", susstab, 1);
        var o2 = function() {
            playerHP = 1;
            battleText += "Stop posting about among us!";
        };
        var o2drain = new ESkill("O2 Drain", o2, 0);
        var sussyBakaE = ["Sussy Baka", sussyBaka, 750, 1000, 200, sabotage, vent, susStab, o2drain];
    }
}

/**Map Functions**/
{
var drawTile = function(x, y, f) {
    push();
    translate(x * 40, y * 40);
    f();
    pop();
};

var drawMap = function(mapLayout, tileset) {
    for(var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            var t = (y * 10) + x;
            drawTile(x, y, tileset[mapLayout[t]]);
        }
    }
};

var MapData = function(layout, hitbox, tileset, transferData, eventData) {
    this.layout = layout;
    this.hitbox = hitbox;
    this.tileset = tileset;
    this.transferData = transferData;
    this.eventData = eventData;
};

var TransferData = function(target, teleport, direction, newX, newY) {
    this.target = target;
    this.teleport = teleport;
    this.direction = direction;
    this.newX = newX;
    this.newY = newY;
};

var changeMap = function(transferData) {
    playerMapId = transferData.target;
    var x, y;
    if (transferData.teleport) {
        x = transferData.newX * 40 - 20;
        y = transferData.newY * 40 - 20;
    } else {
        if (transferData.direction === 0) {
            x = playerX;
            y = playerY + 400;
        } else if (transferData.direction === 1) {
            x = playerX - 400;
            y = playerY;
        } else if (transferData.direction === 2) {
            x = playerX;
            y = playerY - 400;
        } else {
            x = playerX + 400;
            y = playerY;
        }
    }
    playerX = x;
    playerY = y;
};

var checkHitboxTile = function(hitbox, x, y) {
    if (x < 0 || x >= 12 || y < 0 || y >= 12) {
        return 1;
    }
    var index = (y * 12) + x;
    if (index >= 0 && index <= 143) {
        return hitbox[index];
    } else {
        return 1;
    }
};

var checkNeigborTiles = function(hitbox, x, y) {
    var up = checkHitboxTile(hitbox, x, y - 1);
    var down = checkHitboxTile(hitbox, x, y + 1);
    var left = checkHitboxTile(hitbox, x - 1, y);
    var right = checkHitboxTile(hitbox, x + 1, y);
    var a = [up, down, left, right];
    
    for (var i = 0; i < 4; i++) {
        if (a[i] > 1) {
            a[i] = 0;
        }
        if (a[i] < 0) {
            a[i] = 1;
        }
    }
    
    return a;
};

var bindPlayerToMap = function() {
    //X and Y values of the player's current tile
    var playerTileX = ceil(playerX / 40);
    var playerTileY = ceil(playerY / 40);
    
    //returns an array with data of the tiles surrounding the player
    var a = checkNeigborTiles(mapList[playerMapId].hitbox, playerTileX, playerTileY);
    
    //array that stores the maximum distance the player can travel
    var bounds = [-50, 450, -50, 450];
    
    //changes the bounds of the player's movement
    if (a[0] === 1) {
        bounds[0] = ((playerTileY - 1) * 40) + 2;
    }
    if (a[1] === 1) {
        bounds[1] = (playerTileY * 40) - 6;
    }
    if (a[2] === 1) {
        bounds[2] = ((playerTileX - 1) * 40) + 16;
    }
    if (a[3] === 1) {
        bounds[3] = (playerTileX * 40) - 16;
    }
    
    return bounds;
};

var Event = function(drawF, event, layer) {
    this.drawF = drawF;
    this.event = event;
    this.layer = layer;
};

var transferPlayer = function() {
    var x = ceil(playerX / 40);
    var y = ceil(playerY / 40);
    var index = (y * 12) + x;
    if (cMap.hitbox[index] >= 2) {
        changeMap(cMap.transferData[cMap.hitbox[index] - 2]);
    } 
};

var drawTextBox = function(message, speaker, speakW) {
    fill(140, 140, 140, 225);
    rect(0, 310, 400, 90);
    if (speaker !== null) {
        rect(5, 275, speakW, 30);
    }
    textSize(20);
    fill(240, 240, 240);
    text(message, 10, 320, 380, 90);
    if (speaker !== null) {
        text(speaker, 7, 283, speakW, 25);
    }
};
}

/**Menu Functions**/
{

var drawMenu = function() {
    menuLimitX = 1;
    menuLimitY = 1;
    background(100, 100, 100);
    fill(0, 255, 255, 150);
    rect(menuPosX * 198 + 5, menuPosY * 90 + 220, 192, 85);
    fill(255, 255, 255, 160);
    rect(5, 5, 390, 210);
    fill(255, 255, 255, 200);
    rect(5, 220, 192, 85);
    rect(203, 220, 192, 85);
    rect(5, 310, 192, 85);
    rect(203, 310, 192, 85);
    textAlign(LEFT, BOTTOM);
    textSize(22);
    fill(20, 170, 30);
    text("HP: " + playerHP + "/" + playerMAXHP, 10, 30);
    textSize(20);
    fill(160, 40, 255);
    text("Max Energy: " + playerMAXE, 10, 56);
    text("Energy Gain: " + playerEGAIN, 10, 80);
    fill(250, 250, 80);
    text("Gold: " + gold, 10, 106);
    fill(20, 100, 180);
    text("Skill Points: " + skillPoints, 10, 132);
    text("XP Needed: " + nextXP, 10, 158);
    fill(217, 98, 48);
    text("Crit Chance: " + critChance + "%", 10, 184);
    text("Crit Damage: +" + (critPower - 100) + "%", 10, 208);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0, 200);
    text("Skill Tree", 101, 263);
    text("Skills", 101, 352);
    text("Equipment", 299, 263);
    text("Drink Potion\n(" + potions + ")", 299, 352);
    textAlign(LEFT, BASELINE);
    if (potions === 0) {
        fill(0, 0, 0, 150);
        rect(203, 310, 192, 85);
    }
    fill(100, 100, 100, 150);
    rect(210, 15, 80, 80);
    rect(300, 15, 80, 80);
    drawSprite(240, 65, 0.8, swordIcons[equipWeapon]);
    if (artifactEquipped(34)) {
        drawSprite(340, 60, 1, jigsawArmor);
    } else {
        drawSprite(340, 60, 1, armorIcons[equipArmor]);
    }
    var back = color(150, 150, 150);
    fill(back);
    if (artifactSlots === 3) {
        rect(210, 130, 50, 50);
        rect(270, 130, 50, 50);
        rect(330, 130, 50, 50);
        drawSprite(235, 155, 1, artifactSprites[equippedArtifacts[0]], back);
        drawSprite(295, 155, 1, artifactSprites[equippedArtifacts[1]], back);
        drawSprite(355, 155, 1, artifactSprites[equippedArtifacts[2]], back);
    } else if (artifactSlots === 4) {
        rect(240, 105, 50, 50);
        rect(300, 105, 50, 50);
        rect(240, 160, 50, 50);
        rect(300, 160, 50, 50);
        drawSprite(265, 130, 1, artifactSprites[equippedArtifacts[0]], back);
        drawSprite(325, 130, 1, artifactSprites[equippedArtifacts[1]], back);
        drawSprite(265, 185, 1, artifactSprites[equippedArtifacts[2]], back);
        drawSprite(325, 185, 1, artifactSprites[equippedArtifacts[3]], back);
    } else {
        rect(210, 105, 50, 50);
        rect(270, 105, 50, 50);
        rect(330, 105, 50, 50);
        rect(240, 160, 50, 50);
        rect(300, 160, 50, 50);
        drawSprite(235, 130, 1, artifactSprites[equippedArtifacts[0]], back);
        drawSprite(295, 130, 1, artifactSprites[equippedArtifacts[1]], back);
        drawSprite(355, 130, 1, artifactSprites[equippedArtifacts[2]], back);
        drawSprite(265, 185, 1, artifactSprites[equippedArtifacts[3]], back);
        drawSprite(325, 185, 1, artifactSprites[equippedArtifacts[4]], back);
    }
};

var drawEquipMenu = function() {
    menuLimitX = 3;
    menuLimitY = 2;
    background(100, 100, 100);
    fill(255, 255, 255, 110);
    rect(5, 330, 390, 65);
    fill(255, 255, 255, 150);
    rect(5, 5, 390, 320);
    fill(100, 100, 100, 160);
    rect(140, 260, 120, 40);
    fill(0, 0, 0);
    textSize(20);
    text(equipDescriptions[(menuPosY * 4) + menuPosX], 10, 370);
    text("Artifacts", 163, 287);
    fill(100, 100, 100, 150);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            rect(17 + i * 95, 60 + j * 95, 80, 80);
        }
    }
    fill(50, 100, 200, 160);
    rect(17 + equipWeapon * 95, 60, 80, 80);
    rect(17 + equipArmor * 95, 155, 80, 80);
    if (menuPosY < 2) {
        fill(50, 180, 200, 200);
        rect(17 + menuPosX * 95, 60 + menuPosY * 95, 80, 80);
    } else {
        fill(50, 180, 200, 160);
        rect(140, 260, 120, 40);
        menuPosX = 1;
    }
    for (var i = 0; i < 4; i++) {
        drawSprite(45 + i * 95, 112, 0.8, swordIcons[i]);
    }
    for (var i = 0; i < 4; i++) {
        drawSprite(57 + i * 95, 200, 1, armorIcons[i]);
    }
    fill(0, 0, 0, 100);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            var tArray;
            if (j === 0) {
                tArray = weapons;
            } else {
                tArray = armor;
            }
            if (tArray[i] === 0) {
                rect(17 + i * 95, 60 + j * 95, 80, 80);
            }
        }
    }
};

var aSwapPos = 0;
var aSwapping = false;
var artifactScroll = 0;

var drawArtifactMenu = function() {
    menuLimitX = 6;
    menuLimitY = 3;
    var scrollOffset = 7 * artifactScroll;
    background(100, 100, 100);
    fill(255, 255, 255, 150);
    rect(5, 5, 390, 70);
    rect(5, 80, 390, 190);
    rect(5, 275, 390, 120);
    fill(150, 150, 150);
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 3; j++) {
            rect(10 + i * 55, 95 + j * 55, 50, 50);
        }
    }
    if (artifactScroll > 0) {
        triangle(190, 92, 210, 92, 200, 82);
    }
    if (artifactScroll < 2) {
        triangle(190, 258, 210, 258, 200, 268);
    }
    fill(150, 150, 150);
    if (artifactSlots !== 4) {
        rect(120, 15, 50, 50);
        rect(230, 15, 50, 50);
        rect(175, 15, 50, 50);
    }
    if (artifactSlots === 4) {
        rect(147.5, 15, 50, 50);
        rect(202.5, 15, 50, 50);
        rect(92.5, 15, 50, 50);
        rect(257.5, 15, 50, 50);
    }
    if (artifactSlots === 5) {
        rect(285, 15, 50, 50);
        rect(65, 15, 50, 50);
    }
    var a1c = color(150, 150, 150);
    var a2c = color(150, 150, 150);
    var a3c = color(150, 150, 150);
    var a4c = color(150, 150, 150);
    var a5c = color(150, 150, 150);
    if (aSwapping) {
        fill(180, 180, 220);
        if (aSwapPos < 5) {
            var offset = artifactSlots === 3 ? 1 : 0;
            var pos = aSwapPos + offset;
            var offset4 = artifactSlots === 4 ? 27.5 : 0;
            rect(65 + pos * 55 + offset4, 15, 50, 50);
            if (pos === 0) {
                a1c = color(180, 180, 220);
            } else if (pos === 1) {
                a2c = color(180, 180, 220);
            } else if (pos === 2) {
                a3c = color(180, 180, 220);
            } else if (pos === 3) {
                a4c = color(180, 180, 220);
            } else {
                a5c = color(180, 180, 220);
            }
        } else {
            var x = (aSwapPos - 5) % 7;
            var y = floor((aSwapPos - 5 - scrollOffset) / 7);
            if (y >= 0 && y <= 2) {
                rect(10 + x * 55, 95 + y * 55, 50, 50);
            }
        }
    }
    if (artifactSlots === 3) {
        drawSprite(145, 40, 1, artifactSprites[equippedArtifacts[0]], a2c);
        drawSprite(200, 40, 1, artifactSprites[equippedArtifacts[1]], a3c);
        drawSprite(255, 40, 1, artifactSprites[equippedArtifacts[2]], a4c);
    } else if (artifactSlots === 4) {
        drawSprite(117.5, 40, 1, artifactSprites[equippedArtifacts[0]], a1c);
        drawSprite(172.5, 40, 1, artifactSprites[equippedArtifacts[1]], a2c);
        drawSprite(227.5, 40, 1, artifactSprites[equippedArtifacts[2]], a3c);
        drawSprite(282.5, 40, 1, artifactSprites[equippedArtifacts[3]], a4c);
    } else {
        drawSprite(90, 40, 1, artifactSprites[equippedArtifacts[0]], a1c);
        drawSprite(145, 40, 1, artifactSprites[equippedArtifacts[1]], a2c);
        drawSprite(200, 40, 1, artifactSprites[equippedArtifacts[2]], a3c);
        drawSprite(255, 40, 1, artifactSprites[equippedArtifacts[3]], a4c);
        drawSprite(310, 40, 1, artifactSprites[equippedArtifacts[4]], a5c);
    }
    
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 3; j++) {
            var abc = color(150, 150, 150);
            if (aSwapPos === 5 + i + j * 7 + scrollOffset && aSwapping) {
                abc = color(180, 180, 220);
            }
            drawSprite(35+i*55, 120 +j*55,1,artifactSprites[playerArtifacts[i+j*7+scrollOffset]], abc);
        }
    }
    var aId = 0;
    fill(50, 120, 200, 100);
    if (menuPosY === 0) {
        if (artifactSlots === 4) {
            rect(37.5 + 55 * menuPosX, 15, 50, 50);
        } else {
            rect(10 + 55 * menuPosX, 15, 50, 50);
        }
        if (artifactSlots === 3) {
            aId = equippedArtifacts[menuPosX - 2];
        } else {
            aId = equippedArtifacts[menuPosX - 1];
        }
    } else {
        rect(10 + menuPosX * 55, 40 + menuPosY * 55, 50, 50);
        aId = playerArtifacts[menuPosX + (menuPosY - 1) * 7 + scrollOffset];
    }
    fill(40, 40, 40);
    textSize(25);
    text(artifactNames[aId], 10, 300);
    textSize(21);
    text(artifactDescriptions[aId], 20, 315, 360, 100);
};


var drawSkillTree = function() {
    menuLimitX = 8;
    menuLimitY = 3;
    background(100, 100, 100);
    fill(170, 170, 170);
    rect(5, 5, 390, 250);
    rect(5, 260, 390, 135);
    fill(20, 100, 180);
    textSize(24);
    text("Skill Points: " + skillPoints, 7, 29);
    if (skillTreeScreen === 1) {
    //background stuff
    {
        fill(125, 125, 125);
        for (var i = 0; i < 3; i++) {
            rect(i * 125 + 73, 92, 4, 103);
            rect(i * 125 + 35, 98, 85, 4);
            rect(i * 125 + 32, 98, 4, 95);
            rect(i * 125 + 116, 98, 4, 95);
        }
        fill(140, 140, 140);
        for (var i = 0; i < 3; i++) {
            rect(i * 125 + 59, 60, 32, 32);
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                rect(i * 41.3 + 20, j * 43 + 107, 32, 32);
            }
        }

    }
    //skill icons
    {
        for (var i = 0; i < 3; i++) {
            drawSprite(i * 125 + 59, 60, 1, skillTreeSkills[i].icon);
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                drawSprite(20+41.3*i, 107+43*j, 1, skillTreeSkills[i+j*9+3].icon);
            }
        }
    }
    //Shading
    {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                var a = 0;
                var t = 3 + i + j * 9;
                if (skillTreeValues[t] === 2||(skillTreeValues[t]===1&& skillPoints < 1)){
                    a = 160;
                } else if (skillTreeValues[3 + i + (j*9)] === 1) {
                    a = 80;
                }
                fill(0, 0, 0, a);
                rect(i * 41.3 + 20, j * 43 + 107, 32, 32);
            }
        }
    }
    } else {
    //background stuff
    {
        fill(125, 125, 125);
        for (var i = 1; i < 2; i++) {
            rect(i * 125 + 73, 92, 4, 103);
            rect(i * 125 + 35, 98, 85, 4);
            rect(i * 125 + 32, 98, 4, 95);
            rect(i * 125 + 116, 98, 4, 95);
        }
        fill(140, 140, 140);
        for (var i = 1; i < 2; i++) {
            rect(i * 125 + 59, 60, 32, 32);
        }
        for (var i = 3; i < 6; i++) {
            for (var j = 0; j < 3; j++) {
                rect(i * 41.3 + 20, j * 43 + 107, 32, 32);
            }
        }

    }
    //skill icons
    {
        
        for (var i = 1; i < 2; i++) {
            drawSprite(i * 125 + 59, 60, 1, skillTreeSkills[i + 29].icon);
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                drawSprite(20+41.3*(i+3), 107+43*j, 1, skillTreeSkills[i+j*3+31].icon);
            }
        }
        
    }
    //Shading
    {
        
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var a = 0;
                var t = 31 + i + j * 3;
                if (skillTreeValues[t] === 2||(skillTreeValues[t]===1&& skillPoints < 1)){
                    a = 160;
                } else if (skillTreeValues[t] === 1) {
                    a = 80;
                }
                fill(0, 0, 0, a);
                rect((i+3) * 41.3 + 20, j * 43 + 107, 32, 32);
            }
        }
        
    }
    }
    var tSkill;
    //Selector
    {
        fill(50, 120, 200, 100);
        if (menuPosY === 0) {
            if (skillTreeScreen === 1) {
                tSkill = (menuPosX - 1) / 3;
            } else {
                tSkill = 30;
            }
            rect((menuPosX - 1) / 3 * 125 + 59, 60, 32, 32);
        } else {
            if (skillTreeScreen === 1) {
                tSkill = 3 + menuPosX + (menuPosY - 1) * 9;
            } else {
                tSkill = 31 + menuPosX + (menuPosY - 2) * 3;
            }
            rect(menuPosX * 41.3 + 20, (menuPosY - 1) * 43 + 107, 32, 32);
        }
    }
    //info text
    {
        fill(40, 40, 40);
        textSize(25);
        text(skillTreeSkills[tSkill].skillName, 10, 285);
        fill(150, 60, 200);
        text(skillTreeSkills[tSkill].energyCost, 350, 285);
        fill(40, 40, 40);
        textSize(21);
        text(skillTreeSkills[tSkill].description(), 20, 300, 360, 100);
    }
    //arrows
    {
        if (secondSkillTreeScreenUnlocked) {
            fill(125, 125, 125);
            if (skillTreeScreen === 1) {
                triangle(200, 245, 210, 235, 190, 235);
            } else {
                triangle(200, 40, 210, 50, 190, 50);
            }
        }
    }
};

var swapping = false;
var swapPos = 0;
var skillScroll = 0;
var sName;
var sDes;
var sCost;

var blankText = function() {
    return "";
};

var drawSkillMenu = function() {
    menuLimitX = 2;
    menuLimitY = 3;
    background(100, 100, 100);
    fill(170, 170, 170);
    rect(5, 5, 390, 115);
    rect(5, 125, 390, 150);
    rect(5, 280, 390, 115);
    fill(140, 140, 140);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 2; j++) {
            rect(22 + i * 120, 40 + j * 40, 115, 35);
        }
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 2; j++) {
            rect(22 + i * 120, 175 + j * 40, 115, 35);
        }
    }
    if (swapping) {
        fill(180, 180, 220);
        var x = (swapPos - 1) % 3;
        var y = floor((swapPos - 1)  / 3) - skillScroll;
        if (swapPos < 7) {
            rect(22 + x * 120, 40 + y * 40, 115, 35);
        } else {
            if (swapPos > 6 + skillScroll * 3 && swapPos < 13 + skillScroll * 3) {
                rect(22 + x * 120, 95 + y * 40, 115, 35);
            }
        }
    }
    fill(140, 140, 140);
    if (skillScroll < 3 && learnedSkills[skillScroll * 3 + 6] !== 0) {
        triangle(200, 270, 210, 255, 190, 255);
    }
    if (skillScroll > 0) {
        triangle(200, 155, 210, 170, 190, 170);
    }
    fill(10, 10, 10);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Active Skills", 200, 20);
    text("Learned Skills", 200, 139);
    textSize(15);
    for (var i = 0; i < 7; i++) {
        if (i === 3) {
            i++;
        }
        if (activeSkills[i] !== 0) {
            text(activeSkills[i].skillName, 79 + (i % 4) * 120, 58 + floor(i / 4) * 40);
        } 
    }
    for (var i = skillScroll * 3; i < skillScroll * 3 + 6; i++) {
        if (learnedSkills[i] !== 0) {
            text(learnedSkills[i].skillName,79+(i%3)*120,193+floor(i/3)*40-skillScroll*40);
        } else {
            break;
        }
    }
    fill(50, 120, 200, 100);
    if (menuPosY < 2) {
        var ts = menuPosX + menuPosY * 4;
        rect(22 + menuPosX * 120, 40 + menuPosY * 40, 115, 35);
        if (activeSkills[ts] !== 0) {
            sName = activeSkills[ts].skillName;
            sDes = activeSkills[ts].description;
            sCost = activeSkills[ts].energyCost;
        } else {
            sName = "";
            sDes = blankText;
            sCost = "";
        }
    } else {
        var ts = learnedSkills[menuPosX + (menuPosY - 2 + skillScroll) * 3];
        rect(22 + menuPosX * 120, 175 + (menuPosY - 2) * 40, 115, 35);
        if (ts !== 0) {
            sName = ts.skillName;
            sDes = ts.description;
            sCost = ts.energyCost;
        } else {
            sName = "";
            sDes = blankText;
            sCost = "";
        }
    }
    textAlign(LEFT, BASELINE);
    fill(40, 40, 40);
    textSize(25);
    text(sName, 10, 303);
    fill(150, 60, 200);
    text(sCost, 350, 303);
    fill(40, 40, 40);
    textSize(21);
    text(sDes(), 20, 317, 360, 100);
}; 

var gainXP = function(amount) {
    nextXP -= amount;
    while(nextXP <= 0) {
        Plevel++;
        skillPoints++;
        if (Plevel <= 8) {
            nextXP += Plevel * 10;
        } else {
            nextXP += 80 + Plevel * 5;
        }
        
    }
};

var drawShop = function() {
    menuLimitX = 1;
    menuLimitY = 3;
    background(100, 100, 100);
    fill(180, 180, 180);
    rect(5, 298, 390, 95);
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            fill(180, 180, 180, 200);
            rect(5 + i * 197, 34 + j * 65, 193, 62);
            fill(100, 100, 100, 140);
            rect(7 + i * 197, 36 + j * 65, 58, 58);
        }
    }
    fill(250, 250, 50);
    textSize(20);
    text("Gold: " + gold, 295, 24);
    fill(255, 255, 255, 200);
    text("SHOP", 174, 24);
    for (var i = 1; i < 4; i++) {
        drawSprite(28, 75 + i * 65, 0.6, swordIcons[i]);
    }
    for (var i = 1; i < 4; i++) {
        drawSprite(233, 70 + i * 65, 0.8, armorIcons[i]);
    }
    fill(255, 50, 50, 200);
    ellipse(35, 72, 30, 30);
    fill(200, 200, 200, 80);
    ellipse(35, 73, 33, 33);
    fill(200, 200, 200, 50);
    rect(29, 40, 12, 20);
    fill(100, 50, 180, 220);
    ellipse(233, 67, 40, 40);
    //text
    {
    fill(0, 0, 0, 230);
    textSize(16);
    text("Potion", 106, 55);
    text("Katana", 104, 120);
    text("Toxic Blade", 88, 185);
    text("Lightsaber", 92, 250);
    text("Magic Orb", 293, 55);
    text("Iron Armor", 293, 120);
    text("Barbarian Armor", 273, 185);
    text("Prismatic Armor", 272, 250);
    fill(250, 250, 50);
    text("100", 116, 86);
    text("200", 316, 86);
    text("250", 116, 152);
    text("250", 316, 152);
    text("500", 116, 216);
    text("500", 316, 216);
    text("1000", 114, 282);
    text("1000", 314, 282);
    }
    //Shade
    {
    fill(0, 0, 0, 150);
    if (gold < 100) {
        rect(5, 34, 193, 62);
    }
    if (gold < 200) {
        rect(202, 34, 193, 62);
    }
    if (gold < 250 || weapons[1] === 1) {
        rect(5, 99, 193, 62);
    }
    if (gold < 250 || armor[1] === 1) {
        rect(202, 99, 193, 62);
    }
    if (gold < 500 || weapons[2] === 1) {
        rect(5, 164, 193, 62);
    }
    if (gold < 500 || armor[2] === 1) {
        rect(202, 164, 193, 62);
    }
    if (gold < 1000 || weapons[3] === 1) {
        rect(5, 229, 193, 62);
    }
    if (gold < 1000 || armor[3] === 1) {
        rect(202, 229, 193, 62);
    }
    }
    //Description
    {
        var t;
        if (menuPosY > 0) {
            t = equipDescriptions[menuPosY + 4 * menuPosX];
        } else if (menuPosX === 1) {
            t = "Gain 10 XP";   
        } else {
            t = "Restores " + potionBase +" HP";
        }
        textSize(20);
        fill(0, 0, 0, 200);
        textAlign(CENTER, BASELINE);
        text(t, 200, 350);
        textAlign(LEFT, BASELINE);
    }
    fill(50, 150, 220, 50);
    rect(5 + menuPosX * 197, 34 + menuPosY * 65, 193, 62);
};


var artifactsBought = [false,false,false,false,false,false];
var drawDesertShop = function() {
    menuLimitX = 1;
    menuLimitY = 3;
    background(100, 100, 100);
    fill(180, 180, 180);
    rect(5, 298, 390, 95);
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            fill(180, 180, 180, 200);
            rect(5 + i * 197, 34 + j * 65, 193, 62);
            fill(135, 135, 135);
            rect(7 + i * 197, 36 + j * 65, 58, 58);
        }
    }
    fill(250, 250, 50);
    textSize(20);
    text("Gold: " + gold, 295, 24);
    fill(255, 255, 255, 200);
    text("SHOP", 174, 24);
    //image
    {
    fill(255, 50, 50, 200);
    ellipse(35, 72, 30, 30);
    fill(200, 200, 200, 80);
    ellipse(35, 73, 33, 33);
    fill(200, 200, 200, 50);
    rect(29, 40, 12, 20);
    drawSprite(206, 39, 1.6, hpBoostIcon);
    drawSprite(36, 130, 1, artifactSprites[35]);
    drawSprite(36, 195, 1, artifactSprites[31]);
    drawSprite(36, 260, 1, artifactSprites[9], color(135, 135, 135));
    drawSprite(233, 130, 1, artifactSprites[33]);
    drawSprite(233, 195, 1, artifactSprites[30]);
    drawSprite(233, 260, 1, artifactSprites[13]);
    }
    //text
    {
    fill(0, 0, 0, 230);
    textSize(16);
    text("Potion", 106, 55);
    text("Gas Can", 98, 120);
    text("Blockcoin", 95, 185);
    text("Mask", 111, 250);
    text("HP Boost", 295, 55);
    text("Amethyst", 296, 120);
    text("Calculator", 294, 185);
    text("Scary Mask", 290, 250);
    fill(250, 250, 50);
    text("100", 116, 86);
    text("1000", 310, 86);
    text("500", 116, 152);
    text("500", 316, 152);
    text("500", 116, 216);
    text("500", 316, 216);
    text("500", 116, 282);
    text("500", 316, 282);
    }
    //Shade
    {
    fill(0, 0, 0, 150);
    if (gold < 100) {
        rect(5, 34, 193, 62);
    }
    if (gold < 1000) {
        rect(202, 34, 193, 62);
    }
    if (gold < 500 || artifactsBought[0]) {
        rect(5, 99, 193, 62);
    }
    if (gold < 500 || artifactsBought[3]) {
        rect(202, 99, 193, 62);
    }
    if (gold < 500 || artifactsBought[1]) {
        rect(5, 164, 193, 62);
    }
    if (gold < 500 || artifactsBought[4]) {
        rect(202, 164, 193, 62);
    }
    if (gold < 500 || artifactsBought[2]) {
        rect(5, 229, 193, 62);
    }
    if (gold < 500 || artifactsBought[5]) {
        rect(202, 229, 193, 62);
    }
    }
    //Description
    {
        var t;
        if (menuPosY === 1) {
            if (menuPosX === 0) {
                t = "+10% crit chance. +25% crit damage.\nBurn a random skill each turn.";
            } else {
                t = "If you have at least 50 energy, attacks\ndeal 25% more damage.";
            }
        } else if (menuPosY === 2) {
            if (menuPosX === 0) {
                t = "Double your block on the 3rd turn\nof combat.";
            } else {
                t = "On odd turns your attacks deal 4\nadditional damage. On even turns, the\nenemy deals 4 less damage.";
            }
        } else if (menuPosY === 3) {
            if (menuPosX === 0) {
                t = artifactDescriptions[9];
            } else {
                t = artifactDescriptions[13];
            }
        } else if (menuPosX === 1) {
            t = "Gain 10 HP";   
        } else {
            t = "Restores " + potionBase + " HP";
        }
        textSize(20);
        fill(0, 0, 0, 200);
        textAlign(CENTER, BASELINE);
        text(t, 200, 345);
        textAlign(LEFT, BASELINE);
    }
    fill(50, 150, 220, 50);
    rect(5 + menuPosX * 197, 34 + menuPosY * 65, 193, 62);
};

var foodBought = [false,false,false,false,false,false,false,false];
var drawFoodShop = function(){
    menuLimitX = 1;
    menuLimitY = 3;
    background(100, 100, 100);
    fill(180, 180, 180);
    rect(5, 298, 390, 95);
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            fill(180, 180, 180, 200);
            rect(5 + i * 197, 34 + j * 65, 193, 62);
            fill(135, 135, 135);
            rect(7 + i * 197, 36 + j * 65, 58, 58);
        }
    }
    fill(250, 250, 50);
    textSize(20);
    text("Gold: " + gold, 295, 24);
    fill(255, 255, 255, 200);
    text("SHOP", 174, 24);
    //image
    {
    drawSprite(36, 65, 1, artifactSprites[1]);
    drawSprite(36, 130, 1, artifactSprites[19]);
    drawSprite(36, 195, 1, artifactSprites[26]);
    drawSprite(36, 260, 1, artifactSprites[25]);
    drawSprite(233, 65, 1, artifactSprites[14]);
    drawSprite(233, 130, 1, artifactSprites[17]);
    drawSprite(233, 195, 1, artifactSprites[24]);
    drawSprite(233, 260, 1, artifactSprites[27]);
    }
    //text
    {
    fill(0, 0, 0, 230);
    textSize(16);
    text("Watermelon", 90, 55);
    text("Cheese", 102, 120);
    text("Chocolate", 96, 185);
    text("Pizza", 110, 250);
    text("Energy Drink", 285, 55);
    text("Honey", 306, 120);
    text("Ice Cream", 294, 185);
    text("Fast Food", 295, 250);
    fill(250, 250, 50);
    text("300", 116, 86);
    text("300", 316, 86);
    text("300", 116, 152);
    text("300", 316, 152);
    text("300", 116, 216);
    text("300", 316, 216);
    text("300", 116, 282);
    text("300", 316, 282);
    }
    //Shade
    {
    fill(0, 0, 0, 150);
    if (gold < 300 || foodBought[0]) {
        rect(5, 34, 193, 62);
    }
    if (gold < 300 || foodBought[4]) {
        rect(202, 34, 193, 62);
    }
    if (gold < 300 || foodBought[1]) {
        rect(5, 99, 193, 62);
    }
    if (gold < 300 || foodBought[5]) {
        rect(202, 99, 193, 62);
    }
    if (gold < 300 || foodBought[2]) {
        rect(5, 164, 193, 62);
    }
    if (gold < 300 || foodBought[6]) {
        rect(202, 164, 193, 62);
    }
    if (gold < 300 || foodBought[3]) {
        rect(5, 229, 193, 62);
    }
    if (gold < 300 || foodBought[7]) {
        rect(202, 229, 193, 62);
    }
    }
    //Description
    {
        var t;
        if (menuPosY === 0) {
            if (menuPosX === 0) {
                t = artifactDescriptions[1];
            } else {
                t = artifactDescriptions[14];
            }
        } else if (menuPosY === 1) {
            if (menuPosX === 0) {
                t = "+50HP.\nPotions restore -20HP during combat.";
            } else {
                t = "Enemies drop 50% more gold and\n25% more xp.";
            }
        } else if (menuPosY === 2) {
            if (menuPosX === 0) {
                t = artifactDescriptions[26];
            } else {
                t = artifactDescriptions[24];
            }
        } else if (menuPosX === 0) {
            t = artifactDescriptions[25]; 
        } else {
            t = artifactDescriptions[27];
        }
        textSize(20);
        fill(0, 0, 0, 200);
        textAlign(CENTER, BASELINE);
        text(t, 200, 345);
        textAlign(LEFT, BASELINE);
    }
    fill(50, 150, 220, 50);
    rect(5 + menuPosX * 197, 34 + menuPosY * 65, 193, 62);
};

}

/**Event Functions**/
{
var eventBegin = function() {
    eventStage = 0;
    currentScreen = "text";
};

var eventEnd = function() {
    currentScreen = "move";
};

var scanForEvent = function() {
    var tX = ceil(playerX / 40);
    var tY = ceil(playerY / 40);
    
    if (playerDir === 0) {
        tY -= 1;
    } else if (playerDir === 1) {
        tX += 1;
    } else if (playerDir === 2) {
        tY += 1;
    } else {
        tX -= 1;
    }
    
    var t = checkHitboxTile(cMap.hitbox, tX, tY);

    if (t < 0) {
        t *= -1;
        t -= 1;
        currentEvent = cMap.eventData[t].event;
        eventBegin();
    }
};

var drawEvents = function(layer) {
    if (cMap.eventData) {
        for (var i = 0; i < cMap.eventData.length; i++) {
            var e = cMap.eventData[i];
            if (e.layer === layer) {
                e.drawF();
            }
        }
    }
};

var question = function() {
    menuLimitX = 1;
    menuLimitY = 0;
    fill(140, 140, 140, 225);
    rect(345, 275, 50, 30);
    rect(290, 275, 50, 30);
    fill(80, 200, 240, 140);
    rect(290 + menuPosX * 55, 275, 50, 30);
    textSize(20);
    fill(240, 240, 240);
    text("Yes", 298, 296);
    text("No", 358, 296);
};

var spinning = false;
var spinSpeed = 0;
var showGamble = false;
var gambling = function() {
    spinnerR += spinSpeed;
    if (spinnerR >= 360) {
        spinnerR -= 360;
    }
    if (!spinning) {
        spinSpeed = max(0, spinSpeed - 0.1);
    }
    drawSprite(200, 130, 1.8, spinner);
};
}

/**Battle Functions**/
{
var drawHealthBar = function(hp, max, x, y, w, h) {
    fill(40, 255, 40);
    var ratio = ceil(hp / max * w);
    rect(x, y, ratio, h);
    fill(255, 40, 40);
    rect(x + ratio, y, w - ratio, h);
};

var drawEnemy = function() {
    enemyActionFrame += enemyActing * enemyActionDirection;
    var yOffset = enemyActing * enemyActionFrame * -(enemyActionType - 1);
    var Escale = 1 + enemyActing * enemyActionFrame/100 * enemyActionType;
    if (enemyActionFrame >= 30) {
        enemyActionDirection = -2;
    }
    if (enemyActionFrame <= 0) {
        enemyActionDirection = 2;
        enemyActing = 0;
        if (!enemyFinished) {
            enemyFinished = true;
            turnStage = 5;
            enemyUsedSkill.effect();
        }
    }
    drawSprite(200, 180 + yOffset, Escale, enemySprite);
};

var setupEnemy = function() {
    enemyName = currentEnemy[0];
    if (enemyName === "Goblin") {
        if (goblinsFought === 3) {
            currentEnemy = goblinThugE;
            enemyName = currentEnemy[0];
            lastArmor = equipArmor;
            equipArmor = -1;
        } else if (goblinsFought > 3) {
            if (random(0, 4) < 1) {
                currentEnemy = goblinThugE;
                enemyName = currentEnemy[0];
                lastArmor = equipArmor;
                equipArmor = -1;
            }
        }
        goblinsFought++;
    }
    if (enemyName === "Ghost") {
        if (ghostsFought === 2) {
            currentEnemy = clydeE;
            enemyName = currentEnemy[0];
            enemyText =["",""];
        } else if (ghostsFought > 2) {
            if (random(0, 4) < 1) {
                currentEnemy = clydeE;
                enemyName = currentEnemy[0];
                enemyText =["",""];
            }
        }
        ghostsFought++;
    }
    if (enemyName === "Scorpion") {
        if (scorpionsFought === 2) {
            currentEnemy = dripion;
            enemyName = currentEnemy[0];
        } else if (scorpionsFought > 2) {
            if (random(0, 4) < 1) {
                currentEnemy = dripion;
                enemyName = currentEnemy[0];
            }
        }
        scorpionsFought++;
    }
    if (enemyName === "Chonker") {
        if (chonkersFought === 2) {
            currentEnemy = heckinChonkerE;
            enemyName = currentEnemy[0];
        } else if (chonkersFought > 2) {
            if (random(0, 4) < 1) {
                currentEnemy = heckinChonkerE;
                enemyName = currentEnemy[0];
            }
        }
        chonkersFought++;
    }
    if (enemyName === "Snowman") {
        if (snowmenFought === 2) {
            currentEnemy = goomanE;
            enemyName = currentEnemy[0];
        } else if (snowmenFought > 2) {
            if (random(0, 4) < 1) {
                currentEnemy = goomanE;
                enemyName = currentEnemy[0];
            }
        }
        snowmenFought++;
    }
    if (enemyName === "Jigsaw") {
        enemyB = 50;
    }
    enemySprite = currentEnemy[1];
    enemyHP = currentEnemy[2];
    enemyMAXHP = currentEnemy[2];
    enemyS = 0;
    enemyB = 0;
    enemyPoison = 0;
    enemyPoisonGain = 0;
    enemyWound = 0;
    enemyInvisible = false;
    if (artifactEquipped(2)) {
        enemyWound += 3;
    }
    enemySkills = [];
    for (var i = 5; i < currentEnemy.length; i++) {
        enemySkills.push(currentEnemy[i]);
    }
    battleText += enemyText[0] + enemyName + " appeared!\n";
    if (equipArmor === -1) {
        battleText += "The goblin thug stole your armor!\n";
    } else if (enemyName === "Heckin Chonker") {
        battleText += "The heckin chonker is growing larger!\n";
    }
    cultistText = false;
};

var setupPlayer = function() {
    burntSkills = [false,false,false,false,false,false];
    lockedSkills = [0, 0, 0, 0, 0, 0];
    if (artifactEquipped(11)) {
        magnified = true;
    } else {
        magnified = false;
    }
    tempCritChance = critChance;
    tempCritPower = critPower / 100;
    lucky = false;
    potionBonus = 0;
    crossSlashPower = 5;
    playerBlockGain = 0;
    charged = 0;
    meditateValues = [false, false, false];
    eBonus = 0;
    chainValue = 0;
    usedSkills = [0, 0, 0, 0, 0, 0];
    turnStage = 0;
    playerE = constrain(floor(playerMAXE / 2), 0, playerMAXE);
    if (artifactEquipped(4)) {
        invisible = true;
    } else {
        invisible = false;
    }
    if (sBoosted) {
        playerGainS(3);
    }
    if (equipArmor === 0 || artifactEquipped(34)) {
        playerB += 15;
    }
    if (equipArmor === 1 || (artifactEquipped(34) && armor[1] === 1)) {
        playerB += 4;
        playerBlockGain = 4;
    }
    if (initialBlock) {
        playerB += 10;
    }
    if (artifactEquipped(6)) {
        playerB += 2;
        if (playerHP <= playerMAXHP/2) {
            playerB += 4;
        }
    }
    if (playerB > 0) {
        battleText += "You gained " + playerB + " block\n";
    }
    if (artifactEquipped(8)) {
        changeEnergy(-15);
    }
    if (artifactEquipped(22)) {
        playerPoison += 5;
    }
    if (artifactEquipped(25)) {
        playerE += 15;
    }
    ogSkills = [activeSkills[4], activeSkills[5], activeSkills[6]];
};

var startBattle = function() {
    battleText = "";
    turnCount = 0;
    setupEnemy();
    setupPlayer();
};

var startTurn = function() {
    battleText = "";
    turnCount++;
    if (cultistText && turnCount === 10) {
        enemySkills = [armageddon];
    }
    if (enemyName === "Jigsaw") {
        enemyB = 25;
    }
    changeEnergy(playerEGAIN + eBonus);
    if (artifactEquipped(1)) {
        playerHP = changePlayerHP(playerHP + 4);
    }
    if (artifactEquipped(6)) {
        playerB += 2;
        if (playerHP <= playerMAXHP/2) {
            playerB += 4;
        }
    }
    if (artifactEquipped(8)) {
        playerGainS(2);
    }
    if (artifactEquipped(21)) {
        for (var i = 4; i < 7; i++) {
            var t = floor(random(0, randomizerSkills.length));
            var done = false;
            while (!done) {
                var works = true;
                for (var j = 0; j < 8; j++) {
                    if (randomizerSkills[t] === activeSkills[j]) {
                        works = false;
                        break;
                    }
                }
                if (works) {
                    done = true;
                    activeSkills[i] = randomizerSkills[t];
                    lockedSkills[i-1] = 0;
                    burntSkills[i-1] = false;
                } else {
                    t++;
                    if (t >= randomizerSkills.length) {
                        t = 0;
                    }
                }
            }
        }
    }
        if (turnCount === 2 && artifactEquipped(31)) {
        playerBlockGain += playerBlockGain + playerB;
    }
    if (playerBlockGain > 0) {
        playerB += playerBlockGain;
        battleText += "You gained " + playerBlockGain + " block\n";
    }
    if (playerPoison > 0) {
        if (artifactEquipped(9)) {
            var cB = playerB;
            var newAmount = constrain(playerPoison - playerB, 0, playerPoison);
            playerB = constrain(playerB - playerPoison, 0, playerB);
            playerHP = changePlayerHP(playerHP - newAmount);
            if (equipArmor === 3) {
                reflectDamage(cB - playerB);
            }
            battleText += "You took " + playerPoison + " damage from poison\n";
        } else {
            playerHP = changePlayerHP(playerHP - playerPoison);
            battleText += "You lost " + playerPoison + "HP from poison\n";
        }
        playerPoison -= ceil(playerPoison/10);
    }
    if (artifactEquipped(5)) {
        playerPoison += 2;
    }
    if (artifactEquipped(35)) {
        burnSkill();
    }
    if (artifactEquipped(36)) {
        var critRandom = random(0, 100);
        var critNorm = tempCritChance;
        if (artifactEquipped(20)) {
            tempCritChance += enemyPoison;
        }
        if (critRandom < tempCritChance) {
            changeEnergy(4);
            playerHP = changePlayerHP(playerHP + 6);
            battleText += "You restored 6 HP and gained 4 energy\n";
        }
        tempCritChance = critNorm;
    }
    if (turnCount === 9 && artifactEquipped(7)) {
        var s = playerS;
        var w = enemyWound;
        var c = critChance;
        playerS = 0;
        enemyWound = 0;
        critChance = -500;
        damageEnemy(150);
        battleText += "You dealt 150 damage\n\n";
        playerS = s;
        enemyWound = w;
        critChance = c;
    }
    if (enemyPoison > 0) {
        enemyHP = changeEnemyHP(enemyHP - enemyPoison);
        battleText += enemyName + " lost " + enemyPoison + "HP from poison\n";
        enemyPoison -= ceil(enemyPoison/10);
    }
    if (charged > 0) {
        charged--;
        changeEnergy(playerB);
    }
    chainValue = max(0, chainValue -1);
    if (meditateValues[0]) {
        changeEnergy(25);
        meditateQuest += 25;
        battleText += "You gained 25 energy\n";
    }
    meditateValues[0] = meditateValues[1];
    meditateValues[1] = meditateValues[2];
    meditateValues[2] = false;
    var unlock = 1;
    for (var i = 0; i < 6; i++) {
        if (activeSkills[i + floor(i/3)] !== 0) {
            unlock *= lockedSkills[i];
        }
    }
    if (unlock !== 0) {
        lockedSkills[0] = 0;
    }
    enemyPoison += enemyPoisonGain;
    if (sheeleyRan && !rockBeat) {
        enemyS += 2;
    }
    if (enemyName === "Sheeley") {
        enemyB += 2 + floor(min(15, enemyB*0.15));
        if (enemyHP <= 500 && !dilemmad) {
            enemySkills = [dilemma];
            dilemmad = true;
        }
    }
    if (enemyName === "Heckin Chonker") {
        enemyB += turnCount * 2;
    }
    if (battleText === "") {
        turnStage++;
        battleText = "";
        menuPosX = 0;
        menuPosY = 0;    
    }
};

var battleSkillSelection = function() {
    menuLimitX = 3;
    menuLimitY = 1;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            var s = activeSkills[i + (j * 4)];
            fill(115, 115, 115);
            rect(5 + i * 98, 320 + j * 38, 95, 36);
            if (s !== 0 && s !== 1 && s!== 2) {
                var eCost = lucky ? 7 : s.energyCost;
                if (burntSkills[i + j * 3]) {
                    fill(240, 110, 80, 200);
                    rect(5 + i * 98, 320 + j * 38, 95, 36);
                }
                var lockValue = lockedSkills[i + j * 3];
                textSize(14);
                fill(12, 12, 12);
                text(s.skillName, 8 + i * 98, 335 + j * 38);
                if (lockValue > 0) {
                    drawSprite(78 + i * 98, 344 + j * 38, 1, lock, lockValue);
                } else {
                    fill(200, 145, 255);
                    text(eCost, 78 + i * 98, 352 + j * 38);
                }
                if (eCost > playerE || lockValue > 0) {
                    fill(0, 0, 0, 80);
                    rect(5 + i * 98, 320 + j * 38, 95, 36);
                }
            } else if (s === 1) {
                textSize(14);
                fill(12, 12, 12);
                text("Rest", 302, 335);
            } else if (s === 2) {
                textSize(14);
                fill(12, 12, 12);
                text("Drink Potion", 302, 372);
                text("(" + potions + ")", 368, 387);
                if (potions < 1) {
                    fill(0, 0, 0, 80);
                    rect(299, 358, 95, 36);
                }
            } else {
                fill(0, 0, 0, 80);
                rect(5 + i * 98, 320 + j * 38, 95, 36);
            }
        }
    }
    fill(0, 190, 240, 50);
    rect(5 + menuPosX * 98, 320 + menuPosY * 38, 95, 36);
};

var radius = 10;
var final = false;
var enemyDefeated = function() {
    activeSkills[4] = ogSkills[0];
    activeSkills[5] = ogSkills[1];
    activeSkills[6] = ogSkills[2];
    if (sheeleyTalk && !gameBeat) {
        final = true;
        timerFinish = true;
    } else {
    battleText = enemyText[1] + enemyName + " was defeated\n";
    if (goblinsFought === 4 && enemyName === "Goblin Thug") {
        gainArtifact(2);
        battleText += "You obtained a goblin shank!\n";
    } else if (ghostsFought === 3 && enemyName === "Clyde") {
        gainArtifact(4);
        battleText += "you obtained an invisiblity cloak!\n";
    } else if (scorpionsFought === 3 && enemyName === "Dripion") {
        gainArtifact(22);
        battleText += "you obtained some scorpion venom!\n";
    } else if (chonkersFought === 3 && enemyName === "Heckin Chonker") {
        gainArtifact(3);
        battleText += "you obtained some body fat!\n";
    } else if (snowmenFought === 3 && enemyName === "Gooman") {
        gainArtifact(36);
        battleText += "You obtained a top hat!\n";
    }
    if (enemyName ==="Fire Moth" || enemyName ==="Caterpillar" || enemyName ==="Cocoon") {
        buggyBeat = true;
        sheeleyLeft = true;
        gainArtifact(6);
        battleText += "You obtained a cocoon!\n";
        if (goblinsFought < 3) {
            goblinsFought++;
        }
    }
    if (enemyName === "Vampire") {
        vampireBeat = true;
        gainArtifact(10);
        battleText += "You obtained a vampire fang!\n";
        if (scorpionsFought < 2) {
            scorpionsFought++;
        }
    } 
    if (enemyName === "Cultist") {
        cultistBeat = true;
        gainArtifact(7);
        battleText += "You obtained an orb!\n";
        if (ghostsFought < 2) {
            ghostsFought++;
        }
    }
    if (enemyName === "Jigsaw") {
        jigsawBeat = true;
        gainArtifact(34);
        battleText += "You obtained a jigsaw piece!\n";
    }
    
    var c = skillPoints;
    var xpGain = floor(currentEnemy[4] * xpMult);
    if (artifactEquipped(17)) {
        xpGain = floor(xpGain * 1.25);
    }
    gainXP(xpGain);
    var goldGain = currentEnemy[3];
    if (artifactEquipped(17)) {
        goldGain += currentEnemy[3] / 2;
    }
    gold += goldGain;
    battleText += "You gained " + goldGain + " gold and " + xpGain +" XP";
    if (skillPoints > c) {
        battleText += "   Level Up!";
    }
    enemyText = ["A ", "The "];
    if (sheeleyRan && !rockBeat) {
        rockBeat = true;
        gainArtifact(8);
        battleText += "\nYou obtained a dumbbell!";
        if (chonkersFought < 2) {
            chonkersFought++;
        }
    }
    if (equipArmor === -1) {
        equipArmor = lastArmor;
    }
    }
};

var drawBattle = function() {
    battleBack();
    if (enemyHP > 0) {
        drawEnemy();
    }
    if (smoked) {
        fill(0, 0, 0, 75);
        rect(0, 0, 400, 400);
    }
    fill(150, 150, 150);
    rect(3, 293, 394, 104);
    drawHealthBar(playerHP, playerMAXHP, 81, 295, 130, 18);
    if (invisible) {
        fill(235, 220, 255, 160);
        rect(79, 295, 130, 18);
    }
    textSize(20);
    fill(40, 240, 40);
    text(playerHP + "/" + playerMAXHP, 5, 311);
    if (charged > 0) {
        fill(200, 140, 220);
        ellipse(240, 305, 25, 25);
    }
    drawSprite(240, 305, 0.85, energyBulb, playerE);
    if (playerB > 0) {
        drawSprite(284, 308, 0.9, shield, playerB);
    }
    if (playerS > 0) {
        drawSprite(307, 308, 0.9, strength, playerS);
    }
    if (playerWound > 0) {
        drawSprite(340, 305, 1, wound, playerWound);
    }
    if (playerPoison > 0) {
        drawSprite(370, 306, 0.8, poison, playerPoison);
    }
    drawHealthBar(enemyHP, enemyMAXHP, 140, 100, 120, 12);
    if (enemyInvisible) {
        fill(235, 220, 255, 160);
        rect(140, 100, 120, 12);
    }
    fill(150, 150, 150);
    rect(140, 75, 120, 25);
    if (enemyB > 0) {
        drawSprite(156, 90, 0.9, shield, enemyB);
    }
    if (enemyS > 0) {
        drawSprite(178, 90, 0.9, strength, enemyS);
    }
    if (enemyWound > 0) {
        drawSprite(210, 87, 1, wound, enemyWound);
    }
    if (enemyPoison > 0) {
        drawSprite(240, 89, 0.8, poison, enemyPoison);
    }
    textSize(18);
    fill(10, 10, 10);
    text(battleText, 10, 338);
    if (turnStage === 1) {
        battleSkillSelection();
    }
    if (turnStage === 2) {
        playerAnimation();
        if (playerAnimationStage > playerAnimationMax) {
            lucky = false;
            playerAnimationStage = 0;
            playerUsedSkill.effect();
            turnStage = 3;
        } else {
            playerAnimationStage++;
        }
    }
};

var battleTransition = function() {
    fill(0, 0, 0);
    if (tStage <= 410) {
        rect(0, 0, 400, tStage);
    } else if (tStage <= 850) {
        rect(0, 400, 400, tStage - 820);
    } else {
        transitioning = false;
    }
    tStage += 6;
};
}

/** Tiles **/
{
    
/** Nature **/
{
    var grass = function() {
        fill(60, 170, 60);
        rect(0, 0, 40, 40);
    };
    
    var path = function() {
        fill(200, 150, 100);
        rect(0, 0, 40, 40);
    };
    
    var tree = function() {
        fill(60, 170, 60);
        rect(0, 0, 40, 40);
        fill(125, 80, 40);
        rect(10, 25, 20, 10);
        fill(50, 120, 55);
        triangle(0, 25, 40, 25, 20, -35);
    };
    
    var water = function() {
        fill(80, 100, 200);
        rect(0, 0, 40, 40);
    };
    
    var waterEdge = function() {
        fill(80, 100, 200);
        rect(0, 10, 40, 30);
        fill(145, 90, 50);
        rect(0, 0, 40, 10);
    };
    
    var bridge = function() {
        fill(165, 115, 70);
        rect(0, 0, 40, 40);
    };
    
    var sand = function() {
        fill(230, 225, 170);
        rect(0, 0, 40, 40);
    };
    
    var snow = function() {
        fill(240, 250, 250);
        rect(0, 0, 40, 40);
    };
    
    var winterTree = function() {
        fill(240, 250, 250);
        rect(0, 0, 40, 40);
        fill(125, 80, 40);
        rect(10, 25, 20, 10);
        fill(50, 120, 80);
        triangle(0, 25, 40, 25, 20, -35);
    };
}

/** Buildings **/
{
    
    var doorBottom = function() {
        fill(150, 80, 50);
        rect(0, 0, 40, 40);
        fill(150, 150, 150);
        ellipse(32, 10, 4, 4);
    };
    
    var doorTop = function() {
        fill(150, 80, 50);
        rect(0, 15, 40, 25);
        fill(210, 210, 210);
        rect(0, 0, 40, 15);
    };
    
    var wall = function() {
        fill(210, 210, 210);
        rect(0, 0, 40, 40);
    };
    
    var wallTop = function() {
        fill(225, 225, 225);
        rect(0, 0, 40, 40);
    };
    
    var roof = function() {
        fill(45, 100, 155);
        rect(0, 0, 40, 40);
    };
    
    var flooring = function() {
        fill(170, 105, 60);
        rect(0, 0, 40, 40);
    };
}

/**Cave**/
{
    var caveTop = function() {
        fill(140, 140, 140);
        rect(0, 0, 40, 40);
    };
    var caveWall = function() {
        fill(110, 110, 110);
        rect(0, 0, 40, 40);
    };
    var caveFloor = function() {
        fill(170, 170, 170);
        rect(0, 0, 40, 40);
    };
    var caveDoor = function() {
        fill(40, 40, 40);
        rect(0, 0, 40, 40);
    };
    var caveDoorTop = function() {
        fill(40, 40, 40);
        rect(0, 15, 40, 25);
        fill(110, 110, 110);
        rect(0, 0, 40, 15);
    };
}

/**Cemetary**/
{
    var darkGrass = function() {
        fill(40, 140, 40);
        rect(0, 0, 40, 40);
    };
    
    var tombstone = function() {
        fill(40, 140, 40);
        rect(0, 0, 40, 40);
        fill(100, 100, 100);
        rect(2, 20, 36, 18);
        ellipse(20, 20, 36, 36);
    };
    
    var cTree = function() {
        fill(40, 140, 40);
        rect(0, 0, 40, 40);
        fill(125, 80, 40);
        rect(10, 25, 20, 10);
        fill(50, 120, 55);
        triangle(0, 25, 40, 25, 20, -35);
    };
}

var blank = function() {
    fill(0, 0, 0);
    rect(0, 0, 40, 40);
};

}

/** Tilesets **/
{
    var basicOutside = [grass, path, wall, doorBottom, doorTop, roof, tree, water, waterEdge, bridge, caveTop, caveWall, caveDoor, caveDoorTop];
    var basicInside = [blank, flooring, wall, wallTop];
    var cave = [blank, caveFloor, caveWall, caveTop, caveDoor, caveDoorTop];
    var graveyard = [darkGrass, tombstone, cTree];
    var desert = [sand, grass, tree, wall, roof, doorBottom, doorTop, caveTop, caveWall, caveDoor, caveDoorTop];
    var snowy = [snow, winterTree, caveWall, caveTop, caveDoor, caveDoorTop];
}

/**Battlebacks**/
{
    /**forest**/
    {
    var battleTree = function(x, y) {
        push();
        translate(x, y);
        fill(90, 50, 30);
        rect(-20, 0, 40, 30);
        fill(20, 100, 50);
        triangle(0, -100, -40, 0, 40, 0);
        pop();
    };
    var forestBack = function() {
        background(30, 120, 50);
        battleTree(55, 60);
        battleTree(345, 60);
        battleTree(200, 80);
        battleTree(280, 110);
        battleTree(350, 170);
        battleTree(120, 110);
        battleTree(50, 170);
    };
    }
    
    /**cemetary**/
    {
    var battleGrave = function(x, y) {
        push();
        translate(x, y);
        scale(1.2);
        fill(90, 90, 90);
        rect(-20, -20, 40, 40);
        arc(0, -20, 40, 40, 180, 360);
        pop();
    };
        
    var cemetaryBack = function() {
        background(70, 120, 80);
        battleGrave(80, 70);
        battleGrave(80, 200);
        battleGrave(320, 70);
        battleGrave(320, 200);
        battleGrave(200, 70);
    };
    }
    
    /**cave**/
    var caveBack = function() {
        background(120, 120, 120);
        fill(90, 90, 90);
        rect(0, 0, 400, 120);
    };
    
    /**Desert**/
    var desertBack = function() {
        background(230, 225, 170);
    };
    
    /**Sheeley**/
    {
        var sheeleyL = 0;
        var sheeleyBack = function() {
            for (var i = 0; i < 200; i ++) {
                fill(
                    100 * sin(i*2 + sheeleyL        ) + 155,
                    100 * sin(i*2 + sheeleyL + 258/3 * 1) + 155,
                    100 * sin(i*2 + sheeleyL + 258/3 * 2) + 155
                );
                rect(0, i*2, 400, 2);
            }
            sheeleyL--;
        };
    }
    
    /**Snow**/
    {
        var snowBack = function() {
            background(220, 230, 235);
        };
    }
}

/** Maps **/
{
    
/**rock**/
{
    var rockObstacle = function() {
        fill(100, 100, 100);
        beginShape();
        vertex(-10, -20);
        vertex(10, -20);
        vertex(20, -10);
        vertex(20, 10);
        vertex(10, 20);
        vertex(-10, 20);
        vertex(-20, 10);
        vertex(-20, -10);
        endShape();
    };
    var drawRockObstacle = function() {
        if (true) {
            drawSprite(0, 0, 1, rockObstacle);
        }
    };
    var smashRock = function() {
        if (eventStage === 0 && (pickaxeGot || hammerGot)) {
            eventStage = 2;
        } else if (eventStage === 0) {
            drawTextBox("A rock is blocking your path");
        } else if (eventStage === 2) {
            //kill
        } else {
            eventEnd();
        }
    };
}

/**Town**/
{
    /** Start Area **/
    {
    var test1 = [
        6, 0, 6, 6, 0, 0, 0, 0, 0, 0,
        0, 6, 0, 0, 0, 0, 0, 0, 0, 0,
        6, 0, 0, 5, 5, 5, 5, 5, 0, 0,
        0, 0, 0, 2, 2, 4, 2, 2, 0, 0,
        6, 0, 0, 2, 2, 3, 2, 2, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 6, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var test1Hitbox = [
        1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 2,
        1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 2,
        1, 1, 0, 0, 1, 1, 3, 1, 1, 0, 0, 2,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 1,
    ];
    var tStoreTest1 = new TransferData(1, false, 1, 0, 0);
    var momHouseT = new TransferData(3, true, 2, 6, 9);
    var topLeftTest1 = new TransferData(4, false, 0, 0, 0);
    var startBottomLeftT = new TransferData(8, false, 2, 0, 0);
    var STtoSW = new TransferData(25, false, 3, 0, 0);
    var test1Tdata = [tStoreTest1, momHouseT, topLeftTest1, startBottomLeftT, STtoSW];
    var test1map = new MapData(test1, test1Hitbox, basicOutside, test1Tdata);
    }
    
    /** Mom's House**/
    {
    var momHouseL = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 3, 3, 3, 3, 3, 3, 0,
        0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
        0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 3, 3, 1, 3, 3, 3, 0,
        0, 0, 2, 2, 2, 1, 2, 2, 2, 0,
        0, 0, 2, 2, 2, 1, 2, 2, 2, 0,
    ];
    var momHouseH = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0,-1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    var momTstart = new TransferData(0, true, 0, 6, 6);
    var momHouseTdata = [momTstart];
    var momTalk = function() {
        if (gameBeat && eventStage < 5) {
            eventStage = 5;
        }
        if (momTalked && eventStage < 3) {
            eventStage = 3;   
        }
        if (eventStage === 0) {
            drawTextBox("Hey honey, we need to talk about something...", "Mom", 50);
        } else if (eventStage === 1) {
            drawTextBox("You're 25 now. It's time for you to get out of my house and get a job or something.", "Mom", 50);
        } else if (eventStage === 2) {
            momTalked = true;
            eventEnd();
        } else if (eventStage === 3) {
            drawTextBox("Please leave. Now.", "Mom", 50);
        } else if (eventStage === 5) {
            drawTextBox("AMOGUS", "???", 45);
        } else if (eventStage === 6) {
            currentEnemy = sussyBakaE;
            enemyText = ["", ""];
            battleBack = sheeleyBack;
            currentScreen = "battle";
            startBattle();
            tStage = 0;
            transitioning = true;
        } else {
            eventEnd();
        }
    };
    var momDraw = function() {
        drawSprite(300, 180, 1, playerDown, color(210, 120, 200));
    };
    var momTalkEvent = new Event(momDraw, momTalk, 0);
    var momHouseE = [momTalkEvent];
    var momsHouse = new MapData(momHouseL, momHouseH, basicInside, momHouseTdata, momHouseE);
    }
    
    /** Store **/
    {
    var storeOutside = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 5, 5, 5, 5, 5, 5, 0,
        0, 0, 0, 2, 2, 4, 2, 2, 2, 0,
        0, 0, 0, 2, 2, 3, 2, 2, 2, 0,
        0, 0, 0, 6, 0, 1, 0, 0, 6, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0, 6, 6,
        0, 0, 1, 0, 0, 0, 0, 6, 0, 0,
        0, 0, 1, 0, 0, 0, 6, 0, 6, 0
    ];
    var storeOutsideHitbox = [
        1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 3,
        2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 3,
        2, 0, 0, 0, 1, 1, 6, 1, 1, 1, 0, 3,
        2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1,
    ];
    var storeOutTest1 = new TransferData(0, false, 3, 0, 0);
    var storeOutOrphan = new TransferData(2, false, 1, 0, 0);
    var storeForestT = new TransferData(5, false, 0, 0, 0);
    var storeExitT = new TransferData(7, false, 2, 0, 0);
    var shopInT = new TransferData(10, true, 2, 6, 9);
    var storeOutsideTdata = [storeOutTest1, storeOutOrphan, storeForestT, storeExitT, shopInT];
    var storeOutsideMap = new MapData(storeOutside, storeOutsideHitbox, basicOutside, storeOutsideTdata);
    }
    
    /** Store Inside **/
    {
    var shopL = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 3, 3, 3, 3, 3, 3, 0,
        0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
        0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 3, 3, 1, 3, 3, 3, 0,
        0, 0, 2, 2, 2, 1, 2, 2, 2, 0,
        0, 0, 2, 2, 2, 1, 2, 2, 2, 0,
    ];
    var shopH = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0,-1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    var shopToutside = new TransferData(1, true, 0, 6, 5);
    var shopTdata = [shopToutside];
    var shopTalk = function() {
        menuPosX = 0;
        menuPosY = 0;
        currentScreen = "shop";
    };
    var clerkDraw = function() {
        drawSprite(300, 180, 1, playerDown, color(120, 120, 120));
    };
    var shopEvent = new Event(clerkDraw, shopTalk, 0);
    var shopE = [shopEvent];
    var shop = new MapData(shopL, shopH, basicInside, shopTdata, shopE);
    }
    
    /** Orphanage Outside **/
    {
    var orphanage = [
        0, 0, 0, 0, 0, 0, 0, 0, 6, 0,
        0, 5, 5, 5, 5, 5, 5, 0, 0, 0,
        0, 2, 2, 2, 4, 2, 2, 0, 6, 6,
        0, 2, 2, 2, 3, 2, 2, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 6, 0,
        1, 1, 1, 1, 1, 0, 0, 0, 0, 6,
        0, 0, 0, 0, 0, 0, 0, 6, 0, 0,
        6, 0, 0, 0, 0, 6, 0, 0, 6, 0,
        0, 6, 0, 0, 6, 0, 0, 6, 0, 6,
        0, 0, 6, 6, 0, 6, 0, 0, 6, 0
    ];
    var orphanOutHit = [
        1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        2, 0, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 0, 0, 1, 1,-1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1,
    ];
    var orphanOutStoreOut = new TransferData(1, false, 3, 0, 0);
    var orphanTopRT = new TransferData(6, false, 0, 0, 0);
    var orphanInsideT = new TransferData(11, true, 0, 7, 8);
    var orphanFoodT = new TransferData(37, false, 2, 0, 0);
    var orphanOutTdata = [orphanOutStoreOut, orphanTopRT, orphanInsideT, orphanFoodT];
    var orphanRockSmashed = false;
    var drawRockOrphan = function() {
        if (!orphanRockSmashed) {
            drawSprite(260, 300, 1, rockObstacle);
        }
    };
    var smashRockOrphan = function() {
        if (eventStage === 0 && (pickaxeGot || hammerGot)) {
            eventStage = 2;
        } else if (eventStage === 0) {
            drawTextBox("A rock is blocking your path");
        } else if (eventStage === 2) {
            orphanOutHit[103] = 0;
            orphanRockSmashed = true;
            eventEnd();
        } else {
            eventEnd();
        }
    };
    var orphanRock = new Event(drawRockOrphan, smashRockOrphan, 0);
    var orphanEvents = [orphanRock];
    var orphanOutside = new MapData(orphanage, orphanOutHit, basicOutside, orphanOutTdata, orphanEvents);
    }
    
    /** Orphanage Inside **/
    {
    var orphanL = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 2, 2, 2, 2, 2, 2, 2, 2, 3,
        3, 2, 2, 2, 2, 2, 2, 2, 2, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 3, 3, 3, 3, 3, 1, 3, 3, 3,
        2, 2, 2, 2, 2, 2, 1, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 1, 2, 2, 2
    ];
    var orphanH = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1,-2, 0, 0, 0,-3, 0,-1, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var orphanToutside = new TransferData(2, true, 0, 5, 5);
    var orphanTdata = [orphanToutside];
    var kid1Talk = function() {
        if (eventStage === 0) {
            drawTextBox("You remind me of my dad.", "Kid", 35);
        } else if (eventStage === 1) {
            drawTextBox("I'm glad he left.", "Kid", 35);
        } else {
            eventEnd();
        }
    };
    var kid1Draw = function() {
        if (!sheeleyRan) {
        drawSprite(300, 180, 0.7, playerDown, color(50, 110, 210));
        }
    };
    var kid2Talk = function() {
        if (eventStage === 0) {
            drawTextBox("Have you seen mommy?", "Kid", 35);
        } else {
            eventEnd();
        }
    };
    var kid2Draw = function() {
        if (!sheeleyRan) {
        drawSprite(60, 180, 0.7, playerDown, color(210, 150, 180));
        }
    };
    var omegaOrphanTalk = false;
    var kid3Talk = function() {
        if (gameBeat && !omegaOrphanTalk && eventStage === 0) {
            eventStage = 2;
        } else if (gameBeat && omegaOrphanTalk && eventStage === 0) {
            eventStage = 4;
        }
        if (eventStage === 0) {
            drawTextBox("...", "Kid", 35);
        } else if (eventStage === 2) {
            drawTextBox("I'd appreciate it if you'd leave me alone.", "Kid", 35);
            omegaOrphanTalk = true;
        } else if (eventStage === 4) {
            drawTextBox("Ok then. You asked for it.", "Omega Orphan", 148);
        } else {
            eventEnd();
        }
    };
    var kid3Draw = function() {
        if (!sheeleyRan) {
        drawSprite(220, 180, 0.7, playerDown, color(50, 220, 60));
        }
    };
    var kid1Event = new Event(kid1Draw, kid1Talk, 0);
    var kid2Event = new Event(kid2Draw, kid2Talk, 0);
    var kid3Event = new Event(kid3Draw, kid3Talk, 0);
    var orphanE = [kid1Event, kid2Event, kid3Event];
    var orphanInside = new MapData(orphanL, orphanH, basicInside, orphanTdata, orphanE);
    }
    
    /**TopLeft Town**/
    {
        var topLeftTownLayout = [
        0, 6, 0, 6, 0, 6, 0, 0, 6, 6,
        6, 0, 6, 0, 6, 0, 6, 0, 0, 0,
        0, 6, 0, 6, 0, 6, 0, 0, 6, 0,
        0, 0, 0, 0, 6, 0, 6, 0, 0, 6,
        6, 0, 6, 0, 0, 0, 0, 0, 6, 0,
        0, 6, 0, 0, 0, 6, 0, 0, 0, 0,
        0, 0, 0, 6, 6, 0, 0, 0, 0, 0,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 6, 0, 6, 0, 0, 0, 0, 0,
        0, 6, 0, 6, 0, 0, 0, 0, 0, 0
    ];
    var topLeftTownHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1,
        1, 1, 0, 0, 1, 1, 1, 1,-2, 1, 1, 1,
        1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1,
        1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 3,
        1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3,
        1, 0, 0, 0, 1, 1,-1, 0, 0, 0, 0, 3,
        1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 3,
        1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 3,
        1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3,
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1,
    ];
    var tstarttopleft = new TransferData(0, false, 2, 0, 0);
    var topLTownShadyT = new TransferData(5, false, 1, 0, 0);
    var topLsnowT = new TransferData(46, false, 0, 0, 0);
    var townTopLeftTdata = [tstarttopleft, topLTownShadyT, topLsnowT];
    var golferDone = false;
    var golferTalkE = function() {
        if (golferDone && eventStage === 0) {
            eventStage = 7;
        } else if (golfGot && eventStage === 0) {
            eventStage = 3;
        }
        if (eventStage === 0) {
            drawTextBox("I was playing golf earlier and accidentaly got my ball stuck in a tree by the cave entrance.");
        } else if (eventStage === 1) {
            drawTextBox("Let me know if you happen to find it.");
        } else if (eventStage === 3) {
            drawTextBox("Hey, you found my golf ball!");
        } else if (eventStage === 4) {
            drawTextBox("You can keep it though. I've come to my senses and realized how awful of a sport golf is.");
        } else if (eventStage === 5) {
            golferDone = true;
            eventEnd();
        } else if (eventStage === 7) {
            drawTextBox("I'd honestly appreciate it if you kept that thing away from me.");
        } else {
            eventEnd();
        }
    };
    var drawGolfer = function() {
        drawSprite(220, 260, 1, playerDown, color(75, 98, 130));
    };
    var topLeftRockSmashed = false;
    var drawRockTopLeft = function() {
        if (!topLeftRockSmashed) {
            drawSprite(300, 100, 1, rockObstacle);
        }
    };
    var smashRockTopLeft = function() {
        if (eventStage === 0 && (pickaxeGot || hammerGot)) {
            eventStage = 2;
        } else if (eventStage === 0) {
            drawTextBox("A rock is blocking your path");
        } else if (eventStage === 2) {
            topLeftTownHitbox[44] = 0;
            topLeftRockSmashed = true;
            eventEnd();
        } else {
            eventEnd();
        }
    };
    var topLeftRock = new Event(drawRockTopLeft, smashRockTopLeft, 0);
    var golfer = new Event(drawGolfer, golferTalkE, 0);
    var topLeftTownEventData = [golfer, topLeftRock];
    var topLeftTown = new MapData(topLeftTownLayout, topLeftTownHitbox, basicOutside, townTopLeftTdata, topLeftTownEventData);
    }
    
    /**Shady Woods Entrance**/
    {
    var shadyEntranceLayout = [
        6, 0, 0, 6, 0, 0, 0, 0, 6, 0,
        0, 6, 6, 0, 6, 0, 6, 6, 0, 0,
        0, 0, 0, 6, 0, 0, 0, 0, 6, 6,
        6, 6, 0, 0, 0, 0, 6, 6, 0, 0,
        0, 0, 6, 6, 0, 6, 0, 0, 6, 0,
        0, 0, 0, 0, 0, 0, 0, 6, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var shadyEntranceHitbox = [
        1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 4,
        2, 0, 0, 1, 1,-1, 1, 0, 1, 1, 0, 4,
        2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
    ];
    var shadyTopLeftTownT = new TransferData(4, false, 3, 0, 0);
    var shadyStoreT = new TransferData(1, false, 2, 0, 0);
    var shadyTopRightT = new TransferData(6, false, 1, 0, 0);
    var shadyToSheeley = new TransferData(36, false, 0, 0, 0);
    var shadyEntranceTdata = [shadyTopLeftTownT,shadyStoreT,shadyTopRightT,shadyToSheeley];
    var shoesGiven = false;
    var shadySheeleyTalkE = function() {
        if (shadyRandomise) {
            shadyRandom = floor(random(0, 3));
            shadyRandomise = false;
        }
        if (eventStage === 0) {
            var text;
            if (shadyRandom === 0) {
                text = "Social Dilemma...";
            } else if (shadyRandom === 1) {
                text = "negative b plus or minus the square root of b squared minus four a c over two a...";
            } else if (shadyRandom === 2) {
                text = "50 percent?";
            }
            if (shadyCount === 4) {
                text ="Here, take these shoes. I'm going all natural and don't need them.";
            }
            drawTextBox(text, "Shady Guy", 110);
        } else if (eventStage === 1 && shadyCount === 4) {
            drawTextBox("You gained a pair of running shoes!");
            if (!shoesGiven) {
                gainArtifact(18);
                shoesGiven = true;
            }
        } else {
            shadyRandomise = true;
            shadyCount++;
            eventEnd();
        }
    };
    var drawShadySheeley = function() {
        if (!sheeleyRan && !sheeleyLeft) {
            drawSprite(180, 180, 1, playerDown, color(48, 48, 48));
        }
    };
    var shadySheeley = new Event(drawShadySheeley, shadySheeleyTalkE, 0);
    var shadyEntranceEventData = [shadySheeley];
    var shadyForestEntrance = new MapData(shadyEntranceLayout, shadyEntranceHitbox, basicOutside, shadyEntranceTdata, shadyEntranceEventData);
    }
    
    /**TopRight Town**/
    {
    var topRightTownLayout = [
        6, 0, 0, 6, 0, 0, 0, 0, 0, 6,
        0, 6, 0, 0, 6, 0, 6, 6, 0, 0,
        6, 0, 6, 6, 0, 6, 0, 0, 6, 0,
        0, 0, 0, 0, 6, 0, 6, 0, 0, 6,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 6, 0, 6, 0,
        0, 6, 0, 0, 0, 0, 0, 6, 0, 6,
        0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 6, 0
    ];
    var topRightTownHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        3, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1,
        3, 0, 0, 0, 0,-1, 0, 0,-2, 0, 0, 4,
        3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 4,
        3, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        3, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
        3, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,
    ];
    var topROrphanT = new TransferData(2, false, 2, 0, 0);
    var topRTownShadyT = new TransferData(5, false, 3, 0, 0);
    var topRTownFT = new TransferData(42, false, 1, 0, 0);
    var townTopRightTdata = [topROrphanT, topRTownShadyT, topRTownFT];
    var drawSubMan = function() {
        drawSprite(180, 180, 1, playerDown, color(227, 115, 32));
    };
    var tricirgot = false;
    var subManTalk = function() {
        if (eventStage === 0) {
            if (subManTalkStage === 1) {
                eventStage = 13;
            } else if (subManTalkStage === 2) {
                eventStage = 6;
            } else if (subManTalkStage === 3) {
                eventStage = 11;
            } else if (subManTalkStage === 4) {
                eventStage = 15;
            }
        }
        if (eventStage === 0) {
            drawTextBox("Are you subscribed to Cory Sheeley on Youtube?");
            menuPosX = 0;
        } else if (eventStage === 1) {
            drawTextBox("Are you subscribed to Cory Sheeley on Youtube?");
            question();
        } else if (eventStage === 2) {
            if (menuPosX === 1) {
                eventStage = 3;
                subManTalkStage = 1;
            } else {
                eventStage = 5;
                subManTalkStage = 2;
            }
        } else if (eventStage === 3) {
            drawTextBox("Wow, that's a shame.");
        } else if (eventStage === 5) {
            drawTextBox("Awesome! I'm sure you know a lot about math, and you probably can recite the unit circle!");
        } else if (eventStage === 6) {
            if (learnedSkills[2] === 0) {
                eventStage = 7;
            } else {
                eventStage = 9;
            }
        } else if (eventStage === 7) {
            drawTextBox("Once you get a bit stronger, I'll give you something pretty awesome!");
        } else if (eventStage === 9) {
            drawTextBox("You're looking quite skilled! Take this cool trinket. Only us loyal subscribers understand what it means.");
            subManTalkStage = 3;
        } else if (eventStage === 10) {
            drawTextBox("You obtained a Triangle = Cirlce!");
            if (!tricirgot) {
                tricirgot = true;
                gainArtifact(21);
            }
        } else if (eventStage === 11) {
            drawTextBox("Show those monsters the power of the unit circle!");
        } else if (eventStage === 13) {
            drawTextBox("I only talk to people who are subscribed to Cory Sheeley.");
            subManTalkStage = 4;
        } else {
            eventEnd();
        }
    };
    var topRightRockSmashed = false;
    var drawRockTopRight = function() {
        if (!topRightRockSmashed) {
            drawSprite(300, 180, 1, rockObstacle);
        }
    };
    var smashRockTopRight = function() {
        if (eventStage === 0 && (pickaxeGot || hammerGot)) {
            eventStage = 2;
        } else if (eventStage === 0) {
            drawTextBox("A rock is blocking your path");
        } else if (eventStage === 2) {
            topRightTownHitbox[68] = 0;
            topRightRockSmashed = true;
            eventEnd();
        } else {
            eventEnd();
        }
    };
    var topRightRock = new Event(drawRockTopRight, smashRockTopRight, 0);
    var subMan = new Event(drawSubMan, subManTalk, 0);
    var topRightEvents = [subMan, topRightRock];
    var topRightTown = new MapData(topRightTownLayout, topRightTownHitbox, basicOutside, townTopRightTdata, topRightEvents);
    }
    
    /**Town Exit**/
    {
    var townExitLayout = [
        0, 0, 1, 0, 0, 0, 0, 0, 6, 6,
        0, 0, 1, 0, 0, 0, 6, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 6, 6, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 6,
        0, 0, 0, 1, 1, 0, 0, 0, 6, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        8, 8, 0, 0, 1, 0, 0, 0, 0, 6,
        7, 7, 8, 8, 9, 8, 8, 8, 8, 8,
        7, 7, 7, 7, 9, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 9, 7, 7, 7, 7, 7
    ];
    var townExitHitbox = [
        1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
        3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 0, 0, 0, -1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1,
    ];
    var townExitStoreT = new TransferData(1, false, 0, 0, 0);
    var townExitBottomLeft = new TransferData(8, false, 3, 0, 0);
    var townExitCrossroad = new TransferData(9, false, 2, 0, 0);
    var townExitTdata = [townExitStoreT, townExitBottomLeft, townExitCrossroad];
    var drawWarningMan = function() {
        drawSprite(220, 270, 1, playerDown, color(50, 100, 210));
    };
    var warningManTalk = function() {
        if (eventStage === 0) {
            drawTextBox("I'd think twice before crossing that bridge.");
        } else if (eventStage === 1) {
            drawTextBox("Down there monsters could attack at any moment. I lost my dear old brother last week to one of them.");
        } else {
            eventEnd();
        }
    };
    var warningMan = new Event(drawWarningMan, warningManTalk, 1);
    var townExitEventData = [warningMan];
    var townExit = new MapData(townExitLayout, townExitHitbox, basicOutside, townExitTdata, townExitEventData);
    }
    
    /**TownBottomLeft**/
    {
    var bottomLeftLayout = [
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 6, 0, 0, 0, 0, 0, 0, 0, 0,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        8, 8, 6, 0, 0, 0, 0, 0, 6, 0,
        7, 7, 8, 8, 6, 0, 0, 6, 0, 0,
        7, 7, 7, 7, 8, 8, 8, 8, 0, 0,
        7, 7, 7, 7, 7, 7, 7, 7, 8, 8,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7
    ];
    var bottomLeftHitbox = [
        1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 3,
        1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 3,
        1, 1, 1, 1, 1, 1,-1, 0, 1, 0, 0, 3,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    var bottomLeftStartT = new TransferData(0, false, 0, 0, 0);
    var bottomLeftExitT = new TransferData(7, false, 1, 0, 0);
    var bottomLeftTdata = [bottomLeftStartT, bottomLeftExitT];
    var drawDruggy = function() {
        drawSprite(220, 190, 1, playerRight, color(123, 176, 141));
    };
    var reactorTraded = false;
    var druggyTalk = function() {
        if (gotDaStuff && eventStage === 0) {
            eventEnd();
        } else if (eventStage === 0) {
            drawTextBox("I need it...\nI NEED IT!");
        } else if (eventStage === 1) {
            for (var i = 0; i < 21; i++) {
                if (playerArtifacts[i] === 22) {
                    eventStage = 2;
                    break;
                }
            }
            if (artifactEquipped(22)) {
                eventStage = 2;
            }
            if (eventStage === 1) {
                eventEnd();   
            }
        } else if (eventStage === 2) {
            drawTextBox("You have it? Give! Give. Give it!");
            menuPosX = 0;
        } else if (eventStage === 3) {
            question();
            drawTextBox("Give him your scorpion venom?");
        } else if (eventStage === 4) {
            if (menuPosX === 1) {
                eventStage = 5;
            } else {
                eventStage = 7;
            }
        } else if (eventStage === 5) {
            drawTextBox("Please No! Why? Ahh! I need it. Need? It!");
        } else if (eventStage === 7) {
            drawTextBox("You gave the man your scorpion venom.");
            if (!reactorTraded) {
                if (artifactEquipped(22)) {
                    for (var i = 0; i < 3; i++) {
                        if (equippedArtifacts[i] === 22) {
                            equippedArtifacts[i] = 0;
                        }
                    }
                } else {
                    for (var i = 0; i < 21; i++) {
                        if (playerArtifacts[i] === 22) {
                            playerArtifacts[i] = 0;
                            break;
                        }
                    }
                }
                reactorTraded = true;
                gainArtifact(5);
            }
        } else if (eventStage === 8) {
            drawTextBox("Thank. Thanks you. Oh uh...\nTake this thingy I found. It look cool I think.");
        } else if (eventStage === 9) {
            drawTextBox("You obtained a reactor!");
            gotDaStuff = true;
        } else {
            eventEnd();
        }
    };
    var druggy = new Event(drawDruggy, druggyTalk, 1);
    var townBottomLeftEvents = [druggy];
    var townBottomLeft = new MapData(bottomLeftLayout, bottomLeftHitbox, basicOutside, bottomLeftTdata, townBottomLeftEvents);
    }
    
    /**Snow Entrance**/
    {
        var snowEL = [
            6, 0, 0, 0, 0, 0, 0, 6, 0, 6,
            0, 6, 0, 0, 0, 0, 0, 0, 6, 0,
            0, 0, 0, 5, 5, 5, 5, 5, 0, 0,
            6, 0, 0, 2, 2, 4, 2, 2, 6, 6,
            0, 0, 0, 2, 2, 3, 2, 2, 0, 0,
            6, 0, 0, 0, 0, 0, 0, 0, 6, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
            6, 6, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 6, 0, 6, 0, 0, 0, 0, 6,
            0, 6, 0, 6, 0, 6, 6, 0, 6, 0
        ];
        
        var snowEH = [
            1, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 1, 1, 3, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1
        ];
        
        var snowEtownT = new TransferData(4, false, 2, 0, 0);
        var snowEhouseT = new TransferData(47, true, 0, 6, 9);
        var snowEsnowT = new TransferData(48, false, 0, 0, 0);
        var snowETData = [snowEtownT, snowEhouseT, snowEsnowT];
        var snowEntrance = new MapData(snowEL, snowEH, basicOutside, snowETData);
    }
    
    /**Wise House**/
    {
        var wiseL = [
            0, 0, 3, 3, 3, 3, 3, 3, 3, 0,
            0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
            0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
            0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
            0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
            0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
            0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
            0, 0, 3, 3, 3, 1, 3, 3, 3, 0,
            0, 0, 2, 2, 2, 1, 2, 2, 2, 0,
            0, 0, 2, 2, 2, 1, 2, 2, 2, 0
        ];
        
        var wiseH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0,-1, 1, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
            1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
            1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
            1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        
        var wiseT = new TransferData(46, true, 0, 6, 6);
        var wiseTData = [wiseT];
        var sunTzu = false;
        var sunTzuRand = 0;
        var drawWiseMan = function() {
            drawSprite(300, 140, 1, playerDown, color(126, 117, 143));
        };
        var wiseManTalk = function() {
            if (eventStage === 0 && sunTzu) {
                eventStage = 13;
                sunTzuRand = floor(random(0, 4));
            } else if (eventStage === 0 && meditateQuest >= 0) {
                eventStage = 7;
            } else if (eventStage === 0) {
                question();
                drawTextBox("Hello there. I'm assuming you've come to learn some of my secret techniques?", "Old Man", 82);
            } else if (eventStage === 1) {
                if (menuPosX === 0) {
                    eventStage = 3;
                } else {
                    drawTextBox("What a shame.", "Old Man", 80);
                }
            } else if (eventStage === 3) {
                drawTextBox("Good. But first, you must learn mindfulness. No brain, no gain.", "Old Man", 82);
            } else if (eventStage === 4) {
                drawTextBox("You learned meditate!");
                if (meditateQuest === -1) {
                    if (activeSkills[4] === 0) {
                        activeSkills[4] = skillTreeSkills[30];
                    } else if (activeSkills[5] === 0) {
                        activeSkills[5] = skillTreeSkills[30];
                    } else if (activeSkills[6] === 0) {
                        activeSkills[6] = skillTreeSkills[30];
                    } else {
                        for (var i = 0; i < learnedSkills.length; i++) {
                            if (learnedSkills[i] === 0) {
                                learnedSkills[i] = skillTreeSkills[30];
                                break;
                            }
                        }
                    }
                }
                meditateQuest = 0;
            } else if (eventStage === 5) {
                drawTextBox("Now for your training. Once you gain 100 energy using meditate, I will teach you everything I know.", "Old Man", 82);
            } else if (eventStage === 7) {
                if (meditateQuest < 100) {
                    drawTextBox("Looks like you've gained " + meditateQuest + " energy so far. Get to work kid.", "Old Man", 82);
                } else {
                    eventStage = 9;
                }
            } else if (eventStage === 9) {
                drawTextBox("You've gained " + meditateQuest + " energy! You've completed your training kid. You're ready to learn the art of war.", "Old Man", 82);
            } else if (eventStage === 10) {
                drawTextBox("You unlocked a new skill tree!");
                secondSkillTreeScreenUnlocked = true;
                sunTzu = true;
            } else if (eventStage === 11) {
                drawTextBox("Remember kid, if you know the enemy and you know yourself, you need not fear the results of a hundred battles.", "Sun Tzu", 82);
            } else if (eventStage === 13) {
                if (sunTzuRand === 0) {
                    drawTextBox("Appear weak when you are strong, and strong when you are weak.", "Sun Tzu", 82);
                } else if (sunTzuRand === 1) {
                    drawTextBox("Stay strapped or get clapped.", "Sun Tzu", 82);
                } else if (sunTzuRand === 2) {
                    drawTextBox("To know your Enemy, you must become your Enemy.", "Sun Tzu", 82);
                } else {
                    drawTextBox("It's only a war crime if you lose.", "Sun Tzu", 82);
                }
            } else {
                eventEnd();
            }
        };
        var wiseManE = new Event(drawWiseMan, wiseManTalk, 0);
        var wiseE = [wiseManE];
        var wiseHouse = new MapData(wiseL, wiseH, basicInside, wiseTData, wiseE);
    }
}
    
/**Forest**/
{
    /**Crossroads**/
    {
    var crossroadsLayout = [
        7, 7, 7, 7, 9, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 9, 7, 7, 7, 7, 7,
        0, 6, 0, 7, 9, 7, 7, 7, 7, 7,
        0, 0, 0, 0, 1, 0, 0, 7, 7, 7,
        0, 0, 0, 0, 1, 0, 0, 6, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        6, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 6, 0, 0, 0, 1, 0, 6, 0,
        0, 6, 0, 6, 0, 0, 1, 0, 0, 6
    ];
    var crossroadsHitbox = [
        1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        5, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1,
        5, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 3,
        1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 1, 1,
    ];
    var crossroadExitT = new TransferData(7, false, 0, 0, 0);
    var crossroadEastT = new TransferData(12, false, 1, 0, 0);
    var crossroadSouthT = new TransferData(13, false, 2, 0, 0);
    var crWestT = new TransferData(14, false, 3, 0, 0);
    var crossroadTdata = [crossroadExitT, crossroadEastT, crossroadSouthT, crWestT];
    var crossroads = new MapData(crossroadsLayout, crossroadsHitbox, basicOutside, crossroadTdata);
    }
    
    /**East Path**/
    {
        var eastPathLayout = [
        7, 7, 7, 7, 7, 9, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 9, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 9, 7, 7, 7, 7,
        7, 7, 7, 0, 0, 1, 6, 0, 7, 7,
        0, 0, 6, 0, 0, 1, 0, 6, 0, 6,
        0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 6,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 6, 0, 0, 0, 0, 0, 0, 6, 0,
        6, 0, 6, 0, 0, 0, 0, 6, 0, 6
    ];
    var eastPathHitbox = [
        1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
        2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1,
    ];
    var eastPCrossT = new TransferData(9, false, 3, 0, 0);
    var eastPCemT = new TransferData(15, false, 2, 0, 0);
    var eastPFood = new TransferData(37, false, 0, 0, 0);
    var eastPTdata = [eastPCrossT, eastPCemT, eastPFood];
    var eastPath = new MapData(eastPathLayout, eastPathHitbox, basicOutside, eastPTdata);
    }
    
    /**SouthPath**/
    {
        var southPathLayout = [
        6, 0, 0, 6, 0, 0, 1, 0, 0, 6,
        0, 0, 6, 0, 0, 0, 1, 0, 0, 0,
        6, 6, 0, 0, 0, 0, 0, 0, 0, 6,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 6, 6, 0, 0, 0, 0,
        0, 0, 0, 6, 0, 0, 6, 6, 0, 0,
        6, 0, 6, 0, 6, 0, 0, 0, 6, 6,
        0, 6, 0, 6, 0, 6, 0, 6, 0, 0
    ];
    var southPathHitbox = [
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1,
        1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 3,
        1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var southPathExitT = new TransferData(9, false, 0, 0, 0);
    var southPCemT = new TransferData(15, false, 1, 0, 0);
    var southPToDesertP = new TransferData(27, false, 3, 0, 0);
    var southPathTdata = [southPathExitT, southPCemT, southPToDesertP];
    var southPath = new MapData(southPathLayout, southPathHitbox, basicOutside, southPathTdata);
    }
    
    /**West Path**/
    {
    var westPathLayout = [
       10,10,10,10,10,10, 7, 7, 7, 7,
       10,10,10,10,10,10, 0, 0, 7, 7,
       11,11,11,13,11,11, 0, 0, 0, 0,
       11,11,11,12,11,11, 0, 0, 0, 0,
        0, 6, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        6, 6, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 6, 0, 0, 0, 0, 0, 0, 6,
        0, 6, 0, 6, 6, 0, 0, 6, 0, 0,
        6, 0, 6, 0, 0, 6, 6, 0, 6, 0
    ];
    var westPathHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2,
        1, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 2,
        1, 1, 1,-1, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    var westPExitT = new TransferData(9, false, 1, 0, 0);
    var westPcaveT = new TransferData(18, true, 0, 7, 9);
    var westPathTdata = [westPExitT, westPcaveT];
    if (golfBallLocation === 0) {
        westPathHitbox[74] = -2;
    } else if (golfBallLocation === 1) {
        westPathHitbox[100] = -2;
    } else if (golfBallLocation === 2) {
        westPathHitbox[106] = -2;
    } else {
        westPathHitbox[115] = -2;
    }
    var drawMiner = function() {
        drawSprite(100, 180, 1, playerDown, color(93, 122, 158));
    };
    var blankEvent = function() {
        
    };
    var findGolfBall = function() {
        if (golfGot) {
            eventStage = 3;
        }
        if (eventStage === 0) {
            drawTextBox("There's something weird sticking out of one of the tree branches.");
        } else if (eventStage === 1) {
            drawTextBox("You found a Strange Sphere!");
        } else if (eventStage === 2) {
            golfGot = true;
            gainArtifact(28);
        } else {
            eventEnd();
        }
    };
    var pickaxeGot = false;
    var minerTalk = function() {
        if (eventStage === 0 && pickaxeGot) {
            eventStage = 8;   
        }
        if (eventStage === 0) {
            drawTextBox("It's dangerous to go into those caves unprepared. That's why I'm selling a pickaxe for 1000 gold.", "Miner", 55);
        } else if (eventStage === 1) {
            drawTextBox("It's dangerous to go into those caves unprepared. That's why I'm selling a pickaxe for 1000 gold.", "Miner", 55);
            if (gold >= 1000) {
                eventStage = 4;
            } else {
                eventStage = 2;
            }
        } else if (eventStage === 2) {
            drawTextBox("Sorry, it looks like you can't afford one.", "Miner", 55);
        } else if (eventStage === 4) {
            drawTextBox("Want to buy a pickaxe?", "Miner", 55);
            menuPosX = 0;
        } else if (eventStage === 5) {
            drawTextBox("Want to buy a pickaxe?", "Miner", 55);
            question();
        } else if (eventStage === 6) {
            if (menuPosX === 0) {
                eventStage = 7;
            } else {
                eventStage = 3;
            }
        } else if (eventStage === 7) {
            drawTextBox("You obtained a pickaxe!");
            if (!pickaxeGot) {
                pickaxeGot = true;
                gainArtifact(12);
                gold -= 1000;
            }
        } else if (eventStage === 8) {
            drawTextBox("Happy mining!", "Miner", 55);
        } else {
            eventEnd();
        }
    };
    var minerEvent = new Event(drawMiner, minerTalk, 0);
    var golfEvent = new Event(blankEvent, findGolfBall, 1);
    var westPathEvent = [minerEvent, golfEvent];
    var westPath = new MapData(westPathLayout, westPathHitbox, basicOutside, westPathTdata, westPathEvent);
    }
    
    /**Desert Path**/
    {
    var desertPathLayout = [
        0, 6, 0, 6, 0, 0, 6, 0, 0, 0,
        0, 0, 6, 0, 6, 6, 0, 6, 6, 0,
        6, 6, 0, 0, 0, 0, 0, 0, 0, 6,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        6, 0, 6, 0, 6, 0, 0, 0, 0, 0,
        0, 6, 0, 0, 0, 6, 0, 6, 0, 0,
        6, 0, 0, 0, 0, 0, 6, 0, 0, 0,
        0, 0, 6, 0, 0, 6, 0, 0, 0, 0,
        0, 6, 0, 0, 0, 0, 0, 6, 0, 6,
        6, 0, 0, 6, 0, 0, 6, 0, 6, 0
    ];
    var desertPathHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 1,-1, 1, 1, 0, 1, 0, 0, 2,
        1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 2,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 2,
        1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1
    ];
    var desetPToSouthP = new TransferData(13, false, 1, 0, 0);
    var desetPToDesertE = new TransferData(28, false, 2, 0, 0);
    var desertPathTdata = [desetPToSouthP, desetPToDesertE];
    var drawBug = function() {
        if (!buggyBeat) {
            drawSprite(140, 195, 0.7, caterpillar);
        }
    };
    var bugTalk = function() {
        desertPathHitbox[64] = 0;
        shadyEntranceHitbox[65] = 0;
        eventEnd();
        battleBack = forestBack;
        currentEnemy = buggyE;
        currentScreen = "battle";
        startBattle();
        tStage = 0;
        transitioning = true;
    };
    var bugE = new Event(drawBug, bugTalk, 1);
    var desertPathE = [bugE];
    var desertPath = new MapData(desertPathLayout, desertPathHitbox, basicOutside, desertPathTdata, desertPathE);
    }
}
    
/**Cemetary**/
{
    /**Cemetary Entrance**/
    {
    var cemetaryELayout = [
        2, 0, 2, 0, 0, 0, 0, 2, 0, 0,
        0, 2, 0, 0, 0, 0, 0, 0, 2, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 0, 2, 0, 0, 2, 0, 2, 2, 0,
        0, 2, 0, 2, 2, 0, 2, 0, 0, 0
    ];
    var cemetaryEHitbox = [
        1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        3, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 4,
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        3, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 4,
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 1,-1, 0, 1, 0, 1, 1, 1, 1,
        1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    var cemEEastT = new TransferData(12, false, 0, 0, 0);
    var cemESouthT = new TransferData(13, false, 3, 0, 0);
    var cemEcemMT = new TransferData(16, false, 1, 0, 0);
    var cemETdata = [cemEEastT, cemESouthT, cemEcemMT];
    var drawGraveMan = function() {
        drawSprite(140, 310, 1, playerDown, color(150, 120, 100));
    };
    var magnifyGiven = false;
    var graveManTalk = function() {
        if (graveDiggerTalk === 1 && eventStage === 0) {
            eventStage = 3;
        } else if (graveDiggerTalk === 2 && eventStage === 0) {
            eventStage = 5;
        }
        if (eventStage === 0) {
            drawTextBox("The amount of people that have died recently is completely horrifying.");
        } else if (eventStage === 1) {
            drawTextBox("Ever since the great beast known as \"Sheeley\" invaded, our poor town hasn't been the same.");
            graveDiggerTalk = 1;
        } else if (eventStage === 3) {
            drawTextBox("Let me guess, You're on the hunt for Sheeley as well. Take this. It might help you find him.");
            graveDiggerTalk = 2;
        } else if (eventStage === 4) {
            drawTextBox("You obtained a magnifying glass!");
            if (!magnifyGiven) {
                gainArtifact(11);
                magnifyGiven = true;
            }
        } else if (eventStage === 5) {
            drawTextBox("Good luck mate.");
        } else {
            eventEnd();
        }
    };
    var graveMan = new Event(drawGraveMan, graveManTalk, 1);
    var cemEEventData = [graveMan];
    var cemetaryE = new MapData(cemetaryELayout, cemetaryEHitbox, graveyard, cemETdata, cemEEventData);
    }
    /**Cemetary Middle**/
    {
    var cemetaryMLayout = [
        0, 2, 2, 0, 0, 0, 0, 2, 0, 2,
        2, 0, 1, 2, 0, 0, 2, 0, 2, 0,
        0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 2,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 2, 2, 0, 1, 2, 0,
        2, 0, 0, 2, 0, 0, 2, 0, 0, 2,
        0, 2, 0, 0, 0, 2, 0, 2, 0, 0,
        2, 0, 2, 0, 2, 0, 2, 0, 2, 0
    ];
    var cemetaryMHitbox = [
        1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1,
        1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,
        2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3,
        2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 3,
        1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    var cemMcemET = new TransferData(15, false, 3, 0, 0);
    var cemMcemBT = new TransferData(17, false, 1, 0, 0);
    var cemBridgeT = new TransferData(39, false, 0, 0, 0);
    var cemMTdata = [cemMcemET, cemMcemBT, cemBridgeT];
    var cemetaryM = new MapData(cemetaryMLayout, cemetaryMHitbox, graveyard, cemMTdata);   
    }
    /**Cemetary Back**/
    {
    var cemetaryBLayout = [
        0, 2, 0, 2, 2, 0, 2, 0, 0, 2,
        2, 0, 2, 0, 0, 0, 0, 0, 2, 0,
        0, 2, 0, 2, 0, 2, 0, 2, 0, 0,
        2, 0, 0, 0, 2, 0, 2, 0, 0, 2,
        0, 0, 0, 0, 0, 0, 0, 0, 2, 0,
        0, 0, 0, 0, 0, 0, 2, 0, 0, 2,
        0, 0, 0, 2, 0, 2, 0, 2, 2, 0,
        2, 0, 2, 0, 2, 0, 0, 0, 0, 2,
        0, 2, 0, 0, 0, 0, 2, 2, 0, 0,
        0, 0, 2, 2, 0, 2, 0, 0, 2, 0
    ];
    var cemetaryBHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 0, 0, 0, 1,-1, 1, 1, 0, 1, 1,
        2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,
        2, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var cemBcemMT = new TransferData(16, false, 3, 0, 0);
    var cemBTdata = [cemBcemMT];
    var drawCultist = function() {
        if (!cultistBeat) {
            drawSprite(220, 124, 0.75, cultist);
        }
    };
    var cultistTalk = function() {
        if (eventStage === 0) {
            drawTextBox("Do you like shoes?", "Cultist", 60);
            menuPosX = 0;
        } else if (eventStage === 1) {
            drawTextBox("Do you like shoes?", "Cultist", 60);
            question();
        } else if (eventStage === 2) {
            if (menuPosX === 0) {
                eventStage = 3;
            } else {
                eventStage = 5;
            }
        } else if (eventStage === 3) {
            drawTextBox("What has this world come to?", "Cultist", 60);
        } else if (eventStage === 4) {
            eventStage = 6;
        } else if (eventStage === 5) {
            drawTextBox("Liar! I can sense the unnaturalness in your feet.", "Cultist", 60);
        } else if (eventStage === 6) {
            drawTextBox("As an enlightened individual, I'm afraid I have no option but to dispose of failures like you. Prepare to die!", "Cultist", 60);
        } else {
            cemetaryBHitbox[54] = 0;
            eventEnd();
            battleBack = cemetaryBack;
            currentEnemy = cultistE;
            currentScreen = "battle";
            startBattle();
            tStage = 0;
            transitioning = true;
        }
    };
    var cultistEvent = new Event(drawCultist, cultistTalk, 0);
    var cemBEdata = [cultistEvent];
    var cemetaryB = new MapData(cemetaryBLayout, cemetaryBHitbox, graveyard, cemBTdata, cemBEdata);
    }
}

/**Cave**/
{
    /**Cave entrance**/
    {
    var caveELayout = [
        0, 0, 3, 1, 3, 3, 3, 0, 0, 0,
        0, 3, 3, 1, 2, 2, 3, 3, 0, 0,
        3, 3, 2, 1, 2, 2, 3, 3, 3, 0,
        3, 3, 2, 1, 1, 1, 2, 2, 3, 0,
        3, 3, 1, 1, 1, 1, 2, 2, 3, 3,
        2, 3, 3, 3, 1, 1, 1, 1, 3, 3,
        2, 2, 2, 3, 3, 1, 1, 1, 3, 2,
        0, 2, 2, 2, 3, 3, 1, 3, 3, 2,
        0, 0, 0, 2, 2, 2, 1, 2, 2, 0,
        0, 0, 0, 0, 2, 2, 1, 2, 2, 0
    ];
    var caveEHitbox = [
        1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
        1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var caveEWestT = new TransferData(14, true, 2, 4, 5);
    var caveEJuncT = new TransferData(19, true, 0, 4, 9);
    var caveETdata = [caveEWestT, caveEJuncT];
    var caveE = new MapData(caveELayout, caveEHitbox, cave, caveETdata);
    }
    /**RightLeft Junction**/
    {
        var caveRLJLayout = [
	0, 0, 3, 3, 3, 3, 0, 0, 0, 0,
	3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	2, 2, 2, 2, 3, 3, 3, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	1, 1, 1, 1, 2, 2, 2, 1, 1, 1,
	3, 3, 1, 1, 1, 1, 1, 1, 1, 3,
	2, 3, 3, 1, 1, 1, 3, 3, 3, 3,
	2, 3, 3, 1, 3, 3, 3, 3, 2, 2,
	0, 2, 2, 1, 2, 2, 2, 2, 2, 2,
	0, 2, 2, 1, 2, 2, 2, 2, 0, 0
    ];
    var caveRLJHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1,
        4, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 3,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1,
        1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var caveRLJcaveE = new TransferData(18, true, 2, 4, 1);
    var caveRLJtoR = new TransferData(20, false, 1, 0, 0);
    var caveRLJtoL = new TransferData(21, false, 3, 0, 0);
    var caveRLJTdata = [caveRLJcaveE, caveRLJtoR, caveRLJtoL];
    var caveRLJ = new MapData(caveRLJLayout, caveRLJHitbox, cave, caveRLJTdata);
    }
    /**Right Dead End**/
    {
    var caveRLayout = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	3, 3, 3, 3, 0, 0, 0, 0, 0, 0,
	2, 2, 2, 3, 3, 0, 0, 0, 0, 0,
	2, 2, 2, 2, 3, 3, 0, 0, 0, 0,
	1, 1, 1, 2, 2, 3, 3, 0, 0, 0,
	3, 1, 1, 1, 2, 3, 3, 0, 0, 0,
	3, 3, 3, 1, 1, 3, 2, 0, 0, 0,
	2, 2, 3, 3, 3, 3, 2, 0, 0, 0,
	2, 2, 2, 2, 2, 2, 0, 0, 0, 0,
	0, 0, 2, 2, 2, 2, 0, 0, 0, 0
    ];
    var caveRHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1,
        1, 1, 1, 1, 0,-1, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var caveRLJcaveR = new TransferData(19, false, 3, 0, 0);
    var caveRTdata = [caveRLJcaveR];
    var rubygot = false;
    var rubyDraw = function() {
        if (!rubygot) {
            drawSprite(180, 260, 1, ruby);
        }
    };
    var rubyGet = function() {
        if (eventStage === 0) {
            drawTextBox("You obatined a ruby!");
            if (!rubygot) {
                rubygot = true;
                gainArtifact(16);
            }
        } else {
            caveRHitbox[89] = 0;
            eventEnd();   
        }
    };
    var rubyEvent = new Event(rubyDraw, rubyGet, 0);
    var caveREventData = [rubyEvent];
    var caveR = new MapData(caveRLayout, caveRHitbox, cave, caveRTdata, caveREventData);
    }
    /**Cave Bottom Corner**/
    {
        var caveBCLayout = [
	0, 0, 0, 3, 1, 3, 3, 3, 0, 0,
	0, 0, 3, 3, 1, 2, 2, 3, 3, 3,
	0, 0, 3, 3, 1, 2, 2, 2, 2, 2,
	0, 0, 2, 3, 1, 1, 1, 2, 2, 2,
	0, 0, 2, 3, 1, 1, 1, 1, 1, 1,
	0, 0, 0, 3, 3, 1, 1, 1, 3, 3,
	0, 0, 0, 2, 3, 1, 3, 3, 3, 2,
	0, 0, 0, 2, 3, 3, 3, 3, 2, 2,
	0, 0, 0, 0, 2, 2, 2, 2, 2, 0,
	0, 0, 0, 0, 2, 2, 2, 2, 0, 0
    ];
    var caveBCHitbox = [
        1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1,
        1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var caveBCtoRLJ = new TransferData(19, false, 1, 0, 0);
    var caveBCtoTC = new TransferData(22, true, 0, 5, 9);
    var caveBCTdata = [caveBCtoRLJ, caveBCtoTC];
    var caveBC = new MapData(caveBCLayout, caveBCHitbox, cave, caveBCTdata);
    }
    /**Cave Top Corner**/
    {
        var caveTCLayout = [
	0, 0, 0, 0, 3, 3, 3, 3, 3, 3,
	0, 0, 3, 3, 3, 2, 2, 2, 2, 2,
	0, 3, 3, 2, 2, 2, 2, 2, 2, 2,
	0, 3, 3, 2, 2, 1, 1, 1, 1, 1,
	0, 3, 3, 1, 1, 1, 1, 1, 1, 3,
	0, 2, 3, 1, 1, 1, 1, 3, 3, 3,
	0, 2, 3, 3, 1, 1, 3, 3, 2, 2,
	0, 0, 2, 3, 1, 3, 3, 2, 2, 2,
	0, 0, 2, 2, 1, 2, 2, 2, 0, 0,
	0, 0, 0, 2, 1, 2, 2, 0, 0, 0
    ];
    var caveTCHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 3,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var caveTCtoBC = new TransferData(21, true, 2, 5, 1);
    var caveTCtoEX = new TransferData(23, false, 1, 0, 0);
    var caveTCTdata = [caveTCtoBC, caveTCtoEX];
    var caveTC = new MapData(caveTCLayout, caveTCHitbox, cave, caveTCTdata);
    }
    /**Cave Exit**/
    {
        var caveEXLayout = [
	3, 3, 3, 3, 0, 0, 0, 0, 0, 0,
	2, 2, 2, 3, 3, 3, 0, 0, 0, 0,
	2, 2, 2, 2, 2, 3, 3, 3, 3, 0,
	1, 1, 1, 2, 2, 3, 3, 2, 3, 3,
	3, 3, 1, 1, 1, 2, 2, 2, 2, 3,
	2, 3, 3, 3, 1, 2, 2, 1, 2, 3,
	2, 2, 3, 3, 1, 1, 1, 1, 1, 3,
	0, 2, 2, 3, 3, 3, 3, 1, 3, 3,
	0, 0, 2, 2, 2, 2, 2, 1, 2, 0,
	0, 0, 0, 2, 2, 2, 2, 1, 2, 0
    ];
    var caveEXHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,
        2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var caveEXtoTC = new TransferData(22, false, 3, 0, 0);
    var caveEXtoOUT = new TransferData(24, true, 2, 3, 5);
    var caveEXTdata = [caveEXtoTC, caveEXtoOUT];
    var caveEX = new MapData(caveEXLayout, caveEXHitbox, cave, caveEXTdata);
    }
}

/**North Forest**/
{
var SWLayout;
var SWHitbox;
/**Rock Area**/
{
    var RALayout = [
	10,10,10,10, 0, 0, 0, 6, 0, 0,
	10,10,10,10, 0, 6, 0, 0, 6, 6,
	11,11,13,11, 6, 0, 6, 0, 0, 0,
	11,11,12,11, 0, 0, 0, 6, 0, 0,
	 6, 0, 0, 0, 0, 0, 0, 0, 0, 6,
	 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	 6, 0, 0, 0, 0, 0, 6, 0, 0, 6,
	 0, 6, 0, 6, 6, 0, 0, 6, 6, 0,
	 0, 0, 6, 0, 0, 6, 0, 0, 0, 0,
	 6, 6, 0, 0, 6, 0, 6, 6, 0, 6
    ];
    var RAHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 3,
        1, 1, 1, 2, 1, 0, 0, 0, 1,-1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var RAtoCave = new TransferData(23, true, 0, 8, 9);
    var RAtoSwitch = new TransferData(25, false, 1, 0, 0);
    var RATdata = [RAtoCave, RAtoSwitch];
    var drawRock = function() {
        if (!rockBeat) {
        drawSprite(340, 150, 1, theRock, color(150, 120, 100));
        }
    };
    var rockTalk = function() {
        if (eventStage === 0) {
            drawTextBox("Looking for Sheeley? Well you're too late.");
        } else if (eventStage === 1) {
            drawTextBox("As we speak, Sheeley is abducting the children in the orphanage for his master plan.");
        } else if (eventStage === 2) {
            drawTextBox("But you're never gonna stop him, because first you have to get through me!");
        } else {
            SWLayout[33] = 0;
            SWHitbox[52] = 0;
            SWHitbox[40] = 0;
            RAHitbox[57] = 0;
            shadyEntranceHitbox[65] = 0;
            orphanH[62] = 0;
            orphanH[66] = 0;
            orphanH[68] = 0;
            sheeleyRan = true;
            eventEnd();
            enemyText = ["", ""];
            battleBack = forestBack;
            currentEnemy = rockE;
            currentScreen = "battle";
            startBattle();
            tStage = 0;
            transitioning = true;
        }
    };
    var rockE = new Event(drawRock, rockTalk, 0);
    var RAEventData = [rockE];
    var RA = new MapData(RALayout, RAHitbox, basicOutside, RATdata, RAEventData);
}

/**Switch Place**/
{
    var SWLayout = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	6, 6, 0, 6, 6, 0, 6, 6, 0, 6,
	0, 0, 6, 0, 0, 6, 0, 0, 0, 0,
	0, 0, 0, 6, 0, 0, 0, 0, 6, 0,
	6, 0, 0, 0, 0, 0, 0, 0, 0, 6,
	0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
	6, 0, 6, 0, 6, 0, 6, 0, 0, 0,
	0, 6, 0, 6, 0, 6, 0, 6, 6, 0,
	6, 0, 6, 0, 0, 0, 0, 0, 0, 6,
	0, 6, 0, 0, 6, 0, 6, 6, 0, 0
    ];
    var SWHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1,
        2, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1,
        1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
        1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 3,
        1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 3,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var SWtoRA = new TransferData(24, false, 3, 0, 0);
    var SWtoST = new TransferData(0, false, 1, 0, 0);
    var SWTdata = [SWtoRA, SWtoST];
    var SWmap = new MapData(SWLayout, SWHitbox, basicOutside, SWTdata);
}

/**SheeleyRoom**/
{
    var sheeleyLayout = [
        0, 0, 0, 0, 0, 6, 6, 0, 6, 0,
        6, 6, 0, 6, 0, 0, 0, 6, 0, 6,
        0, 0, 6, 0, 6, 0, 6, 0, 6, 0,
        6, 0, 0, 0, 0, 6, 0, 6, 0, 6,
        0, 6, 0, 6, 0, 0, 0, 0, 0, 0,
        6, 0, 6, 0, 0, 0, 0, 0, 6, 6,
        0, 6, 0, 0, 0, 0, 0, 6, 0, 0,
        0, 0, 6, 0, 0, 0, 0, 0, 0, 6,
        6, 0, 0, 6, 0, 0, 0, 6, 6, 0,
        0, 6, 6, 0, 6, 0, 6, 0, 0, 6
    ];
    var sheeleyHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 1, 1,-1,-2,-3,-4, 1, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1
    ];
    var sheeleyShadyT = new TransferData(5, false, 2, 0, 0);
    var sheeleyTdata = [sheeleyShadyT];
    var b = function() {
        
    };
    var drawFinalSheeley = function() {
        drawSprite(220, 220, 1, playerDown, color(48, 48, 48));
    };
    var kid4Draw = function() {
        drawSprite(180, 180, 0.7, playerDown, color(50, 110, 210));
    };
    var kid5Draw = function() {
        drawSprite(260, 180, 0.7, playerDown, color(210, 150, 180));
    };
    var kid6Draw = function() {
        drawSprite(300, 180, 0.7, playerDown, color(50, 220, 60));
    };
    var finalSheeley = new Event(drawFinalSheeley, b, 0);
    var kid4 = new Event(kid4Draw, b, 0);
    var kid5 = new Event(kid5Draw, b, 0);
    var kid6 = new Event(kid6Draw, b, 0);
    var sheeleyEventData = [finalSheeley, kid4, kid5, kid6];
    var sheeleyM = new MapData(sheeleyLayout, sheeleyHitbox, basicOutside, sheeleyTdata, sheeleyEventData);
}

/**SheeleyRoom2**/
{
    var sheeley2Layout = [
        0, 0, 0, 0, 0, 6, 6, 0, 6, 0,
        6, 6, 0, 6, 0, 0, 0, 6, 0, 6,
        0, 0, 6, 0, 6, 0, 6, 0, 6, 0,
        6, 0, 0, 0, 0, 6, 0, 6, 0, 6,
        0, 6, 0, 6, 0, 0, 0, 0, 0, 0,
        6, 0, 6, 0, 0, 0, 0, 0, 6, 6,
        0, 6, 0, 0, 0, 0, 0, 6, 0, 0,
        0, 0, 6, 0, 0, 0, 0, 0, 0, 6,
        6, 0, 0, 6, 0, 0, 0, 6, 6, 0,
        0, 6, 6, 0, 6, 0, 6, 0, 0, 6
    ];
    var sheeley2Hitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1,
        1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
        1, 0, 0, 1,-1, 0, 0, 0, 1, 1, 1, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1
    ];
    var sheeley2ShadyT = new TransferData(5, false, 2, 0, 0);
    var sheeley2Tdata = [sheeley2ShadyT];
    var lngot = false;
    var lnDraw = function() {
        if (!lngot) {
            drawSprite(140, 220, 1, naturalLog);
        }
    };
    var lnGet = function() {
        if (eventStage === 0) {
            drawTextBox("You obatined a natural log!");
            if (!lngot) {
                lngot = true;
                gainArtifact(20);
            }
        } else {
            sheeley2Hitbox[76] = 0;
            eventEnd();   
        }
    };
    var lnEvent = new Event(lnDraw, lnGet, 0);
    var sheeley2EventData = [lnEvent];
    var sheeley2M = new MapData(sheeley2Layout, sheeley2Hitbox, basicOutside, sheeley2Tdata, sheeley2EventData);
}


var sheeleyEventF = function() {
    if (eventStage === 0) {
        drawTextBox("Stop right there.", "Sheeley", 75);  
    } else if (eventStage === 1) {
        drawTextBox("Have you seen the Social Dilemma?", "Sheeley", 75);
    } else if (eventStage === 2) {
        drawTextBox("No? I thought not. People like you always throw away their lives.", "Sheeley", 75);
    } else if (eventStage === 3) {
        drawTextBox("Dairy, shoes, cars, sitting, using the side urinals, all surefire ways to die young.", "Sheeley", 75);
    } else if (eventStage === 4) {
        drawTextBox("I'll show these kids the true nature of humans! But first, I have to kill you.", "Sheeley", 75);
    } else {
        currentEnemy = sheeleyE;
        enemyText = ["", ""];
            currentScreen = "battle";
            startBattle();
            tStage = 0;
            transitioning = true;
    }
};
}

/**Desert**/
{
    /**Desert Entrance**/
    {
        {
    var desertELayout = [
        0, 0, 2, 1, 1, 1, 1, 2, 0, 0,
        0, 0, 0, 2, 1, 1, 2, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var desertEHitbox = [
        3, 3, 3, 1, 1, 2, 2, 1, 1, 3, 3, 3,
        6, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 4,
        6, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    ];
    var desertExit = new TransferData(27, false, 0, 0, 0);
    var desertEUp = new TransferData(31, false, 0, 0, 0);
    var desertELeft = new TransferData(33, false, 1, 0, 0);
    var desertEDown = new TransferData(31, false, 2, 0, 0);
    var desertERight = new TransferData(33, false, 3, 0, 0);
    var desertET = [desertExit, desertEUp, desertELeft, desertEDown, desertERight];
    var desertE = new MapData(desertELayout, desertEHitbox, desert, desertET);
    }
    }
    
    /**Desert 1**/
    {
    var desert1Layout = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var desert1Hitbox = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ];
    var desert1Up = new TransferData(30, false, 0, 0, 0);
    var desert1Left = new TransferData(31, false, 1, 0, 0);
    var desert1Down = new TransferData(32, false, 2, 0, 0);
    var desert1Right = new TransferData(33, false, 3, 0, 0);
    var desert1T = [desert1Up, desert1Left, desert1Down, desert1Right];
    var desert1 = new MapData(desert1Layout, desert1Hitbox, desert, desert1T);
    }
    
    /**Desert 2**/
    {
    var desert2Layout = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var desert2Hitbox = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ];
    var desert2Up = new TransferData(32, false, 0, 0, 0);
    var desert2Left = new TransferData(29, false, 1, 0, 0);
    var desert2Down = new TransferData(33, false, 2, 0, 0);
    var desert2Right = new TransferData(28, false, 3, 0, 0);
    var desert2T = [desert2Up, desert2Left, desert2Down, desert2Right];
    var desertRockSmashed = false;
    var nailGained = false;
    var drawRockDesert = function() {
        if (!desertRockSmashed) {
            drawSprite(300, 140, 1, rockObstacle);
        }
    };
    var smashRockDesert = function() {
        if (eventStage === 0 && (pickaxeGot || hammerGot)) {
            eventStage = 2;
        } else if (eventStage === 0) {
            drawTextBox("A rock is blocking your path");
        } else if (eventStage === 2) {
            desert2Hitbox[56] = 0;
            desertRockSmashed = true;
            drawTextBox("You found a rusty nail!");
            if (!nailGained) {
                nailGained = true;
                gainArtifact(29);
            }
        } else {
            eventEnd();
        }
    };
    var desertRock = new Event(drawRockDesert, smashRockDesert, 0);
    var desert2E = [desertRock];
    var desert2 = new MapData(desert2Layout, desert2Hitbox, desert, desert2T, desert2E);
    }
    
    /**Desert 3**/
    {
    var desert3Layout = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var desert3Hitbox = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ];
    var desert3Up = new TransferData(29, false, 0, 0, 0);
    var desert3Left = new TransferData(33, false, 1, 0, 0);
    var desert3Down = new TransferData(32, false, 2, 0, 0);
    var desert3Right = new TransferData(31, false, 3, 0, 0);
    var desert3T = [desert3Up, desert3Left, desert3Down, desert3Right];
    var desert3 = new MapData(desert3Layout, desert3Hitbox, desert, desert3T);
    }
    
    /**Desert Shop**/
    {
    var desertSLayout = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        0, 0, 0, 0, 3, 3, 6, 3, 3, 3,
        0, 0, 0, 0, 3, 3, 5, 3, 3, 3,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var desertSHitbox = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        5, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        5, 0, 0, 0, 0, 1, 1, 6, 1, 1, 1, 1,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ];
    var desertSUp = new TransferData(32, false, 0, 0, 0);
    var desertSLeft = new TransferData(31, false, 1, 0, 0);
    var desertSDown = new TransferData(32, false, 2, 0, 0);
    var desertSRight = new TransferData(28, false, 3, 0, 0);
    var desertSI = new TransferData(34, true, 0, 5, 9);
    var desertST = [desertSUp, desertSLeft, desertSDown, desertSRight, desertSI];
    var desertS = new MapData(desertSLayout, desertSHitbox, desert, desertST);
    }
    
    /**Desert Store Inside **/
    {
    var dsL = [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 2, 2, 2, 2, 2, 2, 2, 2, 3,
        3, 2, 2, 2, 2, 2, 2, 2, 2, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 3, 3, 3, 1, 3, 3, 3, 3, 3,
        2, 2, 2, 2, 1, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 1, 2, 2, 2, 2, 2,
    ];
    var dsH = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1,-2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0,-1, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var shopTdes = new TransferData(29, true, 0, 7, 6);
    var dshopTdata = [shopTdes];
    var dshopTalk = function() {
        menuPosX = 0;
        menuPosY = 0;
        currentScreen = "desertShop";
    };
    var dclerkDraw = function() {
        drawSprite(220, 140, 1, playerDown, color(120, 120, 120));
    };
    var dshopEvent = new Event(dclerkDraw, dshopTalk, 0);
    var spinnerDraw = function() {
        drawSprite(60, 80, 0.4, spinner);
    };
    var rewarded = false;
    var gotdadice = false;
    var spinnerEvent = function () {
        showGamble = true;
        if (eventStage === 0) {
            drawTextBox("It costs 250 gold to spin the wheel");
        } else if (eventStage === 1) {
            if (gold >= 250) {
                eventStage = 4;
                menuPosX = 0;
                rewarded = false;
            } else {
                eventStage = 2;
            }
        } else if (eventStage === 2) {
            drawTextBox("Sorry, you don't have enough money to play. Come again another time.");
        } else if (eventStage === 3) {
            eventEnd();
            showGamble = false;
        } else if (eventStage === 4) {
            question();
            drawTextBox("Spin the wheel?");
        } else if (eventStage === 5) {
            if (menuPosX === 0) {
                currentScreen = "gambling";
                gold -= 250;
                spinning = true;
                spinSpeed = floor(random(11, 16));
            } else {
                eventEnd();
                showGamble = false;
            }
        } else if (eventStage === 6) {
            drawTextBox("Jackpot! You won 2000 gold!");
            if (!rewarded) {
                rewarded = true;
                gold += 2000;
            }
        } else if (eventStage === 8) {
            drawTextBox("You won 500 gold!");
            if (!rewarded) {
                rewarded = true;
                gold += 500;
            }
        } else if (eventStage === 10) {
            if (diceGot) {
                drawTextBox("You won 30 XP!");
            if (!rewarded) {
                rewarded = true;
                gainXP(30);
            }
            } else {
                drawTextBox("You obtained a loaded dice!");
            if (!rewarded) {
                rewarded = true;
                gainArtifact(15);
                gotdadice = true;
            }
            }
        } else if (eventStage === 12) {
            drawTextBox("Too bad! You get nothing!");
        } else {
            if (gotdadice) {
                diceGot = true;
            }
            eventStage = 1;
        }
    };
    var spinnerEventE = new Event(spinnerDraw, spinnerEvent, 0);
    var dshopE = [dshopEvent, spinnerEventE];
    var dshop = new MapData(dsL, dsH, basicInside, dshopTdata, dshopE);
    }
    
    /**Desert Cave**/
    {
    var desertCLayout = [
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        8, 8, 8, 8, 8, 8, 8,10, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 9, 8, 8,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var desertCHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ];
    var desertCE = new TransferData(35, true, 0, 7, 9);
    var desertCLeft = new TransferData(28, false, 1, 0, 0);
    var desertCDown = new TransferData(32, false, 2, 0, 0);
    var desertCRight = new TransferData(33, false, 3, 0, 0);
    var desertCT = [desertCE, desertCLeft, desertCDown, desertCRight];
    var desertC = new MapData(desertCLayout, desertCHitbox, desert, desertCT);
    }
    
    /**Desert Cave Inside**/
    {
    var caveDLayout = [
        0, 0, 3, 3, 3, 3, 0, 0, 0, 0,
        0, 3, 3, 2, 2, 3, 3, 0, 0, 0,
        3, 3, 2, 2, 2, 2, 3, 3, 3, 0,
        3, 3, 2, 1, 1, 2, 2, 3, 3, 0,
        3, 3, 1, 1, 1, 1, 2, 2, 3, 3,
        2, 3, 3, 1, 1, 1, 1, 2, 3, 3,
        2, 2, 3, 3, 3, 1, 1, 1, 3, 2,
        0, 2, 2, 2, 3, 3, 1, 3, 3, 2,
        0, 0, 2, 2, 2, 2, 1, 2, 2, 0,
        0, 0, 0, 0, 2, 2, 1, 2, 2, 0
    ];
    var caveDHitbox = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 1,-1, 0, 1, 1, 0, 0, 0, 1,
        1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    var caveDexit = new TransferData(30, true, 2, 8, 6);
    var caveDTdata = [caveDexit];
    var vampireDraw = function() {
        if (!vampireBeat) {
            drawSprite(140, 130, 0.7, vampire);
        }
    };
    var vampireTalk = function() {
        if (eventStage === 0) {
            drawTextBox("A visitor? The last time I saw a human was when Sheeley came to me for his training.", "Vampire", 78);
        } else if (eventStage === 1) {
            drawTextBox("Have you come to be trained? Becuase if you did, you're out of luck.", "Vampire", 78);
        } else if (eventStage === 2) {
            drawTextBox("Us vampires always abstain from dairy, and I can tell you're a scummy milk drinker.", "Vampire", 78);
        } else if (eventStage === 3) {
            drawTextBox("With your body full of toxins, I'll kill you in no time!", "Vampire", 78);
        } else {
            eventEnd();
            caveDHitbox[52] = 0;
            battleBack = caveBack;
            currentEnemy = vampireE;
            currentScreen = "battle";
            startBattle();
            tStage = 0;
            transitioning = true;
        }
    };
    var vampireEv = new Event(vampireDraw, vampireTalk, 0);
    var caveDE = [vampireEv];
    var caveD = new MapData(caveDLayout, caveDHitbox, cave, caveDTdata, caveDE);
    }
}

/**Eastern woods**/
{
    /**Food Store**/
    {
        var foodStoreLayout = [
        0, 6, 0, 0, 6, 6, 0, 0, 6, 0,
        6, 5, 5, 5, 5, 5, 0, 0, 0, 6,
        0, 2, 2, 4, 2, 2, 0, 0, 0, 0,
        6, 2, 2, 3, 2, 2, 0, 0, 0, 6,
        0, 6, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 0, 0, 0, 6, 0,
        6, 0, 0, 0, 1, 1, 0, 0, 0, 6,
        8, 8, 0, 0, 0, 1, 0, 0, 6, 0,
        7, 7, 8, 8, 8, 9, 8, 0, 0, 6,
        7, 7, 7, 7, 7, 9, 7, 8, 8, 8
    ];
    var foodStoreHitbox = [
        1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1,
        1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
    ];
    var foodForestT = new TransferData(12, false, 2, 0, 0);
    var foodOrphanT = new TransferData(2, false, 0, 0, 0);
    var foodGoInT = new TransferData(38, true, 0, 6, 9);
    var foodStoreTdata = [foodForestT, foodOrphanT, foodGoInT];
    var foodStore = new MapData(foodStoreLayout, foodStoreHitbox, basicOutside, foodStoreTdata);
    }
    
    /**Food Store Inside **/
    {
    var shopFL = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 3, 3, 3, 3, 3, 3, 0,
        0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
        0, 0, 3, 2, 2, 2, 2, 2, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 3, 3, 3, 1, 3, 3, 3, 0,
        0, 0, 2, 2, 2, 1, 2, 2, 2, 0,
        0, 0, 2, 2, 2, 1, 2, 2, 2, 0,
    ];
    var shopFH = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0,-1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    var shopFToutside = new TransferData(37, true, 0, 5, 5);
    var shopFTdata = [shopFToutside];
    var shopFTalk = function() {
        menuPosX = 0;
        menuPosY = 0;
        currentScreen = "foodshop";
    };
    var clerkFDraw = function() {
        drawSprite(300, 180, 1, playerDown, color(112, 84, 145));
    };
    var shopFEvent = new Event(clerkFDraw, shopFTalk, 0);
    var shopFE = [shopFEvent];
    var shopFood = new MapData(shopFL, shopFH, basicInside, shopFTdata, shopFE);
    }
    
    /**Forest Bridge**/
    {
        var forestBridgeL = [
            0, 6, 0, 6, 6, 0, 0, 0, 6, 0,
            8, 8, 6, 0, 0, 0, 0, 0, 0, 6,
            7, 7, 8, 8, 9, 8, 0, 6, 0, 8,
            7, 7, 7, 7, 9, 7, 8, 8, 8, 7,
            7, 7, 7, 7, 9, 7, 7, 7, 7, 7,
            7, 7, 7, 7, 9, 7, 7, 7, 7, 7,
            7, 7, 7, 7, 9, 7, 7, 7, 7, 7,
            0, 6, 6, 7, 9, 7, 7, 7, 7, 7,
            6, 0, 0, 0, 0, 0, 0, 6, 0, 6,
            0, 6, 0, 6, 0, 0, 6, 0, 0, 0
        ];
        
        var forestBridgeH = [
            1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1,
            1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
            1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1,
        ];
        
        var fBridgeCemT = new TransferData(16, false, 2, 0, 0);
        var fBridgeET = new TransferData(40, false, 0, 0, 0);
        var fBridgeTData = [fBridgeCemT, fBridgeET];
        var forestBridge = new MapData(forestBridgeL, forestBridgeH, basicOutside, fBridgeTData);
    }
    
    /**Forest2 entrance**/
    {
        var forest2EntranceL = [
            0, 6, 0, 0, 6, 0, 0, 0, 0, 6,
            0, 0, 6, 0, 0, 6, 0, 0, 6, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            6, 6, 0, 6, 0, 0, 0, 0, 6, 6,
            0, 0, 6, 0, 0, 0, 6, 0, 0, 0,
            0, 6, 0, 0, 0, 6, 0, 0, 0, 6,
            6, 0, 0, 6, 0, 0, 0, 0, 0, 0,
            0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 6, 0, 0, 0, 0, 0, 6,
            6, 6, 0, 0, 6, 0, 0, 0, 6, 0
        ];
        
        var forest2EntranceH = [
            1, 1, 1, 1, 3, 1, 1, 3, 3, 1, 1, 1,
            1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1,
            1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1,
            1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1,
            1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
            1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1,
            1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4,
            1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1,
        ];
        
        var f2BridgeT = new TransferData(39, false, 2, 0, 0);
        var f2EmidT = new TransferData(41, false, 0, 0, 0);
        var f2EhammerT = new TransferData(45, false, 1, 0, 0);
        var f2EntranceTData = [f2BridgeT, f2EmidT, f2EhammerT];
        var forest2Entrance = new MapData(forest2EntranceL, forest2EntranceH, basicOutside, f2EntranceTData);
    }
    
    /**Mid Left Forest**/
    {
        var midFLeftL = [
            6, 0, 0, 6, 0, 0, 0, 6, 0, 0,
            0, 0, 6, 0, 0, 0, 6, 0, 0, 6,
            0, 6, 0, 0, 0, 6, 0, 0, 0, 0,
            6, 0, 0, 0, 6, 0, 0, 0, 6, 6,
            0, 6, 0, 6, 0, 6, 0, 0, 0, 0,
            6, 0, 0, 0, 6, 0, 0, 0, 0, 0,
            0, 6, 0, 0, 0, 0, 0, 0, 0, 6,
            0, 0, 6, 0, 0, 0, 0, 6, 6, 0,
            6, 0, 0, 0, 0, 0, 6, 0, 0, 0,
            0, 6, 6, 0, 6, 6, 0, 0, 6, 6
        ];
        
        var midFLeftH = [
            1, 1, 1, 1, 1, 3, 3, 1, 1, 3, 1, 1,
            1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1,
            1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
            1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
            1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1,
            1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 4,
            1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1,
            1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
            1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
            1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1,
            1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1
        ];
        
        var midFLeftEntT = new TransferData(40, false, 2, 0, 0);
        var midFLeftTopT = new TransferData(42, false, 0, 0, 0);
        var midFLeftRightT = new TransferData(44, false, 1, 0, 0);
        var midFLeftTData = [midFLeftEntT, midFLeftTopT, midFLeftRightT];
        var midFLeft = new MapData(midFLeftL, midFLeftH, basicOutside, midFLeftTData);
    }
    
    /**Top Left Forest**/
    {
        var topFLeftL = [
            0, 6, 0, 6, 0, 0, 6, 0, 6, 6,
            6, 0, 0, 0, 6, 0, 0, 6, 0, 0,
            0, 0, 6, 6, 0, 6, 0, 0, 0, 0,
            6, 6, 0, 0, 0, 0, 0, 0, 0, 6,
            0, 0, 0, 0, 0, 0, 0, 0, 6, 0,
            0, 0, 0, 6, 6, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 6, 0, 0, 6, 6,
            6, 0, 0, 0, 0, 0, 0, 6, 0, 0,
            0, 6, 6, 0, 0, 0, 0, 0, 0, 0,
            6, 0, 0, 6, 0, 0, 6, 6, 0, 6
        ];
        
        var topFLeftH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 4,
            1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            3, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1,
            3, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 4,
            1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1
        ];
        
        var topFLeftMidT = new TransferData(41, false, 2, 0, 0);
        var topFLeftTownT = new TransferData(6, false, 3, 0, 0);
        var topFLeftTopT = new TransferData(43, false, 1, 0, 0);
        var topFLeftTData = [topFLeftMidT, topFLeftTownT, topFLeftTopT];
        var topFLeft = new MapData(topFLeftL, topFLeftH, basicOutside, topFLeftTData);
    }
    
    /**Top Right Forest**/
    {
        var topFRightL = [
            6, 6, 0, 6, 0, 6, 6, 6, 0, 6,
            0, 0, 6, 0, 6, 0, 0, 0, 6, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
            6, 0, 0, 6, 0, 0, 0, 0, 0, 0,
            0, 6, 6, 0, 0, 0, 0, 0, 0, 6,
            0, 0, 0, 0, 0, 0, 6, 0, 6, 0,
            6, 0, 0, 0, 0, 6, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 6, 0, 0, 6,
            0, 0, 6, 0, 6, 6, 0, 0, 0, 0,
            6, 6, 0, 6, 0, 0, 6, 6, 0, 6
        ];
        
        var topFRightH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            2, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,
            2, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1
        ];
        
        var topFRightLeftT = new TransferData(42, false, 3, 0, 0);
        var topFRightMidT = new TransferData(44, false, 2, 0, 0);
        var topFRightTData = [topFRightLeftT, topFRightMidT];
        var topRightF = new MapData(topFRightL, topFRightH, basicOutside, topFRightTData);
    }
    
    /**Mid Right Forest**/
    {
        var midFRightL = [
            6, 0, 0, 6, 0, 6, 0, 0, 0, 6,
            0, 6, 6, 0, 0, 0, 6, 6, 0, 0,
            0, 0, 0, 0, 6, 0, 0, 0, 0, 6,
            6, 0, 0, 0, 0, 6, 0, 0, 0, 0,
            0, 0, 0, 6, 6, 0, 0, 0, 0, 6,
            0, 0, 6, 0, 0, 0, 0, 0, 6, 0,
            6, 6, 0, 0, 0, 0, 6, 6, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 6, 0, 0, 0, 6, 0, 6, 0, 6,
            6, 0, 6, 0, 0, 0, 6, 0, 6, 0
        ];
        
        var midFRightH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1,
            3, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1
        ];
        
        var midFRightTopT = new TransferData(43, false, 0, 0, 0);
        var midFRightLeftT = new TransferData(41, false, 3, 0, 0);
        var midFRightHammerT = new TransferData(45, false, 2, 0, 0);
        var midFRightTData = [midFRightTopT, midFRightLeftT, midFRightHammerT];
        var midFRight = new MapData(midFRightL, midFRightH, basicOutside, midFRightTData);
    }
    
    /**Hammer Forest**/
    {
        var hammerFL = [
            6, 0, 6, 0, 0, 0, 6, 0, 6, 0,
            0, 6, 0, 0, 0, 0, 0, 0, 0, 6,
            0, 0, 0, 0, 0, 0, 6, 0, 6, 0,
            6, 0, 0, 0, 0, 0, 0, 6, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
            6, 6, 0, 0, 0, 0, 0, 0, 6, 0,
            0, 0, 0, 0, 0, 0, 0, 6, 0, 6,
            0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
            6, 6, 0, 6, 0, 0, 6, 0, 6, 0,
            0, 0, 6, 0, 6, 6, 0, 6, 0, 6
        ];
        
        var hammerFH = [
            1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1,
            1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
            1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1,
            1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            1, 1, 1, 0, 0,-1, 0, 0, 0, 1, 0, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            3, 0, 0,-2, 0, 0, 1, 0, 1, 1, 0, 1,
            1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        
        var hammerFMidT = new TransferData(44, false, 0, 0, 0);
        var hammerFEnterT = new TransferData(40, false, 3, 0, 0);
        var hammerFTData = [hammerFMidT, hammerFEnterT];
        var hammerTalk = function() {
            if (eventStage === 0) {
                drawTextBox("You found a hammer! You can smash rocks with this!");
                if (!hammerGot) {
                    gainArtifact(23);
                    hammerGot = true;
                } 
            } else {
                hammerFH[65] = 0;
                eventEnd();
            }
        };
        var drawHammer = function() {
            if (!hammerGot) {
                drawSprite(180, 180, 0.8, hammer);
            }
        };
        var hammerRockBust = false;
        var drawRockObstacleHammer = function() {
            if (!hammerRockBust) {
                drawSprite(100, 260, 1, rockObstacle);
            }
        };
        var smashRockHammer = function() {
            if (eventStage === 0 && (pickaxeGot || hammerGot)) {
                eventStage = 2;
            } else if (eventStage === 0) {
                drawTextBox("A rock is blocking your path");
            } else if (eventStage === 2) {
                hammerFH[87] = 0;
                hammerRockBust = true;
                eventEnd();
            } else {
                eventEnd();
            }
        };
        var hammerEvent = new Event(drawHammer, hammerTalk, 0);
        var hammerRock = new Event(drawRockObstacleHammer, smashRockHammer, 0);
        var hammerE = [hammerEvent, hammerRock];
        var hammerForest = new MapData(hammerFL, hammerFH, basicOutside, hammerFTData, hammerE);
    }
    
    
}

/**Snowlands**/
{
    
    /**Snowland Bottom Right**/
    {
        var snowBRL = [
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            0, 1, 0, 0, 0, 0, 0, 1, 0, 0
        ];
        
        var snowBRH = [
            1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
            3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1
        ];
        
        var snowBRET = new TransferData(46, false, 2, 0, 0);
        var snowBRBLT = new TransferData(49, false, 3, 0, 0);
        var snowBRTRT = new TransferData(50, false, 0, 0, 0);
        var snowBRTData = [snowBRET, snowBRBLT, snowBRTRT];
        var snowBR = new MapData(snowBRL, snowBRH, snowy, snowBRTData);
    }
    
    /**Snowland Bottom Left**/
    {
        var snowBLL = [
            0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
            1, 0, 1, 0, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 1, 0, 1, 1,
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0
        ];
        
        var snowBLH = [
            1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 1,
            1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 2,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 2,
            1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 2,
            1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2,
            1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2,
            1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 2,
            1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
            1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        
        var snowBLBRT = new TransferData(48, false, 1, 0, 0);
        var snowBLTLT = new TransferData(51, false, 0, 0, 0);
        var snowBLTData = [snowBLBRT, snowBLTLT];
        var snowBL = new MapData(snowBLL, snowBLH, snowy, snowBLTData);
    }
    
    /**Snowland Top Right**/
    {
        var snowTRL = [
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 3, 3, 3, 3, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 5, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 4, 2, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0
        ];
        
        var snowTRH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
            1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1
        ];
        
        var snowTRBRT = new TransferData(48, false, 2, 0, 0);
        var snowTRTLT = new TransferData(51, false, 3, 0, 0);
        var snowTRcaveT = new TransferData(53, true, 0, 4, 9);
        var snowTRTData = [snowTRBRT, snowTRTLT, snowTRcaveT];
        var snowTR = new MapData(snowTRL, snowTRH, snowy, snowTRTData);
    }
    
    /**Snowland Top Left**/
    {
        var snowTLL = [
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 3, 3, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 5, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 4, 2, 2, 2, 2,
            2, 2, 2, 1, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
            0, 1, 0, 1, 0, 0, 0, 0, 0, 0
        ];
        
        var snowTLH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3,
            1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3,
            1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 3,
            1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 3,
            1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 3,
            1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1
        ];
        
        var snowTLBLT = new TransferData(49, false, 2, 0, 0);
        var snowTLTRT = new TransferData(50, false, 1, 0, 0);
        var snowTLcaveT = new TransferData(52, true, 0, 9, 9);
        var snowTLTData = [snowTLBLT, snowTLTRT, snowTLcaveT];
        var snowTL = new MapData(snowTLL, snowTLH, snowy, snowTLTData);
    }
    
    /**Sapphire Cave**/
    {
        var sCaveL = [
            0, 0, 3, 3, 3, 3, 3, 3, 0, 0,
            3, 3, 3, 2, 2, 2, 2, 3, 3, 0,
            3, 2, 2, 2, 2, 2, 2, 2, 3, 3,
            3, 2, 2, 1, 1, 1, 1, 2, 2, 3,
            3, 1, 1, 1, 1, 3, 1, 1, 2, 3,
            3, 1, 1, 1, 3, 3, 3, 1, 1, 3,
            3, 3, 1, 3, 3, 3, 3, 3, 1, 3,
            2, 3, 3, 3, 2, 2, 2, 3, 1, 3,
            2, 2, 2, 2, 2, 2, 2, 2, 1, 2,
            0, 2, 2, 2, 0, 0, 0, 2, 1, 2
        ];
        
        var sCaveH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1,
            1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1,
            1, 1, 1,-1, 1, 1, 1, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
            1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        
        var sCaveT = new TransferData(51, true, 2, 6, 6);
        var sCaveTData = [sCaveT];
        var sapphireGot = false;
        var sapphireDraw = function() {
            if (!sapphireGot) {
                drawSprite(100, 260, 0.9, sapphire);
            }
        };
        var sapphireGet = function() {
            if (eventStage === 0) {
                drawTextBox("You obtained a sapphire!");
                if (!sapphireGot) {
                    sapphireGot = true;
                    gainArtifact(32);
                }
            } else {
                sCaveH[87] = 0;
                eventEnd();   
            }
        };
        var sapphireEvent = new Event(sapphireDraw, sapphireGet, 0);
        var sCaveEData = [sapphireEvent];
        var sCave = new MapData(sCaveL, sCaveH, cave, sCaveTData, sCaveEData);
    }
    
    /**Jigsaw Cave Entrance**/
    {
        var jigCaveL = [
            0, 0, 0, 3, 1, 1, 3, 0, 0, 0,
            0, 0, 3, 3, 1, 1, 3, 3, 0, 0,
            0, 3, 3, 2, 1, 1, 2, 3, 3, 0,
            3, 3, 2, 2, 1, 1, 2, 3, 3, 0,
            3, 3, 2, 1, 1, 1, 1, 3, 3, 0,
            2, 3, 1, 1, 1, 1, 1, 3, 2, 0,
            2, 3, 1, 1, 1, 3, 3, 3, 2, 0,
            0, 3, 3, 1, 3, 3, 3, 2, 0, 0,
            0, 2, 2, 1, 2, 2, 2, 2, 0, 0,
            0, 2, 2, 1, 2, 2, 2, 0, 0, 0
        ];
        
        var jigCaveH = [
            1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1,
            1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1,
            1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1,
            1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1,
            1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
            1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        
        var jigCaveExitT = new TransferData(50, true, 2, 4, 6);
        var jigCaveRoomT = new TransferData(54, false, 0, 0, 0);
        var jigCaveTData = [jigCaveExitT, jigCaveRoomT];
        var jigCave = new MapData(jigCaveL, jigCaveH, cave, jigCaveTData);
    }

    /**Jigsaw Fight Room**/
    {
        var jigRoomL = [
            0, 0, 3, 3, 3, 3, 3, 3, 0, 0,
            0, 3, 3, 2, 2, 2, 2, 3, 3, 0,
            0, 3, 2, 2, 2, 2, 2, 2, 3, 0,
            0, 3, 2, 1, 1, 1, 1, 2, 3, 0,
            0, 3, 1, 1, 1, 1, 1, 1, 3, 0,
            0, 3, 1, 1, 1, 1, 1, 1, 3, 0,
            0, 3, 3, 1, 1, 1, 1, 3, 3, 0,
            0, 2, 3, 3, 1, 1, 3, 3, 2, 0,
            0, 2, 2, 2, 1, 1, 2, 2, 2, 0,
            0, 0, 2, 2, 1, 1, 2, 2, 0, 0
        ];
        
        var jigRoomH = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
            1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
            1, 0, 1, 1, 1,-1,-1, 1, 1, 1, 0, 1,
            1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
            1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
            1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1
        ];
        
        var jigRoomT = new TransferData(53, false, 2, 0, 0);
        var jigRoomTData = [jigRoomT];
        var drawJig = function() {
            if (!jigsawBeat) {
                drawSprite(200, 80, 0.65, jigsaw);
            }
        };
        var jigTalk = function() {
            if (eventStage === 0) {
                drawTextBox("You seek knowledge.");
            } else if (eventStage === 1) {
                drawTextBox("You seek progress.");
            } else if (eventStage === 2) {
                drawTextBox("But you are unwilling to change.");
            } else if (eventStage === 3) {
                drawTextBox("If I can't teach you, nothing will.");
            } else {
                jigRoomH[41] = 1;
                jigRoomH[42] = 1;
                eventEnd();
                battleBack = caveBack;
                currentEnemy = jigsawE;
                currentScreen = "battle";
                enemyText = ["", ""];
                startBattle();
                tStage = 0;
                transitioning = true;
            }
        };
        var jigE = new Event(drawJig, jigTalk, 0);
        var jigsawEvents = [jigE];
        var jigRoom = new MapData(jigRoomL, jigRoomH, cave, jigRoomTData, jigsawEvents);
    }
    
}

/**Blank**/
{
    var blankL = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    
    var blankH = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    
    var blankT = new TransferData(0, false, 0, 0, 0);
    var blankTData = [blankT];
    var blankMap = new MapData(blankL, blankH, basicOutside, blankTData);
}

}

var resetGame = function() {
    unequipArtifacts();
    Plevel = max(1, floor(Plevel / 3));
    playerHP = 80;
    playerMAXHP = 80;
    playerE = 50;
    playerMAXE = 50;
    playerEGAIN = 12;
    critChance = 10;
    gold = 0;
    nextXP = 10 * Plevel;
    skillPoints = Plevel;
    learnedSkills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    activeSkills = [0, 0, 0, 1, 0, 0, 0, 2];
    restAmount = 4;
    potionBase = 50;
    sBoosted = false;
    initialBlock = false;
    equippedArtifacts = [0, 0, 0, 0, 0];
    critMult = 1;
    critPower = 150;
    xpMult = 1;
    artifactSlots = 3;
    
    playerMapId = 0;
    playerX = 220;
    playerY = 300;
    playerSprite = playerDown;
    nextEncounter = 150;
    activeSkills[0] = slash;
    activeSkills[1] = bulkUp;
    activeSkills[2] = heavyStrike;
    if (meditateQuest >= 0) {
        activeSkills[4] = skillTreeSkills[30];
    }
    skillTreeValues = [
           0,        0,        0,
        1, 1, 1,  1, 1, 1,  1, 1, 1,
        2, 2, 2,  2, 2, 2,  2, 2, 2,
        2, 2, 2,  2, 2, 2,  2, 2, 2,
                     0,            
                  1, 1, 1,
                  2, 2, 2,
                  2, 2, 2
    ];
};

/** Key Detection **/
{
var keys = [];
var keysReleased = [];
var keyTime = [];
var keyH = [];
for (var i = 0; i < 100; i++) {
    keysReleased[i] = true;
    keyTime[i] = 0;
    keyH[i] = false;
}
keyPressed = function() {
    pressKey(keyCode)
};
keyReleased = function() {
    releaseKey(keyCode);
};

function pressKey(k) {
    keys[k] = true;
    keyTime[k] = millis();
    if (!timerStart) {
        if (keys[selectKey]||keys[backKey]||keys[upKey]||keys[downKey]||keys[rightKey]||keys[leftKey]) {
            timerStart = true;
            startHour = hour();
            startMin = minute();
            startSec = second();
        }
    }
}

function releaseKey(k) {
    keys[k] = false;
    keysReleased[k] = true;
    keyH[k] = false;
}

function checkKeyHeld(k) {
    if (keyH[k]) {
        if (millis() - keyTime[k] > 150) {
            keyTime[k] = millis();
            return true;
        } else {
            return false;
        }
    } else if (millis() - keyTime[k] > 350) {
        keyH[k] = true;
        keyTime[k] = millis();
        return true;
    } else {
        return false;
    }
}

var movementKeys = function() {
    var x = 0;
    var y = 0;
    
    if (keys[leftKey]) {x -= 1;}
    if (keys[rightKey]) {x += 1;}
    if (keys[upKey]) {y -= 1;}
    if (keys[downKey]) {y += 1;}

    return [x, y];
};

/**Menu**/
{
var menuNavigation = function() {
    var k = [0, 0, 0, 0];
    if (keys[upKey] && (keysReleased[upKey] || checkKeyHeld(upKey))) {
        keysReleased[upKey] = false;
        k[0] = 1;
    }
    if (keys[downKey] && (keysReleased[downKey] || checkKeyHeld(downKey))) {
        keysReleased[downKey] = false;
        k[1] = 1;
    }
    if (keys[leftKey] && (keysReleased[leftKey] || checkKeyHeld(leftKey))) {
        keysReleased[leftKey] = false;
        k[2] = 1;
    }
    if (keys[rightKey] && (keysReleased[rightKey] || checkKeyHeld(rightKey))) {
        keysReleased[rightKey] = false;
        k[3] = 1;
    }
    
    menuPosY = constrain(menuPosY - k[0] + k[1], 0, menuLimitY);
    menuPosX = constrain(menuPosX - k[2] + k[3], 0, menuLimitX);
};

var skillMenuNavigation = function() {
    var k = [0, 0, 0, 0];
    if (keys[upKey] && (keysReleased[upKey] || checkKeyHeld(upKey))) {
        keysReleased[upKey] = false;
        k[0] = 1;
    }
    if (keys[downKey] && (keysReleased[downKey] || checkKeyHeld(downKey))) {
        keysReleased[downKey] = false;
        k[1] = 1;
    }
    if (keys[leftKey] && (keysReleased[leftKey] || checkKeyHeld(leftKey))) {
        keysReleased[leftKey] = false;
        k[2] = 1;
    }
    if (keys[rightKey] && (keysReleased[rightKey] || checkKeyHeld(rightKey))) {
        keysReleased[rightKey] = false;
        k[3] = 1;
    }
    
    var menuY = menuPosY;
    menuPosY = constrain(menuPosY - k[0] + k[1], 0, menuLimitY);
    menuPosX = constrain(menuPosX - k[2] + k[3], 0, menuLimitX);
    
    if (menuY===menuPosY&&learnedSkills[skillScroll*3+6]!==0&&k[1]===1&&skillScroll<3) {
        skillScroll++;
    }
    if (menuPosY === 1 && skillScroll > 0) {
        menuPosY = 2;
        skillScroll--;
    }
};

var skillTreeNavigation = function() {
    var k = [0, 0, 0, 0];
    if (keys[upKey] && (keysReleased[upKey] || checkKeyHeld(upKey))) {
        keysReleased[upKey] = false;
        k[0] = 1;
    }
    if (keys[downKey] && (keysReleased[downKey] || checkKeyHeld(downKey))) {
        keysReleased[downKey] = false;
        k[1] = 1;
    }
    if (keys[leftKey] && (keysReleased[leftKey] || checkKeyHeld(leftKey))) {
        keysReleased[leftKey] = false;
        k[2] = 1;
    }
    if (keys[rightKey] && (keysReleased[rightKey] || checkKeyHeld(rightKey))) {
        keysReleased[rightKey] = false;
        k[3] = 1;
    }
    if (menuPosY === 1 && k[0] === 1) {
        menuPosY = 0;
        if (menuPosX < 3) {
            menuPosX = 1;
        } else if (menuPosX > 5) {
            menuPosX = 7;
        } else {
            menuPosX = 4;
        }
    } else if (menuPosY === 0 && (k[2] === 1 || k[3] === 1)) {
        if (skillTreeScreen === 2) {
            menuPosX = 4;
        } else if (menuPosX === 1 && k[3] === 1) {
            menuPosX = 4;
        } else if (menuPosX === 4 && k[3] === 1) {
            menuPosX = 7;
        } else if (menuPosX === 4 && k[2] === 1) {
            menuPosX = 1;
        } else if (menuPosX === 7 && k[2] === 1) {
            menuPosX = 4;
        }
    } else if (secondSkillTreeScreenUnlocked && k[1] === 1 && menuPosY === 3 && skillTreeScreen === 1) {
        menuPosY = 0;
        menuPosX = 4;
        skillTreeScreen = 2;
    } else if (k[0] === 1 && menuPosY === 0 && skillTreeScreen === 2) {
        menuPosY = 3;
        skillTreeScreen = 1;
    } else {
        menuPosY = constrain(menuPosY - k[0] + k[1], 0, menuLimitY);
        menuPosX = constrain(menuPosX - k[2] + k[3], 0, menuLimitX);
        if (skillTreeScreen === 2) {
            menuPosX = constrain(menuPosX, 3, 5);
        }
    }
};

var artifactNavigation = function() {
    var k = [0, 0, 0, 0];
    if (keys[upKey] && (keysReleased[upKey] || checkKeyHeld(upKey))) {
        keysReleased[upKey] = false;
        k[0] = 1;
    }
    if (keys[downKey] && (keysReleased[downKey] || checkKeyHeld(downKey))) {
        keysReleased[downKey] = false;
        k[1] = 1;
    }
    if (keys[leftKey] && (keysReleased[leftKey] || checkKeyHeld(leftKey))) {
        keysReleased[leftKey] = false;
        k[2] = 1;
    }
    if (keys[rightKey] && (keysReleased[rightKey] || checkKeyHeld(rightKey))) {
        keysReleased[rightKey] = false;
        k[3] = 1;
    }
    if (menuPosY === 1 && k[0] === 1 && artifactScroll === 0) {
        menuPosY = 0;
        if (artifactSlots === 3) {
            menuPosX = constrain(menuPosX, 2, 4);
        } else if (artifactSlots === 4) {
            menuPosX = constrain(menuPosX, 1, 4);
        } else {
            menuPosX = constrain(menuPosX, 1, 5);
        }
    } else if (menuPosY === 0 && (k[2] === 1 || k[3] === 1)) {
        menuPosX = menuPosX - k[2] + k[3];
        if (artifactSlots === 3) {
            menuPosX = constrain(menuPosX, 2, 4);
        } else if (artifactSlots === 4) {
            menuPosX = constrain(menuPosX, 1, 4);
        } else {
            menuPosX = constrain(menuPosX, 1, 5);
        }
    } else if (menuPosY === 3 && k[1] === 1 && artifactScroll < 2) {
        artifactScroll++;
    } else if (menuPosY === 1 && k[0] === 1 && artifactScroll > 0) {
        artifactScroll--;
    } else {
        menuPosY = constrain(menuPosY - k[0] + k[1], 0, menuLimitY);
        menuPosX = constrain(menuPosX - k[2] + k[3], 0, menuLimitX);
    }
};
}

var selectButton = function() {
    if (keys[selectKey] && keysReleased[selectKey]) {
        keysReleased[selectKey] = false;
        if (currentScreen === "move") {
            scanForEvent();
        } else if (currentScreen === "text") {
            eventStage++;
        } else if (currentScreen === "menu") {
            if (menuPosX === 0 && menuPosY === 0) {
                menuPosX = 1;
                menuPosY = 0;
                skillTreeScreen = 1;
                currentScreen = "skillTree";
            } else if (menuPosX === 1 && menuPosY === 0) {
                menuPosX = 0;
                menuPosY = 0;
                currentScreen = "equipment";
            } else if (menuPosX === 0 && menuPosY === 1) {
                menuPosX = 0;
                menuPosY = 0;
                skillScroll = 0;
                currentScreen = "skills";
            } else if (menuPosX === 1 && menuPosY === 1) {
                if (potions > 0) {
                    playerHP = constrain(playerHP + 50, 0, playerMAXHP);
                    potions--;
                }
            }
        } else if (currentScreen === "equipment") {
            if (menuPosY === 0) {
                if (weapons[menuPosX] === 1) {
                    equipWeapon = menuPosX;
                }
            } else if (menuPosY === 1) {
                if (armor[menuPosX] === 1) {
                    equipArmor = menuPosX;
                }
            } else {
                currentScreen = "artifacts";
                menuPosX = 3;
                menuPosY = 0;
            }
        } else if (currentScreen === "shop") {
            if (menuPosX === 0) {
                if (menuPosY === 0 && gold >= 100) {
                    gold -= 100;
                    potions++;
                } else if (menuPosY === 1 && gold >= 250 && weapons[1] === 0) {
                    gold -= 250;
                    weapons[1] = 1;
                } else if (menuPosY === 2 && gold >= 500 && weapons[2] === 0) {
                    gold -= 500;
                    weapons[2] = 1;
                } else if (menuPosY === 3 && gold >= 1000 && weapons[3] === 0) {
                    gold -= 1000;
                    weapons[3] = 1;
                }
            } else if (menuPosX === 1) {
                if (menuPosY === 0 && gold >= 200) {
                    gold -= 200;
                    gainXP(10);
                } else if (menuPosY === 1 && gold >= 250 && armor[1] === 0) {
                    gold -= 250;
                    armor[1] = 1;
                } else if (menuPosY === 2 && gold >= 500 && armor[2] === 0) {
                    gold -= 500;
                    armor[2] = 1;
                } else if (menuPosY === 3 && gold >= 1000 && armor[3] === 0) {
                    gold -= 1000;
                    armor[3] = 1;
                }
            }
        } else if (currentScreen === "battle") {
            if (final && radius >=700) {
                final = false;
                currentScreen = "move";
                playerMapId = 0;
                playerX = 220;
                playerY = 300;
                gameBeat = true;
                orphanH[62] = -2;
                orphanH[66] = -3;
                orphanH[68] = -1;
                sheeleyRan = false;
            }
            if (turnStage === 0) {
                turnStage++;
                battleText = "";
                menuPosX = 0;
                menuPosY = 0;
                critHappened = false;
                if (playerHP === 0) {
                    currentScreen = "gameOver";
                } else if (enemyHP === 0) {
                    turnStage = 6;
                    enemyDefeated();
                }
            } else if (turnStage === 1) {
                critHappened = false;
                var s = activeSkills[menuPosX + menuPosY * 4];
                if (s === 0) {
                    
                } else if (s === 1) {
                    playerUsedSkill = rest;
                    playerAnimation = restoreAnimation;
                    turnStage = 2;
                } else if (s === 2) {
                    if (potions > 0) {
                        potions--;
                        playerUsedSkill = potionDrink;
                        playerAnimation = restoreAnimation;
                        turnStage = 2;
                    }
                } else {
                var eCost = lucky ? 7 : s.energyCost;
                if (playerE >= eCost && lockedSkills[menuPosX+menuPosY*3] === 0) {
                        usedSkills[menuPosX + menuPosY * 3] = 1;
                        changeEnergy(-eCost);
                        playerUsedSkill = s;
                        playerAnimation = s.animation;
                        battleText += "You used " + s.skillName;
                        if (burntSkills[menuPosX + menuPosY * 3]) {
                            burntSkills[menuPosX + menuPosY * 3] = false;
                            playerHP = max(1, changePlayerHP(playerHP - 10));
                        }
                        turnStage = 2;
                    }
                }
            } else if (turnStage === 3) {
                if (enemyHP === 0) {
                    turnStage = 6;
                    enemyDefeated();
                    return;
                }
                for (var i = 0; i < 6; i++) {
                    lockedSkills[i] = max(0, lockedSkills[i] - 1);
                }
                battleText = "";
                var s = enemySkills[floor(random(0, enemySkills.length))];
                battleText += enemyText[1] + enemyName + " used " + s.skillName + "\n";
                enemyActionType = s.statBoost;
                enemyUsedSkill = s;
                enemyActing = 1;
                enemyFinished = false;
                turnStage = 4;
            } else if (turnStage === 5) {
                if (playerHP === 0) {
                    currentScreen = "gameOver";
                } else if (enemyHP === 0) {
                    turnStage = 6;
                    enemyDefeated();
                    return;
                }
                turnStage = 0;
                startTurn();
            } else if (turnStage === 6 && !final) {
                currentScreen = "move";
                nextEncounter = floor(random(250, 400));
                playerB = 0;
                playerS = 0;
                playerPoison = 0;
                playerWound = 0;
            }
        } else if (currentScreen === "gameOver") {
            //resetGame();
            //currentScreen = "move";
            Program.restart();
        } else if (currentScreen === "skillTree") {
            if (menuPosY !== 0 && skillPoints > 0) {
                var t;
                if (skillTreeScreen === 1) {
                    t = (3 + menuPosX + (menuPosY - 1) * 9);
                } else {
                    t = 31 + menuPosX + (menuPosY - 2) * 3;
                }
                if (skillTreeValues[t] === 1) {
                    skillTreeValues[t] = 0;
                    skillPoints -= 1;
                    var s = skillTreeSkills[t];
                    if (s.animation === "StatBoost") {
                        s.effect();
                    } else {
                        if (activeSkills[4] === 0) {
                            activeSkills[4] = s;
                        } else if (activeSkills[5] === 0) {
                            activeSkills[5] = s;
                        } else if (activeSkills[6] === 0) {
                            activeSkills[6] = s;
                        } else {
                            for (var i = 0; i < learnedSkills.length; i++) {
                                if (learnedSkills[i] === 0) {
                                    learnedSkills[i] = s;
                                    break;
                                }
                            }
                        }
                    }
                    if (menuPosY === 1 || menuPosY === 2) {
                        if (skillTreeScreen === 1) {
                            skillTreeValues[t + 9] = 1;
                        } else {
                            skillTreeValues[t + 3] = 1;
                        }
                    }
                }
            }
        } else if (currentScreen === "skills") {
            var tSkill;
            if (menuPosY < 2) {
                tSkill = activeSkills[menuPosX + menuPosY * 4];
            } else {
                tSkill = learnedSkills[menuPosX + (menuPosY - 2 + skillScroll) * 3];
            }
            if (tSkill !== 0) {
                if (swapping) {
                    swapping = false;
                    var skillB;
                    if (swapPos < 4) {
                        skillB = activeSkills[swapPos - 1];
                        activeSkills[swapPos - 1] = tSkill;
                    } else if (swapPos < 7) {
                        skillB = activeSkills[swapPos];
                        activeSkills[swapPos] = tSkill;
                    } else {
                        skillB = learnedSkills[swapPos - 7];
                        learnedSkills[swapPos - 7] = tSkill;
                    }
                    if (menuPosY < 2) {
                        activeSkills[menuPosX + menuPosY * 4] = skillB;
                    } else {
                        learnedSkills[menuPosX + (menuPosY-2+skillScroll) * 3] = skillB;
                    }
                } else {
                    swapping = true;
                    swapPos = (menuPosX + 1) + ((menuPosY + skillScroll) * 3);
                }
            }
        } else if (currentScreen === "artifacts") {
            var taId;
            var scrollOffset = artifactScroll * 7;
            var prevSet =[artifactEquipped(5), artifactEquipped(14), artifactEquipped(19), artifactEquipped(24), artifactEquipped(25), artifactEquipped(26), artifactEquipped(28), artifactEquipped(35), artifactEquipped(13)];
            if (menuPosY === 0) {
                if (artifactSlots === 3) {
                    taId = equippedArtifacts[menuPosX - 2];
                } else {
                    taId = equippedArtifacts[menuPosX - 1];
                }
            } else {
                taId = playerArtifacts[menuPosX + (menuPosY - 1) * 7 + scrollOffset];
            }
            if (taId !== 0 || aSwapping) {
                if (aSwapping) {
                    aSwapping = false;
                    var aB;
                    var aS;
                    if (aSwapPos < 5) {
                        aS = equippedArtifacts[aSwapPos];
                    } else {
                        aS = playerArtifacts[aSwapPos - 5];
                    }
                    if (menuPosY === 0) {
                        if (artifactSlots === 3) {
                            aB = equippedArtifacts[menuPosX - 2];
                            equippedArtifacts[menuPosX - 2] = aS;
                        } else {
                            aB = equippedArtifacts[menuPosX - 1];
                            equippedArtifacts[menuPosX - 1] = aS;
                        }
                    } else {
                        aB = playerArtifacts[menuPosX + (menuPosY - 1) * 7 + scrollOffset];
                        playerArtifacts[menuPosX + (menuPosY - 1) * 7 + scrollOffset] = aS;
                    }
                    if (aSwapPos < 5) {
                        equippedArtifacts[aSwapPos] = aB;
                    } else {
                        playerArtifacts[aSwapPos - 5] = aB;
                    }
                } else {
                    aSwapping = true;
                    if (menuPosY === 0) {
                        aSwapPos = artifactSlots === 3 ? menuPosX - 2 : menuPosX - 1;
                    } else {
                        aSwapPos = menuPosX + 5 + (menuPosY - 1) * 7 + scrollOffset;
                    }
                }
            }
            var newSet = [artifactEquipped(5), artifactEquipped(14), artifactEquipped(19), artifactEquipped(24), artifactEquipped(25), artifactEquipped(26), artifactEquipped(28), artifactEquipped(35), artifactEquipped(13)];
            if (newSet[0] && !prevSet[0]) {
                playerEGAIN += 5;
            } else if (!newSet[0] && prevSet[0]) {
                playerEGAIN -= 5;
            }
            if (newSet[1] && !prevSet[1]) {
                playerMAXE += 10;
            } else if (!newSet[1] && prevSet[1]) {
                playerMAXE -= 10;
            }
            if (newSet[2] && !prevSet[2]) {
                playerMAXHP += 50;
            } else if (!newSet[2] && prevSet[2]) {
                playerMAXHP -= 50;
                playerHP = min(playerHP, playerMAXHP);
            }
            if (newSet[3] && !prevSet[3]) {
                playerEGAIN += 2;
            } else if (!newSet[3] && prevSet[3]) {
                playerEGAIN -= 2;
            }
            if (newSet[4] && !prevSet[4]) {
                critPower += 20;
            } else if (!newSet[4] && prevSet[4]) {
                critPower -= 20;
            }
            if (newSet[5] && !prevSet[5]) {
                critChance += 7;
            } else if (!newSet[5] && prevSet[5]) {
                critChance -= 7;
            }
            if (newSet[6] && !prevSet[6]) {
                playerMAXE += 5;
                playerEGAIN += 1;
                critPower += 10;
                playerMAXHP += 20;
            } else if (!newSet[6] && prevSet[6]) {
                playerMAXE -= 5;
                playerEGAIN -= 1;
                critPower -= 10;
                playerMAXHP -= 20;
                playerHP = min(playerHP, playerMAXHP);
            }
            if (newSet[7] && !prevSet[7]) {
                critChance += 15;
                critPower += 25;
            } else if (!newSet[7] && prevSet[7]) {
                critChance -= 15;
                critPower -= 25;
            }
            if (newSet[8] && !prevSet[8]) {
                encounters = false;
            } else if (!newSet[8] && prevSet[8]) {
                encounters = true;
            }
        } else if (currentScreen === "desertShop") {
            if (menuPosX === 0) {
                if (menuPosY === 0 && gold >= 100) {
                    gold -= 100;
                    potions++;
                } else if (menuPosY === 1 && gold >= 500 && !artifactsBought[0]) {
                    gold -= 500;
                    gainArtifact(35);
                    artifactsBought[0] = true;
                } else if (menuPosY === 2 && gold >= 500 && !artifactsBought[1]) {
                    gold -= 500;
                    gainArtifact(31);
                    artifactsBought[1] = true;
                } else if (menuPosY === 3 && gold >= 500 && !artifactsBought[2]) {
                    gold -= 500;
                    gainArtifact(9);
                    artifactsBought[2] = true;
                }
            } else if (menuPosX === 1) {
                if (menuPosY === 0 && gold >= 1000) {
                    gold -= 1000;
                    playerMAXHP += 10;
                    playerHP += 10;
                } else if (menuPosY === 1 && gold >= 500 && !artifactsBought[3]) {
                    gold -= 500;
                    gainArtifact(33);
                    artifactsBought[3] = true;
                } else if (menuPosY === 2 && gold >= 500 && !artifactsBought[4]) {
                    gold -= 500;
                    gainArtifact(30);
                    artifactsBought[4] = true;
                } else if (menuPosY === 3 && gold >= 500 && !artifactsBought[5]) {
                    gold -= 500;
                    gainArtifact(13);
                    artifactsBought[5] = true;
                }
            }
        } else if (currentScreen === "gambling") {
            spinning = false;
        } else if (currentScreen === "foodshop") {
            if (menuPosX === 0) {
                if (menuPosY === 0 && gold >= 300 && !foodBought[0]) {
                    gold -= 300;
                    gainArtifact(1);
                    foodBought[0] = true;
                } else if (menuPosY === 1 && gold >= 300 && !foodBought[1]) {
                    gold -= 300;
                    gainArtifact(19);
                    foodBought[1] = true;
                } else if (menuPosY === 2 && gold >= 300 && !foodBought[2]) {
                    gold -= 300;
                    gainArtifact(26);
                    foodBought[2] = true;
                } else if (menuPosY === 3 && gold >= 300 && !foodBought[3]) {
                    gold -= 300;
                    gainArtifact(25);
                    foodBought[3] = true;
                }
            } else if (menuPosX === 1) {
                if (menuPosY === 0 && gold >= 300 && !foodBought[4]) {
                    gold -= 300;
                    gainArtifact(14);
                    foodBought[4] = true;
                } else if (menuPosY === 1 && gold >= 300 && !foodBought[5]) {
                    gold -= 300;
                    gainArtifact(17);
                    foodBought[5] = true;
                } else if (menuPosY === 2 && gold >= 300 && !foodBought[6]) {
                    gold -= 300;
                    gainArtifact(24);
                    foodBought[6] = true;
                } else if (menuPosY === 3 && gold >= 300 && !foodBought[7]) {
                    gold -= 300;
                    gainArtifact(27);
                    foodBought[7] = true;
                }
            }
        }
    }
};

var backButton = function() {
    if (keys[backKey] && keysReleased[backKey]) {
        keysReleased[backKey] = false;
        if (currentScreen === "move" || currentScreen === "skillTree" || currentScreen === "equipment") {
            menuPosX = 0;
            menuPosY = 0;
            currentScreen = "menu";
        } else if (currentScreen === "menu" || currentScreen === "shop" || currentScreen === "desertShop" || currentScreen === "foodshop") {
            currentScreen = "move";
        } else if (currentScreen === "skills") {
            if (swapping) {
                swapping = false;
            } else {
            menuPosX = 0;
            menuPosY = 0;
            currentScreen = "menu";
            }
        } else if (currentScreen === "artifacts") {
            if (aSwapping) {
                aSwapping = false;
            } else {
                menuPosX = 1;
                menuPosY = 2;
                currentScreen = "equipment";
            }
        }
    }
};

var timerButton = function() {
    if (keys[timerKey] && keysReleased[timerKey]) {
        keysReleased[timerKey] = false;
        showTimer = !showTimer;
    }
};
}

/**map variables**/
{
var forestEncounter = [forestBack, spiderE, goblinE];
var forestEncounter2 = [forestBack, spiderE, redUnfunguyE, goblinE, redUnfunguyE];
var cemetaryEncounter = [cemetaryBack, zombieE, ghostE];
var caveEncounter = [caveBack, caveSpiderE, chonkerE];
var desertEncounter = [desertBack, flameRunnerE, scorpionE];
var snowEncounter = [snowBack, snowmanE];

var encounterList = [forestEncounter,cemetaryEncounter,caveEncounter,desertEncounter,forestEncounter2, snowEncounter];

mapList = [
    test1map, storeOutsideMap, orphanOutside, momsHouse, topLeftTown, shadyForestEntrance,
    topRightTown, townExit, townBottomLeft, crossroads, shop, orphanInside, eastPath,         southPath, westPath, cemetaryE, cemetaryM, cemetaryB, caveE, caveRLJ, caveR, caveBC,      caveTC, caveEX, RA, SWmap, sheeleyM, desertPath, desertE, desertS, desertC, desert1, desert2, desert3, dshop, caveD, sheeley2M, foodStore, shopFood, forestBridge, forest2Entrance, midFLeft, topFLeft, topRightF, midFRight, hammerForest, snowEntrance, wiseHouse, snowBR, snowBL, snowTR, snowTL, sCave, jigCave, jigRoom
];

mapEncounters =[0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,2,2,2,3,3,3,3,3,3,0,0,0,0,4,0,0,4,4,4,0,0,0,0,0,5,5,5,5,5,5,5,0,0,6,6,6,6,0,0,0];
}

/**Set-Up**/
{
playerX = 220;
playerY = 300;

playerSprite = playerDown;

nextEncounter = 150;

activeSkills[0] = slash;
activeSkills[1] = bulkUp;
activeSkills[2] = heavyStrike;
}

var movePlayer = function(speed) {
    var m = movementKeys();
    var bounds = bindPlayerToMap();
    
    if (keys[16]) {
        speed++;
        if (artifactEquipped(18)) {
            speed++;
        }
    }
    
    var lastX = playerX;
    var lastY = playerY;
    
    playerX += speed * m[0];
    playerY += speed * m[1];
    
    playerX = constrain(playerX, bounds[2], bounds[3]);
    playerY = constrain(playerY, bounds[0], bounds[1]);
    
    var mapE = mapEncounters[playerMapId];
    if ((playerX !== lastX || playerY !== lastY) && mapE !== 0 && encounters) {
        nextEncounter -= 1;
        if (nextEncounter < 0 ) {
            nextEncounter = floor(random(150, 250));
            var encounter = encounterList[mapE - 1];
            battleBack = encounter[0];
            currentEnemy = encounter[floor(random(1, encounter.length))];
            if (currentEnemy[0] === "unfunguy") {
                var funguyRand = random(0, 20);
                if (funguyRand < 1) {
                    currentEnemy = purpleUnfunguyE;
                } else if (funguyRand < 5) {
                    currentEnemy = blueUnfunguyE;
                }
                enemyText = ["An ", "The "];
            }
            currentScreen = "battle";
            startBattle();
            tStage = 0;
            transitioning = true;
        }
    }
    
    if (m[1] === -1) {playerSprite = playerUp; playerDir = 0;}
    if (m[1] === 1) {playerSprite = playerDown; playerDir = 2;}
    if (m[0] === -1) {playerSprite = playerLeft; playerDir = 3;}
    if (m[0] === 1) {playerSprite = playerRight; playerDir = 1;}
};

var drawBois = function() {
    drawEvents(0);
    drawSprite(playerX, playerY, 1, playerSprite, color(175, 80, 80));
    drawEvents(1);
};

var rockE = ["The Rock", rockBoss, 500, 1600, 200, suplex, uppercut, boneCrunch];
//currentScreen = "test";
var testE = jigsawArmor;
var testA = topHat;


draw = function() {
    push();
    scale(gameScale);

    backButton();
    selectButton();
    timerButton();
    
    if (currentScreen === "gameOver") {
        background(0, 0, 0);
        fill(255, 0, 0);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("GAME\nOVER", 200, 200);
        textAlign(LEFT, BASELINE);
    }
    
    if (currentScreen === "move") {
        movePlayer(2);
        if (playerMapId === 36 && rockBeat) {
            playerMapId = 26;
        }
    }
    if (currentScreen === "menu" || currentScreen === "equipment" || currentScreen === "shop" || turnStage === 1 || currentScreen === "text") {
        menuNavigation();
    }
    
    if (currentScreen === "battle") {
        drawBattle();
    }
    
    if (currentScreen === "move" || currentScreen === "text" || (currentScreen === "battle" && tStage < 410)){
        cMap = mapList[playerMapId];
        drawMap(cMap.layout, cMap.tileset);
        drawBois();
    }
    if (currentScreen === "menu") {
        drawMenu();
    }
    if (currentScreen === "equipment") {
        drawEquipMenu();
    }
    if (currentScreen === "shop") {
        drawShop();
    }
    if (currentScreen === "foodshop") {
        menuNavigation();
        drawFoodShop();
    }
    if (currentScreen === "desertShop") {
        menuNavigation();
        drawDesertShop();
    }
    if (currentScreen === "text") {
        currentEvent();
    }
    if (currentScreen === "skillTree") {
        skillTreeNavigation();
        drawSkillTree();
    }
    if (currentScreen === "skills") {
        skillMenuNavigation();
        drawSkillMenu();
    }
    if (currentScreen === "artifacts") {
        artifactNavigation();
        drawArtifactMenu();
    }
    if (currentScreen === "gambling") {
        cMap = mapList[playerMapId];
        drawMap(cMap.layout, cMap.tileset);
        drawBois();
        if (spinning) {
            drawTextBox("Press space to stop spinning");
        } else {
            drawTextBox("");
        }
        if (spinSpeed === 0) {
            currentScreen = "text";
            if (spinnerR >= 345 || spinnerR <= 15) {
                eventStage = 6;
            } else if (spinnerR >= 100 && spinnerR <= 180) {
                eventStage = 10;
            } else if (spinnerR >= 180 && spinnerR <= 260) {
                eventStage = 8;
            } else {
                eventStage = 12;
            }
        }
    }
    
    if (showGamble) {
        gambling();
    }
    
    if (transitioning) {
       battleTransition(); 
    }

    if (playerMapId === 26 && playerY <= 290 && !sheeleyTalk) {
        eventBegin();
        currentScreen = "text";
        sheeleyTalk = true;
        currentEvent = sheeleyEventF;
        battleBack = sheeleyBack;
    }
    
    if (final) {
        fill(255, 255, 255);
        ellipse(200, 200, radius, radius);
        if (radius < 700) {
            radius += 3;
        } else {
            textAlign(CENTER, CENTER);
            fill(50, 180, 220);
            textSize(30);
            text("THE\nEND", 200, 200);
            textAlign(LEFT, BASELINE);
        }
    }
    
    if (currentScreen === "test") {
        caveBack();
        drawSprite(200, 200, 1, testE);
    }
    
    if (showTimer) {
        var time = "0:00:00";
        var h = 0, m = 0, s = 0;
        if (timerFinish) {
            h = endHour;
            m = endMin;
            s = endSec;
        } else if (timerStart) {
            h = hour() - startHour;
            if (h < 0) {
                h += 12;   
            }
            m = minute() - startMin;
            if (m < 0) {
                m += 60;
                h--;
            }
            s = second() - startSec;
            if (s < 0) {
                s += 60;
                m--;
            }
            endHour = h;
            endMin = m;
            endSec = s;
        }
        var m0 = "";
            if (m < 10) {m0 = "0";}
            var s0 = "";
            if (s < 10) {s0 = "0";}
            time = h + ":" + m0 + m + ":" + s0 + s;
        fill(0, 0, 0, 200);
        rect(0, 0, 72, 25);
        fill(255, 60, 60);
        textSize(20);
        text(time, 3, 20);
    }

    transferPlayer();

    pop();

if (onPhone) {
    fill(20, 20, 20);
    rect(0, width, width, height - width);
}

};

function mousePressed() {
    console.log("heyo");
}

function mouseReleased() {
    console.log("byeo");
}





//bruh