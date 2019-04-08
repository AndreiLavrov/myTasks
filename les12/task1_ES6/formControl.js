
export class FormControl {


	constructor (type, id, validators, myHelper, formControlInput) {
		switch (type) {
			case 'input':
				return new formControlInput(type, id, validators, myHelper);
				break;
		}
	}
}
