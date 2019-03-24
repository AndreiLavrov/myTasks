// function MyObject(name, message) {
//   this.name = name.toString();
//   this.message = message.toString();
//   this.getName = function() {
//     return this.name;
//   };
//
//   this.getMessage = function() {
//     return this.message;
//   };
// }

// function MyObject(name, message) {
//   this.name = name.toString();
//   this.message = message.toString();
// }
// MyObject.prototype.getName = function() {
//   return this.name;
// };
// MyObject.prototype.getMessage = function() {
//   return this.message;
// };

// function MyObject(name, message) {
//   this.name = name.toString();
//   this.message = message.toString();
// }
// (function() {
//   this.getName = function() {
//     return this.name;
//   };
//   this.getMessage = function() {
//     return this.message;
//   };
// }).call(MyObject.prototype);

// var user = { firstName: "Вася" };
// var admin = { firstName: "Админ" };
//
// function func() {
//   alert( this.firstName );
// }
//
// user.f = func;
// admin.g = func;
//
// // this равен объекту перед точкой:
// user.f(); // Вася
// admin.g(); // Админ
// admin['g'](); // Админ (не важно, доступ к объекту через точку или квадратные скобки)

// Явное определение свойства
// Object.defineProperty(obj, 'key', {
//   enumerable: false,
//   configurable: false,
//   writable: false,
//   value: 'static'
// });

// var o = {}; // Создаём новый объект

// Пример добавления свойства к объекту через defineProperty()
// с дескриптором данных
// Object.defineProperty(o, 'a', {
//   value: 37,
//   writable: true,
//   enumerable: true,
//   configurable: true
// });
// Свойство 'a' существует в объекте o и имеет значение, равное 37

// Пример добавления свойства к объекту через defineProperty()
// с дескриптором доступа
// var bValue = 38;
// Object.defineProperty(o, 'b', {
//   get: function() { return bValue; },
//   set: function(newValue) { bValue = newValue; },
//   enumerable: true,
//   configurable: true
// });
// o.b; // 38
// Свойство 'b' существует в объекте o и имеет значение, равное 38
// Значение свойства o.b теперь идентично значению bValue до тех пор,
// пока свойство o.b не будет переопределено

// Вы не можете смешать два этих подхода:
// Object.defineProperty(o, 'conflict', {
//   value: 0x9f91102,
//   get: function() { return 0xdeadbeef; }
// });
// Выкинет исключение TypeError: свойство value применимо только в
// дескрипторах данных, свойство get применимо только в дескрипторах
// доступа

// var o = {};
//
// o.a = 1;
// // Эквивалентно записи:
// Object.defineProperty(o, 'a', {
//   value: 1,
//   writable: true,
//   configurable: true,
//   enumerable: true
// });

// /* мин/макс числа в массиве */
// var numbers = [5, 6, 2, 3, 7];
//
// /* используем apply к Math.min/Math.max */
// var max = Math.max.apply(null, numbers); /* Это эквивалентно Math.max(numbers[0], ...)
//  или Math.max(5, 6, ...) */
// var min = Math.min.apply(null, numbers);

// var module = {
//   x: 81,
//   getX: function() { return this.x; }
// };
//
// module.getX(); // 81
//
// var getX = module.getX;
// getX(); //
//
// // создаём новую функцию с this, привязанным к module
// var boundGetX = getX.bind(module);
// boundGetX(); // 81

// function list() {
//   return Array.prototype.slice.call(arguments);
// }
//
// var list1 = list(1, 2, 3); // [1, 2, 3]
//
// // Создаём функцию с предустановленным ведущим аргументом
// var leadingThirtysevenList = list.bind(undefined, 37);
//
// var list2 = leadingThirtysevenList(); // [37]
// var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]

// function LateBloomer() {
//   this.petalCount = Math.ceil(Math.random() * 12) + 1;
// }
//
// // Объявляем цветение с задержкой в 1 секунду
// LateBloomer.prototype.bloom = function() {
//   window.setTimeout(this.declare.bind(this), 1000);
// };
//
// LateBloomer.prototype.declare = function() {
//   console.log('Я прекрасный цветок с ' +
//     this.petalCount + ' лепестками!');
// };