/*
let start = 10;
let id = setInterval(function(){
		console.log(--start);
}, 1000);
*/


//
// function Timer (startNum ) {
// 		let _startNum = startNum;
// 		let _idInterval;
// 		let _pauseIs = false;
// 		this.start = function () {
// 				_idInterval = setInterval(function(){
// 						if (_startNum === 1) clearInterval(_idInterval);
// 						return console.log(--_startNum);
// 				}, 1000);
// 				return _startNum;
// 		}
// 		this.pause = function () {
// 				if (_pauseIs === false) {
// 						clearInterval(_idInterval);
// 						_pauseIs = true;
// 				} else if (_pauseIs === true){
// 						this.start();
// 				}
// 		}
// 		this.stop = function () {
// 				clearInterval(this.idInterval);
// 		}
// }


function Timer (startNum ) {
		this.startNum = startNum;
		let _idInterval;
		let _pauseIs = false;
		this.start = function () {
				_idInterval = setInterval(function(){
						if (this.startNum === 1) clearInterval(_idInterval);
						return console.log(--this.startNum);
				}, 1000);
				return this.startNum;
		}
		this.pause = function () {
				if (_pauseIs === false) {
						clearInterval(_idInterval);
						_pauseIs = true;
				} else if (_pauseIs === true){
						this.start();
				}
		}
		this.stop = function () {
				clearInterval(this.idInterval);
		}
}

let message = document.getElementById('message');
let inputUser = document.getElementById('inputUser');
const send = document.getElementById('send');
const butStart = document.getElementById('start');
butStart.onclick = function (e) {
		let timer = new Timer(5);
		timer.start = function () {
				let self = this;
				_idInterval = setInterval(function(){
						if (self.startNum === 1) {
								message.innerText = `Измерение...`;
								clearInterval(_idInterval);
								// здесь будет функция таймер
								timerConterHeardBit (15);
								return;
						}
						message.innerText = `Измерение начнется через ${--self.startNum }`;
				}, 1000);
				return self.startNum;
		}
		message.innerText = `Измерение начнется через ${timer.start()}`;
};

// та самая  функция таймер
function timerConterHeardBit (tim) {
		let time = setTimeout (function () {
				message.innerText = `STOP!   enter your result`;
		}, tim * 1000);

}

send.onclick = function (e) {
		message.innerText = +inputUser.value * 4;
}




function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
}
const myTimerRandNum = setInterval(function f () {
		const randomNum = getRandomInt(1, 1000);
		try {
				if(randomNum % 2 === 0) {
						throw new Error("Ошибка в данных");
				}
				console.log(`success ${randomNum}`);
		}catch (e) {
				console.log(`${e} with ${randomNum}`);
		}
}, 1000);

		setTimeout(function () {
				clearInterval(myTimerRandNum);
		}, 20000)
// let myTim = new Timer(10);
// console.log(myTim.start() );
//
// setTimeout(function () {
// 		myTim.pause();
// }, 3000);
//
// setTimeout(function () {
// 		myTim.pause();
// }, 6000);
// let myTim2 = new Timer(5);
// myTim2.start();
// setTimeout(function () {
// 		myTim2.pause();
// }, 2000);
