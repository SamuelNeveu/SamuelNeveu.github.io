import { frame, endFrame } from './confetti.js';
import { playIA } from './minmax.js';
var audio = new Audio('./asset/iwon.mp3');

class Player {
    constructor(color, id) {
        this.id = id;
        this.color = color;
        this.score = 0;
    }
}

class Cel {
    constructor(x, y, posX, posY) {
        this.x = x;
        this.y = y;
        this.posX = posX;
        this.posY = posY;
        this.use = -1;
    }
}

class Grid {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.map = createMap(w, h);
        this.stepX = $(".area")[0].width / w;
        this.stepY = $(".area")[0].height / h;
    }
}

class Game {
    constructor(nb_player, colors) {
        this.nb_player = nb_player;
        this.colors = colors;
        this.round = 0;
        this.run = true;
        this.ia = -1;
        this.currPlayer = 0;
        this.grid = null;
        this.round = -1;

        this.player = [];
        for (let i = 0; colors[i]; i++) {
            if (colors[i] == "#3BD2D6") {
                this.ia = i;
            }
            this.player.push(new Player(colors[i], i));
        }
    }

    updateRound() {
        this.round++;
        this.currPlayer = this.round % this.nb_player;

        $('#round').html('Round : ' + this.round + '<br>Player ' + (this.currPlayer + 1));
        $('#round').css('background-color', this.player[this.currPlayer].color);
    }
}

