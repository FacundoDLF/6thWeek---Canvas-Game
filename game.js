// Variables

var canvas = null,
ctx = null;
var x = 50;
var y = 50;
var lastPress = null;
var KEY_LEFT = 37 , a,
    KEY_UP = 38 , w,
    KEY_RIGHT = 39 , d,
    KEY_DOWN = 40 , s ;
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
            x =0;
        }
    }

    function run() {
        window.requestAnimationFrame(run);
        act();
        setTimeout(run, 50)
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