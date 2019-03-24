'use strict';

function compare () {
  // alert( null >= 0 ); // true, т.к. null преобразуется к 0
  // alert( null > 0 ); // false (не больше), т.к. null преобразуется к 0
  // alert( null == 0 );
  //
  // alert( undefined > 0 ); // false, т.к. undefined -> NaN
  // alert( undefined == 0 ); // false, т.к. это undefined (без преобразования)
  // alert( undefined < 0 ); // false, т.к. undefined -> NaN
  //
  // alert( !!"0" ); // true
  // alert( !!" " ); // любые непустые строки, даже из пробелов - true!

  console.log('true + false: ', true + false);
  console.log('12 / \'6\': ', 12 / '6');
  console.log('\'number\' + 15 + 3', 'number' + 15 + 3);
  console.log('15 + 3 + \'number\': ', 15 + 3 + 'number');
  console.log('[1] > null: ', [1] > null);
  console.log('\'foo\' + + \'bar\': ', "foo" + (+ "bar"));
  console.log('\'true\' == true: ', 'true' == true);
  console.log('false == \'false\': ', false == 'false');
  console.log('null == \'\': ', null == '');
  console.log('!!"false" == !!"true": ', !!'false' == !!'true');
  console.log('["x"] == "x": ', ['x'] == 'x');
  console.log('[] + null + 1: ', [] + null + 1);
  console.log('0 || "0" && {}: ', 0 || '0' && {});
  console.log('[1,2,3] == [1,2,3]: ', [1,2,3] == [1,2,3]);
  console.log('!+[]+[]+![]: ', (!+[])+[]+(![]));
  console.log('new Date(0) - 0: ', new Date(0) - 0);
  console.log('new Date(0) + 0: ', new Date(0) + 0);
}

function ToPrimitive(input, preferredType){

  switch (preferredType){
    case Number:
      return toNumber(input);
      break;
    case String:
      return toString(input);
      break;
    default:
      return toNumber(input);
  }

  function isPrimitive(value){
    return value !== Object(value);
  }

  function toString(){
    if (isPrimitive(input.toString())) return input.toString();
    if (isPrimitive(input.valueOf())) return input.valueOf();
    throw new TypeError();
  }

  function toNumber(){
    if (isPrimitive(input.valueOf())) return input.valueOf();
    if (isPrimitive(input.toString())) return input.toString();
    throw new TypeError();
  }
}


