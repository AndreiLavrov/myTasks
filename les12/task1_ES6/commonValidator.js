
export class CommonValidator {

	constructor (msg) {
		this.errorMessage = msg || 'Common error message';
		this.toString = function () {         // не работает в прототиппе из-за того что в Required есть свой toString?
			return this.errorMessage;
		};
	}
}
