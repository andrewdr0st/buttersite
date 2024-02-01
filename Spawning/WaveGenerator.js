
var waves = [];
var enemyBonus = 1;
var enemyBonusType = 0;


//Spawner values: [enemy type, count, interval, powerLevel, pause]
//wave setup: single length arrays are point values
//horde [type, strength, 1]
var planet1Waves = [
    [
        [0, 5, 1.6, 1, 1]
    ], [
        [15], [1, 2, 1.5, 1, 1]
    ], [
        [20], [2, 5, 0.8, 1, 1]
    ], [
        [15], [25], [35]
    ], [
        [0, 4, 1.25, 2, 0.25], [40], [20], [10]
    ], [
        [50], [0, 0, 1], [35], [45]
    ], [
        [45], [1, 5, 1.75, 2, 3.5], [0, 15, 0.25, 1, 1]
    ], [
        [40], [0, 10, 0.9, 2, 0], [2, 12, 0.4, 2, 0], [75], [30], [60]
    ], [
        [0, 2, 0.9, 3, 0.3], [40], [40], [1, 10, 1.25, 2, 1.5], [20], [40], [50], [40]
    ], [
        [0, 4, 1.75, 4, 2], [50], [75], [0, 3, 0.75, 3, 0.15], [60], [1, 1, 1, 3, 0], [45], [60], [0, 3, 1.25, 4, 1]
    ]
];

var planet2Waves = [
    [
        [15], [10]
    ], [
        [3, 1, 1, 1, 7], [15], [10]
    ], [
        [15], [2, 5, 0.3, 1, 0.5], [30], [10], [10]
    ], [
        [1, 1, 1, 2, 2], [25], [0, 3, 1.25, 2, 0], [3, 5, 1.5, 1, 1]
    ], [
        [20], [4, 2, 1.2, 1, 0.5], [35], [4, 3, 0.85, 1, 0.25], [0, 0, 1]
    ], [
        [2, 5, 0.9, 3, 1], [15], [3, 1, 1, 2, 2.5], [1, 15, 0.75, 1, 1]
    ], [
        [40], [4, 7, 0.7, 1, 0.5], [2, 20, 0.25, 1, 0], [30], [0, 1, 1], [40], [20]
    ], [
        [0, 32, 0.25, 1, 0.25], [0, 16, 0.45, 2, 0.25], [0, 8, 0.85, 3, 0.25], [0, 4, 1.7, 4, 1]
    ], [
        [3, 10, 1, 1, 0.5], [3, 3, 1.25, 2, 1], [40], [1, 0, 1], [60], [1, 0, 1]
    ], [
        [1, 5, 1.3, 3, 1], [4, 8, 1, 2, 0.2], [40], [40], [3, 2, 1.5, 3, 2], [2, 2, 0.75, 4, 0.5], [0, 0, 0], [40], [0, 1, 1], [70]
    ]
];

var planet3Waves = [
    [
        [10], [0, 4, 1.2, 1, 0], [10]
    ], [
        [20], [5, 8, 0.75, 1, 1]
    ], [
        [30], [0, 2, 0.4, 2, 0.7], [30]
    ], [
        [25], [6, 1, 1, 1, 0.5], [15], [1, 6, 1, 2, 0.5], [5, 5, 0.2, 1, 1]
    ], [
        [2, 7, 0.4, 2, 0], [1, 3, 0.75, 2, 0.2], [6, 1, 1, 1, 0], [30], [15], [30] 
    ], [
        [4, 1, 1, 3, 2], [5, 15, 0.25, 1, 0.5], [20], [30], [40], [50], [60], [0, 2, 1]
    ], [
        [3, 4, 1.15, 2, 1], [5, 10, 0.35, 2, 0.5], [50], [1, 3, 1.3, 3, 0], [10], [20]
    ], [
        [1, 0, 1], [40], [6, 5, 0.65, 1, 0.3], [40], [60], [3, 8, 1, 1, 1], [5, 20, 0.15, 1, 1]
    ], [
        [1, 1, 1, 4, 1.5], [40], [40], [0, 1, 1], [6, 2, 0.5, 2, 0.5], [50], [0, 1, 1], [100], [40]
    ], [
        [6, 1, 1, 3, 0], [80], [50], [6, 10, 0.5, 1, 0.5], [3, 1, 1, 4, 3], [30], [30], [80], [80], [120]
    ]
];

var planet4Waves = [
    [
        [0, 1, 1, 2, 0.5], [10], [10]
    ], [
        [1, 1, 1, 2, 3], [20], [5, 3, 0.25, 1, 1]
    ], [
        [7, 1, 1, 1, 1]
    ], [
        [40], [25], [0, 1, 1], [20], [5, 15, 0.175, 1, 0.35], [4, 2, 1.25, 2, 1]
    ], [
        [7, 1, 1, 1, 2], [6, 3, 1, 1, 0.5], [2, 10, 0.35, 2, 0.5], [3, 6, 1.25, 1, 2], [60], [25]
    ], [
        [8, 4, 1, 1, 1.75], [80], [40], [40], [4, 12, 0.75, 2, 2.5], [0, 5, 0.5, 3, 1]
    ], [
        [0, 3, 1], [7, 3, 1.8, 1, 1.25], [90], [8, 10, 0.75, 1, 1], [1, 0, 1], [45], [100]
    ], [
        [30], [7, 1, 1, 2, 3], [50], [100], [80]
    ], [
        [6, 2, 0.6, 3, 0], [70], [0, 1, 1], [3, 2, 1.75, 3, 1], [60], [80], [8, 6, 0.9, 2, 0.75], [50], [60], [150]
    ], [
        [7, 1, 1, 3, 1.5], [5, 15, 0.1, 2, 2], [70], [80], [8, 2, 1, 3, 0.25], [7, 5, 1.5, 1, 3], [150], [110], [120], [180]
    ]
];

