function Form(formElement) {
	var form = formElement,
		button = document.querySelector('input[type="button"]'),
		inputs = document.getElementsByClassName('input');

	button.addEventListener('click', checkValue);

	for (i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('keyup', isEmpty);
	}

	function isEmpty(event) {
		var isEmpty = false,
			target = event.target;

		if (target.value === '') {
			button.setAttribute('disabled', '');
			// alert('field cannot be empty, please fill it in');
			return;
		}

		for (var i = 0; i < inputs.length; i++) {
			var current = inputs[i];
			if (current.value === '') {
				isEmpty = true;
				break;
			}
		}

		if (isEmpty !== true) {
			button.removeAttribute('disabled');
		}
	}

	function checkValue(event) {
		var map = [];
		for (var i = 0; i < inputs.length; i++) {
			var current = inputs[i];
			if (current.value < 1 || current.value > 10 || (Number(current.value) !== parseInt(current.value))) {
				alert('field must contain a valid value (an integer from 1 to 10)');

				current.value = '';
				button.setAttribute('disabled', '');
			} else {
				map.push(current.value);
			}
		}

		var chessBoard = document.getElementById('chess-board');
		if (chessBoard) {
			chessBoard.remove();
		}

		if (map.length !== inputs.length) {
			return;
		}

		buildChessBoard(map[0], map[1]);

		for (var i = 0; i < inputs.length; i ++) {
			var current = inputs[i];
			current.value = '';
			button.setAttribute('disabled', '');
		}
	}

	function buildChessBoard(x, y) {
		var body = document.body,
			table = document.createElement('table'),
			tBody = document.createElement('tbody');

		table.id = 'chess-board';
		body.appendChild(table);

		table.appendChild(tBody);

		for (var i = 0; i < y; i++) {
			var tableRow = document.createElement('tr');
			tableRow.classList.add('table-row');
			tBody.appendChild(tableRow);

			for (var j = 0; j < x; j++) {
				var tableCell = document.createElement('td');
				tableCell.classList.add('table-cell');
				if (i % 2 === j % 2) {
					tableCell.classList.add('black');
				}
				tableRow.appendChild(tableCell);
			}
		}

		table.addEventListener('click', toggleColors);
	}

	function toggleColors(event) {
		var target = event.target;
		var cells = document.getElementsByTagName('td');

		if (target.tagName === 'TD') {
			for (var i = 0; i < cells.length; i++) {
				cells[i].classList.toggle('black');
			}
		}
	}
}

var elem = document.getElementsByTagName('form')[0];
var form = new Form(elem);























































// BASKET

// function Form(formElement) {
// 	var button = document.getElementById('button'), // search by submit type of input
// 		inputs = document.getElementsByClassName('input');

// 	button.addEventListener('click', checkValue);

// 	for (i = 0; i < inputs.length; i++) {
// 		inputs[i].addEventListener('keyup', isEmpty);
// 	}

// 	function isEmpty(event) {
// 		var target = event.target;

// 		if (target.value === '') {
// 			alert('field cannot be empty, please fill it in');
// 		} else {
// 			enableButton();
// 		}
// 	}

// 	function enableButton() {
// 		debugger;
// 		for (i = 0; i < inputs.length; i++) {
// 			var current = inputs[i];

// 			if (!current.value) {
// 				return false;
// 			}

// 			button.removeAttribute('disabled');
// 		}
// 	}

// 	function checkValue(event) {
// 		for (var i = 0; i < inputs.length; i++) {
// 			var current = inputs[i];

// 			if (current.value < 1 || current.value > 10 || (Number(current.value) !== parseInt(current.value))) {
// 				alert('field must contain a valid value (an integer from 1 to 10)');

// 				current.value = '';
// 				button.setAttribute('disabled', '');
// 			}
// 		}
// 	}
// }

// var elem = document.getElementsByTagName('form')[0];
// var form = new Form(elem);