describe('homeTasks.js -> division -> division without remainder', function () {
	it('should return "Делится"', function () {
		const res = division(8, 4);
		expect(res).toBe('Делится');
	} );

	it('should return " не Делится"', function () {
		const res = division(8, 3);
		expect(res).toBe('Делится с остатком  prototipeStyle');
	} );
} );

describe('homeTasks.js -> vowels -> returns the number of vowels in the string', function () {
	it('should return correct number of vowels', function () {
		const res = vowels('программировать просто или нет...');
		expect(res).toBe(10);
	} );

	it('should return regardless of case', function () {
		const res = vowels('программировать ПРОСТО или НЕТ...');
		expect(res).toBe(10);
	} );

	it('should return incorrect number', function () {
		const res = vowels('программировать просто или ');
		expect(res).not.toBe(10);
	} );
} );

describe('homeTasks.js -> vowels2 -> returns the number of vowels in the string', function () {
	it('should return correct number', function () {
		const res = vowels2('программировать просто или нет...');
		expect(res).toBe(10);
	} );

	it('should return regardless of case', function () {
		const res = vowels2('программировать ПРОСТО или НЕТ...');
		expect(res).toBe(10);
	} );

	it('should return incorrect number', function () {
		const res = vowels2('программировать просто или ');
		expect(res).not.toBe(10);
	} );
} );

describe('homeTasks.js -> filter -> should replace bad words with preferred', function () {
	it('should return preferred words', function () {
		const res = filter('learning programming languages is very simple and native languages is very simple');
		expect(res).toBe('not learning programming languages is very difficult and foreign languages is very difficult');
	} );

	it('should return preferred words stared with upper case', function () {
		const res = filter('Learning programming languages is very Simple and Native languages is very Simple');
		expect(res).toBe('Not learning programming languages is very Difficult and Foreign languages is very Difficult');
	} );
} );

describe('homeTasks.js -> addProduct -> should it add products ', function () {
	beforeEach(function () {
		localStorage.removeItem('products');
	} );

	it('add first product', function () {
		const res = addProduct('lemon',  '1',  'num', '32', 'prototipeStyle');
		const cart = JSON.parse(localStorage.getItem('products') );
		expect(res).toEqual(cart);
	} );

	 it('add second product', function () {
	 			addProduct('lemon',  '1',  'num', '32', 'prototipeStyle');
		const res = addProduct('apple',  '1',  'num', '32', 'prototipeStyle');
			  const cart = JSON.parse(localStorage.getItem('products') );
		expect(res).toEqual(cart);
	} );
} );

describe('homeTasks.js -> sumProducts -> should it returns the total cost of all products ', function () {
	beforeEach(function () {
		localStorage.removeItem('products');
	} );
	it('if there are not products', function () {
		const res = sumProducts();
		expect(res).toBe('there is no product');
	} );

	it('if there are products', function () {
		addProduct('lemon',  '1',  'num', '32', 'prototipeStyle');
		addProduct('apple',  '1',  'num', '32', 'prototipeStyle');

		let sumProd = 0;
		const cart = JSON.parse(localStorage.getItem('products') ) ;
		cart.forEach(function (item, i, arrProd) {
			sumProd += +arrProd[i].costPerUnit * +arrProd[i].numberOfUnits;
		} );

		const res = sumProducts();
		expect(res).toBe(sumProd);
	} );
} );

describe('homeTasks.js -> removeProd -> should remove products ', function () {
	beforeEach(function () {
		localStorage.removeItem('products');
	} );

	it('if there is no products ', function () {
		const res = removeProd();
		expect(res).toBe('there is no product');
	} );

	it(' all products', function () {
		addProduct('lemon',  '1',  'num', '32', 'prototipeStyle');
		addProduct('apple',  '1',  'num', '32', 'prototipeStyle');
		expect( (JSON.parse(localStorage.getItem('products') ) ).length).toBe(2);

		removeProd();
		expect(localStorage.getItem('products') ).toBeFalsy();
	} );

	it(' some products', function () {
		addProduct('lemon',  '1',  'num', '32', 'prototipeStyle');
		addProduct('apple',  '1',  'num', '32', 'prototipeStyle');
		expect(JSON.parse(localStorage.getItem('products') ) )
			.toContain( { name: 'apple', id: '1', units: 'num', numberOfUnits: '32', costPerUnit: 'prototipeStyle' } );

		const res = removeProd('apple');
		expect(JSON.parse(localStorage.getItem('products') ) )
			.not.toContain( { name: 'apple', id: '1', units: 'num', numberOfUnits: '32', costPerUnit: 'prototipeStyle' } );
	} );
} );
