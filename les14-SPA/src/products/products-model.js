import { EventEmitter } from '../evente-emitter';

export class ProductsModel extends EventEmitter{
		constructor() {

				super();
				this.allProducts = [];
		}


		getProducts() {

				if (this.allProducts.length > 0) {

						this.emit('showProductsPage', this.allProducts);

				} else {

				this.getProdPromise()
						.then((products) => {

								this.allProducts = products;

								this.emit('showProductsPage', this.allProducts);
						})
				}
		}


		getProdPromise() {
				return fetch('http://localhost:3006/products', {
						headers: {
								'Content-Type': 'application/json'
						}
				})
						.then((res) => res.json())

		}

}
