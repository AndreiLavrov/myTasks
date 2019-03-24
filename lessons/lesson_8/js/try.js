'use strict';
// const obj = {};
//
// try {
//     obj.forEach(function(item){
//         console.log(item);
//     });
// } catch (e) {
//     console.log('Catch block');
//     console.log(e.message);
// }
//
// alert('Script is working');
//
// obj.forEach(function(item){
//     console.log(item);
// });
//
// alert('Script 2 is working');

// let message = 'Success';
//
// try {
//     [].forEach(function(item){
//     console.log(item);
//     });
// } catch (e) {
//     message = `Error: ${e.message}`;
// } finally {
//     console.log(message);
// }

//  let message = 'Success';
// //
// try {
//     throw 'Error happens'
// } catch (e) {
//     message = `Error: ${e}`;
// } finally {
//     console.log(message);
// }

// [1,2,3,4,5].forEach(function(item){
//    if (item === 3) {
//        throw 'Item === 3';
//    }
//     console.log(item);
// });

// let message = 'Success';
// //
// try {
//     throw new Error('Error message')
// } catch (e) {
//     message = `Error: ${e.message},
//     Stack: ${e.stack}`;
// } finally {
//     console.log(message);
// }

function MyError(message, data) {
    this.name = 'My Error';
    this.data = data;
    this.message = message || 'Default error message';
    this.stack = (new Error()).stack;
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

// let data = {
//     user: 'admin',
//     time: new Date().toISOString(),
// };
//
// try {
//     throw new MyError('User error message', data);
// } catch (e) {
//     let errorText = `
//     Name: ${e.name},
//     Error: ${e.message},
//     Data: ${JSON.stringify(e.data)}
//     `;
//     console.log(errorText);
// }
const user = {
    name: 'Vasia',
    id: 1,
    phone: '1234567',
    email: 'test@email.oc',
    getContacts: function () {
        return `Phone: ${this.phone}, Email: ${this.email}`;
    }
};
try {
    const r = user.getContacts;
    r();
} catch (e) {
    console.log(e.message);
}

console.log(user.getContacts());






