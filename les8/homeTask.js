/*
let start = 10;
let id = setInterval(function(){
		console.log(--start);
}, 1000);
*/



function Timer (startNum ) {
		let _startNum = startNum;
		let _idInterval;
		let _pauseIs = false;
		this.start = function () {
				console.log(_startNum);
				_idInterval = setInterval(function(){
						if (_startNum === 1) clearInterval(_idInterval);
						console.log(--_startNum);
				}, 1000);
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

const message = document.getElementById('message');
const inputUser = document.getElementById('inputUser');
const send = document.getElementById('send');
const butStart = document.getElementById('start');
butStart.onclick = function (e) {
		message.innerText = `Измерение начнется через `;
};
// let myTim = new Timer(10);
// myTim.start();
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
