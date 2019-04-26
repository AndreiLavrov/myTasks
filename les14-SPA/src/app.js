 import { Router } from './router';
 import { SearchService } from "./search_service";

 class App {
 constructor (){
 		this.about = [];
	 this.allNews = [];
	 this.router = new Router();
		 this.searchService = new SearchService();
		 this.searchService.subscribe(this.onFilterChange);
		 this.initSingleNewsPage();
	 this.initNewsPage();
	 this.initHeaderButtons();

	 this.init();
 }

 init(){
	 fetch('http://localhost:3006/news', { headers: {
		 'Content-Type' : 'application/json'
		 }})
		 .then((res)=> res.json())
		 .then((data)=> {
			 this.allNews = data;
			 this.initRoutes();
			 window.dispatchEvent(new HashChangeEvent('hashchange'));  // start application, init chang hash
		 })
 }

	initRoutes() {      // add  rout in list
			this.router.addRoute('', this.renderHomePage.bind(this));
			this.router.addRoute('#filter', this.renderFilterResults.bind(this));
			this.router.addRoute('#singleNews', this.renderSingleNewsPage.bind(this));
			this.router.addRoute('#news', this.renderNews.bind(this));
			this.router.addRoute('404', this.renderErrorPage.bind(this));
			this.router.addRoute('#about', this.renderAboutPage.bind(this));
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
	 			let allNews = document.querySelectorAll('.all-news .news-list > li');
			 console.log(allNews);

					  if(!allNews.length > 0){     // interesting behavior without 'if' -- delete aii incorrect news-elements ?! //
							 this.generateAllNewsHTML(data);
					  }

					 allNews = document.querySelectorAll('.all-news .news-list > li');
			 console.log(allNews);


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
			 pageList.classList.remove('hider');

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
			 if (!self.singleNewsPage.classList.contains('hider')) {                       // ?  hider
				 const clicked = event.target;

				 if (clicked.classList.contains('close') || clicked.classList.contains('overlay')) {
					 location.hash = self.searchService.getCurrentState();
				 }
			 }
		 });
	 }

	 renderSingleNewsPage() {
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

		 page.classList.remove('hider');
	 }

	 initNewsPage() {
		 const self = this;
		 this.NewsPage = document.querySelector('.news');
		 this.NewsPage.addEventListener('click', (event) => {
			 if (!self.NewsPage.classList.contains('hider')) {
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

		 page.classList.remove('hider');
	 }


	 generateAllNewsHTML(data) {

				 const list = document.querySelector('.all-news .news-list');
				 const theTemplateScript = document.getElementById('news-template').innerHTML;

				 //compile
				 const theTemplate = Handlebars.compile(theTemplateScript);
				 list.innerHTML = theTemplate(data);

				 list.querySelectorAll('.liClass').forEach((li) => {

						let button = li.querySelector('button');

						li.addEventListener('click', (event) => {

								 event.preventDefault();

								 if (event.target !== button) {

										window.location.hash = `singleNews/${li.dataset.index}`;

								 } else if (event.target === button) {

										 window.location.hash = `news/${button.dataset.index}`;
								 }
					 });
				});
 }

 renderErrorPage() {
 		const page = document.querySelector('.error');
 		page.classList.remove('hider');
 }

 initHeaderButtons() {
		 const navigation = document.querySelector('.navigation');
		 //const pagesNavigation = document.querySelectorAll('a');
		 const home = document.querySelector('.home');
		 const usedThin = document.querySelector('.usedThin');
		 const blog = document.querySelector('.blog');
		 const contacts = document.querySelector('.contacts');
		 const about = document.querySelector('.about');
		 const service = document.querySelector('.service');
		 const location = document.querySelector('.location');
		 const weather = document.querySelector('.weather');
		 const play = document.querySelector('.play');



		 navigation.addEventListener('click', (event) => {

						 event.preventDefault();

						 if (event.target === about) {

								 window.location.hash = `about`;

						 } else if(event.target === home) {
								 window.location.hash = `#`;
						 }
				 });
		 };


 renderAboutPage() {
 		const newsList = document.querySelector('.news-list');
		 const page = document.querySelector('.about-container');
		 const aboutText1 = document.querySelector('.aboutText1');

		 fetch('http://localhost:3006/about', { headers: {
						 'Content-Type' : 'application/json'
				 }})
				 .then((res)=> res.json())
				 .then((about)=> {
						 this.about = about;
						 this.text1 = this.about[0].text1;                           // is correct this way getting data by array ?
						 aboutText1.innerHTML = this.text1;
				 })
		 // newsList.innerHTML = '';
		 page.classList.remove('hider');
 }


}

const app = new App();

