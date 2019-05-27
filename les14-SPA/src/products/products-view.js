import { EventEmitter } from '../evente-emitter';

export class ProductsView extends EventEmitter {
		constructor () {
				super();
		}

		showProductsPage (allProducts, userLogEmail) {
				const list = document.querySelector('.products-list');
				const page = document.querySelector('.all-products');

				console.log(`userLogEmailshowProductsPage ${userLogEmail}`);

				if (!this.savedProductsHtml) {
						this.buildProductsPage(allProducts, list, userLogEmail);
				}

				if (!userLogEmail) {
						this.addHideButtonAddProd();
				} else {
						this.removeHideButtonAddProd();
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
								this.showButtAddedProduct(e.target);
								this.emit('addProdToCat', idElem);
						});
				});
		}

		showButtAddedProduct (target) {
				target.innerText = 'Added to cart';
				setTimeout(() => {
						target.innerText = 'to cart';
				}, 2000);
		}

		addHideButtonAddProd () {
				let buttonsAdd = document.querySelectorAll('.add-to-cart');
				buttonsAdd.forEach((item) => {
						item.classList.add('hideButtonAddProd');
				});
		}

		removeHideButtonAddProd () {
				let buttonsAdd = document.querySelectorAll('.add-to-cart');
				buttonsAdd.forEach((item) => {
						item.classList.remove('hideButtonAddProd');
				});
		}

}
