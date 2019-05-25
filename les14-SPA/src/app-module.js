export class AppModule {
		constructor (router,
								 newsModel,
								 newsView,
								 productsModel,
								 productsView,
								 cartModel,
								 cartView,
								 aboutModel,
								 aboutView,
								 loginModel,
								 loginView) {


				this.router = router;

				this.newsModel = newsModel;
				this.newsView = newsView;

				this.prodModel = productsModel;
				this.productsView = productsView;

				this.cartModel = cartModel;
				this.cartView = cartView;

				this.aboutModel = aboutModel;
				this.aboutView = aboutView;

				this.loginModel = loginModel;
				this.loginView = loginView;


				this.init();

				this.initHeaderButtons();


				// this.addGlobalEventHandlers();
				newsModel.on('getNews', (news) => this.generateAllNewsHTML(news));
				newsModel.on('filterNews', (news) => this.showFilterNews(news));

				productsModel.on('showProductsPage', (all) => this.showProductsPage(all));
				productsView.on('addProdToCat', (id) => this.addProdToCat(id));

				// cartModel.on('creatAccountUserObg', (obj) => this.showAccount(obj));
				cartView.on('addProdToCat', (id) => this.addProdToCat(id));
				cartView.on('delProductFromCart', (id) => this.delProductFromCart(id));
				cartView.on('minusProductFromCart', (id) => this.minusProductFromCart(id));

				aboutModel.on('getAboutData', (aboutData) => this.showAboutPage(aboutData));

				loginView.on('checkIsTakenEmail', (userObg) => this.checkIsTakenEmail(userObg));
				loginModel.on('emailIsTaken', (userStatusObj) => this.emailIsTaken(userStatusObj));
				loginView.on('getUserFormSignUp', (userObg) => this.signUp(userObg));
				loginView.on('getUserFormSignIn', (userObj) => this.signIn(userObj));
				loginModel.on('userIsAuthorized', (userObj) => this.userIsAuthorized(userObj));
				// loginModel.on('addSSUserLogEmail', (userObj) => this.showUserStatusLogin(userObj));

		}



		initHeaderButtons() {

				this.navigation = document.querySelector('.navbar');
				this.home = document.querySelector('.home');
				this.products = document.querySelector('.products');
				this.cart = document.querySelector('.cart');
				this.about = document.querySelector('.about');
				// this.location = document.querySelector('.location');
				// this.weather = document.querySelector('.weather');
				// this.play = document.querySelector('.play');
				this.login = document.querySelector('.login');


				this.navigation.addEventListener('click', (event) => {

						event.preventDefault();

						switch (event.target) {
								case this.home:
										window.location.hash = '';
										break;
								case this.products:
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

						this.router.render(decodeURI(window.location.hash) );
				});
		};



		init () {

				this.initRoutes();

				this.newsModel.getNews();                                                 // нужно ли каждый раз получать новости....? при обнновлении..

				// здесь будет код  рисующий  имя  пользователя....
				// this.loginView.drawUserLogName(this.loginModel.userLogName);
				this.showUserAccountEmail();


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



		// addGlobalEventHandlers() {
		//
		// 		newsModel.on('getNews', (news) => this.generateAllNewsHTML(news));
		// 		newsModel.on('filterNews', (news) => this.showFilterNews(news));
		//
		// 		productsModel.on('showProductsPage', (all) => this.showProductsPage(all));
		// 		productsView.on('addProdToCat', (id) => this.addProdToCat(id));
		//
		// 		// cartModel.on('showProdInCart', (all) => this.showProdInCart(all));
		// 		cartView.on('addProdToCat', (id) => this.addProdToCat(id));
		// 		cartView.on('delProductFromCart', (id) => this.delProductFromCart(id));
		// 		cartView.on('minusProductFromCart', (id) => this.minusProductFromCart(id));
		//
		// 		aboutModel.on('getAboutData', (aboutData) => this.showAboutPage(aboutData));
		//
		// 		loginView.on('checkIsTakenEmail', (userObg) => this.checkIsTakenEmail(userObg));
		// 		loginView.on('getUserFormSignUp', (userObg) => this.signUp(userObg));
		// 		loginModel.on('getStatRegistr', (userStatusObj) => this.showUserStatus(userStatusObj));
		// 		loginView.on('getUserFormSignIn', (userObj) => this.signIn(userObj));
		// 		loginModel.on('showUserStatusLogin', (userObj) => this.showUserStatusLogin(userObj));
		//
		// }



		generateAllNewsHTML(news) {

				this.newsView.generateAllNewsHTML(news);

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
				// this.cartModel.checkUserLogEmail();                                                // fix not need
				this.productsView.showProductsPage(allProducts, this.cartModel.accountUserObg.cartObgLS);
		}




		renderCartPage() {                                                                 // ? проверить , возможно лишнее и так вызыв в констр

				if (this.prodModel.allProducts.length > 0) {
						this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.accountUserObg.cartObgLS);

				} else {

						this.prodModel.getProdPromise()
								.then((products) => {

										this.cartView.showCartPage(products, this.cartModel.accountUserObg.cartObgLS);
								})
								.catch(e => alert(`.catch-showAccount ${e}`))                //
				}
		}




		addProdToCat(id) {
				this.cartModel.addProductToCat(id);
		}

		minusProductFromCart(id) {
				this.cartModel.minusProduct(id);
				this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.accountUserObg.cartObgLS);
		}

		delProductFromCart(id) {
				this.cartModel.delProduct(id);
				this.cartView.showCartPage(this.prodModel.allProducts, this.cartModel.accountUserObg.cartObgLS);
		}

		showUserAccountEmail() {
				this.cartView.showUserAccountEmail(this.cartModel.userLogEmail);
		}



		renderAboutPage () {

				this.aboutModel.getAboutData();
				// this.aboutView.showAboutPage();
		}


		showAboutPage(aboutData) {
				this.aboutView.showAboutPage(aboutData);
		}



		renderLoginPage() {
				this.loginView.showLoginPage();
		}

		checkIsTakenEmail(userObg) {
				this.loginModel.checkIsTakenEmail(userObg);
		}

		emailIsTaken(userStatusObj) {
				this.loginView.emailIsTaken(userStatusObj);
		}

		signUp(userObg) {
				this.loginModel.signUp(userObg);
		}


		userIsAuthorized(userObg) {
				this.cartView.showUserAccountEmail(userObg.email);
				this.cartModel.addAccountUserObg(userObg);																				// || window.location.hash = '#cart';
				window.location.hash = '#cart';
		}

		signIn(userObg) {
				this.loginModel.signIn(userObg);
		}




		renderErrorPage () {
				const page = document.querySelector('.error');
				page.classList.remove('hider');
		}
}



