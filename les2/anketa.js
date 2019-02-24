/*
Ask user: surname, first name, patronymic, age in years, gender
and display the user profile.
*/
function profile() {

    var firstName, lastName, fatherName, dateOfBirth, userAgeYears, userAgeDays, userAgeYearsAfter,
        gender, retiree;

    /*to check for empty line, cancel input, only letters...
    * using 'while' for recall the case of incorrect input again*/
    function validate(res) {

        while (res === null || res === '' || res.search(/[^a-zA-Z]/g) >= 0)  {
            res = prompt('Incorrect input, enter valid data ', 'Name');
        }

        return res;
    }

    /*revers and check length date of birth, for empty line, cancel input
    * using 'while' for recall the case of incorrect input again*/
    function validDate(str) {

        var arr = str.split('.');

        while (str === null || str === '' || isNaN(arr[0] + arr[1] + arr[2]) ||
        arr[2].length > 4 || arr[1].length > 2 || arr[0].length > 2 ||
        arr[0] > 31 ||  arr[1] > 12 || arr[2] > new Date().getFullYear()) {

            arr = prompt('Incorrect input, enter valid data ', '18.06.1991').split('.');
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

    firstName =  validate(prompt('What is your first name?', 'Andrei') );
    lastName = validate(prompt('What is your last name?', 'Laurou') );
    fatherName = validate(prompt('What is your name on the father?', 'Valeryevich') );
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