import { CommonValidator } from './commonValidator';

export  class MinLength extends  CommonValidator {
	constructor () {
		super('This field is required.');
		//CommonValidator.call(this, 'Min length should be 7');
	}

	test (value) {
		return value.length >= 7;
	}
}
