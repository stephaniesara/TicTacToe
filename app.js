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



// CONTROLLER

var setupListeners = () => {
	var td;
	for (var row = 0; row < size; row++) {
		for (var col = 0; col < size; col++) {
			var id = '' + row + col;
			td = document.getElementById(id);
			(function (td) {
				td.addEventListener('click', function() {
					handleClick(Number(td.id.charAt(0)), Number(td.id.charAt(1)));
				})
			})(td)
		}
	}
};

var handleClick = (row, col) => {
	console.log(row, col);
	console.log(typeof(row))
};


// GLOBALS

const size = 3;
var board; // global variable for board

var init = () => {
	board = initBoard(size);
	setupListeners();
}

init();