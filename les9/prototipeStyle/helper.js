function  Helper () {

	// verification code for adding or remove a class
	this.manipulatWithClass = function (siteFrom, fun) {
		return function (classes) {
			try {
				if (!Array.isArray(classes) ) {
					throw new Error('Param should be an array of strings');
				}
				let classList = siteFrom;
				classes.forEach(function (item) {
					return fun(classList, item); // ??
				} );
			} catch (e) {
				console.log(e.message);
				return false;
			}
		};
	};
// verification code for adding a class
	this.addClassMyFun = function (classList, item) {
		if (classList.contains(String(item) ) ) {
			return false;
		}
		classList.add(String(item) );
	};

	// verification code for removing a class
	this.removeClassMyFun = function (classList, item) {
		if (classList.contains(String(item) ) ) {
			classList.remove(String(item) );
		}
		return true;
	};

}
function Helper2 () {


	this.addClass = function(classes) {
		try {
			if (!Array.isArray(classes)) {
				throw new Error('Param should be an array of strings');
			}

			let classList = form.classList;
			classes.forEach(function(item){
				if (classList.contains(String(item))) {
					return false;
				}

				classList.add(String(item));
			});
		} catch (e) {
			console.log(e.message);
			return false;
		}

	};

	this.removeClass = function(classes) {
		try {
			if (!Array.isArray(classes)) {
				throw new Error('Param should be an array of strings');
			}

			let classList = form.classList;
			classes.forEach(function(item){
				if (classList.contains(String(item))) {
					classList.remove(String(item));
				}

				return true;

			});
		} catch (e) {
			console.log(e.message);
			return false;
		}

	};
}
