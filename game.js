var canvas = null,
ctx = null;
var x = 50;
var y = 50;

    function paint(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 100, 60);
        // ctx.fillRect(0, 0, 300, 150);

        ctx.fillStyle = '#0f0';
        ctx.fillRect(x, y, 10, 10);

    }

    function run() {
        window.requestAnimationFrame(run);
        act();
        paint(ctx);
        }

    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        run(ctx);
    }

window.addEventListener('load', init, false);