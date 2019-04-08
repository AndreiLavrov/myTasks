function CommonValidator (msg) {
	this.errorMessage = msg || 'Common error message';
	this.toString = function () {
		return this.errorMessage;
	};
}

function Required () {
	CommonValidator.call(this, 'This field is required.');
	this.test = function (value) {
		return value.length > 0;
	};
}

function MinLength (value) {
	CommonValidator.call(this, 'Min length should be 7');
	this.test = function (value) {
		return value.length >= 7;
	};
}

function ValidMail () {
	CommonValidator.call(this, 'Email is not correct ');
	this.test = function (value) {
		return /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/.test(String(value) );
	};
}

