'use strict';

function numTask1(a, b) {
    return a % b;
}

function numTask2(x, option) {

    option = option || 1;

    var result = Math.sqrt(x);

    switch(option) {
        case 1:
            result = Math.round(result);
            break;

        case 2:
            result = result.toFixed(1);
            break;

        case 3:
            result = result.toFixed(2);
            break;
    }

    return result;
}

function numTask3(nums) {
    let sum = 0;
    let min = nums[0];
    let max = nums[0];

    // cycle
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        // min = min > nums[i] ? nums[i] : min;
        // max = max < nums[i] ? nums[i] : max;
    }


    min = Math.min.apply(Math, nums);
    max = Math.max.apply(Math, nums);

    console.log(`Sum: ${sum}, Avarage: ${sum / nums.length}`);
    console.log(`Min: ${min}, Max: ${max}`);
}

function stringTask1(str, params) {
    let prefixArray = ['http://', 'https://'];
    let result = str;

    if (params) {
        prefixArray = prefixArray.concat(params);
    }

    for (let i = 0; i < prefixArray.length; i++) {
        let index = result.indexOf(prefixArray[i]);

        if (index !== -1) {
            result = result.substring(index + prefixArray[i].length);
        }
    }

    return result;
}


// console.log(stringTask1('www.yandex.ru'));
// console.log(stringTask1('http://www.yandex.ru'));
// console.log(stringTask1('https://www.yandex.ru'));
// console.log(stringTask1('https://www.yandex.ru', ['www.']));

//numTask3([1, 2, -3, 4, 5, 6]);

function hashTask1() {
    let day = {
        d1: 'Понедельник',
        d2: 'Вторник',
        d3: 'Среда',
    };

    let bodyEl = document.querySelector('body');

    for ( let key in day ) {
        bodyEl.innerHTML += `${key} -> ${day[key]}<br>`;
    }
}

hashTask1();

function hashTask2() {
    let items = [
        {
            id: 1,
            name: 'item 1',
            price: '25$'
        },
        {
            id: 2,
            name: 'item 2',
            price: '15$'
        }
    ];

    let sum = 0;

    for (let i = 0; i < items.length; i++) {
        sum += parseInt(items[i].price);
    }
    console.log(sum);
}

function hashTask3() {
    let items;
    if (localStorage.getItem('item')) {
      items = JSON.parse(localStorage.getItem('item'));
    } else {
      items = [
          {
              id: 1,
              name: 'item 1',
              price: '25$'
            },
            {
                id: 2,
                name: 'item 2',
                price: '15$'
            }
        ];
    }

    let sum = 0;

    for (let i = 0; i < items.length; i++) {
        sum += parseInt(items[i].price);
    }
    console.log(sum);
}

function addItem(id, name, price) {

    let cart;

    if (localStorage.getItem('item')) {
        cart = JSON.parse(localStorage.getItem('item'));
        cart.push({id, name, price});
        localStorage.setItem('item', JSON.stringify(cart));
        hashTask3();
        return;
    }

    cart = [{id, name, price}];
    localStorage.setItem('item', JSON.stringify(cart));
    hashTask3();
}

hashTask3();

