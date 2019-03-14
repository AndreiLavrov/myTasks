function clock (secNow, tomor) {
	const sec = secNow || new Date();
	const tomorrow = tomor || new Date(sec.getFullYear(), sec.getMonth(), sec.getDate() + 1);
	const secTom =  Math.ceil( (tomorrow - sec) / 1000);

	const getTimer = document.getElementById('getTimer');
	getTimer.innerText =  secTom;
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

// count days until birthday  (more compact way)
function daysForBirthdayMoment () {
	moment.locale('ru');

	const clickInpBirthday = document.getElementById('clickInpBirthday');
	const day = document.getElementById('day');
	const inpBirthday = document.getElementById('inpBirthday').value;

	clickInpBirthday.onclick = () => {
		countM(day, inpBirthday);
	};
}

// count days until birthday with 'moment'(parameters are used for testing..)
function countM (day, inpB, todayDate) {
	const inpBirthday = inpB || document.getElementById('inpBirthday').value;
	const arrDate = inpBirthday.split('-');
	const momentNow = moment(todayDate) || moment();
	const momentBirthday = moment( {  month: arrDate[1] - 1, day: arrDate[2] } );

	const result = moment(momentBirthday).diff(momentNow);
	const days = Math.ceil(moment.duration(result).as('days') );
	const res = Math.ceil( (days >= 0) ? days : 365.25 + days);
	day.innerText = res;

	return res;
}
daysForBirthdayMoment();

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
