// Variables

var canvas = null,
    ctx = null;
// var x = 600;
// var y = 300;
var lastPress = null;

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

var dir = 0;
var pause = true;
var player = null;
var food = null;
var score = 0;


document.addEventListener('keydown', function (evt) {
    lastPress = evt.which;
}, false);

// Intersections
function Rectangle(x, y, width, height) {
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.width = (width == null) ? 0 : width;
    this.height = (height == null) ? this.width : height;
    this.intersects = function (rect) {
        if (rect == null) {
        window.console.warn('Missing parameters on function intersects');
        } else {
            return (this.x < rect.x + rect.width &&
                this.x + this.width > rect.x &&
                this.y < rect.y + rect.height &&
                this.y + this.height > rect.y);
        }
    };
    this.fill = function (ctx) {
        if (ctx == null) {
            window.console.warn('Missing parameters on function fill');
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}

// Add Score

function random(max) {
    return Math.floor(Math.random() * max);
}

//Canvas

    function paint(ctx) {
        // Clean Canvas
        ctx.fillStyle = 'rgb(252, 231, 165, 0.79)';
        ctx.fillRect(0, 0, 1200, 500);

        // Player
        ctx.fillStyle = 'rgb(192, 25, 25';
        player.fill(ctx);

        // Food
        ctx.fillStyle = 'rgb(0, 0, 18)';
        food.fill(ctx)

        //Debug Last Ker Pressed
        console.log(' LastPress: ' + lastPress);

        // Score
        ctx.fillText('Score: ' + score, 10, 30);
        ctx.font = "30px New Rocker";

        // Pause
        if (pause) {
            ctx.textAlign = 'center';
            ctx.fillText('PAUSE', 600, 300);
            ctx.textAlign = 'left';
        }

    }

//Movement
function act(){
        // x += 2;
        //  if (x > canvas.width){
        //      x = 0;
        // }
    if (!pause) {

// Direction
    // Key Press

        if (lastPress == KEY_UP) {
            dir = 0;
        }
        if (lastPress == KEY_RIGHT) {
        dir = 1;
        }
        if (lastPress == KEY_DOWN) {
        dir = 2;
        }
        if (lastPress == KEY_LEFT) {
        dir = 3;
        }

// Move

        if (dir == 0) {
        player.y -= 10;
        }
        if (dir == 1) {
        player.x += 10;
        }
        if (dir == 2) {
        player.y += 10;
        }
        if (dir == 3) {
        player.x -= 10;
        }

// Screen Out

        if (player.x > canvas.width) {
        player.x = 0;
        }
        if (player.y > canvas.height) {
        player.y = 0;
        }
        if (player.x < 0) {
        player.x = canvas.width;
        }
        if (player.y < 0) {
        player.y = canvas.height;
        }
    }

    // Pause/Unpause
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }

    // Intersection & Food
    if (player.intersects(food)) {
        score += 1*100;
        food.x = random(canvas.width / 10 - 1) * 10;
        food.y = random(canvas.height / 10 - 1) * 10;
        }
}

function repaint() {
    window.requestAnimationFrame(repaint);
    paint(ctx);
}

function run() {
    // window.requestAnimationFrame(run);
    setTimeout(run, 25)
    act();
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Add New Player
    player = new Rectangle(515, 275, 30, 30);

    // //Add Food
    food = new Rectangle(80, 80, 10, 10);

    run();
    repaint();
}

window.addEventListener('load', init, false);


// Window functions
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        }; }());

