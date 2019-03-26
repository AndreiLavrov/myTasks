 /*count seconds until birthday (parameters are used for testing..)*/
// function clock (secNow, tomor) {
// 	const sec = secNow || new Date();
// 	const tomorrow = tomor || new Date(sec.getFullYear(), sec.getMonth(), sec.getDate() + 1);
// 	const secTom =  Math.ceil( (tomorrow - sec) / 1000);
//
// 	const getTimer = document.getElementById('getTimer');
// 	getTimer.innerText =  secTom;
// 	return secTom;
// }
// clock();
// setInterval(clock, 1000);

/*  count seconds until birthday by `moment`(parameters are used for testing..)*/
moment.locale('ru');

function clock (secNow) {
		const sec = secNow || moment();
		const tomorrow =  moment(sec).add(1, 'day').set('h', 0). set('m', 0).set('s', 0);
		const secTom =  moment(tomorrow).diff(sec, 's');

		const getTimer = document.getElementById('getTimer');
		getTimer.innerText =  secTom;
		return secTom;
}
clock();
setInterval(clock, 1000);


/* count days until birthday (parameters are used for testing..)*/
// function count (day, inpB, newD) {
// 	const inpBirthday = inpB || document.getElementById('inpBirthday').value;
//
// 	const nowDate = newD || new Date();
// 	const dateBirthday = new Date(inpBirthday);
// 	const monthBirthday = dateBirthday.getMonth();
// 	const dayBirthday = dateBirthday.getDate();
//
// 	const daysForBirthday = ( (new Date(nowDate.getFullYear(), monthBirthday, dayBirthday) ) - nowDate) / 1000 / 60 / 60 / 24;
// 	const res = Math.ceil( (daysForBirthday >= 0) ? daysForBirthday : 365 + daysForBirthday);
// 	day.innerText = res;
// 	return res;
// }
//
// const clickInpBirthday = document.getElementById('clickInpBirthday');
// const day = document.getElementById('day');
// const inpBirthday = document.getElementById('inpBirthday').value;
//
// clickInpBirthday.onclick = () => {
// 		count(day, inpBirthday);
// };


/* count days until birthday with 'moment'(parameters are used for testing..)*/
function countM (day, inpBinpBirthday, todayDate) {
		const inpB  = inpBinpBirthday || document.getElementById('inpBirthday').value;
	const momentNow = moment(todayDate) || moment();
	const inpMomBirthday = moment(inpB);
	const month = inpMomBirthday.get('month');

		const date = inpMomBirthday.get('date');
	const momentBirthday = moment().set('y', momentNow.get('year')).set('month', month).set('date', date );
	const result = momentBirthday.diff(momentNow, 'day');
	const res = (result >= 0) ? result : 365 + result;
	day.innerText = res;

	return res;
}

const clickInpBirthday = document.getElementById('clickInpBirthday');
const day =  document.getElementById('day');

clickInpBirthday.onclick = () => {
		countM(day);
};


/* users = [{id: '1', name: 'Jack', dob: '1999-01-01'},
		 			{id: 'prototipeStyle', name: 'Tom', dob: '1992-01-01'},
		 			{id: '3', name: 'Bob', dob: '2003-01-01'}];*/

 /*  sorts by specific properties*/
function mySort (param1, param2, param3) {
		 return param1.sort(function (a, b) {
		 		if (a.param2 == 'dob') {
						a[param2] = moment(a[param2]);
						b[param2] = moment(b[param2]);
				}
				 if (a[param2] < b[param2] ) {
						 return (param3 === 'asc') ? -1 : 1;
				 }
				 if (a[param2] > b[param2] ) {
						 return (param3 === 'asc') ? 1 : -1;
				 }
	} );
}
