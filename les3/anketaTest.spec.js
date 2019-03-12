describe('anketaTest.js -> validate -> checks the validity of the string ', function () {
	beforeEach(function () {
		let count = 0;
		spyOn(window, 'prompt').and.callFake(function (param) {
			count += 1;
			if (count === 2) {
				return null;
			}
			return 'correctInput';
		} );
	} );

	it('which are correct string', function () {
		const result =  validate('correctInput', 'name');
		expect(result).toBe('correctInput');
	} );

	it('which contains empty string(incorrect input and another request)', function () {
		validate('', 'name');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', 'name');
	} );

	it('which contains empty string(incorrect input, another request until the correct value will be entered)', function () {
		const result = validate('', 'name');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toBe('correctInput');
	} );

	it('which contains null(incorrect input and another request)', function () {
		validate(null, 'name');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', 'name');
	} );

	it('which contains null(incorrect input, another request until the correct value will be entered)', function () {
		const result = validate(null, 'name');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toBe('correctInput');
	} );

	it('which contains only letters(incorrect input and another request)', function () {
		validate('w1', 'name');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', 'name');
	} );

	it('which contains only letters(incorrect input, another request until the correct value will be entered)', function () {
		const result = validate('w1', 'name');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toBe('correctInput');
	} );

	it('which contains only letters(incorrect input and another request)', function () {
		validate('.', 'name');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', 'name');
	} );

	it('which contains only letters(incorrect input, another request until the correct value will be entered)', function () {
		const result = validate('.', 'name');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toBe('correctInput');
	} );

	it('which contains only letters(incorrect input and another request)', function () {
		validate(',', 'name');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', 'name');
	} );

	it('which contains only letters(incorrect input, another request until the correct value will be entered)', function () {
		const result = validate(',', 'name');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toBe('correctInput');
	} );

	it('which contains only letters(incorrect input and another request)', function () {
		validate('?', 'name');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', 'name');
	} );

	it('which contains only letters(incorrect input, another request until the correct value will be entered)', function () {
		const result = validate('?', 'name');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toBe('correctInput');
	} );
} );

describe('anketaTest.js -> validDate -> result of data entry ', function () {
	beforeEach(function () {
		let count = 0;
		spyOn(window, 'prompt').and.callFake(function (param) {
			count += 1;
			if (count === 2) {
				return null;
			}
			return '18.06.1991';
		} );
	} );

	it('which are correct string', function () {
		const result =  validDate('18.06.1991');
		expect(result).toEqual( ['1991', '06', '18'] );
	} );

	it('which contains empty string(incorrect input and another request)', function () {
		validDate('');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', '18.06.1991');
	} );

	it('which contains empty string(incorrect input, another request until the correct value will be entered)', function () {
		const result = validDate('');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toEqual( ['1991', '06', '18'] );
	} );

	it('which contains null(incorrect input and another request)', function () {
		validDate(null);
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', '18.06.1991');
	} );

	it('which contains null(incorrect input, another request until the correct value will be entered)', function () {
		const result = validDate(null);
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toEqual( ['1991', '06', '18'] );
	} );

	it('which not contains letters(incorrect input and another request)', function () {
		validDate('w');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', '18.06.1991');
	} );
	it('which not contains letters(incorrect input, another request until the correct value will be entered)', function () {
		const result = validDate('w');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toEqual( ['1991', '06', '18'] );
	} );

	it('which must not contains a question mark(incorrect input and another request)', function () {
		validDate('?');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', '18.06.1991');
	} );

	it('which must not contains a question mark (incorrect input, another request until the correct value will be entered)', function () {
		const result = validDate('?');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toEqual( ['1991', '06', '18'] );
	} );

	it('which must not contains commas (incorrect input and another request)', function () {
		validDate(',');
		expect(window.prompt).toHaveBeenCalled();
		expect(window.prompt).toHaveBeenCalledWith('Incorrect input, enter valid data ', '18.06.1991');
	} );

	it('which must not contains commas (incorrect input, another request until the correct value will be entered)', function () {
		const result = validDate(',');
		expect(window.prompt.calls.count() ).toEqual(1);
		expect(result).toEqual( ['1991', '06', '18'] );
	} );
} );

describe('anketaTest.js -> getUserAge -> get user age  ', function () {
	let birthday = ['1991', '06', '18'];
	const todayDate = new Date();

	it('correct count userAgeDays', function () {
		birthday = ['1991', '06', '18'];
		const usAge = Math.floor( (todayDate - new Date(birthday) ) / 1000 / 60 / 60 / 24);
		getUserAge(birthday);
		  expect(userAgeDays).toEqual(usAge);
	} );

	it('correct count userAgeYears', function () {
		const usAgeYea = Math.floor( (todayDate - new Date(birthday) ) / 1000 / 60 / 60 / 24 / 365.25);
		getUserAge(birthday);
		expect(userAgeYears).toEqual(usAgeYea);
	} );

	it('correct count userAgeYearsAfter', function () {
		getUserAge(birthday);
		const usAgeYea = Math.floor( (todayDate - new Date(birthday) ) / 1000 / 60 / 60 / 24 / 365.25);
		expect(userAgeYearsAfter).toEqual(usAgeYea + 5);
	} );
} );

describe('anketaTest.js -> getGender -> get correct gender  ', function () {
	beforeEach(function () {
		let count = false;
		spyOn(window, 'confirm').and.callFake(function (param) {
			if (count) {
				return true;
			}
			count = true;
			return false;
		} );
	} );

	it('male', function () {
		const res = getGender();
		expect(res).toBe(' female');
	} );

	it('female', function () {
		getGender();
		const res = getGender();
		expect(res).toBe(' male');
	} );
} );
describe('anketaTest.js -> getRetiree -> get correct retiree  ', function () {
	it('is not retired', function () {
		const retAge = getRetiree(57);
		expect(retAge).toEqual('no');
	} );

	it('is retired', function () {
		const retAge = getRetiree(59);
		expect(retAge).toEqual('yes');
	} );
} );
