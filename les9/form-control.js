function FormControl (type, id, validators) {
	switch (type) {
	case 'input':
		return new FormControlInput(type, id, validators);
		break;
	}
}

function FormControlInput (type, id, validators) {
	this.type = type;
	this.id = id;
	this.validators = validators;

	this.control = getControl();
	this.validationErrors = [];
	this.isValid = getValidation.bind(this)();

	const helper = new Helper();

	this.addClass = helper.manipulatWithClass(helper.addClassMyFun);
	this.removeClass = helper.manipulatWithClass(helper.removeClassMyFun);

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
		if (self.validationErrors.indexOf(validator.toString() ) === -1) {
			return self.validationErrors.push(validator.toString() );
		}
	}

	function removeValidError (self, errorIndex, validationErrors) {
		if (errorIndex !== -1) {
			return self.validationErrors.splice(errorIndex, 1);
		}
	}

	function getValidation () {
		let isValid = true;
		const self = this;

		validators.forEach(function (item) {
			const validator = new (window[item] )(3);

			if (!(validator.test(self.control.value) ) ) {
				isValid = false;
				addValidError(self, validator, self.validationErrors);
			} else {
				const errorIndex = self.validationErrors.indexOf(validator.toString() );
				removeValidError(self, errorIndex, self.validationErrors);
			}
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
