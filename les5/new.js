function clock (secNow, tomor) {
	const sec = secNow || new Date();
	const tomorrow = tomor || new Date(sec.getFullYear(), sec.getMonth(), sec.getDate() + 1);
	const secTom =  (tomorrow - sec) / 1000;

	const getTimer = document.getElementById('getTimer');
		 console.log(getTimer);
	getTimer.innerText =  Math.ceil(secTom);
	return secTom;
}
clock();
setInterval(clock, 1000);

// cumbersome and not accurate way to solve
function daysForBirthday () {
	const clickInpBirthday = document.getElementById('clickInpBirthday');
	const day = document.getElementById('day');
	const inpBirthday = document.getElementById('inpBirthday').value;

	clickInpBirthday.onclick = () => {
		count(day, inpBirthday);
	};
}
// count days until birthday (parameters are used for testing..)
function count (day, inpB, newD) {
	const inpBirthday = inpB || document.getElementById('inpBirthday').value;

	const nowDate = newD || new Date();
	const dateBirthday = new Date(inpBirthday);
	const monthBirthday = dateBirthday.getMonth();
	const dayBirthday = dateBirthday.getDate();

	const daysForBirthday = ( (new Date(nowDate.getFullYear(), monthBirthday, dayBirthday) ) - nowDate) / 1000 / 60 / 60 / 24;
	const res = Math.ceil( (daysForBirthday >= 0) ? daysForBirthday : 365.25 + daysForBirthday);
	day.innerText = res;
	return res;
}
daysForBirthday();

// moment.locale('ru');

/* users = [{id: '1', name: 'Jack', dob: '1999-01-01'},
		 			{id: '2', name: 'Tom', dob: '1992-01-01'},
		 			{id: '3', name: 'Bob', dob: '2003-01-01'}];*/

// sorts by specific properties
function mySort (param1, param2, param3) {
		 return param1.sort(function (a, b) {
				 if (a[param2] < b[param2] ) {
						 return (param3 === 'asc') ? -1 : 1;
				 }
				 if (a[param2] > b[param2] ) {
						 return (param3 === 'asc') ? 1 : -1;
				 }
	} );
}
