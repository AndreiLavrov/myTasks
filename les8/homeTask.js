
/* constructor timer in function style
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
// const time = new Timer (10);
// time.start();



const message = document.getElementById('message');
const inputUser = document.getElementById('inputUser');
const send = document.getElementById('send');
const butStart = document.getElementById('start');

butStart.onclick = clickStart;

function clickStart () {
	const timer = new Timer(5);
	timer.start = function () {
		const self = this;
		_idInterval = setInterval(function () {
			if (self.startNum === 1) {
				message.innerText = 'Измерение...';
				clearInterval(_idInterval);

				return timerCounterHeardBit(15);
			}
			message.innerText = `Измерение начнется через ${--self.startNum}`;
		}, 1000);
			message.innerText = `Измерение начнется через ${self.startNum}`;
		return self.startNum;
	};

		timer.start();
	};


// та самая  функция таймер
function timerCounterHeardBit (tim) {
	setTimeout(function () {
		message.innerText = 'STOP!   enter your result';
	}, tim * 1000);
}

send.onclick = function () {
	message.innerText = `your pulse is ${+inputUser.value * 4} beats`;
};

