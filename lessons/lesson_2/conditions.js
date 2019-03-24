function getNumWord(num, word1, word2, word5) {

    var dd = num % 100;

    if ( (dd >= 11 ) && (dd <= 19)) {
        return word5;
    }

    var d = num % 10;

    if ( d == 1) {
        return word1;
    }

    if ( (d >= 2) && ( d <= 4) ) {
        return word2;
    }

    return word5;
}

function test() {
    var apples = +prompt('Сколько у вас яблок?')

    alert('У вас' + apples + ' ' + getNumWord(apples, 'яблоко', 'яблока', 'яблок') + '!');
}