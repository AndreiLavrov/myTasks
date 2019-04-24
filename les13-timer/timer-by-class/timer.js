
export class Timer{

	constructor (elem, current = 10, step = 1, done) {
		this.elem = elem;
		this.current = current;
		this.step = step;
		this.done = done;

		this.timerId;
		this.isPause = false;
		this.status = false;
}

	start ()  {

		// проверка на паузу, иначе возобновление отсчета сначала
		if (this.isPause === true) {
			this.isPause = false;
			clearInterval(this.timerId);
		}

		if (this.isPause === false) {
			clearInterval(this.timerId);
		}


			this.timerId = setInterval(()=> {
			this.status = true;
			this.current -= 1;
			if (this.current <= 0) {
				clearInterval(this.timerId);
				if (this.done){
					this.status = false;
					this.done();
				}
			}
			this.elem.innerHTML = this.current;

		}, this.step * 1000);

		this.elem.innerHTML = this.current;
	}

	reset (elem, current = 10, step = 1, done) {

		this.elem = elem;
		this.current = current;
		this.step = step;
		this.done = done;
	}


	pause () {

		if (this.isPause === false) {
			clearInterval(this.timerId);
			this.isPause = true;
		 }
	}

	stop () {

		clearInterval(this.timerId);
		this.status = false;
	};
}
