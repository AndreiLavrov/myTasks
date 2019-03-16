describe('sequence.js -> sequence -> counter ', function () {
	it('without params should return correct number', function () {
		const myCounter = sequence();
		const res = myCounter();

		expect(res).toEqual(0);
	} );
	it('without params should return correct number', function () {
		const myCounter = sequence();
		myCounter();
		myCounter();
		myCounter();
		const res = myCounter();

		expect(res).toEqual(3);
	} );

	it('with param `start` and without param `step` should return correct number', function () {
		const myCounter = sequence(2);
		myCounter();
		const res = myCounter();

		expect(res).toEqual(3);
	} );

	it('with params should return correct number', function () {
		const myCounter = sequence(2, 2);
		myCounter();
		const res = myCounter();

		expect(res).toEqual(4);
	} );

	it('generators independent of each other', function () {
		const myCounter = sequence(2, 1);
		const myCounter2 = sequence(2, 2);
		myCounter();
		myCounter2();
		const res = myCounter();
		const res2 = myCounter2();
		expect(res).toEqual(3);
		expect(res2).toEqual(4);
	} );
} );

describe('sequence.js -> partitial -> multiplication  ', function () {
	it('with fixed params should return correct number', function () {
		const example = mult(2, 3, 4, 5);
		const mult23 = partitial(mult, 2, 3);
		const res =  mult23(4, 5);
		expect(res).toEqual(example);
	} );
} );

describe('sequence.js -> func -> used value of input  ', function () {
	beforeEach(function () {
		const elem = document.getElementById('elem');

		spyOn(window, 'alert')
			.and
			.callFake(function (param) {
				const arr = param.split(' ');

				return arr[0];
			} );
	} );

	it('should return value of input', function () {
		const res = func('Иванов', 'Иван');
		expect(res).toBe('привет,');
	} );

	it('should return value of input', function () {
		const res = func('Петров', 'Петр');
		expect(res).toBe('привет,');
	} );
} );
