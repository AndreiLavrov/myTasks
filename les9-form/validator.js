function CommonValidator (msg) {
	this.errorMessage = msg || 'Common error message';
	this.toString = function () {         // не работает в прототиппе из-за того что в Required есть свой toString?
		return this.errorMessage;
	};
}


function Required () {

	CommonValidator.call(this, 'This field is required.');
}

Required.prototype.test = function (value) {
		return value.length > 0;
};


function MinLength () {

	CommonValidator.call(this, 'Min length should be 7');
}

MinLength.prototype.test = function (value) {
	return value.length >= 7;
};


function ValidMail () {

	CommonValidator.call(this, 'Email is not correct');
}

ValidMail.prototype.test = function (value) {
	return /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/.test(String(value) );
};
