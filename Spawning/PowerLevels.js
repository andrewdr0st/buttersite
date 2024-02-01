var waveStrength = 1000;


var eCost = [
    [3, 6, 12, 24],
    [12, 25, 45, 70],
    [4, 9, 13, 19],
    [16, 32, 60, 90],
    [8, 15, 30, 55],
    [3, 6, 10, 16],
    [12, 24, 36, 48],
    [60, 125, 225, 300],
    [10, 20, 30, 40]
];

var eBias = [100, 0, 0, 0, 0, 0, 0, 0, 0];
var tempEBias = [100, 0, 0, 0, 0, 0, 0, 0, 0];

function resetPowerLevels() {
    eBias = [100, 0, 0, 0, 0, 0, 0, 0, 0];
    tempEBias = [100, 0, 0, 0, 0, 0, 0, 0, 0]
    powerLevel = 0;
}

function updateBias(wave) {
    for (let i = 0; i < biasList.length; i++) {
        let b = biasList[i];
        if (b[0] == wave) {
            eBias[b[1]] += b[2];
        }
    }
    resetTempEBias();
}

function resetTempEBias() {
    for (let i = 0; i < eBias.length; i++) {
        tempEBias[i] = eBias[i];
    }
}


//[wave, type, amount]
var planet1Bias = [[2, 1, 30], [3, 2, 20], [4, 1, 20], [5, 2, 20], [7, 1, 15], [8, 2, 15]];

var planet2Bias = [[0, 1, 20], [0, 2, 20], [2, 1, 20], [2, 2, 20], [3, 3, 20], [5, 4, 35], [6, 2, 10], [6, 3, 20], [7, 1, 10], [8, 4, 15]];

var planet3Bias = [[0, 1, 40], [0, 2, 40], [1, 1, 20], [2, 2, 20], [2, 3, 20], [2, 4, 35], [3, 5, 30], [4, 3, 20], [5, 4, 10], [5, 5, 10], [6, 6, 25], [8, 1, 10], [8, 3, 15], [9, 6, 15]];

var planet4Bias = [[0, 1, 50], [0, 2, 50], [1, 3, 25], [1, 4, 40], [2, 5, 30], [2, 6, 15], [3, 1, 15], [3, 2, 10], [4, 4, 15], [5, 7, 25], [5, 3, 25], [5, 5, 15], [5, 6, 15], [6, 8, 25], [7, 6, 10], [8, 7, 20], [8, 8, 20]];

var planet5Bias = [[0, 1, 60], [0, 2, 60], [0, 3, 30], [0, 5, 20], [1, 4, 40], [1, 6, 25], [2, 5, 20], [2, 8, 30], [3, 3, 20], [4, 6, 15], [5, 7, 25], [5, 8, 20], [7, 7, 15]];

var planet6Bias = [[0, 1, 65], [0, 2, 65], [0, 3, 40], [0, 4, 40], [0, 5, 30], [1, 6, 30], [1, 8, 40], [2, 4, 15], [2, 5, 15], [3, 3, 15], [3, 6, 15], [3, 7, 30], [6, 7, 30], [6, 8, 20]];

var biasList = planet1Bias;


var powerLevel = 0;

var difficultyMod = 1;

function calculatePowerLevel() {
    let g = 0.5 + 0.1 * (currentPlanet - 1) * difficultyMod;
    let s = 8 * (currentPlanet - 1) * difficultyMod;
    powerLevel = g * pow(waveCount, 2) + g * waveCount + s;
}

function pickStrength(biasArray) {
    let biasSum = 0;
    for (let i = 0; i < 4; i++) {
        biasSum += biasArray[i];
    }
    let r = random(0, biasSum);
    let strength = 1;
    if (biasSum == 0 && powerLevel > 50) {
        strength = 4;
    }
    biasSum = 0;
    for (let i = 0; i < 4; i++) {
        biasSum += biasArray[i];
        if (biasSum > r) {
            strength = i + 1;
            break;
        }
    }
    return strength;
}

function getBiasArray(enemyType) {
    let biasArray = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        let p = powerFunctions[enemyType](i + 1);
        if (p < 0) {
            p = -100;
        }
        biasArray[i] = max(biasFunctions[enemyType](p), 0);
    }
    return biasArray;
}



