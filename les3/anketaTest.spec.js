describe('anketaTest.js -> validate -> check the function', function () {
	it('should get string', function () {
		const result =  validate('string', 'name');
		expect(result).toBe('string');
	} );

	it('should get string', function () {
		const result =  validate('', 'name');
		expect(result).not.toBe('');
	} );

	it('should get string', function () {
		const result =  validate(null, 'name');
		expect(result).not.toBe(null);
	} );

	it('should get string', function () {
		const result =  validate(12, 'name');
		expect(result).not.toBe(12);
	} );
} );
