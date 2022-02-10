// setTimeout(function() {
//     while (true) {
//         $("#fractalC").attr('src', 'fractal-' + i + '.png');
//         i++;
//     }
// }, 2000);

let fractals = 2;
let dooms = 2;
let engine = 1;

// set timeout
var tid = setTimeout(loopTimedFractal, 4000);
var tid2 = setTimeout(loopTimedDoom, 4000);
var tid3 = setTimeout(loopTimedEngine, 4000);


function loopTimedFractal() {
    $("#fractalC").attr('src', 'img/fractal-' + fractals + '.png');
    if (++fractals == 14)
        fractals = 1;
    tid = setTimeout(loopTimedFractal, 4000); // repeat myself
}

function loopTimedDoom() {
    $("#doomImg").attr('src', 'img/doom-' + dooms + '.png');
    if (++dooms == 7)
        dooms = 1;
    tid2 = setTimeout(loopTimedDoom, 4020); // repeat myself
}

function loopTimedEngine() {
    $("#engine").attr('src', 'img/engine-' + engine + '.png');
    if (++engine == 5)
        engine = 0;
    tid3 = setTimeout(loopTimedEngine, 4042); // repeat myself
}

function abortTimer() { // to be called when you want to stop the timer
    clearTimeout(tid);
    clearTimeout(tid2);
    clearTimeout(tid3);
}