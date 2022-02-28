import { fillCase, isValidCol } from './puissance4.js';

// function() {

// }

// function getBestCol(game) {
//     let currCol = Math.floor(Math.random() * ((game.grid.w + 1) - 1) + 1);
//     let bestScore = 0;
//     for (let i = 0; i < game.grid.w; i++) {
//         let map = Object.assign({}, game.grid.map);

//         console.log(map);
//     }

//     return currCol;
// }

function check_hori(grid, currPlayer, x, y) {
    let conn = 0;
    let opp = 0;
    let empty = 0;

    let i = y - 1;
    while (i >= 0 && grid.map[x][i].use == currPlayer) {
        conn++;
        i--;
    }
    i = y - 1;
    while (i >= 0 && grid.map[x][i].use != -1 && grid.map[x][i].use != currPlayer) {
        opp++;
        i--;

    }
    i = y - 1;
    while (i >= 0 && grid.map[x][i].use == -1) {
        empty++;
        i--;
    }
    i = y + 1;
    while (i < grid.h && grid.map[x][i] && grid.map[x][i].use == currPlayer) {
        conn++;
        i++;
    }
    i = y + 1;
    while (i < grid.h && grid.map[x][i].use != -1 && grid.map[x][i].use != currPlayer) {
        opp++;
        i++
    }
    i = y + 1;
    while (i < grid.h && grid.map[x][i].use == -1) {
        empty++;
        i++;
    }
    // console.log('HORI', 'conn:', conn, "opp:", opp, 'empty:', empty);

    return { conn, opp, empty };
}

function check_verti(grid, currPlayer, x, y) {
    let conn = 0;
    let opp = 0;
    let empty = 0;

    let i = x - 1;
    while (i >= 0 && grid.map[i][y] && grid.map[i][y].use == currPlayer) {
        conn++;
        i--;
    }
    i = x - 1;
    while (i >= 0 && grid.map[i][y] && grid.map[i][y].use != -1 && grid.map[i][y].use != currPlayer) {
        opp++;
        i--;
    }
    i = x - 1;
    while (i >= 0 && grid.map[i][y] && grid.map[i][y].use == -1) {
        empty++;
        i--;
    }
    i = x + 1;
    while (i < grid.w && grid.map[i][y] && grid.map[i][y].use == currPlayer) {
        conn++;
        i++
    }
    i = x + 1;
    while (i < grid.w && grid.map[i][y] && grid.map[i][y].use != -1 && grid.map[i][y].use != currPlayer) {
        opp++;
        i++
    }
    i = x + 1;
    while (i < grid.w && grid.map[i][y] && grid.map[i][y].use == -1) {
        empty++;
        i++;
    }
    // console.log('VERTI', 'conn:', conn, "opp:", opp, 'empty:', empty);

    return { conn, opp, empty };
}

