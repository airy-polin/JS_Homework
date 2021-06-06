// define vars to navigate among DOM elements
var btnStart = document.getElementById('btn-start-stop-run'),
	btnStartContainer = document.getElementsByClassName('controls-default')[0],
	stopwatch = document.getElementsByClassName('stopwatch')[0],
	minContainer = stopwatch.getElementsByClassName('minutes')[0],
	secContainer = stopwatch.getElementsByClassName('seconds')[0],
	msecContainer = stopwatch.getElementsByClassName('milliseconds')[0],
	state = stopwatch.dataset.state,
	containerToAddBtns = document.getElementsByClassName('controls-additional')[0],
	containerToAddMarks = document.getElementsByClassName('marks')[0];

// define vars to hold time values
var minutes = 0,
	seconds = 0,
	milliseconds = 0;

var timerId = null,
	markCount = 1;

btnStart.addEventListener('click', toggleStopwatch);

// stopwatch function (logic to determine when to increment next value, etc.)
function timeCalc() {
	milliseconds++;

	// logic to determine when to increment next value
	if (milliseconds === 100) {
		milliseconds = 0;
		seconds++;
		if (seconds === 60) {
			seconds = 0;
			minutes++;
		}
	}

	// display updated time values to the user
	minContainer.innerHTML = formatDisplay(minutes);
	secContainer.innerHTML = formatDisplay(seconds);
	msecContainer.innerHTML = formatDisplay(milliseconds);

	if (minutes === 59 && seconds === 59 && milliseconds === 99) {
		stopOnOverrunning();
	}
}

// if milliseconds / seconds / minutes are only one digit, add a leading 0 to the value
function formatDisplay(stopwatchElem) {
	if (stopwatchElem < 10) {
		stopwatchElem = '0' + stopwatchElem.toString();
	}
	return stopwatchElem;
}

function toggleStopwatch() {
	if (state === 'initial' || state === 'stopped') {
		btnStart.setAttribute('value', 'Stop');
		timerId = window.setInterval(timeCalc, 10);
		state = 'running';
		addControls();
	} else if (state === 'running') {
		btnStart.setAttribute('value', 'Run');
		window.clearInterval(timerId);
		state = 'stopped';
	}
}

function addControls() {
	containerToAddBtns.innerHTML = '<input class="button" type="button" id="btn-reset" value="Reset" tabindex="2" /><input class="button" type="button" id="btn-save" value="Save" tabindex="3" />';

	var btnReset = document.getElementById('btn-reset');
	var btnSave = document.getElementById('btn-save');

	btnReset.addEventListener('click', resetStopwatch);
	btnSave.addEventListener('click', saveMark);
}

function saveMark() {
	containerToAddMarks.innerHTML += '<div class="mark__item">' + markCount++ + ') ' + formatDisplay(minutes) + ' : ' + formatDisplay(seconds) + ' : ' + formatDisplay(milliseconds) + '</div>';
}

function resetStopwatch() {
	if (btnStartContainer.children.length === 0) {
		btnStartContainer.innerHTML = '<input class="button" type="button" id="btn-start-stop-run" value="Start" tabindex="1" />';
		btnStart = document.getElementById('btn-start-stop-run');
		btnStart.addEventListener('click', toggleStopwatch);
	} else {
		btnStart.setAttribute('value', 'Start');
	}

	window.clearInterval(timerId);
	state = 'initial';
	markCount = 1;

	milliseconds = 0;
	seconds = 0;
	minutes = 0;

	var stopwatchElems = stopwatch.children;
	for (var i = 0; i < stopwatchElems.length; i++) {
		stopwatchElems[i].innerHTML = '00';
	}

	containerToAddBtns.innerHTML = '';
	containerToAddMarks.innerHTML = '';
}

function stopOnOverrunning() {
	btnStartContainer.innerHTML = '';
	document.getElementById('btn-save').remove();
	window.clearInterval(timerId);
	state = 'stopped';
}