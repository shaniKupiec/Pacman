function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function renderEndGame(){
  var strHTML = `<div class="end-game"> <button onclick = "init()" > Restart </button > <span></span> </div > `;
  var elContainer = document.querySelector('.board-container');
  elContainer.innerHTML += strHTML;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawNum(array) {
  var idx = getRandomInt(0, array.length - 1);
  var num = array[idx];
  array.splice(idx, 1);
  return num;
}

function emptyCells() {
	var res = [];
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			var cell = gBoard[i][j];
			if (cell === EMPTY) res.push({ i: i, j: j });
		}
	}
	return res;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}