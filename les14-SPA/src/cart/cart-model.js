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
						this.cart = {};
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

}

