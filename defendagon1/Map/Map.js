var mapTiles;
var placements;
var path;

var mapWidth = 17;
var mapHeight = 12;

let groundColor;
let pathColor;

function resetMapTiles() {
    mapTiles = [];
    for (let x = 0; x < mapWidth; x++) {
        mapTiles.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
}

function resetPlacementTiles() {
    placements = [];
    for (let x = 0; x < mapWidth; x++) {
        placements.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
}

function drawMap() {
    background(groundColor);
    fill(pathColor);
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            if (mapTiles[x][y] == 1) {
                rect(tileSize * x, tileSize * y, tileSize, tileSize);
            }
        }
    }
}

function createMap(pathArray, mapColors) {
    let mapC = getMapColors(mapColors);
    setMapColors(mapC[0], mapC[1]);
    resetMapTiles();
    resetPlacementTiles();
    setPath(pathArray);
}

function setMapColors(groundC, pathC) {
    groundColor = groundC;
    pathColor = pathC;
}

function getMapColors(id) {
    if (id == 0) {
        return [color(55, 145, 65), color(180, 135, 75)];
    } else if (id == 1) {
        return [color(130, 50, 30), color(120, 40, 20)];
    } else if (id == 2) {
        return [color(170, 170, 170), color(150, 150, 150)];
    } else if (id == 3) {
        return [color(130, 140, 150), color(120, 125, 135)];
    } else if (id == 4) {
        return [color(165, 140, 160), color(155, 130, 150)];
    } else if (id == 5) {
        return [color(40, 135, 75), color(160, 110, 65)];
    } else if (id == 6) {
        return [color(65, 140, 55), color(180, 140, 80)];
    } else if (id == 7) {
        return [color(50, 145, 70), color(175, 120, 80)];
    } else if (id == 8) {
        return [color(165, 175, 170), color(145, 155, 150)];
    } else if (id == 9) {
        return [color(120, 45, 70), color(110, 40, 60)];
    }
}

var temperateColors = [0, 5, 6, 7, 0];
var moonColors = [1, 2, 3, 4, 8];

function getTemperateColor() {
    let r = floor(random(0, temperateColors.length));
    let c = temperateColors[r];
    temperateColors.splice(r, 1);
    return c;
}

function getMoonColor() {
    let r = floor(random(0, moonColors.length));
    let c = moonColors[r];
    moonColors.splice(r, 1);
    return c;
}

function setPath(p) {
    path = p;
    let xPos = path[0][0] - 1;
    let yPos = path[0][1] - 1;

    for (let i = 1; i < path.length; i++) {
        let dir = path[i][0];
        if (dir == 0) {
            for (let j = 0; j < path[i][1]; j++) {
                yPos--;
                mapTiles[xPos][yPos] = 1;
                setPlacement(xPos, yPos);
            }
        } else if (dir == 1) {
            for (let j = 0; j < path[i][1]; j++) {
                xPos++;
                mapTiles[xPos][yPos] = 1;
                setPlacement(xPos, yPos);
            }
        } else if (dir == 2) {
            for (let j = 0; j < path[i][1]; j++) {
                yPos++;
                mapTiles[xPos][yPos] = 1;
                setPlacement(xPos, yPos);
            }
        } else {
            for (let j = 0; j < path[i][1]; j++) {
                xPos--;
                mapTiles[xPos][yPos] = 1;
                setPlacement(xPos, yPos);
            }
        }
    }
}

function checkPlacement(x, y) {
    if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) {
        return 1;
    }
    return placements[x][y];
}

function setPlacement(x, y) {
    placements[x][y] = 1;
}

function removePlacement(x, y) {
    placements[x][y] = 0;
}
