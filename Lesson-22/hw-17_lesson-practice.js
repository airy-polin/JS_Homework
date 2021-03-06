//---------------------------------------------------------------------------------------------------------------------------------------
// task #1
// Имеется следующий объект - {a: 1, b: 2, c: 3, d: 4}.
// Необходимо сделать так, чтобы в переменные a и b записались соответствующие значения, а все, что осталось - в объект obj.

// SOLUTION
let {a, b, ...obj} = {a: 1, b: 2, c: 3, d: 4};

// tests
console.log(a);
console.log(b);
console.log(obj);
//---------------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------------------
// task #2
// Запросить у пользователя имя и сохранить его в переменную.
// Создать объект со свойством name, куда записать короткой записью значение имени пользователя,
// и методом sayHi, который будет возвращать строку вида:
// 	"Hi, (имя пользователя)!"
// Имя пользователя получать уже из объекта.
// Проверить работу метода. Убедиться в уместном использовании способов задания переменной.

// SOLUTION
let userName = prompt('enter your name pls', '');

const obj = {
	userName,
	sayHi: function() {
		return `Hi, ${this.userName}`;
	}
};

// tests
console.log(userName);
console.log(obj);
//---------------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------------------
// task #3
// Написать функцию, которая будет принимать параметры x, y, z.
// При вызове функции передать в неё первым параметром объект вида {a: 2, b: 3}, вторым параметром целое число.
// X и y получаем из свойств переданного в функцию объекта a и b. У z значение по-умолчанию должно быть 1.
// Функция должна возвращать результат возведения в степень y числа x, умноженный на z.
// Валидацию опустить.

// SOLUTION
function pow({a: x, b: y}, z = 1) {
	return x ** y * z;
}

pow({a: 2, b: 3}, 1);
//---------------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------------------
// task #4
// Создать массив с именем и возрастом.
// Передать его в функцию. Функция должна принять его как два отдельных параметра name и age и вернуть строку вида:
// 	"Hello, I'm (имя) and I'm (возраст) years old."
// Не использовать деструктуризацию.

// SOLUTION
function presentMe(name, age) {
	return `Hello, I'm ${name} and I'm ${age} years old.`;
}

const user1 = ['Polly', 28];
presentMe(...user1);

// SOLUTION // arrow function
const presentMe = ((name, age) => `Hello, I'm ${name} and I'm ${age} years old.`),
	user1 = ['Polly', 28];

presentMe(...user1);
//---------------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------------------
// task #5
// Написать функцию, принимающую массив чисел. При вызове числа передаются в функцию отдельными параметрами, не массивом.
// Вывести в консоль числа последовательно.

// SOLUTION
function showNumbersSequentially(...numbers) {
	for (let number of numbers) {
		console.log(number);
	}
}

showNumbersSequentially(1, 3, 5, 7, 9);

// SOLUTION // arrow function
const showNumbersSequentially = (...numbers) => {
	for (let number of numbers) {
		console.log(number);
	}
};

showNumbersSequentially(1, 3, 5, 7, 9);
//---------------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------------------
// task #6
// Переписать решение задачи с поиском гласных на новый синтаксис.
// Использовать перебирающий метод массива и поиск элемента в массиве.

// 	function countVowelLetters(text) {
// 		text = text.toLowerCase().split('');

// 		var vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'],
// 			counter = 0;

// 		for (var i = 0; i < vowelLetters.length; i++) {
// 			for (var j = 0; j < text.length; j++) {
// 				vowelLetters[i] === text[j] && counter++;
// 			}
// 		}

// 		return counter;
// 	}

// 	countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12

// SOLUTION
function countVowelLetters(text) {
	let vowels = 'аеёиоуыэюя';

	const arr = [...text.toLowerCase()],
		filteredArr = arr.filter(letter => vowels.includes(letter));

	return filteredArr.length;
}

// tests
let text1 = 'Шла Саша по шоссе И сосала сУшку';
countVowelLetters(text1); // 12
//---------------------------------------------------------------------------------------------------------------------------------------