
import { Timer } from './timer.js';

class TimerAct {
	constructor () {
		this.message = document.getElementById('message');
		this.elem = document.getElementById('num');
		this.inputUser = document.getElementById('inputUser');

		this.send = document.getElementById('send');
		this.butStart = document.getElementById('start');
		this.butPause = document.getElementById('pause');

		this.myTimer = new Timer(this.elem, 5, 1);
		this.stage = 0;
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

	funStage1 (){

			this.stage = 1;
			this.myTimer.stop();
			this.funCallBack();
			return this.myTimer.start();

	}

	funStage2 () {

			this.stage = 2;
			this.ShowStopTim();
			this.elem.textContent = '';

	}

	clickStart () {


		if ((!!this.myTimer.status === false) && (this.myTimer.isPause === false)
		|| ((this.myTimer.status === true) && (this.myTimer.isPause === false))) {

			(this.myTimer.timerId !== false) ? clearInterval(this.myTimer.timerId) : null;

			this.myTimer = new Timer(this.elem, 5, 1);

			this.stage = 0;
			this.message.textContent = `Измерение начнется через`;

			this.myTimer.start()

				.then(() => {
					this.funStage1().call(this);

				})

				.then(() => {
					this.funStage2().call(this);
				})

				.catch((e) => console.log(e.message))

		}	else  if ((this.myTimer.status === true) && (this.myTimer.isPause === true)){

				if(this.stage === 0){

					this.message.textContent = `Измерение начнется через`;

					this.myTimer.start()

						.then(() => {
							this.funStage1().call(this);
						})

						.then(() => {
							this.funStage2().call(this);
						})

						.catch((e) => console.log(e.message))

				} else if(this.stage === 1){
					(()=> {
						this.message.textContent = `Измеряйте пульс...`;
						return this.myTimer.start();
					})()

						.then(() => {
							this.funStage2().call(this);
						})

						.catch((e) => console.log(e.message))

				} else if(this.stage === 2){
					(()=> {
						this.ShowStopTim();
						this.elem.textContent = '';
					})()

				}
		}


	}


	funCallBack () {
		this.message.textContent = `Измеряйте пульс...`;
		this.myTimer.reset(this.elem, 15, 1);
	}


	ShowStopTim () {
		this.message.innerText = 'Стоп!   введите результат';
	}

}
const timerAct = new TimerAct();
