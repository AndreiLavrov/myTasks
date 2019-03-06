// it checks the validity of the form
function form (firstName, lastName, password, email) {
	const passw = validLengthInpPassword(password);
	const newEmail = validInpEmail(email);
	validInpName(firstName);
	validInpName(lastName);

	return passw && newEmail;
}

// it checks the validity of the input name(first and last)
function validInpName (inp) {
	const arr = inp.split('').filter(function (item) {
		return item !== ' ';
	} );

	return arr.join('');
}

// it checks the validity of the password
function validLengthInpPassword (inp) {
	return inp.length >= 5;
}

// it checks the validity of the email
function validInpEmail (inp) {
	return ( (inp.indexOf('@') !== -1) &&  (inp.indexOf(' ') === -1) );
}
