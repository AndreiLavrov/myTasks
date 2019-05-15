export class AppController {
		constructor (searchService, routerHistory, productsModel, productsView, cartModel,
								 cartView, loginModel, loginView, aboutModel, aboutView, newsModel, newsView) {

				this.allNews = [];

				this.newsModel = newsModel;
				this.newsView = newsView;

				this.aboutModel = aboutModel;
				this.aboutView = aboutView;

				this.loginModel = loginModel;
				this.loginView = loginView;

				this.prodModel = productsModel;
				this.productsView = productsView;
				//this.products = this.prodModel.allPproducts;  // нужен общий массив this.products а не отдельн prodModel и cartModel

				this.cartModel = cartModel;
				this.cartView = cartView;

				//this.cart = {};
				this.router = routerHistory;  //
				this.searchService = searchService;   //
				this.searchService.subscribe(this.onFilterChange.bind(this));

				// this.initSingleNewsPage();
				// this.initNewsPage();


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


				this.init();


				this.initHeaderButtons();

				// productsModel.on('addAllProducts', (all) => this.addAllProducts(all));
				productsModel.on('showProductsPage', (all) => this.showProductsPage(all));
				productsView.on('addProdToCat', (id) => this.addProdToCat(id));
				cartModel.on('showProdInCart', (all) => this.showProdInCart(all));
				cartView.on('addProdToCat', (id) => this.addProdToCat(id));
				cartView.on('delProductFromCart', (id) => this.delProductFromCart(id));
				cartView.on('minusProductFromCart', (id) => this.minusProductFromCart(id));
				newsModel.on('getNews', (news) => this.showNewsPage(news));


		}


		// addAllProducts(allProducts) {
		// 		this.allProducts = allProducts;              //  this.allProducts here
		// }

		showNewsPage(news) {
				this.newsView.generateAllNewsHTML(news);
		}

		renderHomePage () {
				this.newsView.clearSearchInp();
				this.newsView.renderNewsPage(this.newsModel.allNews);
		}



		showProductsPage(allProducts) {
				this.cartModel.checkCart();                    // ?????????????
				this.productsView.showProductsPage(allProducts, this.cartModel.cartObgLS);
		}

		renderProductsPage () {
				this.prodModel.getProducts();
		}

		addProdToCat(id) {
				this.cartModel.addProductToCat(id);
		}

		renderCartPage() {
				this.cartModel.getProductsInCart(this.prodModel.allProducts);

		}

		showProdInCart(all) {
				this.cartView.showCartPage(all, this.cartModel.cartObgLS);
		}

		delProductFromCart(id) {
				this.cartModel.delProduct(id);
				this.cartModel.getProductsInCart();
		}

		minusProductFromCart(id) {
				this.cartModel.minusProduct(id);
				this.cartModel.getProductsInCart();
		}


		initHeaderButtons() {

				this.navigation.addEventListener('click', (event) => {

						event.preventDefault();

						switch (event.target) {
								case this.home:
										// window.location.pathname = '';
										window.location.hash = '';
										break;
								case this.about:
										window.history.pushState(null, null, '/#about');
										break;
								case this.products:
										window.history.pushState(null, null, '/#products');
										break;
								case this.cart:
										window.history.pushState(null, null, '/#cart');
										break;
								case this.login:
										window.history.pushState(null, null, '/#login');
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

				// this.router.render(decodeURI(window.location.pathname));
				window.dispatchEvent(new HashChangeEvent('hashchange'));

		}







		initRoutes () {      // add  rout in list
				this.router.addRoute('', this.renderHomePage.bind(this));
				this.router.addRoute('#filter', this.renderFilterResults.bind(this));
				//this.router.addRoute('#singleNews', this.renderSingleNewsPage.bind(this));
				this.router.addRoute('#news', this.renderSingleNewsPage.bind(this));
				this.router.addRoute('404', this.renderErrorPage.bind(this));
				this.router.addRoute('#about', this.renderAboutPage.bind(this));
				this.router.addRoute('#products', this.renderProductsPage.bind(this));
				// this.router.addRoute('products', this.prodClass.renderProductsPage.bind(this)); 270 где теряем, если так вызываем метод класса?
				this.router.addRoute('#cart', this.renderCartPage.bind(this));
				this.router.addRoute('#login', this.renderLoginPage.bind(this));
		}

		onFilterChange (data) {
				// window.history.pushState(null, 'Filter page', '/' + data);
				// this.router.render(decodeURI(window.location.pathname));
				location.hash = data;
		}



		renderFilterResults () {
				this.newsView.renderFilterResults (this.newsModel.allNews);
		}




// для продукта
		// initSingleNewsPage () {
		// 		const self = this;
		// 		this.singleNewsPage = document.querySelector('.single-news');
		// 		this.singleNewsPage.addEventListener('click', (event) => {
		// 				if (!self.singleNewsPage.classList.contains('hider')) {                       // ?  hider
		// 						const clicked = event.target;
		//
		// 						if (clicked.classList.contains('close') || clicked.classList.contains('overlay')) {
		// 								// window.history.pushState(null, null, '/' + self.searchService.getCurrentState());
		// 								// this.router.render(decodeURI(window.location.pathname));
		// 								location.hash = self.searchService.getCurrentState();
		// 						}
		// 				}
		// 		});
		// }
		//// для продукта

		// renderSingleNewsPage () {
		// 		const page = document.querySelector('.single-news');
		// 		const container = document.querySelector('.preview-large');
		// 		// const index = window.location.pathname.split('singleNews/')[1].trim();   // window
		// 		const index = location.hash.split('#singleNews/')[1].trim();
		//
		// 		if (this.allNews.length) {
		// 				this.allNews.forEach((item) => {
		// 						if (Number(item.id) === Number(index)) {
		// 								container.querySelector('img')
		// 										.setAttribute('src', '/' + item.image.small);
		// 								container.querySelector('p').innerText = item.description;
		// 						}
		// 				});
		// 		}
		//
		// 		page.classList.remove('hider');
		// }



		renderSingleNewsPage () {
				this.newsView.renderSingleNewsPage (this.newsModel.allNews);
		}


		renderErrorPage () {
				const page = document.querySelector('.error');
				page.classList.remove('hider');
		}


		renderAboutPage () {
				this.aboutView.showAboutPage();
		}


		renderLoginPage() {
				this.loginView.drawLoginPage();
		}



}



