import { EventEmitter } from '../evente-emitter';

export class ProductsView extends EventEmitter {
		constructor () {
				super();
		}

		showProductsPage (allProducts, cartObgLS) {
				const list = document.querySelector('.products-list');
				const page = document.querySelector('.all-products');

				if (!this.savedProductsHtml) {
						this.buildProductsPage(allProducts, list);

						// const imgProduct = document.querySelector('.product-photo img');
						// imgProduct.onload = () => {
						// 		document.querySelector('#spinnerMain').classList.add('hider');
						// 		page.classList.remove('hider');
						// }
				}

				// this.showButAddedProduct(cartObgLS);                                // correcting bug


				document.querySelector('#spinnerMain')
						.classList
						.add('hider');
				page.classList.remove('hider');
		}

		buildProductsPage (allProducts, list) {

				const theTemplateScript = document.getElementById('products-template').innerHTML;
				const theTemplate = Handlebars.compile(theTemplateScript);
				this.savedProductsHtml = theTemplate(allProducts);
				list.innerHTML = this.savedProductsHtml;

				let buttonsAdd = document.querySelectorAll('.add-to-cart');
				buttonsAdd.forEach((but) => {

						but.addEventListener('click', (e) => {    // может передаем об.события а не экземпляр продукта??

								let idElem = e.target.getAttribute('id');
								this.emit('addProdToCat', idElem);

								console.log(e.target);

								e.target.innerText = 'Added to cart';
								e.target.classList.add('viwButAddProdToCart');

						});
				});
		}

		showButAddedProduct (cartObgLS) {                                                 // bug!!!
				if (cartObgLS == {}) {
						return;
				}
				console.log(cartObgLS);
				let butsAdd = document.querySelectorAll('.add-to-cart');

				console.log(butsAdd);                          // почему выводит элементы с уже добавленным классом ??
				for (let key in cartObgLS) {
						// console.log(key);

						inner: for (let i = 0; i < butsAdd.length; i++) {

								butsAdd[i].classList.remove('viwButAddProdToCart');
								butsAdd[i].innerText = 'Add to cart';

								let id = butsAdd[i].getAttribute('id');

								if (String(id) === String(key)) { //  если за коментить, то елементы будут без viwButAddProdToCart уже сразу

										console.log(butsAdd[i]);
										butsAdd[i].classList.add('viwButAddProdToCart');              // is it correct ???
										butsAdd[i].innerText = 'Added to cart';
										console.log(butsAdd[i]);                                       //  What the f*** ??
										break inner;
								}
						}
				}
				console.log(butsAdd);
		}

}
