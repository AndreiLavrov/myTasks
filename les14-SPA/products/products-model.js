import { EventEmitter } from '../src/evente-emitter';

export class ProductsModel extends EventEmitter{
		constructor() {

				super();
				this.allProducts = [];
		}


		getProducts() {
				if (this.allProducts.length > 0) {
						this.emit('showProductsPage', this.allProducts);


				} else {

						fetch('http://localhost:3006/products', {
								headers: {
										'Content-Type': 'application/json'
								}
						})
								.then((res) => res.json())
								.then((products) => {
										// console.log(5);
										this.allProducts = products;

										// this.emit('addAllProducts', products);            // may be it is not necessary

										this.emit('showProductsPage', this.allProducts);
										// this.productsView.showProductsPage(this.allProducts);

								})
				}
		}

}




/*
export class ProductsCl {
		constructor() {}

		renderProductsPage () {
				const list = document.querySelector('.products-list');
				const page = document.querySelector('.all-products');

				if (this.codeListSavedProducts) {
						list.innerHTML = this.codeListSavedProducts;
						page.classList.remove('hider');
				} else {
						console.log(this.getProducts);
						this.getProducts(page);
				}
		}

		getProducts(page) {

				fetch('http://localhost:3006/products', {
						headers: {
								'Content-Type': 'application/json'
						}
				})
						.then((res) => res.json())
						.then((products) => {

								this.products = products;
								console.log(this.products);
								this.checkCart();                                                       // front
								this.showProducts(this.products);
								//this.showMiniCart();
								page.classList.remove('hider');
								console.log(page);
						});

		}

		showProducts (data) {
				const list = document.querySelector('.products-list');
				const theTemplateScript = document.getElementById('products-template').innerHTML;

				//compile
				const theTemplate = Handlebars.compile(theTemplateScript);
				this.codeListSavedProducts = theTemplate(data);
				list.innerHTML = this.codeListSavedProducts;

				//this.cart = {};

				let butsAdd = document.querySelectorAll('.add-to-cart');    // проюлеммы с обработчиком события
				console.log(butsAdd);
				butsAdd.forEach((but) => {
						but.addEventListener('click', () => this.addToCart(but));                        // this ?
				})
		}

		addToCart(but) {

				// console.log(this);
				// console.log(but);
				// console.log(	but.getAttribute('id'));

				//добавляем товар в корзину
				const article = but.getAttribute('id');
				console.log(article);

				if (this.cart[article] !== undefined) {
						this.cart[article]++;
				}
				else {
						this.cart[article] = 1;
				}
				localStorage.setItem('cart', JSON.stringify(this.cart) );
				console.log(this.cart);
				//showMiniCart();                                                              // ???
		}

		checkCart() {
				//проверяю наличие корзины в localStorage;
				if ( localStorage.getItem('cart') != null) {
						this.cart = JSON.parse (localStorage.getItem('cart'));
				}
		};

		showMiniCart() {
				//показываю содержимое корзины
				// const out = '';
				// for (var w in cart){
				// 		out += w + ' --- '+cart[w]+'<br>';
				// }
				// out+='<br><a href="cart.html">Корзина</a>';
				// $('#mini-cart').html(out);
		};
}

*/
