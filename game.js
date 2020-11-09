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
// var player = null;
var body = new Array();
var food = null;
var score = 0;
var wall = new Array();
var gameOver = true;


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
// Reset

function reset() {
    score = 0;
    dir = 0;
    body.length = 0;
    body.push(new Rectangle(590, 305, 30, 30));
    body.push(new Rectangle(0, 0, 20, 20));
    body.push(new Rectangle(0, 0, 20, 20));
    // body[0].x = 590;
    // body[0].y = 305;
    food.x = random(canvas.width / 10 - 1) * 10;
    food.y = random(canvas.height / 10 - 1) * 10;
    gameOver = false;
/* QUESTION: Why I can't define reset() as:
    function reset(
        init({..})
    )*/
};

//Canvas

    function paint(ctx) {
        var i = 0;
        var l = 0;
        // Clean Canvas
        ctx.fillStyle = 'rgb(252, 231, 165, 0.79)';
        ctx.fillRect(0, 0, 1200, 500);

        // body[0]
        ctx.fillStyle = 'rgb(192, 25, 25';
        for (i = 0, l = body.length; i < l; i += 1) {
            body[i].fill(ctx);
        }

        // Food
        ctx.fillStyle = 'rgb(0, 0, 18)';
        food.fill(ctx);

        // Enemies
        ctx.fillStyle = 'rgb(0 , 0, 125)';
        for ( i = 0, l = wall.length; i < l ; i += 1) {
            wall[i].fill(ctx);
        };

        //Debug Last Ker Pressed
        console.log(' LastPress: ' + lastPress);

        // Score
        ctx.fillText('Score: ' + score, 10, 30);
        ctx.font = "30px New Rocker";

        // Pause  & Game Over
        if (pause) {
            ctx.textAlign = 'center';
            if (gameOver) {
                ctx.fillText('GAME OVER', 600, 300)
            } else {
                ctx.fillText('PAUSE', 600, 300)
                }
                ctx.textAlign = 'left';
            };


    }

//Movement
function act(){
        // x += 2;
        //  if (x > canvas.width){
        //      x = 0;
        // }
    var i;
    var l;

    if (!pause) {
// GameOver Reset
        if (gameOver) {
            reset();
        }

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
    // Move Body

    for (i = body.length - 1; i > 0; i -= 1) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
        }
        if (dir == 0) {
        body[0].y -= 10;
        }
        if (dir == 1) {
        body[0].x += 10;
        }
        if (dir == 2) {
        body[0].y += 10;
        }
        if (dir == 3) {
        body[0].x -= 10;
        }

// Screen Out

        if (body[0].x > canvas.width) {
        body[0].x = 0;
        }
        if (body[0].y > canvas.height) {
        body[0].y = 0;
        }
        if (body[0].x < 0) {
        body[0].x = canvas.width;
        }
        if (body[0].y < 0) {
        body[0].y = canvas.height;
        }
    }

    // Pause/Unpause
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }


    // Intersections & Food
    if (body[0].intersects(food)) {
        // Grow Up
        body.push(new Rectangle(food.x, food.y, 20, 20))
        //
        score += 1*100;
        food.x = random(canvas.width / 10 - 1) * 10;
        food.y = random(canvas.height / 10 - 1) * 10;
        }

    // Intersections & Enemies
    for (i = 0, l = wall.length; i < l; i += 1) {
        if (food.intersects(wall[i])) {
        food.x = random(canvas.width / 10 - 1) * 10;
        food.y = random(canvas.height / 10 - 1) * 10;
        }

        if (body[0].intersects(wall[i])) {
        gameOver = true;
        pause = true;
        }
    }

    // Body Intersects
    for (i = 2, l = body.length; i < l; i += 1) {

        if (body[0].intersects(body[i])) {
        gameOver = true;
        pause = true;
        }
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

    // Add New body[0]
    body[0] = new Rectangle(590, 305, 20, 20);

    // Add Food
    food = new Rectangle(80, 80, 10, 10);

    // Add Enemies

    wall.push(new Rectangle(400, 100, 30, 30));
    wall.push(new Rectangle(400, 200, 30, 30));
    wall.push(new Rectangle(800, 100, 30, 30));
    wall.push(new Rectangle(800, 200, 30, 30));

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