function drawCircle(ctx, color, x, y, caseW, caseH) {
    let centerX = (x + caseW / 2);
    let centerY = (y + caseH / 2);
    let radius = caseW / 3.3;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 360, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function createMap(w, h) {
    let map = [];
    let canvas = $('.area').get(0);
    let ctx = canvas.getContext("2d");

    let CaseX = canvas.width / w;
    let CaseY = canvas.height / h;

    let startX = 0;
    for (let x = 0; x < w; x++) {
        let col = [];
        let startY = 0;
        for (let y = 0; y < h; y++) {
            col.push(new Cel(x, y, startX, startY));
            drawCircle(ctx, 'white', startX, startY, CaseX, CaseY);
            startY += CaseY;
        }
        map.push(col);
        startX += CaseX;
    }
    return map;
}

function isCaseFull(grid) {
    let count = 0;
    for (let i = 0; i < grid.w; i++) {
        for (let j = 0; j < grid.h; j++) {
            if (grid.map[i][j].use == -1)
                count++;
        }
    }
    if (count == 0)
        return true;
    return false;
}

function animateFill(ctx, grid, col, i, color, x) {
    drawCircle(ctx, color, col * grid.stepX, x * grid.stepY, grid.stepX, grid.stepY);
    if (x < i) {
        setTimeout(function() {
            if (x != i)
                drawCircle(ctx, 'white', col * grid.stepX, x * grid.stepY, grid.stepX, grid.stepY);
            x++;
            drawCircle(ctx, color, col * grid.stepX, x * grid.stepY, grid.stepX, grid.stepY);
            animateFill(ctx, grid, col, i, color, x);
        }, 42);
    }
}

export function isValidCol(grid, col) {
    console.log('fill--> col: ', col, 'grid',
        grid);

    let i = grid.h - 1;
    console.log('i', i, col);
    while (i > 0 && grid.map[col][i].use != -1) {
        --i;
    }
    if (i >= 0) {
        return i;
    } else {
        return -1;
    }
}

export function fillCase(grid, col, color, playerId, game) {
    let canvas = $('.area').get(0);
    let ctx = canvas.getContext("2d");

    // console.log('fill--> col: ', col, grid);

    let row = 0;
    if ((row = isValidCol(grid, col)) == -1) {
        console.log('col full');
        return 'Col Full';
    }
    grid.map[col][row].use = playerId;
    animateFill(ctx, grid, col, row, color, 0);
    check_win(grid, playerId, col, row, game);
    if (isCaseFull(grid)) {
        egality(game);
        return false
    }
    return true;
}


function check_hori(grid, currPlayer, x, y) {
    let conn = 0;
    let i = y - 1;
    while (i >= 0 && grid.map[x][i].use == currPlayer) {
        conn++;
        i--;
    }
    i = y + 1;
    while (i < grid.h && grid.map[x][i] && grid.map[x][i].use == currPlayer) {
        conn++;
        i++;
    }
    if (conn == 3)
        return true;
    return false;
}

function check_verti(grid, currPlayer, x, y) {
    let conn = 0;

    let i = x - 1;
    while (i >= 0 && grid.map[i][y] && grid.map[i][y].use == currPlayer) {
        conn++;
        i--;
    }
    i = x + 1;
    while (i < grid.w && grid.map[i][y] && grid.map[i][y].use == currPlayer) {
        conn++;
        i++
    }
    if (conn == 3)
        return true;
    return false;
}

function check_diag_desc(grid, currPlayer, x, y) {
    let conn = 0;
    let i = x - 1;
    let j = y - 1;
    while (i >= 0 && j >= 0 && grid.map[i][j].use == currPlayer) {
        conn++;
        i--;
        j--;
    }
    i = x + 1;
    j = y + 1;
    while (i < grid.w && j < grid.h && grid.map[i][j].use == currPlayer) {
        conn++;
        i++;
        j++;
    }
    if (conn == 3)
        return true;
    return false;
}

function check_diag_asc(grid, currPlayer, x, y) {
    let conn = 0;
    let i = x - 1;
    let j = y + 1;
    while (i >= 0 && j < grid.h && grid.map[i][j].use == currPlayer) {
        conn++;
        i--;
        j++;
    }
    i = x + 1;
    j = y - 1;
    while (i < grid.w && j >= 0 && grid.map[i][j].use == currPlayer) {
        conn++;
        i++;
        j--;
    }
    if (conn == 3)
        return true;
    return false;
}


function egality(game) {
    $("#win").html("Egality! Retry ?<br><br>Reset for new game");
    game.run = false;
    game.round = 0;
    displayScore(game);
}

function win(winner, game) {
    $("#win").html("PLAYER " + (winner + 1) + "WIN !!!<br><br>Reset for new game");
    game.run = false;
    game.player[winner].score += 1;
    game.round = 0;
    frame();
    audio.play();
    displayScore(game);
}

function check_win(grid, currPlayer, x, y, game) {
    if (check_hori(grid, currPlayer, x, y))
        win(currPlayer, game);
    if (check_verti(grid, currPlayer, x, y))
        win(currPlayer, game);
    if (check_diag_desc(grid, currPlayer, x, y))
        win(currPlayer, game);
    if (check_diag_asc(grid, currPlayer, x, y))
        win(currPlayer, game);
}



(function($) {
    $.fn.puissance4 = function(options) {
        let row = options.width < 4 ? 4 : options.width;
        let col = options.height < 4 ? 4 : options.height;
        let grid = new Grid(row, col);

        let colors = options.player;
        let nb_player = options.player.length;
        let game = new Game(nb_player, colors);
        game.grid = grid;
        game.updateRound();
        displayScore(game);

        $('.area').on('click', (e) => {
            if (game.run == true) {
                let mouseX = e.pageX - $(this).offset().left;
                // let mouseY = e.pageY - $(this).offset().top;
                // console.log(e.pageX);
                let currCol = 0;

                // Choisi le joueur et sa couleur  
                let currPlayer = game.currPlayer;
                // calcul la colone selectionnée
                while (mouseX > game.grid.stepX * currCol) {
                    currCol++;
                }
                if (fillCase(game.grid, currCol - 1, game.player[currPlayer].color, game.player[currPlayer].id, game) != 'Col Full') {

                    game.updateRound();
                    if (game.currPlayer == game.ia && game.run) {
                        setTimeout(function() {
                            playIA(game);
                        }, 300);
                    }

                }
            }
        });


        $('.reset').on('click', () => {
            game.grid = new Grid(row, col);
            game.run = true;
            game.round = 0;
            game.currPlayer = Math.floor(Math.random() * (game.nb_player));
            if (game.currPlayer == game.ia) {
                setTimeout(function() {
                    playIA(game);
                }, 300);
            }
            // console.log(game.currPlayer, game.nb_player);
            endFrame();
            $('#win').html('');
        })
    };
}(jQuery));

function displayScore(game) {
    $(".playerScore").html("");
    for (let i = 0; i < game.nb_player; i++) {
        let html = $(".playerScore").html();
        html += `<div class="playerScore_` + (i + 1) + `">
        <div>Player ` + (i + 1) + `</div>
        <div id="score_` + (i + 1) + `">` + game.player[i].score + `</div></div>`;
        $(".playerScore").html(html);
        $(".playerScore_" + (i + 1)).css('background-color', game.player[i].color);
    }
}

let rouge = '#ff0000';
let jaune = '#FFD700';
let vert = "#00FF00";
let bleu = "#0000ff";
let rose = "#F45086";
let IA = "#3BD2D6";
$('.area').puissance4({ width: 7, height: 6, player: [rouge, IA] })