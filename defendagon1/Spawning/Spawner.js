
//[type, count, interval, powerLevel, pause]

var enemyTypes = [new Circle(), new Square(), new Triangle(), new Hexagon(), new Plus(), new Glider(), new Trapezoid(), new Octogon(), new Ring()];

var spawns = [];
var spawning = false;

var spawningIndex = 0;
var lastSpawnMillis = 0;
var spawnCountdown = 0;

function resetSpawner() {
    spawns = [];
    spawning = false;
}

function beginSpawning() {
    spawnCountdown = 0.5;
    spawning = true;
    spawningIndex = 0;
}

function addSpawn(s) {
    spawns.push(s);
}

function spawnEnemy(id, power) {
    let e = Object.create(enemyTypes[id]);
    if (power == 2) {
        e.powerUp();
        e.particleSprite = purpleBit;
    } else if (power == 3) {
        e.chadUp();
        e.particleSprite = pinkBit;
    } else if (power == 4) {
        e.sigmaUp();
        e.particleSprite = redBit;
    }
    if (acidRain) {
        e.armor = 0;
    }
    if (blizzard) {
        e.speed *= 0.9;
    }
    e.reset();
    addEnemy(e);
}

function runSpawner() {
    if (spawning) {
        let s = spawns[spawningIndex];
        spawnCountdown -= deltaTime;
        if (spawnCountdown <= 0) {
            spawnCountdown = s[2];
            spawnEnemy(s[0], s[3]);
            s[1]--;
            if (s[1] == 0) {
                spawningIndex++;
                spawnCountdown += s[4];
            }
            if (spawningIndex == spawns.length) {
                resetSpawner();
            }
        }
    } 
}


