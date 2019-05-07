import { SearchService } from './search_service.js';
import { Controller } from './controller.js';
import { RouterHistory } from './router-history.js';

class App {
		constructor () {
				this.allNews = [];
				this.aboutData = [];
				this.products = [];
				this.cart = {};

				this.router = new RouterHistory();  //
				this.searchService = new SearchService();   //
				this.searchService.subscribe(this.onFilterChange.bind(this));
				this.initSingleNewsPage();
				this.initNewsPage();

				this.controller = new Controller(this.router);
				this.controller.initHeaderButtons();

				this.init();
		}

		init () {
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
				console.log(`success`);
				const newsList = document.querySelector('.news-list');
				const page = document.querySelector('.about-container');
				const aboutText1 = document.querySelector('.aboutText1');

				if (!this.aboutData.length) {
						fetch('http://localhost:3006/about', {
								headers: {
										'Content-Type': 'application/json'
								}
						})
								.then((res) => res.json())
								.then((about) => {
										this.aboutData = about;
										aboutText1.innerHTML = this.aboutData[0].text1;

										page.classList.remove('hider');
								});
				} else {
						console.log(this.aboutData);
						aboutText1.innerHTML = this.aboutData[0].text1;
						page.classList.remove('hider');
				}

		}



		renderProductsPage () {
				const list = document.querySelector('.products-list');
				const page = document.querySelector('.all-products');

				if (this.codeListSavedProducts) {
						list.innerHTML = this.codeListSavedProducts;
						page.classList.remove('hider');
				} else {
						this.getProducts(page);
				}


		}

		getProducts(page) {

				fetch('http://localhost:3006/products', {
						headers: {
								'Content-Type': 'application/json'
						}
				})
						.then((res) => res.json())
						.then((products) => {

								this.products = products;
								// console.log(this.products);
								this.checkCart();                                                       // front
								this.showProducts(this.products);
								//this.showMiniCart();
								page.classList.remove('hider');
								console.log(page);
						});

		}

		showProducts (data) {
				const list = document.querySelector('.products-list');
				const theTemplateScript = document.getElementById('products-template').innerHTML;

				//compile
				const theTemplate = Handlebars.compile(theTemplateScript);
				this.codeListSavedProducts = theTemplate(data);
				list.innerHTML = this.codeListSavedProducts;

				//this.cart = {};

				let butsAdd = document.querySelectorAll('.add-to-cart');    // проюлеммы с обработчиком события
				console.log(butsAdd);
				butsAdd.forEach((but) => {
						but.addEventListener('click', () => this.addToCart(but));                        // this ?
				})
		}

		addToCart(but) {

				// console.log(this);
				// console.log(but);
				// console.log(	but.getAttribute('id'));

				//добавляем товар в корзину
				const article = but.getAttribute('id');
				console.log(article);

				if (this.cart[article] !== undefined) {
						this.cart[article]++;
				}
				else {
						this.cart[article] = 1;
				}
				localStorage.setItem('cart', JSON.stringify(this.cart) );
				console.log(this.cart);
				//showMiniCart();                                                              // ???
		}

		checkCart() {
				//проверяю наличие корзины в localStorage;
				if ( localStorage.getItem('cart') != null) {
						this.cart = JSON.parse (localStorage.getItem('cart'));
				}
		};

		showMiniCart() {
				//показываю содержимое корзины
				// const out = '';
				// for (var w in cart){
				// 		out += w + ' --- '+cart[w]+'<br>';
				// }
				// out+='<br><a href="cart.html">Корзина</a>';
				// $('#mini-cart').html(out);
		};


		renderCartPage() {
				this.checkCart();
				// console.log(`this.cart ${this.cart}`);
				// console.log(`this.products ${this.products}`);                                                  // равны [] !!!!!!
				this.showCart(this.products)
		}

