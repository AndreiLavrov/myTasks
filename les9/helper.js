function  Helper () {}

// verification code for adding a class
Helper.prototype.addClassMyFun = function(classList, item) {
		if (classList.contains(String(item))) {
				return false;
		}
		classList.add(String(item));
};

// verification code for removing a class
Helper.prototype.removeClassMyFun = function (classList, item) {
		if (classList.contains(String(item))) {
				classList.remove(String(item));
		}
		return true;
};
// verification code for adding or remove a class
Helper.prototype.manipulatWithClass = function (fun) {
		return function(classes) {
				try {
						if (!Array.isArray(classes)) {
								throw new Error('Param should be an array of strings');
						}
						let classList = this.form.classList;
						classes.forEach( function (item) {
								return fun(classList, item); // ??
						});

				} catch (e) {
						console.log(e.message);
						return false;
				}
		};
}

