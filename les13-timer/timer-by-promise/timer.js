
export class Timer{
	constructor (elem, current = 10, step = 1) {
		this.elem = elem;
		this.current = current;
		this.step = step;

		this.timerId = false;
		this.isPause = false;
		this.status = false;
}

	start ()  {

		this.status = true;
		this.isPause = false;

		return new Promise((resolve, reject) => {

			this.timerId = setInterval(()=> {
				this.current -= 1;
				if (this.current <= 0) {
					clearInterval(this.timerId);

					return resolve();
				}
				this.elem.innerHTML = this.current;

			}, this.step * 1000);

			this.elem.innerHTML = this.current;
		});

	}

	reset (elem, current = 10, step = 1) {

		this.elem = elem;
		this.current = current;
		this.step = step;
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