var powerFunctions = [circlePower, squarePower, trianglePower, hexagonPower, plusPower, gliderPower, trapezoidPower, octogonPower, ringPower];
var intervalFunctions = [circleInterval, squareInterval, triangleInterval, hexagonInterval, plusInterval, gliderInterval, trapezoidInterval, octogonInterval, ringInterval];
var biasFunctions = [circleBias, squareBias, triangleBias, hexagonBias, plusBias, gliderBias, trapezoidBias, octogonBias, ringBias];


function circlePower(s) {
    return powerLevel - (s - 1) * 20 + 5;
}

function circleInterval(p) {
    return [max(0.25, 0.85 - 0.0115 * p), max(0.5, 1.5 - 0.019 * p)];
}

function circleBias(p) {
    if (p <= 20) {
        return 20 + 4 * p;
    } else if (p <= 30) {
        return 100;
    } else {
        return 100 - (p - 30) * 3;
    }
}



function squarePower(s) {
    return powerLevel - (s - 1) * 25;
}

function squareInterval(p) {
    return [max(0.5, 1.6 - 0.012 * p), max(0.8, 2 - 0.012 * p)];
}

function squareBias(p) {
    if (p <= 25) {
        return 25 + 3 * p;
    } else if (p <= 40) {
        return 100;
    } else {
        return 100 - (p - 40) * 4;
    }
}



function trianglePower(s) {
    return powerLevel - (s - 1) * 20 - 10;
}

function triangleInterval(p) {
    return [max(0.15, 0.6 - 0.0075 * p), max(0.3, 0.9 - 0.01 * p)];
}

function triangleBias(p) {
    if (p <= 30) {
        return 40 + 2 * p;
    } else {
        return 100 - (p - 30) * 4;
    }
}



function hexagonPower(s) {
    return powerLevel - (s - 1) * 25 - 10;
}

function hexagonInterval(p) {
    return [max(0.65, 1.75 - 0.014 * p), max(1, 2.25 - 0.0165 * p)];
}

function hexagonBias(p) {
    if (p <= 30) {
        return 10 + p * 3;
    } else if (p <= 40) {
        return 100;
    } else {
        return 100 - (p - 40) * 4;
    }
}



function plusPower(s) {
    return powerLevel - (s - 1) * 15 - 20;
}

function plusInterval(p) {
    return [max(0.35, 0.8 - 0.007 * p), max(0.6, 1.3 - 0.014 * p)];
}

function plusBias(p) {
    if (p <= 25) {
        return 50 + 2 * p;
    } else if (p <= 35) {
        return 100;
    } else {
        return 100 - (p - 35) * 4;
    }
}



function gliderPower(s) {
    return powerLevel - (s - 1) * 20 - 15;
}

function gliderInterval(p) {
    return [max(0.1, 0.25 - 0.003 * p), max( 0.2, 0.45 - 0.006 * p)];
}

function gliderBias(p) {
    if (p <= 25) {
        return 50 + 2 * p;
    } else {
        return 100 - (p - 25) * 3;
    }
}



function trapezoidPower(s) {
    return powerLevel - (s - 1) * 20 - 35;
}

function trapezoidInterval(p) {
    return [max(0.35, 1 - 0.0125 * p), max(0.6, 1.35 - 0.0125 * p)];
}

function trapezoidBias(p) {
    if (p <= 20) {
        return 40 + 3 * p;
    } else if (p <= 35) {
        return 100;
    } else {
        return 100 - (p - 35) * 4;
    }
}



function octogonPower(s) {
    return powerLevel - (s - 1) * 35 - 40;
}

function octogonInterval(p) {
    return [max(1, 2 - 0.0075 * p), max(1.5, 2.75 - 0.015 * p)];
}

function octogonBias(p) {
    if (p <= 30) {
        return 40 + 3 * p;
    } else if (p <= 50) {
        return 100;
    } else {
        return 100 - (p - 50) * 5;
    }
}



function ringPower(s) {
    return powerLevel - (s - 1) * 25 - 30;
}

function ringInterval(p) {
    return [max(0.35, 1 - 0.0125 * p), max(0.55, 1.25 - 0.0125 * p)];
}

function ringBias(p) {
    if (p <= 10) {
        return 10 * p;
    } else if (p <= 30) {
        return 100;
    } else {
        return 100 - (p - 30) * 2.5;
    }
}


