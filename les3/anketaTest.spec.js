describe('anketaTest.js -> validate -> result of data entry ', function () {
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

describe('anketaTest.js -> validDate -> result of data entry ', function () {
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

describe('anketaTest.js -> getUserAge -> get user age  ', function () {
	beforeEach(function () {
		let userAgeDays;
		let userAgeYears;
		let userAgeYearsAfter;
		let todayDate = ['2019', '03', '04'];

		spyOn(window, 'getUserAge').and.callFake(function (param) {

			let userDateOfBirth = new Date(param);
			todayDate = new Date(todayDate);
			userAgeDays = Math.floor((todayDate - userDateOfBirth) / 1000 / 60 / 60 / 24);
			userAgeYears = Math.floor((todayDate - userDateOfBirth) / 1000 / 60 / 60 / 24 / 365.25);
			userAgeYearsAfter = userAgeYears + 5;
		});
	});

	getUserAge (['1991', '06', '18']);

	it('userAgeDays', function () {
		expect(userAgeDays).toEqual(10121);
	} );

	it('userAgeYears', function () {
		expect(userAgeYears).toEqual(27);
	} );

	it('userAgeYearsAfter', function () {
		expect(userAgeYearsAfter).toEqual(32);
	} );

});

describe('anketaTest.js -> getRetiree -> get correct retiree  ', function () {

	it('is not retired', function () {
		let retAge = getRetiree(57);
		expect(retAge).toEqual('no');
	} );

	it('is retired', function () {
		let retAge = getRetiree(59);
		expect(retAge).toEqual( 'yes');
	} );


});