		showCart(arrProduct ) { 																					// arrProducts = null
				let arrProducts = arrProduct || null;
				const cartPage = document.querySelector('.cart-page');
				cartPage.innerHTML = '';

				if (Object.keys(this.cart).length === 0) {                        // Object equality check (this.cart === {}) {
						let viewCart = document.createElement('div');
						viewCart.innerHTML = `Cart is empty!`;
						cartPage.appendChild(viewCart);

				} else if(Object.keys(arrProducts).length !== 0){
						this.drawCart(arrProducts, cartPage, this.cart);

				}else if(Object.keys(arrProducts).length === 0) {
						fetch('http://localhost:3006/products', {
								headers: {
										'Content-Type': 'application/json'
								}
						})
								.then((res) => res.json())
								.then((products) => {

										this.products = products;
										this.drawCart(this.products, cartPage, this.cart);
										// cartPage.classList.remove('hider');
								})

				}

				cartPage.classList.remove('hider');
		}

		drawCart(arrProducts, cartPage, cart) {

				for (let key in cart) {
						let product = {};
						arrProducts.forEach((item) => {

								if (String(item.id) === String(key)) { //
										Object.assign(product, item);
								}

						});
						let viewCart = document.createElement('div');
						viewCart.innerHTML = `<button class="delete" data-art="${key}" >x</button>
						<img src="${product.image.small}"><br>
						<span class="productName">${product.name}</span>
						<button class="minus" data-art="${key}">-</button>
						<span class="productCount">${cart[key]}</span>
						<button class="plus" data-art="${key}">+</button>
						<span class="sumProductPrice">${cart[key] * product.price}</span>
						<br>`;

						cartPage.appendChild(viewCart);
				}

				let arrButPlus = document.querySelectorAll('.plus');
				arrButPlus.forEach((item) => {

						item.addEventListener('click', (event) =>{

								this.plusProduct(item);
						});
				});

				let arrButMinus = document.querySelectorAll('.minus');
				arrButMinus.forEach((item) => {

						item.addEventListener('click', (event) =>{

								this.minusProduct(item);
						});
				});



				let arrButDel = document.querySelectorAll('.delete');
				arrButDel.forEach((item) => {

						item.addEventListener('click', (event) => {

								this.delProduct(item);
								});
				});

		}

		plusProduct(item) {
				let numProduct = item.getAttribute('data-art');
				this.cart[numProduct]++;
				this.saveCartToLS();
				this.renderCartPage();                                 // или лучше перерисовать только счетчик...
		}

		minusProduct(item) {
				let numProduct = item.getAttribute('data-art');
				if (this.cart[numProduct] > 1) {
						this.cart[numProduct]--;
				} else {
						delete this.cart[numProduct];
				}

				this.saveCartToLS();
				this.renderCartPage();
		}

		delProduct(item) {
				let numProduct = item.getAttribute('data-art');

				delete this.cart[numProduct];

				this.saveCartToLS();
				this.renderCartPage();
		}

		saveCartToLS() {
				localStorage.setItem('cart', JSON.stringify(this.cart));
		}



		renderLoginPage() {
				this.drawLoginPage();
				this.showLoginPage();
		}

		drawLoginPage() {
				let loginPage = document.querySelector('.login-wrap');
				loginPage.innerHTML = `	<div class="login-html">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
		<div class="login-form">
			<div class="sign-in-htm">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input">
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password">
				</div>
				<div class="group">
					<input id="check" type="checkbox" class="check" checked>
					<label for="check"><span class="icon"></span> Keep me Signed in</label>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign In">
				</div>
				<div class="hr"></div>
				<div class="foot-lnk">
					<a href="#forgot">Forgot Password?</a>
				</div>
			</div>
			<div class="sign-up-htm">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input">
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password">
				</div>
				<div class="group">
					<label for="pass" class="label">Repeat Password</label>
					<input id="pass" type="password" class="input" data-type="password">
				</div>
				<div class="group">
					<label for="pass" class="label">Email Address</label>
					<input id="pass" type="text" class="input">
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign Up">
				</div>
				<div class="hr"></div>
				<div class="foot-lnk">
					<label for="tab-1">Already Member?</a>
				</div>
			</div>
		</div>
	</div>`;
		}

		showLoginPage() {
				let loginPage = document.querySelector('.login-wrap');
				loginPage.classList.remove('hider');
		}

}

const model = new App();

