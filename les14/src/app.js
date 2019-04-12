 import { Router } from './router';
 import { CheckboxService } from "./checkbox.service";
 import { Search } from './search';

 class App {
 constructor (){
	 this.products = [];  // news
	 this.router = new Router();
	 this.checkboxService = new CheckboxService();
	 this.checkboxService.subscribe(this.onFilterChange); // subscribe on change checkboxService
	 this.initSingleProductPage();   // click to exit
	 this.initNewsPage();               // click to exit
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
			 this.initRoutes();     // инициализир. роуты   // !
			 window.dispatchEvent(new HashChangeEvent('hashchange'));  // start application, init chang hash
			 // this.getFilterString();
		 })
 }

	initRoutes() {      // add  rout in list
		this.router.addRoute('', this.renderHomePage.bind(this));
		this.router.addRoute('#filter', this.renderFilterResults.bind(this));
		this.router.addRoute('#product', this.renderSingleProduct.bind(this));
		this.router.addRoute('#news', this.renderNews.bind(this));
		this.router.addRoute('404', this.renderErrorPage.bind(this));
	}




	onFilterChange(data) {
		location.hash = data;
	}

	renderHomePage() {
		this.renderProductsPage(this.products);
	}

// фильтруем
 renderProductsPage(data) {
	 const page = document.querySelector('.all-products');
	 const pageList = document.querySelector('.products-list');             //+
	 const allProducts = document.querySelectorAll('.all-products .products-list > div');    // div..

	 [...allProducts].forEach((product) => {
		 product.classList.add('hidden');
	 });

	 [...allProducts].forEach((product) => {
		 let every = data.every((item) => {
		 		return (Number(product.dataset.index) !== Number(item.id));
		 } );

		 if (every === true) {
			 pageList.appendChild(product);
		 } else{
			 product.classList.remove('hidden');
		 }
	 });

	  page.classList.add('visible');           // заменить на ф-ию построения ноаого html с отфильтрован. элнм.
 }

	renderFilterResults() {
		let filter = location.hash.split('#filter/')[1].trim();
		try {
			filter = JSON.parse(decodeURI(filter))
		} catch (e) {
			window.location.hash = '#';
			return false;
		}

		const results = this.checkboxService.renderFilters(this.products, filter);        // основн фильтрация
		this.renderProductsPage(results);
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

	 renderSingleProduct() {
		 const page = document.querySelector('.single-product');
		 const container = document.querySelector('.preview-large');
		 const index = location.hash.split('#product/')[1].trim();
		 if (this.products.length) {
			 this.products.forEach((item) => {
				 if (Number(item.id) === Number(index)) {
					 // container.querySelector('h3').innerText = item.description;                   // description
					 container.querySelector('img').setAttribute('src', item.image.small); //small
					 container.querySelector('p').innerText = item.description;
				 }
			 });
		 }

		 page.classList.add('visible');
	 }

	 initNewsPage() {
		 const self = this;
		 this.NewsPage = document.querySelector('.news');
		 this.NewsPage.addEventListener('click', (event) => {
			 if (self.NewsPage.classList.contains('visible')) {
				 const clicked = event.target;

				 if (clicked.classList.contains('close') || clicked.classList.contains('overlay')) {
					 location.hash = self.checkboxService.getCurrentState();
				 }
			 }
		 });
	 }

	 renderNews() {
		 const page = document.querySelector('.news');
		 const container = document.querySelector('.news-container');
		 const index = location.hash.split('#news/')[1].trim();
		 if (this.products.length) {
			 this.products.forEach((item) => {
				 if (Number(item.id) === Number(index)) {
					 // container.querySelector('h3').innerText = item.description;                   // description
					 container.querySelector('img').setAttribute('src', item.image.large); //small
					 container.querySelector('p').innerText = item.content;
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

	 //  news
	 list.querySelectorAll('button').forEach((but) => {
		 but.addEventListener('click', (event) => {
			 event.preventDefault();
			 window.location.hash = `news/${but.dataset.index}`;        // address page com. line (use 'dataset'!)
		 })
	 });
 }

	renderErrorPage() {
		const page = document.querySelector('.error');
		page.classList.add('visible');
	}

}

const app = new App();

