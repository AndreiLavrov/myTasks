
// task 1 *my first solution..
/**
 * @param startNum number time timer
 * @constructor timer in function style
 * has metods
 * @start declered timer and return present value
 * @pause pause timer and continue work with using value
 * @stop stop timer
 */
function Timer2 (startNum) {
	this.startNum = startNum;
	let _idInterval;
	let _isPause = false;
	let funSpetionWork;
	const self = this;

	/**
	 * @param fun передается параметром функция, показ-ая конкретное действие с таймером(cons.log, innerText, )
	 * @returns {*} fun
	 */
	this.start = function (fun) {
		// проверка на паузу, иначе возобновление отсчета сначала
		if (_isPause === false) {
			clearInterval(_idInterval);
			this.startNum = startNum;
		} else {
			_isPause = false;
		}

		/*  задаем функцию показ-ую конкретное действие с таймером в область видимости всего объекта.
		Нужно для возобновления после паузы вызовом метода паузы а не старт*/
		funSpetionWork = fun;

		_idInterval = setInterval(function () {
			--self.startNum;
			if (self.startNum <= 0) {
				clearInterval(_idInterval);
			}

			return funSpetionWork(self.startNum);
		}, 1000);

		return funSpetionWork(this.startNum);
	};

	/**
	 * отанавливает и возобновляет работу таймера
	 * использует свойства объекта
	 */
	this.pause = function () {
		if (_isPause === false) {
			clearInterval(_idInterval);
			_isPause = true;
		} else if (_isPause === true && this.startNum > 0) {
			this.start(funSpetionWork);
			_isPause = false;
		}
	};

	this.stop = function () {
		clearInterval(_idInterval);
	};
}

const time = new Timer2(10);
time.start(console.log);

// task 2
const message = document.getElementById('message');
const inputUser = document.getElementById('inputUser');
const send = document.getElementById('send');
const butStart = document.getElementById('start');
const butPause = document.getElementById('pause');

const myTimer = new Timer2(5);
const myTimerCounterHeardBit = new Timer2(15);

butStart.onclick = clickStart;
send.onclick = function () {
	message.innerText = `your pulse is ${+inputUser.value * 4} beats`;
};

butPause.onclick = myTimer.pause;

/* countdown to start measuring*/
function clickStart () {
	myTimer.start(function (startNum) {
		if (startNum <= 0) {
			timerCounterHeardBit();
			return message.innerText = 'Измерение...';
		}

		message.innerText = `Измерение начнется через ${startNum}`;
	} );
}

/* pulse time measurement*/
function timerCounterHeardBit () {
	myTimerCounterHeardBit.start(function (startNum) {
		console.log(startNum);
		if (startNum === 0) {
			return message.innerText = 'STOP!   enter your result';
		}
	} );
}

//   task 3
/**
 * get the minimum and maximum values
 * displays random values
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

/**
 * returns in console integers,
 * even numbers result in an error
 */
function checkNumEvenError () {
	const myTimerRandNum = setInterval(function  () {
		const randomNum = getRandomInt(1, 1000);
		try {
			if (randomNum % 2 === 0) {
				throw new Error('Ошибка в данных');
			}
			console.log(`success ${randomNum}`);
		} catch (e) {
			console.log(`${e} with ${randomNum}`);
		}
	}, 1000);

	setTimeout(function () {
		clearInterval(myTimerRandNum);
	}, 20000);
}

// checkNumEvenError ();
