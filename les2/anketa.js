/*
Ask user: surname, first name, patronymic, age in years, gender
and display the user profile.
*/
function profile() {

    var firstName, lastName, fatherName, dateOfBirth, userAgeYears, userAgeDays, userAgeYearsAfter,
        gender, retiree;

    var arrFullName = ['Andrei', 'Laurou', 'Valeryevich'];
    /*to check for empty line, cancel input, only letters...
    * using 'while' for recall the case of incorrect input again*/
    function validate(res, inpName) {

        while (res === null || res === '' || res.search(/[^a-zA-Z]/g) >= 0)  {
            res = prompt('Incorrect input, enter valid data ', inpName);
        }

        return res;
    }

    /*revers and check length date of birth, for empty line, cancel input
    * using 'while' for recall the case of incorrect input again*/
    function validDate(str) {

        // var str = str;
        var arr = str.split('.');
        var pattern = /([0-3]?[0-9])[\.]([0-1]?[0-9])[\.]\d{4}/g;

        while (str === null || str === '' || !pattern.test(str) || arr[2] > new Date().getFullYear()) {

            str = prompt('Incorrect input, enter valid data ', '18.06.1991');
        }

        return arr.reverse();
    }

    /*create date object and translate milliseconds*/
    function getUserAge(date) {

        var userDateOfBirth = new Date(date);

        var todayDate = new Date();
        userAgeDays = Math.floor((todayDate - userDateOfBirth) / 1000 / 60 / 60 / 24);
        userAgeYears = Math.floor((todayDate - userDateOfBirth) / 1000 / 60 / 60 / 24 / 365.25);
        userAgeYearsAfter = userAgeYears + 5;

    }

    function getGender(){
        if(confirm('is your gender -- male?') ) return ' male';

        return ' female';
    }

    /*given the fixed retirement age in Belarus*/
    function getRetiree (Years) {
        var ageRetiree = (gender)? 63:58;
        return (Years >= ageRetiree)? 'yes':'no';
    }

    firstName =  validate(prompt('What is your first name?', arrFullName[0]), arrFullName[0]);
    lastName = validate(prompt('What is your last name?', arrFullName[1]), arrFullName[1]);
    fatherName = validate(prompt('What is your name on the father?', arrFullName[2]), arrFullName[2]);
    dateOfBirth = validDate(prompt('What is your date of birth?', '18.06.1991'));

    getUserAge(dateOfBirth);

    gender = getGender();
    retiree = getRetiree(userAgeYears);


    alert(' ваше ФИО: ' + firstName + ' ' + lastName +' ' + fatherName  +'\r\n'+
        ' ваш возраст в годах: ' + userAgeYears  + '\r\n'+
        ' ваш возраст в днях: ' + userAgeDays  + '\r\n'+
        ' через 5 лет вам будет: ' + userAgeYearsAfter  + '\r\n'+
        ' ваш пол: ' + gender + '\r\n'+
        ' вы на пенсии: ' + retiree);
}