
export class Controller {

		constructor (router, prodModel, productsView, cartModel, cartView){                              // or not param. ?

				this.router = router;
				this.prodModel = prodModel;
				this.productsView = productsView;
				this.cartModel = cartModel;
				this.cartView = cartView;

				this.navigation = document.querySelector('.navigation');

				this.home = document.querySelector('.home');
				this.products = document.querySelector('.products');
				this.cart = document.querySelector('.cart');
				this.usedThin = document.querySelector('.usedThin');
				this.blog = document.querySelector('.blog');
				this.contacts = document.querySelector('.contacts');
				this.about = document.querySelector('.about');
				this.service = document.querySelector('.service');
				this.location = document.querySelector('.location');
				this.weather = document.querySelector('.weather');
				this.play = document.querySelector('.play');
				this.login = document.querySelector('.login');


				// this.productsView.on('addProdToCat', (id) => {                    // ,без this.??
				// 		console.log(3.1);
				// 		this.addToCart(id)
				// } );                    //     bind ?
		}

		addToCart(id) {
				console.log(3);
				this.cartModel.addProductToCart(id);
		}


		initHeaderButtons() {

				this.navigation.addEventListener('click', (event) => {

						event.preventDefault();

						switch (event.target) {
								case this.home:
										window.location.pathname = '';
										break;
								case this.about:
										window.history.pushState(null, null, '/about');
										break;
								case this.products:
										window.history.pushState(null, null, '/products');
										break;
								case this.cart:
										window.history.pushState(null, null, '/cart');
										break;
								case this.login:
										window.history.pushState(null, null, '/login');
										break;
								default:
										break;
						}
						this.router.render(decodeURI(window.location.pathname) + '/');        // +  }/


				});
		};
}
