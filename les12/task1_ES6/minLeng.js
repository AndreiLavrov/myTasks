class CommonValidator  {

	constructor (msg) {
		this._errorMessage = msg || 'Common error message';
	}

	toString  () {
		return this._errorMessage;
	};
}

export  class MinLength extends  CommonValidator {
	constructor (value) {
		super('This field is required.');
		//CommonValidator.call(this, 'Min length should be 7');
	}

	test (value) {
		return value.length >= 7;
	}
}
