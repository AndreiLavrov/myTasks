// не могу понять как исправить ошибку в spec 'Cannot set property 'innerText' of null..' :(

describe('new.js -> clock -> return the number of seconds until tomorrow', function () {
	it('should return 60', function () {
		const res = clock(new Date(2019, 3, 10, 23, 59),  new Date(2019, 3, 11) );
		// console.log(res);
		expect(res).toEqual(60);
	} );
} );

describe('new.js -> mySort -> return sorted array', function () {
	users = [{ id: '1', name: 'Jack', dob: '1999-01-01' },
		{ id: '2', name: 'Tom', dob: '1992-01-01' },
		{ id: '3', name: 'Bob', dob: '2003-01-01' }];

	users2 = [
		{ id: '3', name: 'Bob', dob: '2003-01-01' },
		{ id: '1', name: 'Jack', dob: '1999-01-01' },
		{ id: '2', name: 'Tom', dob: '1992-01-01' },
	];

	it('should return 0', function () {
		const res = mySort(users, 'name', 'asc');
		expect(res).toEqual(users2);
	} );
} );

describe('new.js -> count -> return the number of days until birthday', function () {
	it('should return 99', function () {
		const res = count('', '1991-06-18', new Date('2019-03-11') );
		expect(res).toEqual(99);
	} );
} );
describe('new.js -> countM -> return the number of days until birthday', function () {
		it('should return 99', function () {
				const res = count('', '1991-06-18', new Date('2019-03-11') );
				expect(res).toEqual(99);
		} );
} );

