describe('getNumWordTest.spec.js -> getNumWord -> returns the correct value', function () {
	it('returns the correct value', function () {
		const result = getNumWord(1, 'word1', 'word2', 'word5');
		expect(result).toBe('word1');
	} );

	it('returns the correct value', function () {
		const result = getNumWord(2, 'word1', 'word2', 'word5');
		expect(result).toBe('word2');
	} );

	it('returns the correct value', function () {
		const result = getNumWord(4, 'word1', 'word2', 'word5');
		expect(result).toBe('word2');
	} );

	it('returns the correct value', function () {
		const result = getNumWord(11, 'word1', 'word2', 'word5');
		expect(result).toBe('word5');
	} );

	it('returns the correct value', function () {
		const result = getNumWord(56, 'word1', 'word2', 'word5');
		expect(result).toBe('word5');
	} );
} );
