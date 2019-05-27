import { EventEmitter } from '../evente-emitter';
import { MethodsAJAX } from '../methodsAJAX';

export class CartModel extends EventEmitter{
		constructor () {
				super();
				this.methodsAJAX = new MethodsAJAX();

				this.cart = {};
				this.checkCart();
		}

		checkCart() {
				if (!localStorage.getItem('userLogEmail')){
						console.log('return false');
						return false;
				}

				if ( localStorage.getItem('cart')){
						this.cart = JSON.parse (localStorage.getItem('cart'));
				}
				return true;
		}


		addProductToCat(id) {
				if (!this.checkCart()) {
						return false;
				}

				if (this.cart[id] !== undefined) {
						this.cart[id]++;

				} else {
						this.cart[id] = 1;
				}

				localStorage.setItem('cart', JSON.stringify(this.cart) );
		}

		minusProduct(id) {
				if (!this.checkCart() ) {
						return false;
				}
				if (this.cart[id] > 1) {
						this.cart[id] -= 1 ;
				} else {
						delete this.cart[id];
				}

				localStorage.setItem('cart', JSON.stringify(this.cart) );
		}


		delProduct(id) {
				if (!this.checkCart() ) {
						return false;
				}
				if (this.cart[id] !== undefined) {
						delete this.cart[id];

				} else {
						return null;
				}

				localStorage.setItem('cart', JSON.stringify(this.cart) );
		}

		// checkCart() {
		// 		localStorage.setItem(`${this.accountUserObg.email}`, JSON.stringify(`${this.accountUserObg.cartObgLS}`) );
		//
		// 		if ( localStorage.getItem(`${this.accountUserObg.email}`) {
		// 				this.cartObgLS = JSON.parse (localStorage.getItem('cart'));
		// 		}
		// }

		// *
		//  * instead of processing on the server, we are taking objects here.
		//  * @param userObj
		// getUserObgFromServer(userLogEmail) {                                                     // add test on date fixed
		// 		console.log(userLogEmail);
		// 		this.methodsAJAX.getDataFetch('http://localhost:3006/login')
		// 				.then((allUserObj) => {
		//
		// 						for (let i = 0; i < allUserObj.length; i++) {
		//
		// 								if (allUserObj[i].email === userLogEmail) {
		//
		// 										this.accountUserObg = allUserObj[i];
		// 										console.log(this.accountUserObg);
		//
		// 										this.setCartToLS();
		//
		// 												// this.checkCart();
		//
		// 										//this.emit('creatAccountUserObg', this.accountUserObg);
		//
		// 										break;
		// 								}
		// 						}
		// 				})
		// 				.catch(err => alert(err));
		// }


}

