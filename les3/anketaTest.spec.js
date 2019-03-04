xdescribe('anketaTest.js -> validate -> result of data entry ', function () {
	let myResul = false;
	beforeEach(function () {

		spyOn(window, 'prompt').and.callFake(function(param) {
			return myResul;
		});
	});

	it('which are correct string', function () {
		const result =  validate('string');
		expect(result).toBe('string');
	} );

	it('which contains empty string(incorrect input and another request)', function () {

		const result = validate('');
		expect(result).toEqual(myResul);
	} );
	it('which contains the number(incorrect input and another request)', function () {

		const result = validate(12);
		expect(result).toEqual(myResul);
	} );

	it('which are cancel by user(incorrect input and another request)', function () {

		const result = validate(null);
		expect(result).toEqual(myResul);
	} );
} );

xdescribe('anketaTest.js -> validDate -> result of data entry ', function () {
	let myResul = false;
	beforeEach(function () {

		spyOn(window, 'prompt').and.callFake(function(param) {
			return myResul;
		});
	});

	it('which are correct string', function () {
		const result =  validDate('18.06.1991');
		expect(result).toEqual(['1991', '06', '18']);
	} );

	it('which contains empty string(incorrect input and another request)', function () {

		const result = validate('');
		expect(result).toEqual(myResul);
	} );

	it('which are cancel by user(incorrect input and another request)', function () {

		const result = validate(null);
		expect(result).toEqual(myResul);
	} );

	it('which contains the incorrect number(incorrect input and another request)', function () {

		const result = validate(12);
		expect(result).toEqual(myResul);
	} );

	it('which contains the incorrect(too large) year(incorrect input and another request)', function () {

		const result = validate('18.06.2222');
		expect(result).toEqual(myResul);
	} );

});


