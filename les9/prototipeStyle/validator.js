
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












// function CommonValidator (msg) {
// 	this._errorMessage = msg || 'Common error message';
// }
// CommonValidator.prototype.toString = function () {
// 	return this._errorMessage;
// };
// function Required () {
// 	CommonValidator.call(this, 'This field is required.');
// }
// Required.prototype.test = function (value) {
// 	return value.length > 0;
// };
// function MinLength (value) {
// 	CommonValidator.call(this, 'Min length should be 7');
// }
// MinLength.prototype.test = function (value) {
// 	return value.length >= 7;
// };
