
 export class FormControlInput {
	constructor (type, id, validators, myHelper) {
		this.myHelper = myHelper;
		this._id = id;
		this._type = type;
		this._validators = validators;
		this.control = this._getControl();

		this.validationErrors = [];
		this.isValid = this._getValidation.bind(this)(); // изначально лохонулся и обявил выше по коду чем validationErrors --  потратил пол дня:)

		this._init.bind(this)();
	}
	 addClass () {
		 return	this.myHelper.manipulatWithClass(this.control.classList, this.myHelper.addClassMyFun);   //  был вопрос "что не так, когда выносишь в прототип"?
	 }
	 removeClass () {
		 return	this.myHelper.manipulatWithClass(this.control.classList, this.myHelper.removeClassMyFun, true);
	 }

	_getControl () {

		const self = this;
		let controls = document.getElementsByTagName(this._type);

		controls = [].slice.call(controls, 0);

		return controls.filter(function (control) {
			return control.id === self._id;
		})[0];
	};

	static addValidError (self, validator, validationErrors) {
		if (validationErrors.indexOf(validator.toString()) === -1) {
			return validationErrors.push(validator.toString());
		}
	};

	static removeValidError (self, errorIndex, validationErrors) {
		if (errorIndex !== -1) {
			return validationErrors.splice(errorIndex, 1);
		}
	};

	_getValidation () {
		let isValid = true;
		const self = this;

		this._validators.forEach(function (item) {
			const validator = new (window[item])(3);

			if (!(validator.test(self.control.value))) {
				isValid = false;
				return FormControlInput.addValidError(self, validator, self.validationErrors);
			}
			const errorIndex = self.validationErrors.indexOf(validator.toString());
			return FormControlInput.removeValidError(self, errorIndex, self.validationErrors);
		});

		return isValid;
	};

	startCheck () {
		this.isValid = this._getValidation.bind(this)();
		console.log(this.isValid);

		if (!this.isValid) {
			this.addClass()(['error']);                         // добавил()
		} else {
			this.removeClass()(['error']);
		}

		const errorContainer = this.control.parentNode.querySelector('.error-list');
		let text = '';
		console.log(this.validationErrors);
		this.validationErrors.forEach(function (error) {
			text += `<span>${error}</span><br />`;
		});

		errorContainer.innerHTML = text;
	};

	_init () {
		const self = this;
		this.control.addEventListener('input', this.startCheck.bind(self));
	};


}
