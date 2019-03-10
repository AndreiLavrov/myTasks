function clock () {
	const sec = new Date;
	const tomorrow = new Date(sec.getFullYear(), sec.getMonth(), sec.getDate() + 1);
	const secTom = Math.ceil( (tomorrow - new Date) / 1000);

	const getTimer = document.getElementById('getTimer');
	getTimer.innerText =  secTom;
	return secTom;
}
clock();
setInterval(clock, 1000);

// cumbersome and not accurate way to solve
function daysForBirthday () {
	const clickInpBirthdey = document.getElementById('clickInpBirthdey');
	const day = document.getElementById('day');
	let inpBirthdey;

	clickInpBirthdey.onclick = function () {
		inpBirthdey = document.getElementById('inpBirthdey').value;

		const nowDate = new Date();

		const dateBirthday = new Date(inpBirthdey);
		const momthBirthday = dateBirthday.getMonth();
		const dayBirthday = dateBirthday.getDate();

		const daysForBirthday = ( (new Date(nowDate.getFullYear(), momthBirthday, dayBirthday) ) - nowDate) / 1000 / 60 / 60 / 24;

		day.innerText = Math.ceil( (daysForBirthday >= 0) ? daysForBirthday : 365.25 + daysForBirthday);
	};
}

daysForBirthday();

// moment.locale('ru');
/*
let md = moment(inpBirthdey);
let mdNow = moment('18-06-1991', "MM-DD");
let result = md.subtract(mdNow.format('l'));*/

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
