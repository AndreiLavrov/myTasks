// division without remainder
function division (a, b) {
	if (a % b === 0) {
		return 'Делится';
	}
	return `Делится с остатком  ${a % b}`;
}
// returns the number of vowels in the string
function vowels (str) {
	const arr = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е', 'А', 'У', 'О', 'Ы', 'И', 'Э', 'Я', 'Ю', 'Ё', 'Е'];
	let vowels = 0;

	for (let i = 0; i < str.length; i++) {
		for (let n = 0; n < arr.length; n++) {
			if (arr[n] === str[i] )  {
				vowels++;
			}
		}
	}
	return vowels;
}
// console.log(vowels(prompt('input string') ) );

// i use the object key as it is faster then 'for' 3-4 times
function vowels2 (str) {
	const obj = {
		а: true, у: true, о: true, ы: true, и: true, э: true, я: true,
		ю: true, ё: true, е: true, А: true, У: true, О: true, Ы: true,
		И: true, Э: true, Я: true, Ю: true, Ё: true, Е: true,
	};
	let vowels = 0;
	for (let i = 0; i < str.length; i++) {
		if (obj[str[i]] ) {
			vowels++;
		}
	}
	return vowels;
}

// не коректн. раб со знаками припин(требует регулярных выр.)
function filter (str) {
	const arrBadWords = ['simple', 'Simple', 'native', 'Native', 'learning', 'Learning'];
	const arrGoodWords = ['difficult', 'Difficult', 'foreign', 'Foreign', 'not learning', 'Not learning'];
	const arr = str.split(' ');

	arr.forEach(function (item, i, arr) {
		if (arrBadWords.indexOf(arr[i] ) !== -1) {
			arr[i] = arrGoodWords[arrBadWords.indexOf(item)];
		}
	} );
	return arr.join(' ');
}

// it returns the total cost of all pruducts
function sumProducts () {
	const arrProducts = [
		{
			name: 'ball',
			id: 1,
			units: 'unit',
			numberOfUnits: 120,
			costPerUnit: 10,
		},
		{
			name: 'racket',
			id: 2,
			units: 'unit',
			numberOfUnits: 100,
			costPerUnit: 8,
		},
		{
			name: 'skate',
			id: 3,
			units: 'unit',
			numberOfUnits: 45,
			costPerUnit: 30,
		},
	];

	return sum(arrProducts);
}

// under the function 'sumProducts', perform addition
function sum (arrProducts) {
	let sumProd = 0;
	arrProducts.forEach(function (item, i, arrProducts) {
		sumProd += +arrProducts[i].costPerUnit * +arrProducts[i].numberOfUnits;
	} );
	return sumProd;
}

sumProducts();

