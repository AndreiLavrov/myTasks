"use strict";

function example() {
// ищем первое же после 25 число, делящееся на 7
  for ( var с = 25; ; с++) {
    if ( с % 7 == 0)
      break;
  }
  console.log('Наименьшее число после 25, делящееся на 7: '+с);
}

function example2() {

// сделаем что-то 5 раз
  for (var n = 1; n < 6; n++)
    console.log('A');

  for (var n = 0; n < 5; n++)
    console.log('B');

  for (var n = 1; n <= 5; n++)
    console.log('C');
}

/**
 * Find min value in array
 *
 * @param list
 * @returns {*}
 */
function minValue(list) {

  var min = list[0];

  for (var i = 1; i <= list.length; i++) {
    if (list[i] < min) {
      min = list[i];
    }
  }
  alert(min);
  return min;
}

/**
 * Get digits of the number
 *
 * @param x
 * @returns {Array}
 */
function digits(x) {
  // make result var
  var result = [];

  while (x >= 1) {
    result.push(x % 10);
    x = Math.floor(x / 10);
  }

  alert(result.reverse());
  return result.reverse();
}

/**
 * Check is word pollindrom
 *
 * @param word
 * @returns {boolean}
 */
function pollindrom(word) {

  var reverseWord = '';

  for (var i = word.length - 1; i >= 0; i--) {
    reverseWord += word[i];
  }

  alert(word === reverseWord);
  return word === reverseWord;
}

function pollindrom2(word) {
  return word.split('').reverse().join('') === word;
}

function removeChar(str) {
    return str.substring(1, str.length - 1);
}

function customSubstring(str, firstIndex, lastIndex) {

  var result = '';

  for (var i = firstIndex; i < lastIndex; i++) {
    result += str[i]
  }

  return result;
}

String.prototype.customSubstring = function(firstIndex, lastIndex) {
  var result = '';

  for (var i = firstIndex; i < lastIndex; i++) {
    result += this[i]
  }

  return result;
}

function createMultipliTable() {
  var body = document.querySelector('body');

  var table = document.createElement('table');

  var tr, td, tdInner = '';

  table.style.width = '100%';
  table.setAttribute('border', 1);

  for (var i = 1; i <= 10; i++) {
    if (i == 1 || i == 6) {
      tr = document.createElement('tr');
    }
    td = document.createElement('td');
    tdInner = '';

    for(var j = 1; j <= 10; j++) {
      tdInner += '<div style="padding: 5px">' + i + '*' + j + '=' + (i * j) + '</div>';
    }

    td.innerHTML = tdInner;
    tr.appendChild(td);

    if (i == 5 || i == 10) {
      table.appendChild(tr);
    }

  }
  body.appendChild(table);
}



