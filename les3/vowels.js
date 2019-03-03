function vowels (str) {
	var arr = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е', 'А', 'У', 'О', 'Ы', 'И', 'Э', 'Я', 'Ю', 'Ё', 'Е'];
	var vowels = 0;

	for (var i = 0; i < str.length; i++) {
		for (var n = 0; n < arr.length; n++) {
			if (arr[n] === str[i] )  {
				vowels++;
			}
		}
	}
	return vowels;
}

console.log(vowels(prompt('input string') ) );
