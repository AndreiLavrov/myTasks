describe('sequence.js -> sequence -> counter ', function () {
		it('without params should return correct number', function () {
				let myCounter = sequence();
				let res = myCounter();

				expect(res).toEqual(0)
		});
		it('without params should return correct number', function () {
				let myCounter = sequence();
				myCounter();
				myCounter();
				myCounter();
				let res = myCounter();

				expect(res).toEqual(3)
		});

		it('with param `start` and without param `step` should return correct number', function () {
				let myCounter = sequence(2);
				myCounter();
				let res = myCounter();

				expect(res).toEqual(3)
		});

		it('with params should return correct number', function () {
				let myCounter = sequence( 2, 2);
				myCounter();
				let res = myCounter();

				expect(res).toEqual(4)
		});

		it('generators independent of each other', function () {
				let myCounter = sequence( 2, 1);
				let myCounter2 = sequence( 2, 2);
				myCounter();
				myCounter2();
				let res = myCounter();
				let res2 = myCounter2();
				expect(res).toEqual(3);
				expect(res2).toEqual(4);
		});
});

describe('sequence.js -> partitial -> multiplication  ', function () {


		it('with fixed params should return correct number', function () {
				let example = mult(2, 3, 4, 5);
				let mult23 = partitial(mult, 2, 3);
				let res =  mult23(4, 5);
				expect(res).toEqual(example)
		});


});

describe('sequence.js -> func -> used value of input  ', function () {
		beforeEach(function () {
				const elem = document.getElementById('elem');

				spyOn(window, 'alert')
						.and
						.callFake(function (param) {
								let arr = param.split(' ');

								return arr[0];
						});
		});

		it('should return value of input', function () {
				let res = func('Иванов', 'Иван');
				expect(res).toBe('привет,');
		});

		it('should return value of input', function () {
				let res = func('Петров', 'Петр');
				expect(res).toBe('привет,');
		});

});
