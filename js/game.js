'use strict'
const WALL = '🧱'
const FOOD = '🪙'
const EMPTY = ' ';
const CHERRY = '🍒';
const PACMAN = '👼🏿';
const SUPER_FOOD = '🥦';
// const GHOST = '👻';
const GHOST = '@';
const FOOD_AUDIO = new Audio('sound/collect-sound.wav');
const CHERRY_AUDIO = new Audio('sound/cherry-sound.wav');
const SUPER_FOOD_AUDIO = new Audio('sound/superFood-sound.wav');
const JUMP_AUDIO = new Audio('sound/jump-sound.wav');
const SIZE = 10;

var gBoard;
var gIntervalCherry;
var gGame = {
    score: 0,
    isSuper: false,
    isOn: false
}

function init() {
    // console.log('Hello')
    buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container');
    renderEndGame();
   // addSuperFood();
    gGame.isOn = true;
    gGame.score = 0;
    var elEndGame = document.querySelector('.end-game');
    elEndGame.style.display = 'none';
    gIntervalCherry = setInterval(addCherry, 15000);
}


function buildBoard() {
    gBoard = [];
    for (var i = 0; i < SIZE; i++) {
        gBoard.push([]);
        for (var j = 0; j < SIZE; j++) {
            gBoard[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                gBoard[i][j] = WALL;
            }
        }
    }
    addSuperFood()
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(isWin) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    endGame(isWin)
}

function endGame(isWin) {
    if(isWin) gGame.score++;
    var msg = isWin ? 'won!' : 'lose';
    var elEndGame = document.querySelector('.end-game');
    elEndGame.style.display = 'block';
    var elGameOver = elEndGame.querySelector('span');
    elGameOver.innerText = 'Game over - you ' + msg;
}

function isVictory(){
    for(var i = 0; i < gBoard.length; i++){
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if(cell === FOOD) return false;
        }
    }
    return true;
}

// function restart(){
//     var elEndGame = document.querySelector('.end-game');
//     elEndGame.style.display = 'none';
//     gGame.score = 0;
// }

function addSuperFood(){
    console.log(gBoard);
    var location = {i:1 , j:1};
    gBoard[location.i][location.j] = SUPER_FOOD;
	//renderCell(location, SUPER_FOOD);

    location = {i:gBoard.length -2 , j:1};
    gBoard[location.i][location.j] = SUPER_FOOD;
	//renderCell(location, SUPER_FOOD);

    location = {i:1 , j:gBoard[0].length -2};
    gBoard[location.i][location.j] = SUPER_FOOD;
	//renderCell(location, SUPER_FOOD);

    location = {i:gBoard.length -2 , j:gBoard[0].length -2};
    gBoard[location.i][location.j] = SUPER_FOOD;
	//renderCell(location, SUPER_FOOD);
}

function addCherry() {
	var potentialCells = emptyCells();
    if(!potentialCells.length) return;
	var cell = drawNum(potentialCells);
	gBoard[cell.i][cell.j] = CHERRY;
	renderCell(cell, CHERRY);
}
