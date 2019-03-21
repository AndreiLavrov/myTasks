// describe('homeTask.js -> Timer -> creat a new object  ', function () {
// 	let consLog = [];
// 	beforeEach(function () {
// 		spyOn(console, 'log')
// 			.and
// 			.callFake(function (param) {
// 				return consLog.push(param);
// 			} );
//
// 		jasmine.clock().install();
//
// 		consLog = [];
// 	} );
//
// 	afterEach(function () {
// 		jasmine.clock().uninstall();
// 	} );
//
// 	it('which dos not depend on another object of the same class', function () {
// 		const obj1 = new Timer(1);
// 		const obj2 = new Timer(2);
// 		expect(obj1.startNum).toBe(1);
// 		expect(obj2.startNum).toBe(2);
// 	} );
//
// 	it('which have correct `pause` method ', function () {
// 		const obj1 = new Timer(5);
// 		obj1.start();
// 		jasmine.clock().tick(500);
// 		expect(consLog).toEqual( [5] );
// 		obj1.pause();
// 		jasmine.clock().tick(1000);
// 		expect(consLog).toEqual( [5] );
// 		obj1.pause();
// 		expect(consLog).toEqual( [5, 5] );
// 		jasmine.clock().tick(1000);
// 		expect(consLog).toEqual( [5, 5, 4] );
// 	} );
//
// 	it('which have correct `stop` method ', function () {
// 		const obj1 = new Timer(5);
// 		obj1.start();
// 		jasmine.clock().tick(500);
// 		expect(consLog).toEqual( [5] );
//
// 		jasmine.clock().tick(1000);
// 		expect(consLog).toEqual( [5, 4] );
// 		obj1.stop();
// 		expect(consLog).toEqual( [5, 4] );
// 		jasmine.clock().tick(2000);
// 		expect(consLog).toEqual( [5, 4] );
// 	} );
// } );
//
// describe('homeTask.js -> timerCounterHeardBit -> should    ', function () {
// 	beforeEach(function () {
// 		jasmine.clock().install();
// 		message.innerText = '';
// 	} );
//
// 	afterEach(function () {
// 		jasmine.clock().uninstall();
// 	} );
//
// 	it('add string in page ', function () {
// 		expect(message.innerText)
// 			.toBe('');
// 		timerCounterHeardBit(5);
//
// 		jasmine.clock().tick(5500);
// 		expect(message.innerText)
// 			.toBe('STOP!   enter your result');
// 	} );
//
// 	it('add string in page after correct time ', function () {
// 		expect(message.innerText)
// 			.toBe('');
// 		timerCounterHeardBit(5);
//
// 		jasmine.clock().tick(4000);
// 		expect(message.innerText)
// 			.not.toBe('STOP!   enter your result');
//
// 		jasmine.clock().tick(1500);
// 		expect(message.innerText)
// 			.toBe('STOP!   enter your result');
// 	} );
// } );
//
describe('homeTask.js -> clickStart -> creat a new object  ', function () {
		beforeEach(function() {
				jasmine.clock().install();
				// message.innerText = '';
		});

		afterEach(function() {
				jasmine.clock().uninstall();
		});


		it('which are correct string', function () {
				expect(message.innerText)
						.toBe('Измерение начнется через 5');
				//clickStart(5);
				expect(message.innerText)
						.toBe('Измерение начнется через 5');

				// const result = validate('correctInput', 'name');
				// expect(result)
				// 		.toBe('correctInput');
		});
});



describe('homeTask.js -> checkNumEvenError -> returns in console integers  ', function () {
		let consLog = [];
		beforeEach(function () {
				spyOn(console, 'log')
						.and
						.callFake(function () {
								alert('consLog.length');
								consLog.push(param);
						} );

		} );


		// it(' numbers ', function () {
		// 		checkNumEvenError();
		// 		alert(consLog.length);
		// 		expect(consLog.every(function (item) {
		// 				return !isNaN(item);
		// 		}) ).toBeTruthy();
		// });

		// it('even numbers result in an error', function () {
		// 		checkNumEvenError();
		//
		// 		expect(consLog.every(function (item) {
		// 				return item % 2 !== 0;
		// 		}) ).toBeTruthy();
		// });
});
