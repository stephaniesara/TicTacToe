// MODEL

var toggleSquareModel = (row, col) => {
	game.board[row][col] = game.player;
};

var hasTie = () => {
	var isFull = true;
	game.board.forEach((row) => {
		row.forEach((square) => {
			if (square === null) {
				isFull = false;
			}
		});
	});
	return isFull;
};

var isRowFull = (row) => {
	return game.board[row].every((square) => {
		return square === game.player;
	});
};

var isColFull = (col) => {
	for (var i = 0; i < game.size; i++) {
		if (game.board[i][col] !== game.player) {
			return false;
		}
	}
	return true;
};

var isMajorDiagFull = (row, col) => {
	if (row + col !== 2) {
		return false;
	}
	if (game.board[0][2] !== game.player || game.board[1][1] !== game.player || game.board[2][0] !== game.player) {
		return false;
	}
	return true;
};

var isMinorDiagFull = (row, col) => {
	if (row !== col) {
		return false;
	}
	if (game.board[0][0] !== game.player || game.board[1][1] !== game.player || game.board[2][2] !== game.player) {
		return false;
	}
	return true;
};

var hasWinner = (row, col) => {
	return (isRowFull(row) || isColFull(col) || isMajorDiagFull(row, col) || isMinorDiagFull(row, col) );
};

var isGameOver = (row, col) => {
	if (hasWinner(row, col)) {
		game.previousWinner = game.symbols[game.player];
		updateMessageView('Game over! The winner is ' + game.symbols[game.player] + '!');
		return true;
	} else if (hasTie()) {
		game.previousWinner = true;
		updateMessageView('Game over! Both players have tied.');
		return true;
	} else {
		updateMessageView('Next up: ' + game.symbols[!game.player]);
		return false; // continue game.playing
	}
};

// CONTROLLER

var handleGridClick = (event) => {
	var id = event.target.id;
	var row = Number(id.charAt(0));
	var col = Number(id.charAt(1));
	if (game.playing && game.board[row][col] === null) {
		toggleSquareView(document.getElementById(id));
		toggleSquareModel(row, col);
		if (isGameOver(row, col)) {
			game.playing = false; // end game
		} else {
			game.player = !game.player; // switch turns
		}
	}
};

// VIEW

var updateMessageView = (message) => {
	document.getElementById('message').innerHTML = message;
};


var toggleSquareView = (elem) => {
	var tile = game.symbols[game.player];
	elem.innerHTML = tile;
};

var clearBoardView = () => {
	squares = Array.prototype.slice.call(document.getElementsByClassName('square'));
	squares.forEach((square) => {
		square.innerHTML = '';
	});
};

// GLOBALS and INIT

var game = {
	board: {},
	size: 3,
	player: true,
	playing: true,
	symbols: {
		true: 'X',
		false: 'O'
	},
	previousWinner: false,
	initBoard: (size) => {
		var board = [];
		for (var i = 0; i < game.size; i++) {
			board[i] = new Array(game.size).fill(null);
		}
		return board;
	}
}

var init = () => {
	if (game.previousWinner) {
		clearBoardView();
	}
	updateMessageView('Let\'s tic tac toe! First player is X');
	game.board = game.initBoard(game.size);
	game.player = true; // for game.player X
	game.playing = true;
}

var setupListeners = () => {
	var grid = document.getElementById('grid');
	grid.addEventListener('click', (event) => handleGridClick(event));
};

setupListeners();
init();