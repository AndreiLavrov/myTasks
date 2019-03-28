function  Helper () {}
const helper = new Helper();

Helper.prototype.addClass = function (classes) {
	try {
		if (!Array.isArray(classes) ) {
			throw new Error('Param should be an array of strings');
		}

		const classList = this.form.classList;
		classes.forEach(function (item) {
			if (classList.contains(String(item) ) ) {
				return false;
			}

			classList.add(String(item) );
		} );
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

Helper.prototype.addClassControl = function (classes) {
	try {
		if (!Array.isArray(classes) ) {
			throw new Error('Param should be an array of strings');
		}

		const classList = this.control.classList;
		classes.forEach(function (item) {
			if (classList.contains(String(item) ) ) {
				return false;
			}

			classList.add(String(item) );
		} );
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

Helper.prototype.removeClass = function (classes) {
	try {
		if (!Array.isArray(classes) ) {
			throw new Error('Param should be an array of strings');
		}

		const classList = this.form.classList;
		classes.forEach(function (item) {
			if (classList.contains(String(item) ) ) {
				classList.remove(String(item) );
			}

			return true;
		} );
	} catch (e) {
		console.log(e.message);
		return false;
	}
};
Helper.prototype.removeClassControl = function (classes) {
	try {
		if (!Array.isArray(classes) ) {
			throw new Error('Param should be an array of strings');
		}

		const classList = this.control.classList;
		console.log(classList);
		classes.forEach(function (item) {
			if (classList.contains(String(item) ) ) {
				classList.remove(String(item) );
			}
			return true;
		} );
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

//
// function  Helper () {
//
// 	// verification code for adding or remove a class
// 	Helper.prototype.manipulatWithClass = function (siteFrom, fun) {
// 		return function (classes) {
// 			try {
// 				if (!Array.isArray(classes) ) {
// 					throw new Error('Param should be an array of strings');
// 				}
// 				let classList = siteFrom;
// 				classes.forEach(function (item) {
// 					return fun(classList, item); // ??
// 				} );
// 			} catch (e) {
// 				console.log(e.message);
// 				return false;
// 			}
// 		};
// 	};
//
// // verification code for adding a class
// 	Helper.prototype.addClassMyFun = function (classList, item) {
// 		if (classList.contains(String(item) ) ) {
// 			return false;
// 		}
// 		classList.add(String(item) );
// 	};
//
// 	// verification code for removing a class
// 	Helper.prototype.removeClassMyFun = function (classList, item) {
// 		if (classList.contains(String(item) ) ) {
// 			classList.remove(String(item) );
// 		}
// 		return true;
// 	};
//
// }
