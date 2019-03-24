// const obj = {
//   _prop1: 23,
//   get prop1(){
//     return this._prop1;
//   },
//   set prop1(value){
//     console.log('prop1 was changed');
//     this._prop1 = value;
//   }
// };
//
// console.log(obj.prop1);
// obj.prop1 = 56;
// console.log(obj.prop1);


const obj2 = {
  _prop2: 0,
};

Object.defineProperty(obj2, 'prop2', {
  get: function() {
    return `Значение prop2: ${this._prop2}`;
  },
  set: function(value) {
    if (value < 18) {
      console.log('Access forbiden');
      return false;
    }
    this._prop2 = value;
  }
});

console.log(obj2.prop2);
obj2.prop2 = 12;
obj2.prop2 = 18;
console.log(obj2.prop2);

