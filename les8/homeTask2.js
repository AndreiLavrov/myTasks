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
		// this.myFun = function () {};
		const self = this;

		this.start = function (fun) {

						_idInterval = setInterval(function () {
								if (self.startNum === 1) {
										clearInterval(_idInterval);
								}
								--self.startNum;

								return fun;
						}, 1000);

						return fun;
		};

		// this.pause = function () {
		// 		if (_pauseIs === false) {
		// 				clearInterval(_idInterval);
		// 				_pauseIs = true;
		// 		} else if (_pauseIs === true) {
		// 				this.start();
		// 				_pauseIs = false;
		// 		}
		// };
		//
		// this.stop = function () {
		// 		clearInterval(_idInterval);
		// };
}
const time = new Timer (10);
time.start(message.innerText);