var planet5Waves = [
    [
        [4, 2, 1.1, 1, 0.3], [6, 1, 1, 1, 1.5], [15]
    ], [
        [8, 1, 1, 1, 1.5], [20], [20], [30]
    ], [
        [1, 2, 1.75, 2, 0.25], [5, 5, 0.75, 2, 1.5], [10], [8, 4, 1, 1, 0.5], [30]
    ], [
        [50], [20], [0, 0, 1], [60], [30], [15], [25]
    ], [
        [8, 3, 1, 1, 0.25], [40], [6, 3, 0.4, 1, 0.75], [8, 5, 1.25, 1, 0.5], [50]
    ], [
        [7, 1, 1, 2, 4], [80], [20], [30], [20], [40], [20], [35]
    ], [
        [120], [2, 5, 0.2, 3, 1.5], [60], [80], [100]
    ], [
        [3, 3, 1.25, 3, 1], [75], [75], [75], [0, 4, 1], [75], [75], [8, 7, 1.25, 3, 0]
    ], [
        [4, 20, 0.65, 2, 0.5], [4, 5, 0.75, 3, 1.5], [40], [40], [40], [100], [150]
    ], [
        [8, 1, 1, 4, 1], [7, 1, 1, 2, 1], [6, 5, 0.8, 3, 0.25], [5, 20, 0.25, 3, 0.25], [4, 3, 1, 4, 1], [3, 2, 2.5, 4, 2.5], [2, 10, 0.25, 4, 1], [1, 4, 1.75, 4, 3], [0, 45, 0.6, 3, 0]
    ]
];

var planet6Waves = [
    [
        [0, 1, 1, 2, 0.25], [1, 1, 1, 2, 0.5], [2, 1, 1, 2, 2.5], [10]
    ], [
        [15], [15], [7, 1, 1, 1, 4.5], [15], [15]
    ], [
        [0, 0, 1], [70], [3, 1, 1, 2, 2.5], [6, 2, 1.25, 2, 0.5], [25]
    ], [
        [1, 2, 2, 4, 4.25], [40], [20], [5, 20, 0.15, 1, 0.5], [40], [80]
    ], [
        [50], [4, 15, 0.65, 2, 1], [3, 1, 1, 3, 0.5], [30], [100], [20], [50]
    ], [
        [8, 8, 0.8, 2, 0.4], [50], [25], [2, 10, 0.2, 3, 0.35], [7, 4, 1.5, 1, 2], [0, 5, 1]
    ], [
        [100], [40], [40], [40], [40], [75], [20], [30], [80], [125]
    ], [
        [0, 15, 0.55, 3, 1], [1, 10, 1.6, 3, 0.5], [2, 20, 0.3, 3, 2], [7, 1, 1, 3, 3], [8, 5, 1, 3, 0.5], [90], [30], [30], [30]
    ], [
        [100], [100], [100], [100], [100], [100], [100], [100], [100], [100]
    ], [
        [7, 1, 1, 4, 1], [50], [90], [40], [40], [80], [0, 10, 0.25, 4, 7], [120], [200], [60], [8, 10, 0.75, 4, 2], [250]
    ]
];


function addNextWave() {
    let index = waveCount - 1;
    calculatePowerLevel();
    updateBias(index);
    let w = [];
    if (index < waves.length) {
        w = waves[index];
        if (difficultyLevel >= 2) {
            w.push([(currentPlanet + waveCount - 1) * (2 + waveCount)]);
        }
        if (enemyBonus > 1) {
            w.push(generateBonusSpawn());
        }
    } else {
        let ws = waveStrength;
        let l = floor(random(waveCount - 6, waveCount - 2));
        for (let i = 0; i < l && ws > 0; i++) {
            let u;
            let v = floor(random(50, 200));
            ws -= v;
            u = [v];
            w.push(u);
        }
        ws = max(50, ws);
        let v = [ws];
        w.push(v);
        waveStrength += 300;
    }
    for (let i = 0; i < w.length; i++) {
        let s = w[i];
        if (s.length == 1) {
            let eType = pickEnemyType();
            let strength = pickStrength(getBiasArray(eType));
            addSpawn(generateSpawn(s[0], eType, strength));
        } else if (s.length == 3) {
            addSpawn(generateHorde(s[0], s[1], s[2]));
        } else {
            addSpawn(s);
        }
    }
}

function generateSpawn(spend, enemyType, strength) {
    let intervalValues = intervalFunctions[enemyType](powerFunctions[enemyType](strength));
    let interval = random(intervalValues[0], intervalValues[1]);
    spend *= pow(interval + 0.25 * difficultyMod, 1.25);
    let cost = eCost[enemyType][strength - 1];
    let count = ceil(spend / cost);
    let pause = (count * cost - spend) * 0.075;
    return [enemyType, count, interval, strength, pause];
}

function generateBonusSpawn() {
    return generateSpawn(enemyBonus * (currentPlanet * 3 + waveCount * 2), enemyBonusType, pickStrength(getBiasArray(enemyBonusType)));
}

function pickEnemyType() {
    let totalBias = 0;
    for (let i = 0; i < tempEBias.length; i++) {
        totalBias += tempEBias[i];
    }
    let r = random(0, totalBias);
    totalBias = 0;
    let pick = 0;
    for (let i = 0; i < tempEBias.length; i++) {
        totalBias += tempEBias[i];
        if (r < totalBias) {
            pick = i;
            break;
        }
    }
    tempEBias[pick] = max(5, tempEBias[pick] - 15);
    return pick;
}






