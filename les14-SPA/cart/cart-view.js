import { EventEmitter } from '../src/evente-emitter';

export class CartView extends EventEmitter{
		constructor() {

				super();
		}


		showCartPage(allProducts, cartObgLS) {
				// let myProdInCart = allProducts || null;                                        // need it ?
				const cartPage = document.querySelector('.cart-page');
				cartPage.innerHTML = '';

				if (Object.keys(cartObgLS).length === 0) {       // this.cart >>  arrProduct   // Object equality check (this.cart === {}) {
						let viewCart = document.createElement('div');
						viewCart.innerHTML = `Cart is empty!`;
						cartPage.appendChild(viewCart);

				} else {
						this.drawCart(allProducts, cartObgLS, cartPage);

				}
				cartPage.classList.remove('hider');
		}


		drawCart(allProducts, cartObgLS, cartPage) {

				for (let key in cartObgLS) {
						let product = {};
						allProducts.forEach((item) => {

								if (String(item.id) === String(key)) { //
										Object.assign(product, item);                 // копирование объекта, нужно ли ??
								}

						});
						let viewCart = document.createElement('div');        // сначала добав в докум ??
						viewCart.innerHTML = `<button class="delete" data-art="${key}" >x</button>
						<img src="${product.image.small}"><br>
						<span class="productName">${product.name}</span>
						<button class="minus" data-art="${key}">-</button>
						<span class="productCount">${cartObgLS[key]}</span>
						<button class="plus" data-art="${key}">+</button>
						<span class="sumProductPrice">${cartObgLS[key] * product.price}</span>
						<br>`;

						viewCart.classList.add(`prod-in-cart-${key}`);        // String
						cartPage.appendChild(viewCart);
				}

				let arrButPlus = document.querySelectorAll('.plus');
				arrButPlus.forEach((item) => {

						item.addEventListener('click', (event) =>{                  //  (item)

								let id = event.target.getAttribute('data-art');
								this.emit('addProdToCat', id);

								let productCount = document.querySelector(`.prod-in-cart-${id} .productCount`);
								productCount.innerHTML = Number(productCount.innerHTML) + 1;                   // нужна ли отдельная функция ?
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

						item.addEventListener('click', (event) =>{

								let id = event.target.getAttribute('data-art');
								this.emit('minusProductFromCart', id);
						});
				});

		}


}
