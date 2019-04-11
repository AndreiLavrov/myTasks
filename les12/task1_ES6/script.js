import { MinLength } from './minLeng.js';
import { Required } from './validator.js';


import { HelperClass } from './helperClass.js';
import  { FormGroup } from  './form-group.js';
import  { FormControl } from  './formControl.js';
import  { FormControlInput } from  './form-controlInp.js';

let helper = new HelperClass;

const itemForm = new FormGroup('registration', helper);

const control1 = new FormControl('input', 'login', ['Required', 'MinLength'], helper, FormControlInput);
const control2 = new FormControl('input', 'password', ['Required', 'MinLength'], helper,FormControlInput );
const control3 = new FormControl('input', 'password2', [],  helper,FormControlInput);

itemForm.registerControls(control1);
itemForm.registerControls(control2);
itemForm.registerControls(control3);

