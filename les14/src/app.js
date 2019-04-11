 import { Router } from './router';
 import { CheckboxService } from "./checkbox.service";


class App {
 constructor (){
	 this.products = [];  // news
	 this.router = new Router();
	 this.checkboxService = new CheckboxService();
	 this.checkboxService.subscribe(this.onFilterChange); // subscribe on change checkboxService
	 this.initSingleProductPage();   // click to exit
	 this.init();
 }

 init(){   // запустит прил. получ данные
	 fetch('http://localhost:3006/products', { headers: {
		 'Content-Type' : 'application/json'
		 }})
		 .then((res)=> res.json())
		 .then((data)=> {
			 this.products = data;
			 this.generateAllProductsHTML(this.products);
			 this.initRoutes();     // инициализир. роуты опридел какой  // !
			 window.dispatchEvent(new HashChangeEvent('hashchange'));  // start application, init chang hash
		 })
 }

	initRoutes() {
		this.router.addRoute('', this.renderHomePage.bind(this));
		this.router.addRoute('#filter', this.renderFilterResults.bind(this));
		this.router.addRoute('#product', this.renderSingleProduct.bind(this));
		this.router.addRoute('404', this.renderErrorPage.bind(this));
	}

	onFilterChange(data) {
		location.hash = data;
	}

	renderHomePage() {
		this.renderProductsPage(this.products);
	}

	initSingleProductPage() {
		const self = this;
		this.singleProductPage = document.querySelector('.single-product');
		this.singleProductPage.addEventListener('click', (event) => {
			if (self.singleProductPage.classList.contains('visible')) {
				const clicked = event.target;

				if (clicked.classList.contains('close') || clicked.classList.contains('overlay')) {
					location.hash = self.checkboxService.getCurrentState();
				}
			}
		});
	}

// фильтруем
 renderProductsPage(data) {
	 const page = document.querySelector('.all-products');
	 const allProducts = document.querySelectorAll('.all-products .products-list > li');

	 [...allProducts].forEach((product) => {
		 product.classList.add('hidden');
	 });

	 [...allProducts].forEach((product) => {
		 data.forEach((item) => {
			 if (Number(product.dataset.index) === Number(item.id)) {
				 product.classList.remove('hidden');
			 }
		 });
	 });
	 page.classList.add('visible');
 }

	renderFilterResults() {
		let filter = location.hash.split('#filter/')[1].trim();
		try {
			filter = JSON.parse(decodeURI(filter))
		} catch (e) {
			window.location.hash = '#';
			return false;
		}

		const results = this.checkboxService.renderFilters(this.products, filter);
		this.renderProductsPage(results);
	}

	renderSingleProduct() {
		const page = document.querySelector('.single-product');
		const container = document.querySelector('.preview-large');
		const index = location.hash.split('#product/')[1].trim();
		if (this.products.length) {
			this.products.forEach((item) => {
				if (Number(item.id) === Number(index)) {
					container.querySelector('h3').innerText = item.name;                   // description
					container.querySelector('img').setAttribute('src', item.image.small); //small
					container.querySelector('p').innerText = item.description;
				}
			});
		}

		page.classList.add('visible');
	}

 // add html(ul) in page
 generateAllProductsHTML(data) {
	 const list = document.querySelector('.all-products .products-list');
	 const theTemplateScript = document.getElementById('products-template').innerHTML;

	 //compile
	 const theTemplate = Handlebars.compile(theTemplateScript);
	 list.innerHTML = theTemplate(data);
	 list.querySelectorAll('li').forEach((li) => {
		 li.addEventListener('click', (event) => {
			 event.preventDefault();
			 window.location.hash = `product/${li.dataset.index}`;        // address page com. line (use 'dataset'!)
		 })
	 });
 }

	renderErrorPage() {
		const page = document.querySelector('.error');
		page.classList.add('visible');
	}

}

const app = new App();

