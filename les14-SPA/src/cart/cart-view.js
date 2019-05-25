import { EventEmitter } from '../evente-emitter';

export class CartView extends EventEmitter {
		constructor () {
				super();
		}

		showCartPage(allProducts, cartObgLS) {
				const cartPage = document.querySelector('.cart-page');
				cartPage.innerHTML = '';

				if (Object.keys(cartObgLS).length === 0) {

						let viewCart = document.createElement('div');
						viewCart.innerHTML = `Cart is empty!`;
						cartPage.appendChild(viewCart);

						document.querySelector('#spinnerMain').classList.add('hider');
						cartPage.classList.remove('hider');

				} else {
						console.log(allProducts);
						this.drawCart(allProducts, cartObgLS, cartPage);

						document.querySelector('.cart-page img').onload = () => {
								document.querySelector('#spinnerMain').classList.add('hider');
								cartPage.classList.remove('hider');
						}
				}
		}

		/**
		 * I Use break to avoid sorting out unnecessary options.
		 * @param allProducts
		 * @param cartObgLS
		 * @param cartPage
		 */
		drawCart (allProducts, cartObgLS, cartPage) {
				for (let key in cartObgLS) {
						let product;
						for(let i = 0; i < allProducts.length; i++) {                           // можно применить хитрый цикл за один проход...
								if (String(allProducts[i].id) === String(key)) { //
										product = allProducts[i];
										break;
								}
						}

						let viewCart = document.createElement('div');                      // здесь перениесу в html и шаблонизатором..
						viewCart.innerHTML = `
						<div class="row">
								<button type="button" class="col-1 btn btn-danger btn-sm delete" data-art="${key}" >x</button>
								<div class="col-11"></div>
						</div>
						<div class="row">
								<div class="col-6"><img class="img-fluid" src="${product.image.small}"></div>
								<div class="col-6"></div>
						</div>
						<div class="row">
								<span class="col-12 productName">${product.name}</span>
						</div>
						<div class="row">
								<button type="button" class="col-2 btn btn-success minus" data-art="${key}">-</button>
								<span class="col-3 productCount">${cartObgLS[key]}</span>
								<button type="button" class="col-2 btn btn-success plus" data-art="${key}">+</button>
								<span class="col-5 sumProductPrice" data-art="${product.price}">${cartObgLS[key] * product.price}</span>
						</div>`;

						viewCart.classList.add(`prod-in-cart-${key}`);
						viewCart.classList.add(`prod`);
						viewCart.classList.add(`col-md-6`);
						viewCart.classList.add(`col-lg-4`);

						cartPage.appendChild(viewCart);
				}


				let arrButPlus = document.querySelectorAll('.plus');
				arrButPlus.forEach((item) => {

						item.addEventListener('click', (event) => {

								let id = event.target.getAttribute('data-art');
								this.emit('addProdToCat', id);

								let productCount = document.querySelector(`.prod-in-cart-${id} .productCount`);
								productCount.innerHTML = Number(productCount.innerHTML) + 1;                // нужна ли отдельная функция ?

								let sumProductPrice = document.querySelector(`.prod-in-cart-${id} .sumProductPrice`);
								let productPrice = sumProductPrice.getAttribute('data-art');
								sumProductPrice.innerHTML = Number(sumProductPrice.innerHTML) + Number(productPrice);
						});
				});


				let arrButDel = document.querySelectorAll('.delete');
				arrButDel.forEach((item) => {

						item.addEventListener('click', (event) => {

								let id = event.target.getAttribute('data-art');
								this.emit('delProductFromCart', id);
						});
				});


				let arrButMinus = document.querySelectorAll('.minus');
				arrButMinus.forEach((item) => {

						item.addEventListener('click', (event) => {

								let id = event.target.getAttribute('data-art');
								this.emit('minusProductFromCart', id);
						});
				});

		}


		/**
		 * draw in navbar userLogName
		 * @param userLogName - (string) registered user name
		 */
		showUserAccountEmail(userLogName) {
				if (userLogName) {
						let name = document.querySelector('.nameLogUser')
						name.innerHTML = userLogName;
				}
		}

}
