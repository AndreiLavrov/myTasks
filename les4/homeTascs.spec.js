describe('homeTasks.js -> division -> division without remainder', function () {
	it('should return "Делится"', function () {
		const res = division(8, 4);
		expect(res).toBe('Делится');
	} );

	it('should return " не Делится"', function () {
		const res = division(8, 3);
		expect(res).toBe('Делится с остатком  2');
	} );
} );

describe('homeTasks.js -> vowels -> returns the number of vowels in the string', function () {
	it('should return correct number', function () {
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

	/*it('should return preferred words stared with upper case', function () {
		const res = filter('Learning programming languages is very Simple and Native languages is very Simple');
		expect(res).toBe('Not learning programming languages is very Difficult and Foreign languages is very Difficult');
	} );*/
} );

describe('homeTasks.js -> sumProducts -> should it returns the total cost of all products ', function () {
	it('should return preferred words', function () {
		const res = sumProducts();
		expect(res).toBe(3350);
	} );
} );
