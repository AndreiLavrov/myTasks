
describe('new.js -> clock -> return the number of seconds until tomorrow', function () {
	it('should return correct number', function () {
		const tomorrow = new Date(2019, 2, 11);
		const today = new Date(2019, 2, 10, 23, 59);

		const res = clock(today, tomorrow);
		expect(res).toEqual(Math.ceil( ( (tomorrow - today) / 1000) ) );
	} );

	it('should add to item on the page ', function () {
		const tomorrow = new Date(2019, 3, 11);
		const today = new Date(2019, 3, 10, 23, 59);

		const clockSec = clock(today, tomorrow);
		expect(clockSec).toBe(Math.ceil( ( (tomorrow - today) / 1000) ) );
		const res = document.getElementById('getTimer');
		expect(res.innerText).toEqual(`${clockSec}`);
	} );
} );

describe('new.js -> count -> return the number of days until birthday', function () {
	it('should return correct number', function () {
		const res = count('', '1991-05-18', new Date('2019-02-11') );
		expect(res).toEqual(96);
	} );

	it('should add to item on the page ', function () {
		const day = document.getElementById('day');
		const res = count(day, '1991-05-18', new Date('2019-02-11') );
		expect(res).toEqual(+day.innerText);
	} );
} );

describe('new.js -> countM -> return the number of days until birthday', function () {
	it('should return correct number', function () {
		const day = document.getElementById('day');
		const res = countM(day, '1991-05-18', '2019-02-14');
		expect(res).toEqual(93);
	} );
	it('should add to item on the page ', function () {
		const day = document.getElementById('day');
		const res = countM(day, '1991-05-18', new Date('2019-02-11') );
		expect(res).toEqual(+day.innerText);
	} );
} );

describe('new.js -> mySort -> return sorted array', function () {
	users = [{ id: '1', name: 'Jack', dob: '1999-01-01' },
		{ id: '2', name: 'Tom', dob: '1992-01-01' },
		{ id: '3', name: 'Bob', dob: '2003-01-01' }];

	it('should return correct sorted array by `name`', function () {
		const locUsers = users.slice();
		const res = mySort(locUsers, 'name', 'asc');
		expect(res).toEqual( [users[2], users[0], users[1]] );
	} );

	it('should return correct sorted array by dob', function () {
		const locUsers = users.slice();
		const res = mySort(locUsers, 'dob', 'asc');
		expect(res).toEqual( [users[1], users[0], users[2]] );
	} );

	it('should return correct sorted array by dob and desc', function () {
		const locUsers = users.slice();
		const res = mySort(locUsers, 'dob', 'desc');
		expect(res).toEqual( [users[2], users[0], users[1]] );
	} );
} );
