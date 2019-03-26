describe('homeTask2.js -> Timer2 -> creat a new object  ', function () {
	let consLog = [];
	beforeEach(function () {
		spyOn(console, 'log')
			.and
			.callFake(function (param) {
				return consLog.push(param);
			} );

		jasmine.clock().install();

		consLog = [];
	} );

	afterEach(function () {
		jasmine.clock().uninstall();
	} );

	it('which dos not depend on another object of the same class', function () {
		const obj1 = new Timer2(1);
		const obj2 = new Timer2(2);
		expect(obj1.startNum).toBe(1);
		expect(obj2.startNum).toBe(2);
	} );

	it('which have correct `pause` method ', function () {
		const obj1 = new Timer2(5);
		obj1.start(console.log);
		jasmine.clock().tick(500);
		expect(consLog).toEqual( [5] );
		obj1.pause();
		jasmine.clock().tick(1000);
		expect(consLog).toEqual( [5] );
		obj1.pause();
		expect(consLog).toEqual( [5, 5] );
		jasmine.clock().tick(1000);
		expect(consLog).toEqual( [5, 5, 4] );
	} );

	it('which have correct `stop` method ', function () {
		const obj1 = new Timer2(5);
		obj1.start(console.log);
		jasmine.clock().tick(500);
		expect(consLog).toEqual( [5] );

		jasmine.clock().tick(1000);
		expect(consLog).toEqual( [5, 4] );
		obj1.stop();
		expect(consLog).toEqual( [5, 4] );
		jasmine.clock().tick(2000);
		expect(consLog).toEqual( [5, 4] );
	} );
} );

describe('homeTask2.js -> timerCounterHeardBit2 -> should    ', function () {
	beforeEach(function () {
		jasmine.clock().install();
		message.innerText = '';
	} );

	afterEach(function () {
		jasmine.clock().uninstall();
	} );

	it('add string in page ', function () {
		expect(message.innerText)
			.toBe('');
		timerCounterHeardBit();

		jasmine.clock().tick(15000);
		expect(message.innerText)
			.toBe('STOP!   enter your result');
	} );

	it('add string in page after correct time ', function () {
		expect(message.innerText)
			.toBe('');
		timerCounterHeardBit();

		jasmine.clock().tick(4000);
		expect(message.innerText)
			.not.toBe('STOP!   enter your result');

		jasmine.clock().tick(15000);
		expect(message.innerText)
			.toBe('STOP!   enter your result');
	} );
} );

describe('homeTask2.js -> clickStart -> creat a new object  ', function () {
	beforeEach(function () {
		jasmine.clock().install();
		message.innerText = '';
	} );

	afterEach(function () {
		jasmine.clock().uninstall();
	} );

	it('add correct string in page ', function () {
		expect(message.innerText)
			.toBe('');
		clickStart();

		jasmine.clock().tick(100);
		expect(message.innerText)
			.toBe('Измерение начнется через 5');
		jasmine.clock().tick(1000);
		expect(message.innerText)
			.toBe('Измерение начнется через 4');
		jasmine.clock().tick(3000);
		expect(message.innerText)
			.toBe('Измерение начнется через 1');
	} );

	it('add string in page after correct time ', function () {
		expect(message.innerText)
			.toBe('');
		clickStart();

		jasmine.clock().tick(5000);
		expect(message.innerText)
			.toBe('Измерение...');
	} );
} );

describe('homeTask2.js -> checkNumEvenError -> returns in console integers  ', function () {
	let myConsLog = [];
	beforeEach(function () {
		spyOn(console, 'log')
			.and
			.callFake(function (param) {
				return myConsLog.push(param);
			} );

		jasmine.clock().install();

		myConsLog = [];
	} );

	afterEach(function () {
		jasmine.clock().uninstall();
	} );

	it(' numbers ', function () {
		checkNumEvenError();
		jasmine.clock().tick(20000);
		// alert(myConsLog);
		expect(myConsLog.every(function (item) {
			const arr = item.split(' ');
			return !isNaN(arr[arr.length - 1] );
		} ) ).toBeTruthy();
	} );

	it('even numbers result in an error', function () {
		checkNumEvenError();
		jasmine.clock().tick(20000);
		expect(myConsLog.every(function (item) {
			const arr = item.split(' ');
			return ( (arr[0] === 'Error:') && (arr[arr.length - 1] % 2 === 0)  ||
									(arr[0] === 'success') && (arr[arr.length - 1] % 2 !== 0) );
		} ) ).toBeTruthy();
	} );
} );
