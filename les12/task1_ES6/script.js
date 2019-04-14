import { MinLength } from './minLeng';     // или не стоило вызвать по отдельности валидаторы ?
import { Required } from './required';
import { ValidMail } from './email';


import { HelperClass } from './helperClass.js';
import  { FormGroup } from  './form-group.js';
import  { FormControl } from  './formControl.js';


const objValidators = {
	Required,
	MinLength,
	ValidMail,
};

let helper = new HelperClass;

const itemForm = new FormGroup('registration', helper);

const control1 = new FormControl('input', 'login', ['Required', 'MinLength'], helper, objValidators);
const control2 = new FormControl('input', 'password', ['Required', 'MinLength'], helper, objValidators );
const control3 = new FormControl('input', 'email', ['Required', 'ValidMail'],  helper, objValidators);

itemForm.registerControls(control1);
itemForm.registerControls(control2);
itemForm.registerControls(control3);

