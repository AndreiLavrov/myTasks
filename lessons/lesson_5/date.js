function dateTask1(date) {
    const months = [
        'янв1', 'янв2', 'янв3',
        'янв4', 'янв5', 'янв6',
        'янв7', 'янв8', 'янв9',
        'ян10', 'янв11', 'янв12',
    ];
    const dt = date.getMonth();
    return months[dt];
}

// let date = new Date();
// date.setMonth(date.getMonth() + 13);

// 12:59:59 03.08.2014
function dateTask2() {
    let d = new Date('2014-8-3 12:59:59');
    let local = d.toLocaleString();
    let day = d.getDate();
    let month = d.getMonth();
    console.log(local.split(', ').reverse().join(' '));

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + (++month);
    }

    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${day}.${month}.${d.getFullYear()}`;
}

function dateTask3(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let diff = Math.abs(date1 - date2);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}



// console.log(dateTask3('2017-01-03', '2017-02-08'));

// Moment
moment.locale('ru');
// let md = moment(); //new Date()
//
//
// console.log(md.format('LLLL'));
//
// // moment add / sub
// console.log(md.add(1, 'day').format('l'));;
// console.log(md.add(1, 'week').format('l'));;
// console.log(md.subtract({day: 1, months: 6, year: 5}).format('l'));

// range

let before = '2019-02-01';
let current = moment();
let after = '2019-03-05';

console.log(current.isBetween(before, after));
before = '2019-03-05';
console.log(current.isSame(before, 'week'));

// from

d3 = '2018-10-11'
console.log(moment(d3).fromNow());

let start = '2019-02-23'
let end = '2019-06-23'
let result = moment(start).diff(moment(end));
let human = moment.duration(result).humanize();
 human = moment.duration(result).as('weeks');

console.log(human);

// humanisation
console.log(moment(start).format('dddd, MMMM Do YYYY'));
