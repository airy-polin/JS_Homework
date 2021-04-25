//------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #1
// Создать класс Animal. Перенести в него все свойства и методы. Отнаследоваться внутри Cat от Animal.
// Расширить метод feed для кошек. Теперь он должен выводить в консоль информацию вида:
//  	"Насыпаем в миску (количество гр.) корма.
//  	 Кот доволен ^_^"
// Использовать вызов родительского метода вида animalFeed() и сохранение контекста this через переменную.
// Все вызовы, которые работали ранее, должны по-прежнему работать корректно.


// SOLUTION
function Animal(name) {
	var self = this;

	self.name = name;

	self._foodAmount = 50;

	self.dailyNorm = function(value) {
		var minAllowedValue = 50,
		    maxAllowedValue = 500;

		if (!arguments.length) {
			return formatFoodAmount();
		};

		if (value < minAllowedValue || value > maxAllowedValue) {
			return ('Количество корма должно быть в пределах заданной нормы!');
		};

		self._foodAmount = value;
	}

	function formatFoodAmount() {
		return self._foodAmount + ' гр.';
	};
	
	self.feed = function() {
		console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
	};
}

function Cat(name) {
	Animal.apply(this, arguments);

	var animalFeed = this.feed; // =parentFeed
	this.feed = function() {
		animalFeed();
		console.log('Кот доволен ^_^');
	};
}

var bublik = new Cat('Bublik');

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
//------------------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #2
// Добавить публичный метод stroke, который будет выводить в консоль информацию "Гладим кота.".
// Доделать метод feed таким образом, чтобы можно было цепочкой вызывать его и метод stroke в любой последовательности и сколько угодно раз.
// (Лишние логи можно убрать, делать всё в том же задании).


// SOLUTION
function Animal(name) {
	var self = this;

	self.name = name;

	self._foodAmount = 50;

	self.dailyNorm = function(value) {
		var minAllowedValue = 50,
		    maxAllowedValue = 500;

		if (!arguments.length) {
			return formatFoodAmount();
		};

		if (value < minAllowedValue || value > maxAllowedValue) {
			return ('Количество корма должно быть в пределах заданной нормы!');
		};

		self._foodAmount = value;
	}

	function formatFoodAmount() {
		return self._foodAmount + ' гр.';
	};
	
	self.feed = function() {
		console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
	};
}

function Cat(name) {
	Animal.apply(this, arguments);

	var animalFeed = this.feed; // =parentFeed
	this.feed = function() {
		animalFeed();
		console.log('Кот доволен ^_^');
		return this;
	};

	this.stroke = function() {
		console.log('Гладим кота.');
		return this;
	}
}

var bublik = new Cat('Bublik');

console.log(bublik.name);

// проверки
bublik.feed().stroke();
bublik.stroke().feed();
bublik.feed().stroke().stroke().feed().feed();
bublik.feed().stroke().feed().stroke().feed().stroke();
//------------------------------------------------------------------------------------------------------------------------------------------------