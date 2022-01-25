'use strict'
var gDeg = 0
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gGame.isSuper) {
            removeGhost(nextLocation);
            // return;
        }
        else gameOver(false);
    } else if (nextCell === SUPER_FOOD) {
        if (!gGame.isSuper) superMode();
        else return;
        // console.log('super food');
        SUPER_FOOD_AUDIO.play();
    } else if (nextCell === FOOD) {
        updateScore(1);
        // console.log('food');
        FOOD_AUDIO.play();
    } else if (nextCell === CHERRY) {
        updateScore(10);
        // console.log('cherry');
        CHERRY_AUDIO.play();
    } else JUMP_AUDIO.play();
    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, pacmanToHtml())

    if (isVictory()) {
        gameOver(true);
        return;
    }
}

function superMode() {
    gGame.isSuper = true;
    var elBoard = document.querySelector('table');
    elBoard.style.backgroundColor = 'blue';
    setTimeout(() => {
        gGame.isSuper = false;
        elBoard.style.backgroundColor = 'black';
        reviveGhost()
    }, 5000);
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            gDeg = 0
            break;
        case 'ArrowDown':
            nextLocation.i++
            gDeg = 180
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gDeg = 270
            break;
        case 'ArrowRight':
            nextLocation.j++
            gDeg = 90
            break;
        default: return null;
    }
    return nextLocation;
}

function pacmanToHtml(){
    return `<div style="transform: rotate(${gDeg}deg)">${PACMAN}</div>`
}