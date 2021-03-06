
function FormGroup (id, myHelper) {
	this.myHelper = myHelper;
	this._id = id;
	this.formControls = [];

	this.form = this._getForm();

	this.isValid = this._getStatus.bind(this)();

	this._init.bind(this)();

}

FormGroup.prototype.addClass = function () {
	return this.myHelper.manipulatWithClass( this.form.classList, this.myHelper.addClassMyFun);
}      //  что не так, когда выносишь в прототип?
FormGroup.prototype.removeClass =  function () {
	return this.myHelper.manipulatWithClass( this.form.classList, this.myHelper.removeClassMyFun);
}


FormGroup.prototype._init = function () {
	const self = this;

	this.form.addEventListener('submit', function (event) {
		event.preventDefault();

		self.isValid = self._getStatus.bind(self)();
		if (self.isValid) {
			self.removeClass()( ['error'] );                   // ()
			console.log('Data was sent');
			return true;
		}

		console.log('Form is not valid');
		self.addClass()( ['error'] );
		self.formControls.forEach(function (control) {
			control.startCheck();
		} );

		return false;
	} );
};

FormGroup.prototype._getForm =  function () {
	const self = this;
	let forms = document.getElementsByTagName('form');
	forms = [].slice.call(forms, 0);

	return forms.filter(function (item) {
		return item.id === self._id;
	} )[0];
};

FormGroup.prototype.registerControls = function (control) {
	this.formControls.push(control);
	this.isValid = this._getStatus.bind(this)();
};




FormGroup.prototype._getStatus =  function () {
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
};

