import { CommonValidator } from './commonValidator';

export class  ValidMail  extends  CommonValidator {
	constructor (){
		super('Email is not correct');

	}

	test (value) {
		return /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/.test(String(value) );
	};
}

