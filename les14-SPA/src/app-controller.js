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
				this.initSingleNewsPage();
				this.initNewsPage();

				// this.controller = new Controller(this.router,this.prodModel,this.productsView,this.cartModel,this.cartView);   // or not param. ?
				//this.controller.initHeaderButtons();

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

				productsModel.on('addAllProducts', (all) => this.addAllProducts(all));
				productsModel.on('showProductsPage', (all) => this.showProductsPage(all));
				productsView.on('addProdToCat', (id) => this.addProdToCat(id));
				cartModel.on('showProdInCart', (all) => this.showProdInCart(all));
				cartView.on('addProdToCat', (id) => this.addProdToCat(id));
				cartView.on('delProductFromCart', (id) => this.delProductFromCart(id));
				cartView.on('minusProductFromCart', (id) => this.minusProductFromCart(id));


		}


		addAllProducts(allProducts) {
				this.allProducts = allProducts;              //  this.allProducts here
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



		init () {

				console.log('init');

				fetch('http://localhost:3006/news', {
						headers: {
								'Content-Type': 'application/json'
						}
				})
						.then((res) => res.json())
						.then((data) => {
								this.allNews = data;

								this.initRoutes();
								this.generateAllNewsHTML(this.allNews);
								this.router.render(decodeURI(window.location.pathname));
						});
		}







		initRoutes () {      // add  rout in list
				this.router.addRoute('', this.renderHomePage.bind(this));
				this.router.addRoute('filter', this.renderFilterResults.bind(this));
				this.router.addRoute('singleNews', this.renderSingleNewsPage.bind(this));
				this.router.addRoute('news', this.renderNews.bind(this));
				this.router.addRoute('404', this.renderErrorPage.bind(this));
				this.router.addRoute('about', this.renderAboutPage.bind(this));
				this.router.addRoute('products', this.renderProductsPage.bind(this));
				// this.router.addRoute('products', this.prodClass.renderProductsPage.bind(this)); 270 где теряем, если так вызываем метод класса?
				this.router.addRoute('cart', this.renderCartPage.bind(this));
				this.router.addRoute('login', this.renderLoginPage.bind(this));
		}

		onFilterChange (data) {
				window.history.pushState(null, 'Filter page', '/' + data);
				this.router.render(decodeURI(window.location.pathname));
		}

		renderHomePage () {
				this.clearSearchInp();
				this.renderNewsPage(this.allNews);
		}

		clearSearchInp () {
				document.querySelector('.search').value = '';
		}

// фильтруем
		renderNewsPage (data) {
				const page = document.querySelector('.all-news');
				const pageList = document.querySelector('.news-list');
				let allNews = document.querySelectorAll('.all-news .news-list > li');
				console.log(allNews);

				if (!allNews.length > 0) {     // interesting behavior without 'if' -- delete aii incorrect news-elements ?! //

						this.generateAllNewsHTML(this.allNews);
						allNews = document.querySelectorAll('.all-news .news-list > li');
						console.log(allNews);
				}

				[...allNews].forEach((news) => {
						news.classList.add('hidden');
				});

				/*[...allNews].forEach((news) => {
						data.forEach((item) => {
							if (Number(news.dataset.index) === Number(item.id)) {                             // ?
								pageList.insertBefore(news, pageList.firstChild);						// почему при возврате на страницу
																														 // меняет местами элементы (первые и последние)
								// pageList.appendChild(news);
								news.classList.remove('hidden');
							}
						});
				});*/

				[...allNews].forEach((news) => {
						// занятно..) почему работает? ведь если если подходящий "news" был
						//		перебран после не подходящего, то должен остаться на своем месте (за ним, не вверху) ?? :)

						for (let i = 0; i < data.length; i++) {

								if (Number(news.dataset.index) === Number(data[i].id)) {
										news.classList.remove('hidden');
										return;
								}
						}

						pageList.appendChild(news);
				});

				// page.classList.add('visible');
				page.classList.remove('hider');
				//pageList.classList.remove('hider');

		}

		renderFilterResults () {
				let filter = window.location.pathname.split('filter/')[1].trim();      // window

				try {
						filter = JSON.parse(decodeURI(filter));
				} catch (e) {
						window.location.href = '';
						return false;
				}

				const results = this.searchService.renderFilters(this.allNews, filter);        // major filtration
				this.renderNewsPage(results);
		}

		initSingleNewsPage () {
				const self = this;
				this.singleNewsPage = document.querySelector('.single-news');
				this.singleNewsPage.addEventListener('click', (event) => {
						if (!self.singleNewsPage.classList.contains('hider')) {                       // ?  hider
								const clicked = event.target;

								if (clicked.classList.contains('close') || clicked.classList.contains('overlay')) {
										window.history.pushState(null, null, '/' + self.searchService.getCurrentState());
										this.router.render(decodeURI(window.location.pathname));
								}
						}
				});
		}

		renderSingleNewsPage () {
				const page = document.querySelector('.single-news');
				const container = document.querySelector('.preview-large');
				const index = window.location.pathname.split('singleNews/')[1].trim();   // window
				if (this.allNews.length) {
						this.allNews.forEach((item) => {
								if (Number(item.id) === Number(index)) {
										container.querySelector('img')
												.setAttribute('src', '/' + item.image.small);
										container.querySelector('p').innerText = item.description;
								}
						});
				}

				page.classList.remove('hider');
		}

		initNewsPage () {
				const self = this;
				this.NewsPage = document.querySelector('.news');
				this.NewsPage.addEventListener('click', (event) => {
						if (!self.NewsPage.classList.contains('hider')) {
								const clicked = event.target;

								if (clicked.classList.contains('close') || clicked.classList.contains('overlay')) {
										window.history.pushState(null, null, '/' + self.searchService.getCurrentState());    // window
										this.router.render(decodeURI(window.location.pathname));
								}
						}
				});
		}

		renderNews () {
				const page = document.querySelector('.news');
				const container = document.querySelector('.news-container');
				// const index = location.hash.split('#news/')[1].trim();
				const index = window.location.pathname.split('news/')[1].trim();
				if (this.allNews.length) {
						this.allNews.forEach((item) => {
								if (Number(item.id) === Number(index)) {
										console.log(`index ${index}`);
										container.querySelector('img')
												.setAttribute('src', '/' + item.image.large);
										container.querySelector('p').innerText = item.content;
								}
						});
				}

				page.classList.remove('hider');
		}

		generateAllNewsHTML (data) {
				console.log(`data ${data}`);
				const list = document.querySelector('.all-news .news-list');
				const theTemplateScript = document.getElementById('news-template').innerHTML;

				//compile
				const theTemplate = Handlebars.compile(theTemplateScript);
				list.innerHTML = theTemplate(data);

				list.querySelectorAll('.liClass')
						.forEach((li) => {

								let button = li.querySelector('button');
								li.addEventListener('click', (event) => {

										event.preventDefault();
										if (event.target !== button) {
												window.history.pushState(null, null, `/singleNews/${li.dataset.index}`);

										} else if (event.target === button) {
												window.history.pushState(null, null, `/news/${button.dataset.index}`);
										}

										this.router.render(decodeURI(window.location.pathname));
								});
						});
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



