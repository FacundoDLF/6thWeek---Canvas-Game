// Variables

var canvas = null,
ctx = null;
var x = 50;
var y = 50;
var lastPress = null;
var KEY_LEFT = 37 ,
    KEY_UP = 38 ,
    KEY_RIGHT = 39 ,
    KEY_DOWN = 40;
var dir = 0;

//Canvas Background

    function paint(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 300, 150);
        ctx.fillText('lastPress: ' + lastPress, 0, 20);
        // ctx.fillRect(0, 0, 300, 150);

        ctx.fillStyle = '#0f0';
        ctx.fillRect(x, y, 10, 10);

    }

    //Movement

    function act(){
        x += 0.5;
        if (x > canvas.width){
            x = 0;
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

    function run() {
        window.requestAnimationFrame(run);
        act();
        setTimeout(run, 5000)
        }

    function repaint() {
        window.requestAnimationFrame(repaint);
        paint(ctx);
    }


    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        run(ctx);
        repaint();
    }

    document.addEventListener('keydown', function(evt) {
        lastPress = evt.which;
    }, false);


// Window functions

window.addEventListener('load', init, false);
window.requestAnimationFrame = (function () { return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) { window.setTimeout(callback, 17); }; }());