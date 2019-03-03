function getNumWord (num, word1, word2, word5) {
	var dd = num % 100;

	switch (true) {
	case dd >= 11 && dd <= 19:
		return word5;
		break;
	}
	var d = num % 10;

	switch (true) {
	case d == 1:
		return word1;
		break;
	case (d >= 2) && (d <= 4):
		return word2;
		break;
	default:
		return word5;
	}
}
