
/* constructor timer
counts time @startNum
has metods
@start declered timer and return present value
@pause pause timer and continue work with using value
@stop stop timer */
function Timer (startNum) {
	this.startNum = startNum;
	let _idInterval;
	let _pauseIs = false;
	this.start = function () {
		_idInterval = setInterval(function () {
			if (startNum === 1) {
				clearInterval(_idInterval);
			}
			return console.log(--startNum);
		}, 1000);
		return console.log(startNum);
	};
	this.pause = function () {
		if (_pauseIs === false) {
			clearInterval(_idInterval);
			_pauseIs = true;
		} else if (_pauseIs === true) {
			this.start();
			_pauseIs = false;
		}
	};
	this.stop = function () {
		clearInterval(_idInterval);
	};
}

const message = document.getElementById('message');
const inputUser = document.getElementById('inputUser');
const send = document.getElementById('send');
const butStart = document.getElementById('start');

butStart.onclick = function clickStart () {
	const timer = new Timer(5);
	timer.start = function () {
		const self = this;
		_idInterval = setInterval(function () {
			if (self.startNum === 1) {
				message.innerText = 'Измерение...';
				clearInterval(_idInterval);

				timerCounterHeardBit(15);
				return;
			}
			message.innerText = `Измерение начнется через ${--self.startNum}`;
		}, 1000);
		return self.startNum;
	};
	message.innerText = `Измерение начнется через ${timer.start()}`;
};

// та самая  функция таймер
function timerCounterHeardBit (tim) {
	const time = setTimeout(function () {
		message.innerText = 'STOP!   enter your result';
	}, tim * 1000);
}

send.onclick = function (e) {
	message.innerText = `your pulse is ${+inputUser.value * 4} beats`;
};

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}
function checkNumEvenError () {
	const myTimerRandNum = setInterval(function f () {
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

