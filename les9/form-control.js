
function FormControl (type, id, validators) {
	switch (type) {
	case 'input':
		return new FormControlInput(type, id, validators);
		break;
	}
}

function FormControlInput (type, id, validators) {
	this.control = getControl();
	this.validationErrors = [];

	const myHelper = helper;
	this.isValid = getValidation.bind(this)();

	this.addClass = myHelper.addClassControl;
	this.removeClass = myHelper.removeClassControl;

	this.startCheck = function () {
		this.isValid = getValidation.bind(this)();
		console.log(this.isValid);

		if (!this.isValid) {
			this.addClass( ['error'] );
		} else {
			this.removeClass( ['error'] );
		}

		const errorContainer = this.control.parentNode.querySelector('.error-list');
		let text = '';
		console.log(this.validationErrors);
		this.validationErrors.forEach(function (error) {
			text += `<span>${error}</span><br />`;
		} );

		errorContainer.innerHTML = text;
	};

	function addValidError (self, validator, validationErrors) {
		if (validationErrors.indexOf(validator.toString() ) === -1) {
			return validationErrors.push(validator.toString() );
		}
	}

	function removeValidError (self, errorIndex, validationErrors) {
		if (errorIndex !== -1) {
			return validationErrors.splice(errorIndex, 1);
		}
	}

	function getValidation () {
		let isValid = true;
		const self = this;

		validators.forEach(function (item) {
			const validator = new (window[item] )(3);

			if (!(validator.test(self.control.value) ) ) {
				isValid = false;
				return addValidError(self, validator, self.validationErrors);   // корректно ли работает такая замена куска кода функцией, нужен return ?
			}
			const errorIndex = self.validationErrors.indexOf(validator.toString() );
			return removeValidError(self, errorIndex, self.validationErrors);
		} );

		return isValid;
	}

	_init.bind(this)();

	function _init () {
		const self = this;
		this.control.addEventListener('input', this.startCheck.bind(self) );
	}

	function getControl () {
		let controls = document.getElementsByTagName(type);

		controls = [].slice.call(controls, 0);

		return controls.filter(function (control) {
			return control.id === id;
		} )[0];
	}
}
