
export class HelperClass {
	constructor () {
	}

// verification code for adding or remove a class
	manipulatWithClass (siteFrom, fun, log) {
		return  (classes)=> {
			try {
				if (!Array.isArray(classes)) {
					throw new Error('Param should be an array of strings');
				}
				let classList = siteFrom;
				if (log) console.log(classList);

				classes.forEach(function (item) {
					return fun(classList, item); // ??
				});
			} catch (e) {
				console.log(e.message);
				return false;
			}
		};
	};

// verification code for adding a class
	addClassMyFun (classList, item) {
		if (classList.contains(String(item))) {
			return false;
		}
		return classList.add(String(item));
	};

// verification code for removing a class
	removeClassMyFun (classList, item) {
		if (classList.contains(String(item))) {
			return classList.remove(String(item));
		}
		return true;
	};


}
