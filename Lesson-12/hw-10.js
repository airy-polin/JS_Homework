//--------------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #1
//Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.


// SOLUTION
function upgradeArr(arr) {
	return arr.map(function(elem) {
		return {name: elem};
	});
}

var names = ['Masha', 'Petya', 'Zina', 'Kolya', 'Tonya'];

console.log(upgradeArr(names));
//--------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #2
// Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
// Для решения использовать перебирающий метод массивов.


// SOLUTION / метод reduce()
function formatArr(arr) {
	var formatedTime = arr.reduce(function(result, elem) {
		return result + ' : ' + elem;
	});

	return 'Текущее время : ' + formatedTime;
}

var time = ['00', '13', '24'];

console.log(formatArr(time));


// SOLUTION / метод join()
function formatArr(arr) {
	return 'Текущее время : ' + arr.join(' : ');
}

var time = ['00', '13', '24'];

console.log(formatArr(time));
//--------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #3
// Написать функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не должно быть "топорным".


// SOLUTION
function calcVowels(text) {
	var vowelsCheckList = 'aeiouy';

	return text.toLowerCase().split('').reduce(function(result, elem) {
		if (vowelsCheckList.indexOf(elem) !== -1) {
			result += 1;
		}

		return result;
	}, 0);
}

var quote1 = 'Spring is the time of year when it is summer in the sun and winter in the shade.';
var quote2 = 'One should never be ashamed to cry. Tears are rain on the dust of earth.';
var quote3 = 'I have been bent and broken, but - I hope - into a better shape.';

// проверки
console.log(calcVowels(quote1)); // 24
console.log(calcVowels(quote2)); // 24
console.log(calcVowels(quote3)); // 20
//--------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #4
// Написать функцию, которая будет принимать текст в качестве параметра.
// У текста должны быть пробелы, точки, запятые, восклицательные и вопросительные знаки.
// Текст необходимо разбить на предложения (по точкам, восклицательным и вопросительным знакам - убрав их).
// Для каждого из предложений - отдельно вывести текст предложения и рядом количество букв в нем (без учета пробелов, запятых и т.д. - именно букв).
// Из ранее непройденных методов разрешается использовать только (!!!) регулярное выражение в методе split.

// Функция должна работать следущим образом (потестировать на данном тексте):
//     countSentencesLetters('Привет, студент! Студент... Как дела, студент?');
//     // Привет, студент: Letters quantity is: 13
//     // Студент: Letters quantity is: 7
//     // Как дела, студент: Letters quantity is: 14


// SOLUTION
function countSentencesLetters(text) {
	var arr = text.split(/[!?.]+/);

	for (var i = 0; i < arr.length; i++) {
		if (!arr[i]) {
			arr.splice(i, 1);
		}
	}

	return arr.map(function(elem) {
		var chars = '., ';

		return elem.trim() + ': Letters quantity is: ' + elem.split('').reduce(function(sum, letter) {
			if (chars.indexOf(letter) === -1) {
				sum += 1;
			}

			return sum;
		}, 0);
	});
}

var text = 'Привет, студент! Студент... Как дела, студент?';

console.log(countSentencesLetters(text));
//--------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #5*
// Написать функцию, которая будет находить в переданном ей тексте наиболее часто повторяемое слово и возвращать информацию вида:
// "Максимальное число повторений у слова "привет" - 8"
// При решении предположить, что у двух и более слов не может быть одинакового количества повторений.
// Для удобного разделения текста на слова сразу по нескольким знакам препинания - разрешается использовать регулярное выражение в методе split.


// SOLUTION
function getMaxRepeat(text) {
	var arr = text.toLowerCase().split(/[.,!?;:]/).join('').split(' ');

	var mappedObj = arr.reduce(function(result, elem) {
		if (result.hasOwnProperty(elem)) {
			result[elem]++;
		} else {
			result[elem] = 1;
		}

		return result;
	}, {});

	var maxRepeats = 0,
		repeatedWord;

	for (var key in mappedObj) {
		if (mappedObj[key] >= maxRepeats) {
			maxRepeats = mappedObj[key];
			repeatedWord = key;
		}
	}

	return 'Максимальное число повторений у слова "' + repeatedWord + '" - ' + maxRepeats;
}

var text = 'Estella, to the last hour of my life, you cannot choose but remain part of my character, part of the little good in me, part of the evil.' +
		   'But, in this separation I associate you only with the good, and I will faithfully hold you to that always, for you must have done me' +
		   'far more good than harm, let me feel now what sharp distress I may. O God bless you, God forgive you!';

console.log(getMaxRepeat(text));
//--------------------------------------------------------------------------------------------------------------------------------------------------------