
import { Timer } from './timer.js';

class TimerAct {
	constructor () {
		this.message = document.getElementById('message');
		this.elem = document.getElementById('num');
		this.inputUser = document.getElementById('inputUser');

		this.send = document.getElementById('send');
		this.butStart = document.getElementById('start');
		this.butPause = document.getElementById('pause');

		this.myTimer = new Timer(this.elem, 5, 1, this.funCallBack.bind(this));

		this.init();
	}

	init(){
		this.butStart.onclick = this.clickStart.bind(this);
		this.butPause.onclick = this.pauseClick.bind(this);
		this.send.onclick = this.sendResults.bind(this);

	}


	pauseClick () {
		return this.myTimer.pause();
	}



	sendResults () {
		this.message.innerText = `your pulse is ${+this.inputUser.value * 4} beats`;
	}



	clickStart () {
		console.log(this.myTimer);
		if ((this.myTimer.isPause === false) && (this.myTimer.status === false)) {
			this.message.textContent = `Измерение начнется через`;
		}
		this.myTimer.start();
	}


	funCallBack () {
		this.message.textContent = `Измеряйте пульс...`;
		this.myTimer.reset(this.elem, 15, 1, this.ShowStopTim.bind(this));
		this.myTimer.start();
	}


	ShowStopTim () {
		this.message.innerText = 'Стоп!   введите результат';
	}
}
const timerAct = new TimerAct();
