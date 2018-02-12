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

const size = 3;
var board = initBoard(size); // global variable for board


// CONTROLLER

document.addEventListener("DOMContentLoaded", (event) => {
	// console.log("DOM loaded!");
	document.getElementById("A").addEventListener("click", function() {
		callback("A");
	});
	document.getElementById("B").addEventListener("click", function() {
		callback("B");
	});
});

// VIEW

var callback = (str) => {
	console.log(str);
}