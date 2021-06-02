//----------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #1
// Написать регулярное выражение, которое будет тестировать на соответствие строки вида - name_surname-1234@gmail.com :
//  - имя и фамилия должны состоять только из англ. букв и быть длиной от 3 до 10 символов, между ними _ обязательно
//  - далее опциональная часть, начинающаяся с тире и состоящая из 4-х цифр
//  - затем обязательный знак @
//  - название почтового сервиса должно быть длиной от 2-х до 20-ти символов, может состоять из букв английского алфавита и цифр,
// 	  а также опционально может содержать в центре себя одно тире или одну точку
//   - сделать так, чтобы точка или тире, указанные выше, могли содержаться в любом месте внутри почтового сервиса, кроме начала и конца *
//   - обязательная часть .com

// Хорошо протестировать регулярное выражение.


// SOLUTION
var eMailRegExp = new RegExp('^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@[a-z\d]{1,10}[.-]?[a-z\d]{1,10}\.com$', 'i');


// SOLUTION*
// var eMailRegExp = new RegExp('^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d]+[.-]?[a-z\d]+\.com$)[a-z\d.-]{1,24}', 'i'); // prev
var eMailRegExp = new RegExp('^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d]+[.-]?[a-z\d]+)[a-z\d.-]{2,20}(?<![.-])\.com$', 'i'); // upd

// attempts*
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@[a-z\d]{2,20}\.com$
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@([a-z\d](\.|-)((?=@)|(?<=\.com)){2,20})\.com$
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@[a-z\d(?<!@)((\.|-)?)(?!\.com)]{2,20}\.com$
//
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@\b((?![.])|(?![-]))(([a-z\d][\.-]?){2,20})\b((?![.])|(?![-]))\.com$
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@\b((?![.])|(?![-]))([a-z\d][\.-]?){2,20}((?<![.])|(?<![-]))\b\.com$
//
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@\b((?![.])|(?![-]))(([a-z\d][.]?[-]?){2,20})((?<![.])|(?<![-]))\b\.com$
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@((?![.])|(?![-]))[a-z\d]{1}((?=[.]?)(?=[-]?)[a-z\d]{0,18})((?<![.])|(?<![-]))\.com$
//
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@((?![.])|(?![-]))[a-z\d]{1}((?=[.]?)(?=[-]?)[a-z\d]{1,9}(\.|-)?[a-z\d]{1,9})((?<![.])|(?<![-]))\.com$
//
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@((?![.])|(?![-]))([a-z\d]{1,10}(\.|-)?[a-z\d]{1,10})((?<![.])|(?<![-]))\.com$
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@((?![.])|(?![-]))((?=[a-z\d]*?[.]?[a-z\d]*?)|(?=[a-z\d]*?[-]?[a-z]*?))[a-z\d.-]{2,20}((?<![.])|(?<![-]))\.com$
// ^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@((?![.])|(?![-]))((?=[a-z\d]*?[.]?[a-z\d]*?)|(?=[a-z\d]*?[-]?[a-z]*?))[a-z\d]{2,20}((?<![.])|(?<![-]))\.com$
//----------------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #2
// Написать функцию, которая с помощью регулярного выражения будет тестировать на соответствие строки вида:
//   +375-25-777-77-77
//   375299999999
//   8-044-444-44-44
//   8033-6666666
// и возвращать boolean.

// Условия:
// - + перед 375 - опциональный
// - номер может начинаться с 375 (без 0) либо с 80
// - номер должен содержать один из кодов - 25, 29, 33, 44 либо 17
// - основная часть номера не может начинаться с 0
// - некоторые или все тире могут быть пропущены, но расположение тех, которые пропущены не будут, может быть только таким, как в примерах 1 и 3

// Перед отправкой постараться максимально оптимизировать своё решение и убрать все лишнее.


// SOLUTION
var a = '+375-25-777-77-77',
	b = '375299999999',
	c = '8-044-444-44-44',
	d = '8033-6666666';

var phoneNumRegExp = /^(\+?375-?|8-?0)(25|29|33|44|17)-?([1-9]\d{2})(-?\d{2}){2}$/;

function validate(pattern, phoneNum) {
	return new RegExp(pattern).test(phoneNum);
}

// test cases
validate(phoneNumRegExp, a);
validate(phoneNumRegExp, b);
validate(phoneNumRegExp, c);
validate(phoneNumRegExp, d);
//----------------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------------------------------
// TASK #3
// Переписать решение задачи с поиском гласных с использованием регулярного выражения.
// >>> "Написать функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не должно быть "топорным"."

// Протестировать ситуацию, когда гласных в переданном тексте будет 0.
// По возможности придумать несколько вариантов решения.


// SOLUTION #1
var quote1 = 'Spring is the time of year when it is summer in the sun and winter in the shade.',
	quote2 = 'One should never be ashamed to cry. Tears are rain on the dust of earth.',
	quote3 = 'I have been bent and broken, but - I hope - into a better shape.',
	quote4 = 'GGGfdlkccwz';

function calcVowels(text) {
	var vowels = text.match(/[aeiouy]/ig); // vowels
	return vowels ? vowels.length : 0;
}

// test cases
console.log(calcVowels(quote1)); // 24
console.log(calcVowels(quote2)); // 24
console.log(calcVowels(quote3)); // 20
console.log(calcVowels(quote4)); // 0


// SOLUTION #2
var quote1 = 'Spring is the time of year when it is summer in the sun and winter in the shade.',
	quote2 = 'One should never be ashamed to cry. Tears are rain on the dust of earth.',
	quote3 = 'I have been bent and broken, but - I hope - into a better shape.',
	quote4 = 'GGGfdlkccwz';

function calcVowels(text) {
	var regExp = /[aeiouy]/ig,
		counter = 0,
		result;

	while (result = regExp.exec(text)) {
		counter++;
	}
	return counter;
}

// test cases
console.log(calcVowels(quote1)); // 24
console.log(calcVowels(quote2)); // 24
console.log(calcVowels(quote3)); // 20
console.log(calcVowels(quote4)); // 0


// SOLUTION #3
var quote1 = 'Spring is the time of year when it is summer in the sun and winter in the shade.',
	quote2 = 'One should never be ashamed to cry. Tears are rain on the dust of earth.',
	quote3 = 'I have been bent and broken, but - I hope - into a better shape.',
	quote4 = 'GGGfdlkccwz';

function calcVowels(text) {
	var splitted = text.split(/[^aeiouy]/ig), // removing everything except vowels (consonants, whitespaces, punctuation marks)
		vowels = [],
		counter = 0;

	for (var i = 0; i < splitted.length; i++) {
		var current = splitted[i];
		if (current.length !== 0) {
			vowels.push(current);
		}
	}

	if (vowels.length === 0) {
		return counter;
	} else {
		for (var i = 0; i < vowels.length; i++) {
			var current = vowels[i];
			if (current.length === 1) {
				counter += 1;
			} else {
				counter += current.length;
			}
		}
		return counter;
	}
}

// test cases
console.log(calcVowels(quote1)); // 24
console.log(calcVowels(quote2)); // 24
console.log(calcVowels(quote3)); // 20
console.log(calcVowels(quote4)); // 0
//----------------------------------------------------------------------------------------------------------------------------------------------------