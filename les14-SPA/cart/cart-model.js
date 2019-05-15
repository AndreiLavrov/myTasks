import { EventEmitter } from '../src/evente-emitter';

export class CartModel extends EventEmitter{
		constructor () {

				super();
				this.cartObgLS = {};
				this.allProducts = [];
		}


		checkCart() {
				//проверяю наличие корзины в localStorage;
				if ( localStorage.getItem('cart') != null) {
						this.cartObgLS = JSON.parse (localStorage.getItem('cart'));
						console.log(this.cartObgLS);
				}
		};

		             // может что сделать с рендорингом каждый раз без сохранения(проверка изтенялось ли содержимое карзины)

		getProductsInCart(allProducts) {
				this.checkCart();

				if (allProducts && allProducts.length) {      // change ?
						this.allProducts = allProducts;
				}

				if (this.allProducts.length) {
						this.emit('showProdInCart', this.allProducts);

				} else {
						this.getProdInCartAsinc();
				}
		}

		getProdInCartAsinc() {
				fetch('http://localhost:3006/products', {
						headers: {
								'Content-Type': 'application/json'
						}
				})
						.then((res) => res.json())
						.then((products) => {

								this.allProducts = products;

								this.emit('showProdInCart', this.allProducts);
						})
		}

		// getOnlyProdInCart(allProducts, cart) {                   // не обязательна, можно передавать и массив ВСЕХ продуктов
		// 		// drawCart(myCart, cartPage, cart) {
		// 				for (let key in cart) {
		// 						let product = {};
		// 						allProducts.forEach((item) => {
		// 								if (String(item.id) === String(key)) {                          //
		// 										Object.assign(product, item);
		// 								}
		// 						});
		// 						this.prodInCart.push(product);                                   //
		// 				}
		// }

		addProductToCat(id) {

				this.checkCart();

				if (this.cartObgLS[id] !== undefined) {

						this.cartObgLS[id]++;
				}
				else {

						this.cartObgLS[id] = 1;
				}

				localStorage.setItem('cart', JSON.stringify(this.cartObgLS) );
		}


		minusProduct(id) {

				this.checkCart();

				if (this.cartObgLS[id] > 1) {
						this.cartObgLS[id] = this.cartObgLS[id] - 1 ;             // correcting
				} else {
						delete this.cartObgLS[id];
				}

				localStorage.setItem('cart', JSON.stringify(this.cartObgLS) );
		}


		delProduct(id) {

				this.checkCart();

				if (this.cartObgLS[id] !== undefined) {

						delete this.cartObgLS[id];
				} else {

						return null;
				}

				localStorage.setItem('cart', JSON.stringify(this.cartObgLS) );
		}
}

