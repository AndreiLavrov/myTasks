
function f(n) {
    if (n === 0) {
        return 1;
    }

    return f(n-1) * n;
}

// alert(f(3));

var test = function sum(n) {
    if (n === 0) {
        return 0;
    }

    return n + sum(n-1);
}
var foo = test;
test = null;
foo(23)
// alert(sum(3));

function fib(n) {
    if (n <= 2) {
        return 1;
    }

    return fib(n-1) + fib(n-2);
}

function fib2(n) {

    var result = 1, index = 3, prev = 1;

    while(index <= n) {
        result += prev;
        prev = result - prev;
        index++;
    }

    return result;
}