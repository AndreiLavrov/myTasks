
function populationGrow (pNow, percent, aug, p) {
	var i = 0;

	while (pNow <= p) {
		pNow = pNow + (pNow * percent / 100) + aug;
		i += 1;
	}
	return i;
}

function isTriangle (a, b, c) {
	return a < b + c;
}

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

function arrayDiff (arr1, arr2) {
	for (var i = 0; i < arr2.length; i += 1) {
		for (var n = 0; n < arr1.length; n += 1) {
			if (arr2[i] === arr1[n] ) {
				arr1.splice(n, 1);
				n -= 1;
			}
		}
	}
	console.log(arr1);
	return arr1;
}

