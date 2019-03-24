function FormGroup(id) {
		this._id = id;
		this.form = this._getForm();
		let form = this.form;
		this.formControls = [];

		this.addClass = this.manipulatWithClass(this.addClassMyFun);
		this.removeClass = this.manipulatWithClass(this.removeClassMyFun);
		this.isValid = getStatus.bind(this)();



		this._init();

		this.registerControls = function(control) {
				this.formControls.push(control);
				this.isValid = getStatus.bind(this)();
		};




}

FormGroup.prototype = Object.create(Helper.prototype);
FormGroup.prototype.constructor = FormGroup;

FormGroup.prototype._getForm = function() {
		let forms = document.getElementsByTagName('form');
		forms = [].slice.call(forms, 0);

		return forms.filter(function(item){
				return item.id === this._id;
		})[0];
};

FormGroup.prototype._init = function () {
		const self = this;

		this.form.addEventListener('submit', function(event){
				event.preventDefault();

				self.isValid = this._getStatus.bind(self)();
				if (self.isValid) {
						self.removeClass(['error']);
						console.log('Data was sent');
						return true;
				}

				console.log('Form is not valid');
				self.addClass(['error']);
				self.formControls.forEach(function(control){
						control.startCheck();
				});

				return false;
		});
}

FormGroup.prototype.getStatus() {
		try {
				if(this.formControls.length === 0) {
						throw new Error('No detected form control elements');
				}

				let status = true;
				console.log(this.formControls);
				this.formControls.forEach(function(item){
						if (!item.isValid) {
								status = false;
								return false;
						}
				});

				return status;

		} catch(e) {
				console.log(e.message);
				return true;
		}
}

