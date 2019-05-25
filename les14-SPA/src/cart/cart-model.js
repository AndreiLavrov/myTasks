import { EventEmitter } from '../evente-emitter';
import { MethodsAJAX } from '../methodsAJAX';

export class CartModel extends EventEmitter{
		constructor () {
				super();
				this.methodsAJAX = new MethodsAJAX();
				// this.userLogEmail = false;

				this.accountUserObg = {};
				this.accountUserObg.cartObgLS = {};

				// this.checkUserLogEmail();
				// this.getUserObgFromServer(this.userLogEmail);

		}

		addAccountUserObg(accountUserObg) {
				this.accountUserObg = accountUserObg;
				if (!this.accountUserObg.cartObgLS) {
						this.accountUserObg.cartObgLS = {};
				}
				this.setCartToLS();
		}

		setCartToLS() {
				localStorage.setItem(this.accountUserObg.email, JSON.stringify(this.accountUserObg.cartObgLS) );
		};




		addChangesToServer() {
				this.methodsAJAX.changePost('http://localhost:3006/login', this.accountUserObg.id, this.accountUserObg)
						.then(() => {

								console.log('addedChangesToServer');                                              // //// change
						})
						.catch(err => alert(err));
		}

		addProductToCat(id) {
				if (this.accountUserObg.cartObgLS[id] !== undefined) {
						this.accountUserObg.cartObgLS[id]++;

				} else {
						this.accountUserObg.cartObgLS[id] = 1;
				}

				localStorage.setItem(this.accountUserObg.email, JSON.stringify(this.accountUserObg.cartObgLS) );
				this.addChangesToServer();
		}

		minusProduct(id) {
				if (this.accountUserObg.cartObgLS[id] > 1) {
						this.accountUserObg.cartObgLS[id] -= 1 ;
				} else {
						delete this.accountUserObg.cartObgLS[id];
				}

				localStorage.setItem(this.accountUserObg.email, JSON.stringify(this.accountUserObg.cartObgLS) );
				this.addChangesToServer();
		}


		delProduct(id) {
				if (this.accountUserObg.cartObgLS[id] !== undefined) {
						delete this.accountUserObg.cartObgLS[id];

				} else {
						return null;
				}

				localStorage.setItem(this.accountUserObg.email, JSON.stringify(this.accountUserObg.cartObgLS) );
				this.addChangesToServer();
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

