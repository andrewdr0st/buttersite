
/**
* Draws a sprite
* @param f function of the sprite
* @param x x-position
* @param y y-position
* @param r rotation
* @param s scale
*/
function drawSprite(f, x, y, r, s) {
    push();
    translate(x, y);
    scale(s);
    rotate(r);
    f();
    pop();
}

/**
* Draws a sprite. Allows arguments to be passed.
* @param f function of the sprite
* @param x x-position
* @param y y-position
* @param r rotation
* @param s scale
* @param a arguments
*/
function drawSpriteArgs(f, x, y, r, s, a) {
    push();
    translate(x, y);
    scale(s);
    rotate(r);
    f(a);
    pop();
}

/**
* Draws an object on the map. Uses grid positioning instead of pixel positioning.
* @param f function of the sprite
* @param x x-position on the grid
* @param y y-position on the grid
* @param r rotation
*/
function drawObject(f, x, y, r) {
    drawSprite(f, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, r, gameScale / 10);
}

/**
* Draws an object on the map. Uses grid positioning instead of pixel positioning. Can be scaled.
* @param f function of the sprite
* @param x x-position on the grid
* @param y y-position on the grid
* @param r rotation
* @param s scale
*/
function drawObjectScaled(f, x, y, r, s) {
    drawSprite(f, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, r, (gameScale / 10) * s);
}

/** 
* Draws an object on the map. Uses grid positioning instead of pixel positioning. Can be scaled. Allows an argument to be passed
* @param f function of the sprite
* @param x x-position on the grid
* @param y y-position on the grid
* @param r rotation
* @param s scale
* @param a arguments
*/
function drawObjectScaledArgs(f, x, y, r, s, a) {
    drawSpriteArgs(f, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, r, (gameScale / 10) * s, a);
}

/**
* Checks if the given point (a, b) is inside of the circle with center (x, y) and radius r.
* @param a x-position of the point
* @param b y-position of the point
* @param x x-position of the circle's center
* @param y y-position of the circle's center
* @param r radius of the circle
* @return true if the point is inside of the circle
*/
function pointInCircle(a, b, x, y, r) {
    var distPoints = (a - x) * (a - x) + (b - y) * (b - y);
    r *= r;
    if (distPoints < r) {
        return true;
    }
    return false;
};


/**
* Returns an array giving the x and y position of the tile that the mouse is currently inside of
* @return array like this - [x, y]
*/
function getMouseTile() {
    return [floor(mouseX / tileSize), floor(mouseY / tileSize)];
}


function shuffleArray(array) {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

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
}


var lastMillis = 0;
var timeScale = 0.001;
var deltaTime = 0;

function calculateDeltaTime() {
    deltaTime = (millis() - lastMillis) * timeScale;
    lastMillis = millis();
}
