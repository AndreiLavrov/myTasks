/* constructor timer in function style
counts time @startNum
has metods
@start declered timer and return present value
@pause pause timer and continue work with using value
@stop stop timer */
function Timer2 (startNum) {
		this.startNum = startNum;
		let _idInterval;
		let _pauseIs = false;
		let funSpetionWork;
		const self = this;
		let work = false;

		this.start = function (fun) {
				if (_pauseIs === false) {
						clearInterval(_idInterval);
						self.startNum = startNum;
				} else {
						_pauseIs = false;
				}

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

		this.pause = function () {
				if (_pauseIs === false) {
						clearInterval(_idInterval);
						_pauseIs = true;
						work = false;
				} else if (_pauseIs === true && self.startNum > 0) {

						self.start(funSpetionWork);
						_pauseIs = false;
				}
		};

		this.stop = function () {
				clearInterval(_idInterval);
		};
}
const time = new Timer2 (10);
time.start(console.log);




const message = document.getElementById('message');
const inputUser = document.getElementById('inputUser');
const send = document.getElementById('send');
const butStart = document.getElementById('start');
const butPause = document.getElementById('pause');
const myTimer = new Timer2(5);
const myTimerCounterHeardBit = new Timer2(15);
butStart.onclick = clickStart2;

/*countdown to start measuring*/
function clickStart2 () {
		myTimer.start(function (startNum) {
				if (startNum <= 0) {
						timerCounterHeardBit2();
						return message.innerText = 'Измерение...';
				}

				message.innerText = `Измерение начнется через ${startNum}`;
		});

};

/*pulse time measurement*/
function timerCounterHeardBit2 () {

		myTimerCounterHeardBit.start(function (startNum) {
				console.log(startNum);
				if (startNum === 0) {
						return message.innerText = 'STOP!   enter your result';
				}
		});
}


send.onclick = function () {
		message.innerText = `your pulse is ${+inputUser.value * 4} beats`;
};

butPause.onclick = myTimer.pause;


/*
get the minimum and maximum values
displays random values
*/
function getRandomInt (min, max) {
		return Math.floor(Math.random() * (max - min) ) + min;
}

/*
returns in console integers,
even numbers result in an error
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

//checkNumEvenError ();
