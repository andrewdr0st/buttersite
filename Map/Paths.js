//0-up   1-right   2-down   3-left

var pathList;


var path1 = [[0, 6], [1, 6], [2, 3], [1, 2], [0, 7], [1, 7], [2, 4], [3, 3], [2, 6]];


var path2 = [[3, 0], [2, 8], [1, 2], [2, 2], [1, 4], [0, 6], [1, 2], [2, 5], [1, 3], [2, 3]];


var path3 = [[12, 0], [2, 2], [3, 9], [2, 7], [1, 2], [0, 1], [1, 1], [0, 1], [1, 1], [0, 1], [1, 1], [0, 1], [1, 9]];


var path4 = [[0, 8], [1, 9], [0, 3], [3, 3], [0, 3], [1, 6], [2, 9], [3, 5], [2, 1]];


var path5 = [[7, 13], [0, 4], [3, 4], [0, 5], [1, 2], [0, 1], [1, 9], [2, 5], [3, 3], [2, 4]];


var path6 = [[0, 4], [1, 4], [2, 6], [1, 8], [0, 2], [3, 3], [0, 2], [1, 5], [0, 3], [3, 1], [0, 2]];


var path7 = [[4, 0], [2, 4], [1, 7], [0, 2], [1, 3], [2, 4], [3, 3], [2, 1], [3, 1], [2, 1], [3, 1], [2, 1], [3, 1], [2, 1], [3, 7]];


var path8 = [[13, 13], [0, 8], [3, 2], [0, 3], [3, 2], [2, 1], [3, 5], [2, 4], [1, 3], [2, 3], [3, 6]];


var path9 = [[0, 4], [1, 5], [2, 6], [1, 5], [0, 2], [1, 6], [0, 5], [3, 2], [2, 2], [3, 7], [0, 4]];


var path10 = [[3, 0], [2, 10], [1, 3], [0, 2], [1, 2], [2, 2], [1, 3], [0, 5], [3, 2], [0, 2], [1, 5], [2, 1], [1, 1], [2, 8]];


var path11 = [[5, 13], [0, 4], [1, 5], [2, 1], [1, 4], [0, 8], [3, 2], [2, 3], [3, 7], [0, 4]];


var path12 = [[0, 10], [1, 8], [0, 4], [3, 4], [0, 3], [1, 6], [2, 5], [1, 5], [0, 1], [1, 2]];


var bossPath1 = [[0, 8], [1, 4], [2, 2], [1, 3], [0, 2], [1, 5], [2, 3], [1, 2], [0, 7], [3, 1], [0, 1], [3, 1], [0, 1], [3, 4], [2, 3], [3, 2], [0, 1], [3, 2], [2, 1], [3, 3]];

var bossPath2 = [[12, 0], [2, 3], [3, 8], [2, 3], [1, 4], [2, 1], [1, 6], [0, 2], [1, 2], [2, 5], [3, 10], [2, 1], [3, 3], [2, 1]];


var normalPaths = [path1, path3, path4, path6, path7, path11, path12];

var hardPaths = [path2, path5, path8];

var easyPaths = [path9, path10];

var bossPaths = [bossPath1, bossPath2];


function pickNormalPath() {
    let r = floor(random(0, normalPaths.length));
    let p = normalPaths[r];
    normalPaths.splice(r, 1);
    return p;
}

function pickHardPath() {
    let r = floor(random(0, hardPaths.length));
    let p = hardPaths[r];
    hardPaths.splice(r, 1);
    return p;
}

function pickEasyPath() {
    let r = floor(random(0, easyPaths.length));
    let p = easyPaths[r];
    easyPaths.splice(r, 1);
    return p;
}

function pickBossPath() {
    let r = floor(random(0, bossPaths.length));
    let p = bossPaths[r];
    bossPaths.splice(r, 1);
    return p;
}


function calcPathLength(p) {
    let len = 0;
    for (let i = 1; i < p.length; i++) {
        len += p[i][1];
    }
    return len;
}

