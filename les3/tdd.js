// calculate population growth
function populationGrow (pNow, percent, aug, p) {
	var i = 0;

	while (pNow <= p) {
		pNow = pNow + (pNow * percent / 100) + aug;
		i += 1;
	}
	return i;
}

// return true
function isTriangle (a, b, c) {
	return a < b + c;
}

// return the length of the shortest word(s) in string
function findShort (str) {
	const arrFromString = str.split(' ');
	let shortest = 15;

	for (let i = 0; i < arrFromString.length; i += 1) {
		if (arrFromString[i].length < shortest) {
			shortest = arrFromString[i].length;
		}
	}
	return shortest;
}

// returns the sum of all the multiples of 3 or 5 below the number passed in
function solution (num) {
	let i = 0;
	let sum = 0;
	while (i < num) {
		if ( (i % 3 === 0) || (i % 5 === 0) ) {
			sum += i;
		}
		i += 1;
	}
	return sum;
}

// remove all values from list a, which are present in list b
function arrayDiff (arr1, arr2) {
	for (var i = 0; i < arr2.length; i += 1) {
		for (var n = 0; n < arr1.length; n += 1) {
			if (arr2[i] === arr1[n] ) {
				arr1.splice(n, 1);
				n -= 1;
			}
		}
	}
	return arr1;
}

