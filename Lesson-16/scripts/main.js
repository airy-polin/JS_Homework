var STORAGE_USERS = 'Users';

var button = document.getElementsByClassName('navigation__button')[0];
button.addEventListener('click', onGetUsersClick);

function onGetUsersClick() {
	var users = JSON.parse(localStorage.getItem(STORAGE_USERS));
	if (users) {
		showUsers(users);
	} else {
		requestUsers();
	}
}

function requestUsers() {
	var xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if (200 <= this.status && this.status < 400) {
			var response = JSON.parse(this.response);
			users = response.data;
			showUsers(users);
		} else {
			showError();
		}
	};

	xhr.onerror = function() {
		showError();
	};

	xhr.open('GET', 'https://reqres.in/api/users?page', true); // успешный запрос (код 200)
	// xhr.open('GET', 'https://reqres.in/api2/users?page', true); // неуспешный запрос - несуществующая страница (код 404) // test case
	// xhr.open('GET', 'https://reqres1.in/api/users?page', true); // неуспешный запрос - несуществующий домен (код 0) // test case

	xhr.send();
}

function showError() {
	var nav = document.getElementsByClassName('navigation')[0];
	if (nav.firstElementChild.className !== 'error') {
		nav.insertAdjacentHTML('afterbegin', '<span class="error">An error occured while loading data.</span>');
	}
}

function showUsers(users) {
	var tabsWrapper = document.getElementsByClassName('navigation__tabs')[0],
		profilesWrapper = document.getElementsByClassName('profiles')[0];
	
	for (var i = 0; i < users.length; i++) {
		var current = users[i];

		tabsWrapper.innerHTML += '<div class="tab__item">User ' + current.id + '</div>';
		tabsWrapper.firstElementChild.classList.add('active');

		profilesWrapper.innerHTML +=
			'<div class="profile__item hidden"><div class="item__photo"><img src="' + current.avatar + '" alt="' + current.id + '" /></div>' +
			'<div class="item__metrics"><span>First Name: ' + current.first_name + '<br />' + 'Last Name: ' + current.last_name + '</span></div></div>';
		profilesWrapper.firstElementChild.classList.remove('hidden');
	}

	localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
	tabsWrapper.addEventListener('click', openProfile);
	button.getElementsByTagName('button')[0].setAttribute('disabled', '');
}

function openProfile(event) {
	var target = event.target,
		tabs = document.getElementsByClassName('tab__item'),
		profiles = document.getElementsByClassName('profile__item');

	for (var i = 0; i < tabs.length; i++) {
		var current = tabs[i],
			index;
		if (current !== target) {
			current.classList.remove('active');
		}
		else {
			current.classList.add('active');
			index = i;
			for (var j = 0; j < profiles.length; j++) {
				var current = profiles[j];
				if (j === index) {
					current.classList.remove('hidden');
				} else {
					current.classList.add('hidden');
				}
			}
		}
	}
}