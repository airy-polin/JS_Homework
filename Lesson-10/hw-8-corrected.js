//------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #1
// Переписать предыдущий пример с кошками на прототипный стиль ООП.


// SOLUTION
function Animal(name) {
	this.name = name;
	this._foodAmount = 50;
}

Animal.prototype._formatFoodAmount = function() {
	return this._foodAmount + ' гр.';
}

Animal.prototype.dailyNorm = function(value) {
	var minAllowedValue = 50,
	    maxAllowedValue = 500;
	
	if (!arguments.length) {
		return this._formatFoodAmount();
	};

	if (value < minAllowedValue || value > maxAllowedValue) {
		return ('Количество корма должно быть в пределах заданной нормы!');
	};

	this._foodAmount = value;
}

Animal.prototype.feed = function() {
	console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.')
}

function Cat(name) {
	Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.constructor = Cat;

Cat.prototype.feed = function() {
	Animal.prototype.feed.apply(this, arguments);
	console.log('Кот доволен ^_^');
	return this;
}

Cat.prototype.stroke = function() {
	console.log('Гладим кота.');
	return this;
}

var bublik = new Cat ('Bublik');

console.log(bublik.name);

// проверки
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
//------------------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #2
// Написать функцию, возвращающую глубокую копию объекта - его клон.
// Клонироваться должны значения всех типов данных (+ массивы и функции), а также любого уровня вложенности.
// Метод isArray использовать можно.

// Протестировать работу функции можно на таком примере:
// var initialObj = {
// 	string: 'Vasya',
// 	number: 30,
// 	boolean: true,
// 	undefined: undefined,
// 	null: null,
// 	array: [1, 2, 3],
// 	object: {
// 		string2: 'Petrov',
// 		object2: {
// 			array2: [{}, {}]
// 		},
// 		object3: {}
// 	},
// 	method: function() {
// 		alert('Hello');
// 	}
// };

// var clonedObj = deepClone(initialObj);

// clonedObj.object.object2.array2[1].name = 'Vasya';
// clonedObj.array.push(2);

// console.log(initialObj);
// console.log(clonedObj);


// SOLUTION
function deepClone(initialObj) {
	var clonedObj = {};

	for (var key in initialObj) {
		var current = initialObj[key];

		if (typeof current !== 'object' || current === null) {
			clonedObj[key] = current;
		} else if (Array.isArray(current)) {
			clonedObj[key] = [];

			for (var i = 0; i < current.length; i++) {
				if (typeof current[i] !== 'object' || current[i] === null) {
					clonedObj[key][i] = current[i];
				} else {
					clonedObj[key][i] = deepClone(current[i]);
				}
			}
		} else {
			clonedObj[key] = deepClone(current);
		}
	}

	return clonedObj;
}

var initialObj = {
	string: 'Vasya',
	number: 30,
	boolean: true,
	undefined: undefined,
	null: null,
	array: [1, 2, 3],
	object: {
		string2: 'Petrov',
		object2: {
			array2: [{}, {}]
		},
		object3: {}
	},
	method: function() {
		alert('Hello');
	}
};

var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);
//------------------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #3
// Написать функцию глубокого сравнения объектов, возвращающую boolean.
// Сравниваться должны значения всех типов данных (+ массивы и функции), а также любого уровня вложенности.
// Для определения длины объектов разрешается использовать метод Object.keys().
// Хорошо протестировать работу функции (можно на примере из пред. задания).


// SOLUTION
function deepClone(initialObj) {
	var clonedObj = {};

	for (var key in initialObj) {
		var current = initialObj[key];

		if (typeof current !== 'object' || current === null) {
			clonedObj[key] = current;
		} else if (Array.isArray(current)) {
			clonedObj[key] = [];

			for (var i = 0; i < current.length; i++) {
				if (typeof current[i] !== 'object' || current[i] === null) {
					clonedObj[key][i] = current[i];
				} else {
					clonedObj[key][i] = deepClone(current[i]);
				}
			}
		} else {
			clonedObj[key] = deepClone(current);
		}
	}

	return clonedObj;
}

function deepCompare(initialObj, clonedObj) {
	if (initialObj === clonedObj) {
		return true;
	}

	if (!initialObj || !clonedObj){
		return false;
	}

	if (Object.keys(initialObj).length !== Object.keys(clonedObj).length) {
		return false;
	}

	for (var key in initialObj) {
		var current = initialObj[key];

		if (typeof current === 'function') {
			if (current.toString() !== clonedObj[key].toString()) {
				return false;
			}
		} else if (typeof current !== 'object' || current === null) {
			if (current !== clonedObj[key]) {
				return false;
			}
		} else if (Array.isArray(current)) {
			for (var i = 0; i < current.length; i++) {
				if (typeof current[i] !== 'object' || current[i] === null) {
					if (current[i] !== clonedObj[key][i]) {
						return false;
					}
				} else {
					if (!deepCompare(current[i], clonedObj[key][i])) {
						return false;
					}
				}
			}
		} else {
			if (!deepCompare(current, clonedObj[key])) {
				return false;
			}
		}
	}

	return true;
}

var initialObj = {
	string: 'Vasya',
	number: 30,
	boolean: true,
	undefined: undefined,
	null: null,
	array: [1, 2, 3],
	object: {
		string2: 'Petrov',
		object2: {
			array2: [{}, {}]
		},
		object3: {}
	},
	method: function() {
		alert('Hello');
	}
};

var clonedObj = deepClone(initialObj);

var copiedObj = initialObj;

var newObj = {
	string: 'Vasya',
	number: 30,
	boolean: true,
	undefined: undefined,
	null: null,
	array: [1, 5, 3],
	method: function() {
		alert('Hello');
	}
};

var obj1 = {
	x1: {},
	method1: function() {
		alert('Hello');
	},
	method2: function() {
		alert('Nice to meet you again');
	}
};

var obj2 = {
	x1: {x2: "Hello"}
}

var obj3 = {
	x1: {},
	method1: function() {
		alert('Hello');
	},
	method2: function() {
		alert('Nice to meet you again');
	}
};

// проверки
console.log(deepCompare(initialObj, clonedObj)); // 2 разные ссылки на объект (объект и его клон) // true
console.log(deepCompare(initialObj, newObj)); // 2 разных объекта // false
console.log(deepCompare(clonedObj, newObj)); // 2 разных объекта // false
console.log(deepCompare(copiedObj, newObj)); // 2 разных объекта // false
console.log(deepCompare(initialObj, copiedObj)); // одна и та же ссылка на объект (объект и его копия) // true

console.log(deepCompare(obj1, obj2)); // 2 разных объекта // false
console.log(deepCompare(obj1, obj3)); // 2 разных объекта // true

console.log(deepCompare(undefined, obj1)); // false
console.log(deepCompare(obj2, null)); // false
console.log(deepCompare(null, null)); // true
console.log(deepCompare(undefined, undefined)); // true
console.log(deepCompare(undefined, null)); // false
//------------------------------------------------------------------------------------------------------------------------------------------------