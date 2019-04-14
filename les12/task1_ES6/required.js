
import { CommonValidator } from './commonValidator';

export class Required extends  CommonValidator{
	constructor (){
		super('This field is required.');
	}

	test (value) {
		return value.length > 0;
	};
}
