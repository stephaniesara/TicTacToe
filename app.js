// var grid = document.getElementById('#grid');
// grid.addEventListener("click", funciont() {
// 	document.getElementById("")
// })


// MODEL

var initBoard = (size) => {
	var board = [];
	for (var i = 0; i < size; i++) {
		board[i] = new Array(size).fill(null);
	}
	return board;
}

var toggleSquareModel = (row, col) => {
	board[row][col] = player;
};

var hasTie = () => {
	var isFull = true;
	board.forEach((row) => {
		row.forEach((square) => {
			if (square === null) {
				isFull = false;
			}
		});
	});
	return isFull;
};

var isRowFull = (row) => {
	return board[row].every((square) => {
		return square === player;
	});
};

var isColFull = (col) => {
	for (var i = 0; i < size; i++) {
		if (board[i][col] !== player) {
			return false;
		}
	}
	return true;
};

var isMajorDiagFull = (row, col) => {
	if (row + col !== 2) {
		return false;
	}
	if (board[0][2] !== player || board[1][1] !== player || board[2][0] !== player) {
		return false;
	}
	return true;
};

var isMinorDiagFull = (row, col) => {
	if (row !== col) {
		return false;
	}
	if (board[0][0] !== player || board[1][1] !== player || board[2][2] !== player) {
		return false;
	}
	return true;
};

var hasWinner = (row, col) => {
	return (isRowFull(row) || isColFull(col) || isMajorDiagFull(row, col) || isMinorDiagFull(row, col) );
};

var isGameOver = (row, col) => {
	if (hasWinner(row, col)) {
		updateMessageView('Game over! The winner is ' + symbols[player] + '!');
		return true;
	} else if (hasTie()) {
		updateMessageView('Game over! Both players have tied.');
		return true;
	} else {
		updateMessageView('Next up: ' + symbols[!player]);
		return false; // continue playing
	}
};

// CONTROLLER


// should refactor this to include listeners directly in html dom elements
var setupListeners = () => {
	var td;
	for (var row = 0; row < size; row++) {
		for (var col = 0; col < size; col++) {
			var id = '' + row + col;
			td = document.getElementById(id);
			(function (td) {
				td.addEventListener('click', function() {
					var row = Number(td.id.charAt(0));
					var col = Number(td.id.charAt(1));
					if (playing && board[row][col] === null) {
						handleClick(td, row, col);
					}
				})
			})(td)
		}
	}
};

var handleClick = (elem, row, col) => {
	toggleSquareView(elem);
	toggleSquareModel(row, col);
	if (isGameOver(row, col)) {
		console.log('game over!');
		playing = false; // end game
	} else {
		console.log('keep playing!');
		player = !player; // switch turns
	}
};

// VIEW

var updateMessageView = (message) => {
	document.getElementById('message').innerHTML = message;
};


var toggleSquareView = (elem) => {
	var tile = symbols[player];
	elem.innerHTML = tile;
};

var clearBoardView = () => {
	squares = Array.prototype.slice.call(document.getElementsByClassName('square'));
	squares.forEach((square) => {
		square.innerHTML = '';
	});
};

// GLOBALS

var player; 
var playing; // true while game is not over
var symbols = {
	true: 'X',
	false: 'O'
}
const size = 3;
var board; // global variable for board

var newGame = () => {
	updateMessageView('Let\'s tic tac toe! First player is X');
	clearBoardView();
	init();
};

var init = () => {
	board = initBoard(size);
	player = true; // for player X
	playing = true;
}

setupListeners();
init();