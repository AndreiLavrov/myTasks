
/*
counter
from @start (default 0)
with step @step (default 1)
@return number
*/

function sequence (start, step) {
	var count = start || 0;
	var myStep = step || 1;
	var a = 0;

	return function () {
				  count += a;
				  a = myStep;
				 return count;
	};
}

/* multiplication params */
function mult (a, b, c, d) {
	return a * b * c * d;
}
/* multiplication with fixed params
(caring)*/
function  partitial (mult, a, b) {
	return function myFun (c, d) {
		return mult.call(null, a, b, c, d);
	};
}

console.log(mult(2, 3, 4, 5) ); // 120
mult23 = partitial(mult, 2, 3);
console.log(mult23(4, 5) ); // 120

/* used value of input
@surname
and @name
@return string*/
let elem = document.getElementById('elem');

function func (surname, name) {
	return alert(`${this.value}, ${surname} ${name}`);
}

func =  func.bind(elem);

// func('Иванов', 'Иван'); //тут должно вывести 'привет, Иванов Иван'
// func('Петров', 'Петр'); //тут должно вывести 'привет, Петров Петр'

