// TO ADD NEW ROW
var button = document.getElementById('table-button');

button.addEventListener('click', addTableRow);

function addTableRow() {
	var table = document.getElementsByClassName('table')[0],
		tableStart = table.getElementsByClassName('table-row')[0],
		newTableRow = document.createElement('tr');
		
	newTableRow.classList.add('table-row');
	newTableRow.innerHTML = '<td><td><td>';
	table.insertBefore(newTableRow, tableStart);
}


// TO OPEN/HIDE INPUT ON 'CLICK'/'BLUR' EVENTS
var table = document.getElementsByClassName('table')[0];

table.addEventListener('click', showInput);

function showInput(event) {
	var target = event.target;

	if (target.tagName === 'TD' && target.id !== 'table-button') {
		var input = document.createElement('input');

		input.value += target.textContent;
		// target.textContent = ''; // можно использовать вместо проверки на наличие 'соседа' /if (input.previousSibling)/
		target.appendChild(input);
		input.focus();

		if (input.previousSibling) {
			input.previousSibling.remove();
		}

		input.addEventListener('blur', onCellInputBlur);
		input.addEventListener('keypress', onCellInputKeyPress);
	}
}

function onCellInputBlur(event) {
	var input = event.target;
	input.parentElement.innerText = input.value; // = truncateText(input.value, 20);
}

function onCellInputKeyPress(event) {
	if (event.code === 'Enter') {
		event.target.blur();
	}
}

// function truncateText(text, maxLenght) {
// 	return (text.length > maxLenght) ? (text.slice(0, maxLenght - 1) + '…') : text;
// }