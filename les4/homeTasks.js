// division without remainder
function division (a, b) {
	if (a % b === 0) {
		return 'Делится';
	}
	return `Делится с остатком  ${a % b}`;
}
// returns the number of vowels in the string(slowly way)
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
/* function filter (str) {
	const arrBadWords = ['simple', 'Simple', 'native', 'Native', 'learning', 'Learning'];
	const arrGoodWords = ['difficult', 'Difficult', 'foreign', 'Foreign', 'not learning', 'Not learning'];
	const arr = str.split(' ');

	arr.forEach(function (item, i, arr) {
		if (arrBadWords.indexOf(arr[i] ) !== -1) {
			arr[i] = arrGoodWords[arrBadWords.indexOf(item)];
		}
	} );
	return arr.join(' ');
}*/

/* разбивает строку на элем. массива(нежелательное слово выступает в роли разделителя), собирает обратно(через `желательное` слово)
решена проблемма с повторяющ. словами и знаками пунктуации*/
function filter (str) {
	const arrBadWords = ['simple', 'Simple', 'native', 'Native', 'learning', 'Learning'];
	const arrGoodWords = ['difficult', 'Difficult', 'foreign', 'Foreign', 'not learning', 'Not learning'];

	arrBadWords.forEach(function (item, i, arrBadWords) {
		str = replBadWords(str, arrBadWords[i],  arrGoodWords[i] );
	} );

	return str;
}

// subfunction of the  'filter' (rebuilds the string)
function replBadWords (str, badWord,  goodWord) {
	let newStr = str;
	if (str.includes(badWord) ) {
		newStr = str.split(badWord).join(goodWord);
	}
	return newStr;
}


// adds products to local storage
function addProduct (name, id, units, numberOfUnits, costPerUnit) {
	let cart;
	if (localStorage.getItem('products') ) {
		cart = JSON.parse(localStorage.getItem('products') );
		cart.push( { name, id, units, numberOfUnits, costPerUnit } );
		localStorage.setItem('products', JSON.stringify(cart) );
		return cart;
	}

	cart = [{ name, id, units, numberOfUnits, costPerUnit }];
	localStorage.setItem('products', JSON.stringify(cart) );
	return cart;
}

// it returns the total cost of all pruducts
function sumProducts () {
	if (!localStorage.getItem('products') ) {
		console.log('there is no product');
		return 'there is no product';
	}

	let sumProd = 0;
	const cart = JSON.parse(localStorage.getItem('products') ) ;
	cart.forEach(function (item, i, arrProd) {
		sumProd += +arrProd[i].costPerUnit * +arrProd[i].numberOfUnits;
	} );

	return sumProd;
}

// remove  products to local storage
function removeProd (prod) {
	if (!localStorage.getItem('products') ) {
		console.log('there is no product');
		return 'there is no product';
	}
	if (prod) {
		const dellProd = prod;
		const cart = JSON.parse(localStorage.getItem('products') );

		cart.forEach(function (item, i, cart) {
			if (cart[i].name === dellProd) {
				cart.splice(i, 1);
			}
		} );
		localStorage.setItem('products', JSON.stringify(cart) );
		return cart;
	}

	localStorage.removeItem('products');
}

