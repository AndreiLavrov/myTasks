import { EventEmitter } from '../evente-emitter';
import { MethodsAJAX } from '../methodsAJAX';

export class ProductsModel extends EventEmitter{
		constructor() {

				super();
				this.methodsAJAX = new MethodsAJAX();
				this.allProducts = [];
		}


		getProducts() {

				if (this.allProducts.length > 0) {

						this.emit('showProductsPage', this.allProducts);

				} else {

				this.getProdPromise()
						.then(() => {

								this.emit('showProductsPage', this.allProducts);
						})
				}
		}


		getProdPromise() {
				return this.methodsAJAX.getDataFetch('http://localhost:3006/products')
						.then((products) => {

								this.allProducts = products;
						})
		}

}
