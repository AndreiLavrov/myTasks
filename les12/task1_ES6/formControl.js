
import  { FormControlInput } from  './form-controlInp.js';

export class FormControl {


	constructor (type, id, validators, myHelper, objValidators) {
		switch (type) {
			case 'input':
				return new FormControlInput(type, id, validators, myHelper, objValidators);
				break;
		}
	}
}

// коректно ли так вызывать formControlInput,  передавая параметром??????
/*
export class FormControl {


	constructor (type, id, validators, myHelper, formControlInput,objValidators) {  // коректно ли так вызывать formControlInput ?
		switch (type) {
			case 'input':
				return new formControlInput(type, id, validators, myHelper,objValidators);
				break;
		}
	}
}*/
