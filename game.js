// Variables

var canvas = null,
ctx = null;
var x = 50;
var y = 50;
var lastPress = null;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;
var dir = 0;
var pause = true;


document.addEventListener('keydown', function (evt) {
    lastPress = evt.which;
    }, false);

//Canvas Background

    function paint(ctx) {
        // Clean Canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 300, 150);

        //Draw background
        ctx.fillStyle = '#0f0';
        ctx.fillRect(x, y, 10, 10);

        //Debug Last Ker Pressed
        ctx.fillText('lastPress: ' + lastPress, 0, 20);
            // ctx.fillRect(0, 0, 300, 150);

        // pause Text
        if (pause) {
            ctx.textAlign = 'center';
            ctx.fillText('PAUSE', 150, 75);
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