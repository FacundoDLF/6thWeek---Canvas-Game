// Variables

var canvas = null,
    ctx = null;
    x = 120;
    y = 66;
    lastPress = null;

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

    dir = 0;
    pause = true;
    player = null;
    score = 0;


document.addEventListener('keydown', function (evt) {
    lastPress = evt.which;
}, false);

//Canvas Background

    function paint(ctx) {
        // Clean Canvas
        ctx.fillStyle = 'rgb(252, 231, 165)';
        ctx.fillRect(0, 0, 1200, 500);

        //Draw background
        ctx.fillStyle = 'rgb(78, 31, 31)';
        ctx.fillRect(x, y, 20, 20);

        //Debug Last Ker Pressed
        console.log(' LastPress: ' + lastPress);

        // Score
        ctx.fillText('Score: ' + score, 10, 20);
        ctx.font = "20px New Rocker";

        // pause Text
        if (pause) {
            ctx.textAlign = 'center';
            ctx.fillText('PAUSE', 600, 250);
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
        y -= 10;
        }
        if (dir == 1) {
        x += 10;
        }
        if (dir == 2) {
        y += 10;
        }
        if (dir == 3) {
        x -= 10;
        }

// Screen Out

        if (x > canvas.width) {
        x = 0;
        }
        if (y > canvas.height) {
        y = 0;
        }
        if (x < 0) {
        x = canvas.width;
        }
        if (y < 0) {
        y = canvas.height;
        }
    }

    // Pause/Unpause
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }

    // Intersection with Food
    if (player.intersects(food)) {
        score += 1;
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
    setTimeout(run, 50)
    act();
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Add New Player
    player = new Rectangle(40, 40, 10, 10);

    //Add Food
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

// Interaction

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
