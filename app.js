// MODEL

var toggleSquareModel = (row, col) => {
	game.board[row][col] = game.player;
};

var hasTie = () => {
	return !game.board.some((row) => {
		return row.some((square) => {
			return square === null;
		});
	});
};

var isRowFull = (row) => {
	return !game.board[row].some((square) => {
		return square !== game.player;
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
	var pairs = [ [0, 2], [1, 1], [2, 0] ];
	var bool = pairs.reduce( (accum, curr) => {
		return accum && (game.board[curr[0]][curr[1]] === game.player);
	}, true);
	return bool;
};

var isMinorDiagFull = (row, col) => {
	if (row !== col) {
		return false;
	}
	var pairs = [ [0, 0], [1, 1], [2, 2]];
	var bool = pairs.reduce( (accum, curr) => {
		return accum && (game.board[curr[0]][curr[1]] === game.player);
	}, true);
	return bool;
};

var hasWinner = (row, col) => {
	return (isRowFull(row) || isColFull(col) || isMajorDiagFull(row, col) || isMinorDiagFull(row, col) );
};

var isGameOver = (row, col) => {
	if (hasWinner(row, col)) {
		game.previousWinner = game.symbols[game.player];
		return 'Game over! The winner is ' + game.symbols[game.player] + '!';
	} else if (hasTie()) {
		return 'Game over! Both players have tied.';
	}
	return null;
};

// CONTROLLER

var handleGridClick = (event) => {
	var id = event.target.id;
	var row = Number(id.charAt(0));
	var col = Number(id.charAt(1));
	if (game.playing && game.board[row][col] === null) {
		toggleSquareView(id);
		toggleSquareModel(row, col);
		var gameOverMessage = isGameOver(row, col);
		if (gameOverMessage === null) {
			updateMessageView('Next up: ' + game.symbols[!game.player]);
			game.player = !game.player;
		} else {
			updateMessageView(gameOverMessage);
			game.playing = false;
		}
	}
};

// VIEW

var updateMessageView = (message) => {
	document.getElementById('message').innerHTML = message;
};

var toggleSquareView = (id) => {
	var elem = document.getElementById(id);
	elem.innerHTML = game.symbols[game.player];
};

var clearBoardView = () => {
	var squaresArr = Array.prototype.slice.call(document.getElementsByClassName('square'));
	squaresArr.forEach((square) => {
		square.innerHTML = '';
	});
};

// GLOBALS and INIT

var game = {
	board: {},
	size: 3,
	player: true, // 'X'
	playing: true, // game in progress
	symbols: {
		true: 'X',
		false: 'O'
	},
	previousWinner: false, // no previous winner
	initBoard: (size) => {
		var board = [];
		for (var i = 0; i < game.size; i++) {
			board[i] = new Array(game.size).fill(null);
		}
		return board;
	}
}

var init = () => {
	clearBoardView();
	updateMessageView('Let\'s tic tac toe! First player is ' + (game.previousWinner || 'X'));
	game.board = game.initBoard(game.size);
	game.player = game.previousWinner ? (game.previousWinner === 'X' ? true : false) : true;
	game.playing = true;
}

var setupListeners = () => {
	var squaresArr = Array.prototype.slice.call(document.getElementsByClassName('square'));
	squaresArr.forEach((square) => {
		square.addEventListener('click', (event) => handleGridClick(event));
	});
};

setupListeners();
init();