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
				}

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

						but.addEventListener('click', (e) => {

								let idElem = e.target.getAttribute('id');
								this.emit('addProdToCat', idElem);

								this.showButtAddedProduct(e.target);
						});
				});
		}

		showButtAddedProduct(target) {
				target.innerText = 'Added to cart';
				target.classList.add('viwButAddProdToCart');
				setTimeout(() => {
						target.innerText = 'Add to cart';
						target.classList.remove('viwButAddProdToCart');
				}, 3000);
		}


}
