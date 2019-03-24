function FormGroup (id) {
	this.id = id;
	this._form = getForm();
	this.formControls = [];
	this.isValid = this._getStatus();

	const helper = new Helper();
	this.addClass = helper.manipulatWithClass(helper.addClassMyFun);
	this.removeClass = helper.manipulatWithClass(helper.removeClassMyFun);


	_init.bind(this)();

	function _init () {
		const self = this;

		this._form.addEventListener('submit', function (event) {
			event.preventDefault();

			self.isValid = self._getStatus.bind(self)();
			if (self.isValid) {
				self.removeClass(['error']);
				console.log('Data was sent');
				return true;
			}

			console.log('Form is not valid');
			self.addClass(['error']);
			self.formControls.forEach(function (control) {
				control.startCheck();
			});

			return false;
		});
	}

	function getForm () {
		let forms = document.getElementsByTagName('form');
		forms = [].slice.call(forms, 0);

		return forms.filter(function (item) {
			return item.id === id;
		})[0];
	}

}



// FormGroup.prototype = Object.create(Helper.prototype);
// FormGroup.prototype.constructor = FormGroup;

FormGroup.prototype.registerControls = function (control) {
	this.formControls.push(control);
	this.isValid = this._getStatus.bind(this)();
};

FormGroup.prototype._getStatus = function () {
	try {
		if (this.formControls.length === 0) {
			throw new Error('No detected form control elements');
		}

		let status = true;
		console.log(this.formControls);
		this.formControls.forEach(function (item) {
			if (!item.isValid) {
				status = false;
				return false;
			}
		} );

		return status;
	} catch (e) {
		console.log(e.message);
		return true;
	}
}
