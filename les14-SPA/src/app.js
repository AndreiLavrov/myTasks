 import { Router } from './router';
 import { SearchService } from "./search_service";

 class App {
 constructor (){
	 this.allNews = [];
	 this.router = new Router();
	 this.searchService = new SearchService();
	 this.searchService.subscribe(this.onFilterChange);
	 this.initSingleNewsPage();
	 this.initNewsPage();
	 this.init();
 }

 init(){
	 fetch('http://localhost:3006/news', { headers: {
		 'Content-Type' : 'application/json'
		 }})
		 .then((res)=> res.json())
		 .then((data)=> {
			 this.allNews = data;
			 this.generateAllNewsHTML(this.allNews);                                          // i am stop watching here
			 this.initRoutes();
			 window.dispatchEvent(new HashChangeEvent('hashchange'));  // start application, init chang hash
		 })
 }

	initRoutes() {      // add  rout in list
		this.router.addRoute('', this.renderHomePage.bind(this));
		this.router.addRoute('#filter', this.renderFilterResults.bind(this));
		this.router.addRoute('#singleNews', this.renderSingleNews.bind(this));
		this.router.addRoute('#news', this.renderNews.bind(this));
		this.router.addRoute('404', this.renderErrorPage.bind(this));
	}




	onFilterChange(data) {
		location.hash = data;
	}

	renderHomePage() {
		this.renderNewsPage(this.allNews);
	}

// фильтруем
	 renderNewsPage(data) {
	 const page = document.querySelector('.all-news');
	 const pageList = document.querySelector('.news-list');
	 const allNews = document.querySelectorAll('.all-news .news-list > div');    // div..

	 [...allNews].forEach((news) => {
		 news.classList.add('hidden');
	 });

	 [...allNews].forEach((news) => {
			 data.forEach((item) => {
				 if (Number(news.dataset.index) === Number(item.id)) {
					 pageList.insertBefore(news, pageList.firstChild);
					 news.classList.remove('hidden');
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

		const results = this.searchService.renderFilters(this.allNews, filter);        // major filtration
		this.renderNewsPage(results);
	}

	 initSingleNewsPage() {
		 const self = this;
		 this.singleNewsPage = document.querySelector('.single-news');
		 this.singleNewsPage.addEventListener('click', (event) => {
			 if (self.singleNewsPage.classList.contains('visible')) {
				 const clicked = event.target;

				 if (clicked.classList.contains('close') || clicked.classList.contains('overlay')) {
					 location.hash = self.searchService.getCurrentState();
				 }
			 }
		 });
	 }

	 renderSingleNews() {
		 const page = document.querySelector('.single-news');
		 const container = document.querySelector('.preview-large');
		 const index = location.hash.split('#singleNews/')[1].trim();
		 if (this.allNews.length) {
			 this.allNews.forEach((item) => {
				 if (Number(item.id) === Number(index)) {
					 container.querySelector('img').setAttribute('src', item.image.small);
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
					 location.hash = self.searchService.getCurrentState();
				 }
			 }
		 });
	 }

	 renderNews() {
		 const page = document.querySelector('.news');
		 const container = document.querySelector('.news-container');
		 const index = location.hash.split('#news/')[1].trim();
		 if (this.allNews.length) {
			 this.allNews.forEach((item) => {
				 if (Number(item.id) === Number(index)) {
					 container.querySelector('img').setAttribute('src', item.image.large);
					 container.querySelector('p').innerText = item.content;
				 }
			 });
		 }

		 page.classList.add('visible');
	 }

 // add html(ul) in page
	 generateAllNewsHTML(data) {
		 const list = document.querySelector('.all-news .news-list');
		 const theTemplateScript = document.getElementById('news-template').innerHTML;

		 //compile
		 const theTemplate = Handlebars.compile(theTemplateScript);
		 list.innerHTML = theTemplate(data);

		 list.querySelectorAll('li').forEach((li) => {       // do non remember i need to delete div in html!
			 li.addEventListener('click', (event) => {
				 event.preventDefault();
				 window.location.hash = `singleNews/${li.dataset.index}`;
			 })
	 	});

	 //  news
		 list.querySelectorAll('button').forEach((but) => {
			 but.addEventListener('click', (event) => {
				 event.preventDefault();
				 window.location.hash = `news/${but.dataset.index}`;
		 })
	 });
 }

	renderErrorPage() {
		const page = document.querySelector('.error');
		page.classList.add('visible');
	}

}

const app = new App();

