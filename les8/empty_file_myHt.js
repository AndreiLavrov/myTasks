/**
 *
 * @param startNum
 * @constructor timer in function style
 */
function Timer (startNum, minNumTim) {
	this.startNum = startNum;
	let _idInterval;
	let _isPause = false;
	const self = this;

	this.start = function () {
		if (_isPause === false) {
			clearInterval(_idInterval);
			self.startNum = startNum;
		} else {
			_pauseIs = false;
		}

		_idInterval = setInterval(function () {
			if (self.startNum <= minNumTim + 1) {
				clearInterval(_idInterval);
			}

			return self.startNum--;
		}, 1000);
	};

	this.pause = function () {
		if (_isPause === false) {
			clearInterval(_idInterval);
			_isPause = true;
			// work = false;
		} else if (_isPause === true && self.startNum > 0) {
			self.start();
			_isPause = false;
		}
	};

	this.stop = function () {
		clearInterval(_idInterval);
	};
}
const objTimerInConsole = new Timer(10, 0);
objTimerInConsole.start();
setInterval(	function (){
	return console.log(objTimerInConsole.startNum);
}, 1000);

// const message = document.getElementById('message');
// const inputUser = document.getElementById('inputUser');
// const send = document.getElementById('send');
// const butStart = document.getElementById('start');
// const butPause = document.getElementById('pause');
// const myTimer = new Timer2(5);
// const myTimerCounterHeardBit = new Timer2(15);
// butStart.onclick = clickStart2;
//
// /* countdown to start measuring*/
// function clickStart2 () {
// 	myTimer.start(function (startNum) {
// 		if (startNum <= 0) {
// 			timerCounterHeardBit2();
// 			return message.innerText = 'Измерение...';
// 		}
//
// 		message.innerText = `Измерение начнется через ${startNum}`;
// 	} );
// }
//
// /* pulse time measurement*/
// function timerCounterHeardBit2 () {
// 	myTimerCounterHeardBit.start(function (startNum) {
// 		console.log(startNum);
// 		if (startNum === 0) {
// 			return message.innerText = 'STOP!   enter your result';
// 		}
// 	} );
// }
//
// send.onclick = function () {
// 	message.innerText = `your pulse is ${+inputUser.value * 4} beats`;
// };
//
// butPause.onclick = myTimer.pause;
//
// /*
// get the minimum and maximum values
// displays random values
// */
// function getRandomInt (min, max) {
// 	return Math.floor(Math.random() * (max - min) ) + min;
// }
//
// /*
// returns in console integers,
// even numbers result in an error
// */
// function checkNumEvenError () {
// 	const myTimerRandNum = setInterval(function  () {
// 		const randomNum = getRandomInt(1, 1000);
// 		try {
// 			if (randomNum % 2 === 0) {
// 				throw new Error('Ошибка в данных');
// 			}
// 			console.log(`success ${randomNum}`);
// 		} catch (e) {
// 			console.log(`${e} with ${randomNum}`);
// 		}
// 	}, 1000);
//
// 	setTimeout(function () {
// 		clearInterval(myTimerRandNum);
// 	}, 20000);
// }
//
// // checkNumEvenError ();
