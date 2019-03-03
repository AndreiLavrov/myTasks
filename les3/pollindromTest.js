function pollindromTest (word) {
	var reverseWord = '';

	for (var i = word.length - 1; i >= 0; i--) {
		reverseWord += word[i];
	}

	alert(word === reverseWord);
	return word === reverseWord;
}

function pollindrom2 (word) {
	return word.split('').reverse()
		.join('') === word;
}

function pollindrom3 (word) {
	var reverseWord = '';
	var i = word.length - 1;

	while (i >= 0)  {
		reverseWord += word[i];
		i--;
	}

	return word === reverseWord;
}

function pollindrom4 (word) {
	var half = Math.floor(word.length / 2);

	for (var i = 0; i < half; i++) {
		if (word[i] !== word[word.length - 1 - i] ) {
			return false;
		}
	}

	return true;
}

