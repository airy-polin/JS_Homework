//---------------------------------------------------------------------------------------------------------------------------------------
// TASK #1
// Написать функцию, принимающую массив объектов вида:
// 	[
// 		{name: 'Vasya Pupkin', age: 25},
// 		{name: 'Ivan Petrov', age: 30},
// 		{name: 'Fedor Ivanov', age: 42}
// 	]

// и возвращающую объект вида:
// 	{
// 		Пользователи младше 40: [
// 			{name: 'Vasya Pupkin', age: 25},
// 			{name: 'Ivan Petrov', age: 30}
// 		],
// 		Пользователь с именем Федор: {name: 'Fedor Ivanov', age: 42}
// 	}

// Для свойства "Пользователь с именем Федор" осуществлять поиск объекта по имени, которое начинается с подстроки Fedor.


// SOLUTION #1
function filterArr(arr) {
	const result = {};

	result['Пользователи младше 40'] = arr.filter(elem => elem.age < 40);
	result['Пользователь с именем Федор'] = arr.find(elem => elem.name.startsWith('Fedor'));

	return result;
}

// test
const arr = [
	{name: 'Vasya Pupkin', age: 25},
	{name: 'Ivan Petrov', age: 30},
	{name: 'Fedor Ivanov', age: 42}
];

console.log(filterArr(arr));


// SOLUTION #2 // to check & weed out cases such as 'Ivan FEDORov'
function filterArr(arr) {
	const result = {};

	result['Пользователи младше 40'] = arr.filter(elem => elem.age < 40);
	result['Пользователь с именем Федор'] = arr.find(elem => elem.name.split(' ').find(elem => elem === 'Fedor'));

	return result;
}

// test
const arr = [
	{name: 'Vasya Pupkin', age: 25},
	{name: 'Ivan Petrov', age: 30},
	{name: 'Fedor Ivanov', age: 42}
];

console.log(filterArr(arr));
//---------------------------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------------------------
// TASK #2
// Написать функцию, принимающую массив имен пользователей и возвращающую массив объектов вида:
// [
// 	{Пользователь 1: 'Вася'},
// 	{Пользователь 2: 'Петя'}
// ]


// SOLUTION
function generateUsersList(users) {
	let count = 1;

	return users.map(user => ({
		['Пользователь ' + count++]: `${user}`}));
}

// test
const users = ['Aleksandra', 'Polina', 'Nikita', 'Maria', 'Roman'];
console.log(generateUsersList(users));
//---------------------------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------------------------
// TASK #3
// Написать функцию, принимающую массив объектов и объединяющую их в один новый объект. Например:
// 	[
// 		{name: 'Vasya'},
// 		{name: 'Piotr', age: 25},
// 		{salary: '2000$'}
// 	]

// необходимо преобразовать в
// 	{
// 		name: 'Piotr',
// 		age: 25,
// 		salary: '2000$'
// 	}

// Spread-оператор не использовать. Использовать перебирающий метод массивов. Старые объекты не должны преобразовываться.


// SOLUTION
function assignArrElems(arr) {
	return arr.reduce((result, elem) => {
		return Object.assign(result, elem);
	}, {});
}

// test
const arr = [
	{name: 'Vasya'},
	{name: 'Piotr', age: 25},
	{salary: '2000$'}
];

console.log(assignArrElems(arr));
//---------------------------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------------------------
// TASK #4
// Переписать последнее задание с ООП на новый синтаксис. Проверить работоспособность всех методов.


// SOLUTION
class Animal {
	constructor(name) {
		this.name = name;
		this._foodAmount = 50;
	}

	_formatFoodAmount() {
		return this._foodAmount + ' гр.';
	}

	dailyNorm(value) {
		let minAllowedValue = 50,
			maxAllowedValue = 500;

		if (!arguments.length) {
			return this._formatFoodAmount();
		};

		if (value < minAllowedValue || value > maxAllowedValue) {
			return 'Количество корма должно быть в пределах заданной нормы!';
		};

		this._foodAmount = value;
	}

	feed() {
		console.log(`Насыпаем в миску ${this.dailyNorm()} корма.`);
	}
}

class Cat extends Animal {
	constructor(name) {
		super(name);
	}

	feed() {
		super.feed() + console.log('Кот доволен ^_^');
		return this;
	}

	stroke() {
		console.log('Гладим кота.');
		return this;
	}
}

var bublik = new Cat('Bublik');
console.log(bublik.name);

// tests
console.log(bublik.dailyNorm());
console.log(bublik.feed());

console.log(bublik.dailyNorm(25));
console.log(bublik.feed());

console.log(bublik.dailyNorm(150));
console.log(bublik.feed());

console.log(bublik.dailyNorm(550));
console.log(bublik.feed());

bublik.feed().stroke();
bublik.stroke().feed();
bublik.feed().stroke().stroke().feed().feed();
bublik.feed().stroke().feed().stroke().feed().stroke();
//---------------------------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------------------------
// TASK #5
// Написать функцию-промис, которая принимает в себя 2 целых числа и выводит в консоль числа, входящие в диапазон, каждую секунду.
// После окончания работы интервала в консоль должно вывестись последнее запомненное число.
// Если в функцию первым параметром было передано бОльшее число - значения параметров следует поменять местами.
// В случае, если в функцию были переданы не целые числа - промис должен быть завершен неуспешно.


// SOLUTION
function showNumbers(startPoint, endPoint) {
	return new Promise((resolve, reject) => {
		if (startPoint > endPoint) {
			[endPoint, startPoint] = [startPoint, endPoint];
		}

		if (!Number.isInteger(startPoint)) {
			reject('Начальная точка интервала не является целым числом');
		} else if (!Number.isInteger(endPoint)) {
			reject('Конечная точка интервала не является целым числом');
		} else {
			let timerId = setInterval(() => {
				if (startPoint < endPoint) {
					console.log(startPoint++);
				} else {
					clearInterval(timerId);
					console.log(startPoint);
					resolve(startPoint);
				}
			}, 1000);
		}
	})
}

// tests
showNumbers(1, 5)
	.then(startPoint => console.log(`Последнее запомненное число: ${startPoint}`))
	.catch(error => console.log('Возникла ошибка'));

showNumbers(5, 1)
	.then(startPoint => console.log(`Последнее запомненное число: ${startPoint}`))
	.catch(error => console.log('Возникла ошибка'));

showNumbers(1.1, 5)
	.then(startPoint => console.log(`Последнее запомненное число: ${startPoint}`))
	.catch(error => console.log(`Возникла ошибка: ${error}`));

showNumbers(1, 5.1)
	.then(startPoint => console.log(`Последнее запомненное число: ${startPoint}`))
	.catch(error => console.log(`Возникла ошибка: ${error}`));
//---------------------------------------------------------------------------------------------------------------------------------------