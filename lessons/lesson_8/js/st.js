// for (var i = 1; i <= 10; i++) {
//     (function (i) {
//         setTimeout(function(){
//             console.log(i);
//         });
//     })(i)
// }


// console.log('log 1');
// setTimeout(function(){
//     console.log('log 2');
// }, 0);
// console.log('log 3');


// let i = 0;
// const idInterval = setInterval(function(){
//     i++;
//     console.log(i);
// }, 1000);
//
// setTimeout(function(){
//     clearInterval(idInterval);
//     // clearTimeout(id)
// }, 10000);

let start = 10;
let id = setInterval(function(){
    console.log(--start);
}, 1000);
