describe('form.js -> form -> it checks the validity of the form', function () {
	it('should return true', function () {
		const res = form(' Laurou', '  Andrei', 'password', 'Lavrikffk@mail.ru');
		expect(res).toBeTruthy();
	} );
} );

describe('form.js -> validInpName -> it remove the space in the input name(first and last)', function () {
	it('should return name without spaces', function () {
		const res = validInpName('  Laurou ');
		expect(res).toBe('Laurou');
	} );
} );

describe('form.js -> validLengthInpPassword -> it checks the validity of the password(long)', function () {
	it('for a long password', function () {
		const res = validLengthInpPassword('passw');
		expect(res).toBeTruthy();
	} );

	it('for a short password', function () {
		const res = validLengthInpPassword('pas');
		expect(res).toBeFalsy();
	} );
} );

describe('form.js -> validInpEmail -> it checks the validity of the Email(have "@") ', function () {
	it('the Email includes "@"', function () {
		const res = validInpEmail('lavr@.ru');
		expect(res).toBeTruthy();
	} );

	it('the Email not includes "@" ', function () {
		const res = validInpEmail('pas');
		expect(res).not.toBeTruthy();
	} );

	it('the Email not includes space', function () {
		const res = validInpEmail('  lavr@.ru');
		expect(res).not.toBeTruthy();
	} );
} );

