describe('pollindromTest.js -> pollindrom4 -> confirm that the word is a palindrome', function () {
	it('should  correctly confirm', function () {
		const result = pollindrom4('топот');
		expect(result).toBe(true);
	} );

	it('should  not correctly confirm', function () {
		const result = pollindrom4('топо');
		expect(result).not.toBe(true);
	} );
} );

describe('pollindromTest.js -> pollindrom3 -> confirm that the word is a palindrome', function () {
	it('should  correctly confirm', function () {
		const result = pollindrom3('топот');
		expect(result).toBe(true);
	} );

	it('should  not correctly confirm', function () {
		const result = pollindrom3('топо');
		expect(result).not.toBe(true);
	} );
} );
