
 import { EventEmitter } from '../src/evente-emitter';

 export class ProductsView extends EventEmitter{
		constructor() {

				super();
		}

		showProductsPage (allProducts, cartObgLS) {

				const list = document.querySelector('.products-list');
				const page = document.querySelector('.all-products');


				if (!this.codeListSavedProducts) {
						this.showProducts(allProducts, list);
				}

				page.classList.remove('hider');

				// this.showButAddedProduct(cartObgLS);                                // correcting bug
		}



		showProducts (allProducts, list) {
				const theTemplateScript = document.getElementById('products-template').innerHTML;

				//compile
				const theTemplate = Handlebars.compile(theTemplateScript);
				this.codeListSavedProducts = theTemplate(allProducts);
				list.innerHTML = this.codeListSavedProducts;


				let butsAdd = document.querySelectorAll('.add-to-cart');

				console.log(butsAdd);

				butsAdd.forEach((but) => {

						but.addEventListener('click', (e) => {    // может передаем об.события а не экземпляр продукта??

								let idElem = e.target.getAttribute('id');
								this.emit('addProdToCat', idElem);

								e.target.innerText = 'Added to cart';
								e.target.classList.add('addProdToCart');


						});
				})
		}


		 showButAddedProduct(cartObgLS) {

				 let butsAdd = document.querySelectorAll('.add-to-cart');

				 console.log(butsAdd);                          // почему выводит элементы с уже добавленным классом ??
				 for (let key in cartObgLS) {

						 butsAdd.forEach((but) => {
								 console.log(but);

								 but.classList.remove('addProdToCart');

								 but.innerText = 'Add to cart';
								 console.log(but);

								 const id = but.getAttribute('id');

								 console.log(id);
								 console.log(key);
								 if (String(id) === String(key)) {           // String(id) === String(key) >> true

										 console.log(but);
										 but.innerText = 'Added to cart';
										 but.classList.add('addProdToCart');
										 console.log(but);
										 console.log(222);

								 }

						 });

				 }



		 }


 }
