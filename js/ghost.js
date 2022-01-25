'use strict'
var gGhosts;
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000) // change
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (gGame.isSuper) return;
        else gameOver(false);
        return;
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}

// function renderGhost(){
//     for (var i = 0; i < gGhosts.length; i++) {
//         var ghost = gGhosts[i];
//         var cell = gBoard[ghost.location.i][ghost.location.j];
//         cell.style.color = 'green';
        
//     }
// }

function getMoveDiff() {
    var randNum = getRandomInt(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function removeGhost(ghostLocation){
    for (var i = 0; i < gGhosts.length; i++) {
        var currLoc = gGhosts[i].location
        var currCont = gGhosts[i].currCellContent
       // var currGhost = gGhosts[i];
        if(currLoc.i === ghostLocation.i && currLoc.j === ghostLocation.j){
            gBoard[currLoc.i][currLoc.j] = currCont;
            renderCell(currLoc, currCont);
            var deadGhost = gGhosts.splice(i, 1)[0];
            gDeadGhosts.push(deadGhost);
        }
    }
}

// var currGhost = gGhosts[0];
// gBoard[currGhost.location.i][currGhost.location.j] = currGhost.currCellContent;
// renderCell(currGhost.location, currGhost.currCellContent);

function reviveGhost(){
    gGhosts = gGhosts.concat(gDeadGhosts);
    // console.log('combinde');
}