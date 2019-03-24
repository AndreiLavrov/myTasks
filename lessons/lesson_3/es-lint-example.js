'use strict';

/**
 * Senior is the member, who is
 * older then 54 and have rating more then 7
 *
 * @param data
 * @returns {Array}
 */
function openOrSenior(data){
	var result = [];

	for( var i = 0; i < data.length; i++ ) {
		if(data[i][0] >= 55 && data[i][1] > 7) {
			result.push('Senior');
		} else {
			result.push('Open');
		}
	}

	return result;
}

/**
 * if count of x equal o
 *
 * @param str
 * @returns {boolean}
 * @constructor
 */
function XO(str) {
	var x = 0;
	var o = 0;
	var i = 0;
	while(i < str.length) {
		if (str[i].toLowerCase() === 'o') o++;
		if (str[i].toLowerCase() === 'x') x++;
		i++;
	}

	return x === o;
}

/**
 * Convert string with to camelCase
 *
 * @param str
 * @returns {string}
 */
function toCamelCase(str){
	var result = '';
	var dashBefore = false;

	for (var i = 0; i < str.length; i++) {
		if (str[i] === '-' || str[i] === '_') {
			dashBefore = true;
		} else {
			result += dashBefore ? str[i].toUpperCase() : str[i];
			dashBefore = false;
		}
	}

	return result;
}
/**
 * format array in next way (xxx) xxx-xxxx
 * @param numbers
 * @returns {string}
 */
function createPhoneNumber(numbers){
	var n = numbers;
	return  '('+n[0]+n[1]+n[2]+')'+' '+n[3]+n[4]+n[5]+'-'+n[6]+n[7]+n[8]+n[9];
}

/**
 * all letters should be once
 *
 * @param str
 * @returns {boolean}
 */
function isIsogram(str){
	var result = true;
	for (var i = 0; i < str.length; i++) {
		for (var j = i+1; j < str.length; j++) {
			if (str[i].toLowerCase() === str[j].toLowerCase()) result = false;
		}
	}
	return result;
}


function checkTestForPrompt() {
	var text = prompt('Enter value:');
	var NO_MSG = 'No msg!';

	if (!text) {
		return NO_MSG;
	}

    return text.toUpperCase();
}

//checkTestForPrompt();