function check_diag_desc(grid, currPlayer, x, y) {
    let conn = 0;
    let opp = 0;
    let empty = 0;

    let i = x - 1;
    let j = y - 1;
    while (i >= 0 && j >= 0 && grid.map[i][j].use == currPlayer) {
        conn++;
        i--;
        j--;
    }
    i = x - 1;
    j = y - 1;
    while (i >= 0 && j >= 0 && grid.map[i][j].use != -1 && grid.map[i][j].use != currPlayer) {
        opp++;
        i--;
        j--;
    }
    i = x - 1;
    j = y - 1;
    while (i >= 0 && j >= 0 && grid.map[i][j].use == -1) {
        empty++;
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
    i = x + 1;
    j = y + 1;
    while (i < grid.w && j < grid.h && grid.map[i][j].use != -1 && grid.map[i][j].use != currPlayer) {
        opp++;
        i++;
        j++;
    }
    i = x + 1;
    j = y + 1;
    while (i < grid.w && j < grid.h && grid.map[i][j].use == -1) {
        empty++;
        i++;
        j++;
    }
    // console.log('diag DESC', 'conn:', conn, "opp:", opp, 'empty:', empty);

    return { conn, opp, empty };
}

function check_diag_asc(grid, piece, x, y) {
    let conn = 0;
    let empty = 0;
    let opp = 0;

    let i = x - 1;
    let j = y + 1;
    while (i >= 0 && j < grid.h && grid.map[i][j].use == piece) {
        conn++;
        i--;
        j++;
    }
    i = x - 1;
    j = y + 1;
    while (i >= 0 && j < grid.h && grid.map[i][j].use != -1 && grid.map[i][j].use != piece) {
        opp++;
        i--;
        j++;
    }
    i = x - 1;
    j = y + 1;
    while (i >= 0 && j < grid.h && grid.map[i][j].use == -1) {
        empty++;
        i--;
        j++;
    }
    i = x + 1;
    j = y - 1;
    while (i < grid.w && j >= 0 && grid.map[i][j].use == piece) {
        conn++;
        i++;
        j--;
    }
    i = x + 1;
    j = y - 1;
    while (i < grid.w && j >= 0 && grid.map[i][j].use != -1 && grid.map[i][j].use != piece) {
        opp++;
        i++;
        j--;
    }
    i = x + 1;
    j = y - 1;
    while (i < grid.w && j >= 0 && grid.map[i][j].use == -1) {
        empty++;
        i++;
        j--;
    }
    // console.log('diag ASC', 'conn:', conn, "opp:", opp, 'empty:', empty);
    return { conn, opp, empty };
}


function getValidLocation(grid) {
    let loc = [];
    let row = 0;
    // console.log('grid :', grid);
    for (let col = 0; col < grid.w; col++) {
        if ((row = isValidCol(grid, col)) >= 0)
            loc.push([col, row]);
    }
    return loc;
}

function evaluateScore(link) {
    let score = 0
    link.conn++;
    if (link.conn == 4)
        score += 100;
    else if (link.conn == 3 || link.empty == 1)
        score += 5;
    else if (link.conn == 2 || link.empty == 2)
        score += 2;

    if (link.opp == 3 || link.empty == 1)
        score -= 4;
    // console.log('diag ASC', 'conn:', link.conn, "opp:", link.opp, 'empty:', link.empty);
    return score
}

function scorePosition(game, grid, col, row) {
    let score = 0;

    // console.log('score pos =>  ', 'col', col, 'row', row);
    score += evaluateScore(check_hori(grid, game.ia, col, row));
    score += evaluateScore(check_verti(grid, game.ia, col, row));
    score += evaluateScore(check_diag_asc(grid, game.ia, col, row));
    score += evaluateScore(check_diag_desc(grid, game.ia, col, row));

    return score;

}

function pick_best_move(grid, game) {
    // console.log("pick==> grid:", grid)
    let validLocations = getValidLocation(grid);
    let bestScore = -10000;
    let row = 0;
    let best_col = Math.floor(Math.random() * ((grid.w + 1) - 1) + 1);

    for (let col = 0; validLocations[col]; col++) {
        if ((row = isValidCol(grid, col)) == -1) {
            return -1;
        }

        // console.log('BEFORE IN MAP', game.grid.map[col][row].use);
        let tmp_grid = Object.assign({}, grid);
        tmp_grid.map[col][row].use == game.ia;

        let score = scorePosition(game, tmp_grid, col, row);
        if (score < 0) {
            bestScore = score;
            best_col = col;
            break;
        }
        if (score > bestScore) {
            bestScore = score;
            best_col = col;
        }

    }
    return { best_col, bestScore };
}

function minmax(game, grid, depth, alpha, beta, maximizingPlayer) {
    let validLocations = getValidLocation(grid);
    let currCol = Math.floor(Math.random() * ((grid.w + 1) - 1) + 1);

    console.log("depth", depth)
    if (depth == 0) {
        let bestScore = 0;
        for (let i = 0; validLocations[i]; i++) {
            let col = validLocations[i][0];
            let row = validLocations[i][1];
            let score = scorePosition(game, grid, col, row);
            if (bestScore < score) {
                bestScore = score;
                currCol = i;
            }
        }
        return { currCol: currCol, value: bestScore };

    }
    if (maximizingPlayer) {
        let value = -Infinity;
        for (let i = 0; validLocations[i]; i++) {
            let col = validLocations[i][0];
            let row = validLocations[i][1];

            console.log('BEFORE IN MAP', game.grid.map[col][row].use);
            let tmp_grid = Object.assign({}, grid.map);
            tmp_grid.map[col][row].use = game.ia;
            console.log('EMPLACEMENT TMP:', tmp_grid.map[col][row].use,
                'IN MAP', game.grid.map[col][row].use);
            // console.log(grid);

            let newscore = minmax(game, tmp_grid, depth - 1, alpha, beta, false).value;
            if (newscore > value) {
                value = newscore;
                currCol = col;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta)
                break
        }
        return { currCol, value };
    } else {
        let value = Infinity;
        for (let i = 0; validLocations[i]; i++) {
            let col = validLocations[i][0];
            let row = validLocations[i][1];

            let tmp_grid = Object.assign({}, grid);
            tmp_grid.map[col][row].use == game.ia;
            // console.log(grid);

            let newscore = minmax(game, tmp_grid, depth - 1, alpha, beta, true).value;
            // console.log(newscore);
            if (newscore < value) {
                value = newscore;
                currCol = col;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta)
                break
        }
        return { currCol, value };
    }
}

export function playIA(game) {
    let currCol = 0;
    let currPlayer = game.currPlayer;
    let value = undefined;
    let res = null;
    // if (game.player[currPlayer].id == game.ia) {
    // calcul la colone selectionnée
    // let res = minmax(game, game.grid, 2, -Infinity, Infinity, true);
    // currCol = res.currCol;
    // value = res.value;
    // }
    if ((res = pick_best_move(game.grid, game)).best_col < 0)
        currCol = 0;
    currCol = res.best_col;
    // console.log('col: ', currCol, 'value', value);
    if (fillCase(game.grid, currCol, game.player[currPlayer].color, game.player[currPlayer].id, game))
        game.updateRound();
}