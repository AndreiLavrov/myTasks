const helper = new Helper();

const itemForm = new FormGroup('registration', helper);
const control1 = new FormControl('input', 'login', ['Required', 'MinLength'], helper );
const control2 = new FormControl('input', 'password', ['Required', 'MinLength'], helper );
const control3 = new FormControl('input', 'email', ['Required', 'ValidMail'],  helper);                      // ValidMail
itemForm.registerControls(control1);
itemForm.registerControls(control2);
itemForm.registerControls(control3);
