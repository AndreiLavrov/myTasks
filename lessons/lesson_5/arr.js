/**
 *
 * @param a - function
 * @param b - string
 * @param c - number
 */
function describe(a, b, c) {
    a();
}

x = function() {
    alert(1)
};

// describe(x);
// describe(function() {
//     alert(2);
// });

function test() {
    alert(3);
}

// describe(test)

// Arrays
function arrTask1() {
    let arr = [1, 2, 15, 4, 5];

    return arr.sort();
}

function arrTask2() {
    let arr = [1, 2, 15, 4, 5];

    return arr.sort(function(a, b) {
        return b - a;
    });
}

// array copy
function arrayClone(arr) {
    return arr.slice(0);
}


function arrTask3(a, b) {
    a = a.filter(function(item) {
        return !b.includes(item)
    });
    return a.concat(b);
}

function arrTak4(arr) {
    return arr.filter(function(item, index) {
        return index === arr.lastIndexOf(item);
    });
}


function arrTask5(a) {
    let hash = [];
    a.forEach(function(item) {
       if (!hash.includes(item)) {
           hash.push(item);
       }
    });
    return hash;
}

function sum(arr) {
    return arr.reduce(function (acc, cur) {
        return acc + cur;
    }, 0);
}

function repeatItems(arr) {
    const hash = {};
    let result = ``;

    arr.forEach(function(item){
        if (item in hash) {
            hash[item]++;
            return;
        }
        hash[item] = 1;
    });

    // for (let key in hash) {
    //     if (hash[key] > 1) {
    //         result += `${key} -> ${hash[key]}\n`;
    //     }
    // }

    let keysArr = Object.keys(hash).sort(function(a, b){
        return hash[b] - hash[a];
    });

    keysArr.forEach(function(item) {
       if (hash[item] > 1) {
           result += `Item: ${item} -> Count: ${hash[item]} \n`
       }
    });

    return result;
}

arrTest = [];

// for (let i = 1; i <= 1000000; i++) {
//     arrTest.push(i);
// }
// sum1 = 0;
// console.time('for');
// for (let i = 0; i < arrTest.length; i++ ) {
//     sum1 += arrTest[i];
// }
// console.timeEnd('for');

// console.time('reduce');
// sum(arrTest);
// console.timeEnd('reduce');
sum1 = 0;
// console.time('for-in');

// for (let key in arrTest) {
//     sum1 += arrTest[key];
// }

// console.timeEnd('for-in');

