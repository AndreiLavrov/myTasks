function sequence (start, step) {
		var count = start || 0;
		var myStep = step || 1;
		var a = 0;

		return function () {

				  count += a;
				  a = myStep;
				 return count;
		}
}

// function  partitial(mult, a, b) {
// 		return mult.bind(null, a, b);
// };
function mult(a, b, c, d) { return a * b * c * d; }

function  partitial(mult, a, b) {
		return function () {

					return mult.call(null, arguments);
		}

};

console.log(mult(2, 3, 4, 5)); // 120
mult23 = partitial(mult, 2, 3);
console.log(mult23(4, 5)); //120


