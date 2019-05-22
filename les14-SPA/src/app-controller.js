export class AppController {
		constructor (routerHistory, productsModel, productsView, cartModel,
								 cartView, loginModel, loginView, aboutModel, aboutView, newsModel, newsView) {

				this.newsModel = newsModel;
				this.newsView = newsView;

				this.aboutModel = aboutModel;
				this.aboutView = aboutView;

				this.loginModel = loginModel;
				this.loginView = loginView;

				this.prodModel = productsModel;
				this.productsView = productsView;

				this.cartModel = cartModel;
				this.cartView = cartView;

				this.router = routerHistory;  //


				this.navigation = document.querySelector('.navbar');

				this.home = document.querySelector('.home');
				this.products = document.querySelector('.products');
				this.cart = document.querySelector('.cart');
				this.about = document.querySelector('.about');
				// this.location = document.querySelector('.location');
				// this.weather = document.querySelector('.weather');
				// this.play = document.querySelector('.play');
				this.login = document.querySelector('.login');


				this.init();

				this.initHeaderButtons();


				newsModel.on('getNews', (news) => this.generateAllNewsHTML(news));
				newsModel.on('filterNews', (news) => this.showFilterNews(news));

				productsModel.on('showProductsPage', (all) => this.showProductsPage(all));
				productsView.on('addProdToCat', (id) => this.addProdToCat(id));

				// cartModel.on('showProdInCart', (all) => this.showProdInCart(all));
				cartView.on('addProdToCat', (id) => this.addProdToCat(id));
				cartView.on('delProductFromCart', (id) => this.delProductFromCart(id));
				cartView.on('minusProductFromCart', (id) => this.minusProductFromCart(id));

				aboutModel.on('getAboutData', (aboutData) => this.showAboutPage(aboutData));

				loginView.on('checkIsTakenEmail', (userObg) => this.checkIsTakenEmail(userObg));
				loginView.on('getUserFormSignUp', (userObg) => this.signUp(userObg));
				loginModel.on('getStatRegistr', (userStatusObj) => this.showUserStatus(userStatusObj));
				loginView.on('getUserFormSignIn', (userObj) => this.signIn(userObj));
				loginModel.on('showUserStatusLogin', (userObj) => this.showUserStatusLogin(userObj));


		}



		initHeaderButtons() {

				this.navigation.addEventListener('click', (event) => {

						event.preventDefault();

						switch (event.target) {
								case this.home:
										// window.location.pathname = '';
										window.location.hash = '';
										break;
								case this.products:
										// window.history.pushState(null, null, '/products');
										window.location.hash = '#products';
										break;
								case this.cart:
										window.location.hash = '#cart';
										break;
								case this.about:
										window.location.hash = '#about';
										break;
								case this.login:
										window.location.hash = '#login';
										break;
								default:
										break;
						}

						// this.router.render(decodeURI(window.location.pathname) + '/');
						// this.router.render(decodeURI(window.location.pathname) );
						this.router.render(decodeURI(window.location.hash) );
				});
		};



		init () {

				this.initRoutes();

				this.newsModel.getNews();

				// // this.router.render(decodeURI(window.location.pathname));
				// window.dispatchEvent(new HashChangeEvent('hashchange'));              // ?

		}



		initRoutes () {
				this.router.addRoute('', this.renderHomePage.bind(this));
				this.router.addRoute('#filter', this.renderFilterResults.bind(this));
				this.router.addRoute('#oneNews', this.renderOneNewsPage.bind(this));
				this.router.addRoute('#products', this.renderProductsPage.bind(this));
				this.router.addRoute('#cart', this.renderCartPage.bind(this));
				this.router.addRoute('#about', this.renderAboutPage.bind(this));
				this.router.addRoute('#login', this.renderLoginPage.bind(this));
				this.router.addRoute('404', this.renderErrorPage.bind(this));

		}



		generateAllNewsHTML(news) {

				this.newsView.generateAllNewsHTML(news);

				// this.router.render(decodeURI(window.location.pathname));
				window.dispatchEvent(new HashChangeEvent('hashchange'));             // ?

		}


		renderHomePage () {

				this.newsView.showNewsPage();
		}




		renderFilterResults () {

				const filter = this.newsView.getCurrentFilterState();
				this.newsModel.filterNews(filter);
		}


		showFilterNews(arrFilterNews) {

				this.newsView.showFilterNews(arrFilterNews);
		}



		renderOneNewsPage () {

				const idSelectedOneNews = this.newsView.getCurrentOneNewsState();
				this.newsModel.addIdSelectedNews(idSelectedOneNews);
				this.newsView.showOneNewsPage (this.newsModel.allNews, idSelectedOneNews);
		}




		renderProductsPage () {

				this.prodModel.getProducts();
		}


		showProductsPage(allProducts) {

				this.cartModel.checkCart();
				this.productsView.showProductsPage(allProducts, this.cartModel.cartObgLS);
		}




		renderCartPage() {                                                                 // ?

				this.cartModel.checkCart();

				if (this.prodModel.allProducts.length > 0) {
						this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.cartObgLS);

				} else {

						this.prodModel.getProdPromise()
								.then((products) => {

										this.cartView.showCartPage(products, this.cartModel.cartObgLS);
								})
				}

				// this.cartModel.getProductsInCart(this.prodModel.allProducts);
		}


		// showProdInCart(all) {
		// 		this.cartView.showCartPage(all, this.cartModel.cartObgLS);
		// }


		addProdToCat(id) {
				this.cartModel.addProductToCat(id);
		}


		delProductFromCart(id) {
				this.cartModel.delProduct(id);
				// this.cartModel.getProductsInCart();
				this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.cartObgLS);

		}


		minusProductFromCart(id) {
				this.cartModel.minusProduct(id);
				// this.cartModel.getProductsInCart();
				this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.cartObgLS);
		}




		renderAboutPage () {

				this.aboutModel.getAboutData();
				// this.aboutView.showAboutPage();
		}


		showAboutPage(aboutData) {
				this.aboutView.showAboutPage(aboutData);
		}




		showUserStatusLogin(userObg) {
				this.loginView.showUserStatusLogin(userObg);
		}

		signIn(userObg) {
				this.loginModel.signIn(userObg);
		}



		checkIsTakenEmail(userObg) {
				this.loginModel.checkIsTakenEmail(userObg);
		}


		showUserStatus(userStatusObj) {
				this.loginView.showUserStatus(userStatusObj);
		}


		signUp(userObg) {
				this.loginModel.signUp(userObg);
		}












		renderErrorPage () {
				const page = document.querySelector('.error');
				page.classList.remove('hider');
		}




		renderLoginPage() {
				this.loginView.showLoginPage();
		}


}



