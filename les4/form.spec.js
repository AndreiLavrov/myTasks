describe('form.js -> form -> it checks the validity of the form', function () {
	it('should return true', function () {
		const res = form(' Laurou', '  Andrei', 'password', 'Lavrikffk@mail.ru');
		expect(res).toBeTruthy();
	} );
} );

describe('form.js -> validInpName -> it delete input name(first and last)', function () {
	it('should return name without spaces', function () {
		const res = validInpName('  Laurou ');
		expect(res).toBe('Laurou');
	} );
} );

describe('form.js -> validLengthInpPassword -> it checks the validity of the password(long)', function () {
	it('should return true', function () {
		const res = validLengthInpPassword('passw');
		expect(res).toBeTruthy();
	} );

	it('should return false', function () {
		const res = validLengthInpPassword('pas');
		expect(res).not.toBeTruthy();
	} );
} );

describe('form.js -> validInpEmail -> it checks the validity of the Email(have "@") ', function () {
	it('should return true', function () {
		const res = validInpEmail('lawr@.ru');
		expect(res).toBeTruthy();
	} );

	it('should return false', function () {
		const res = validInpEmail('pas');
		expect(res).not.toBeTruthy();
	} );

	it('should return false', function () {
		const res = validInpEmail('  pas');
		expect(res).not.toBeTruthy();
	} );
} );

