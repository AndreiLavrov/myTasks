import { EventEmitter } from '../src/evente-emitter';

export class NewsView extends EventEmitter{
		constructor() {

				super();

				this.search = document.querySelector('.search');
				this.search.addEventListener('input', this.onSearchClick.bind(this));

				// window.onload = ()=> document.querySelector('#spinerMain').classList.add('hider');
		}



		generateAllNewsHTML (data) {

				const list = document.querySelector('.all-news .news-list');
				const theTemplateScript = document.getElementById('news-template').innerHTML;


				const theTemplate = Handlebars.compile(theTemplateScript);
				list.innerHTML = theTemplate(data);

				list.querySelectorAll('.liClass').forEach((li) => {

						li.addEventListener('click', (event) => {

								event.preventDefault();

								window.location.hash = `oneNews/${li.dataset.index}`;
								// this.router.render(decodeURI(window.location.pathname));
						});
				});
		}



		showNewsPage() {

				this.clearSearchInp ();

				let allNews = document.querySelectorAll('.all-news .news-list > li');
				[...allNews].forEach((news) => {
						news.classList.remove('hidden');
				});

				const page = document.querySelector('.all-news');
				document.querySelector('#spinerMain').classList.add('hider');
				page.classList.remove('hider');
		}


		clearSearchInp () {

				document.querySelector('.search').value = '';
		}




		onSearchClick(event) {
				this.filters = event.target.value;
				location.hash = this.createQueryHash(this.filters);
		}


		createQueryHash(filters) {
				if (filters.length > 0) {
						return `filter/${JSON.stringify(filters)}`;
				}

				return '';
		}



		getCurrentFilterState() {

				if (location.hash.includes('#filter/')) {
						// let filter = window.location.pathname.split('filter/')[1].trim();
						let filter = location.hash.split('#filter/')[1].trim();
						filter = JSON.parse(decodeURI(filter));

						document.querySelector('.search').value = filter;

						return filter;
				}

		}



		/**
		 * sorting items on page
		 * @param arrFilterNews -- array of matching items
		 */
		showFilterNews(arrFilterNews) {

				const page = document.querySelector('.all-news');
				const pageList = document.querySelector('.news-list');
				let allNews = document.querySelectorAll('.all-news .news-list > li');

				[...allNews].forEach((news) => {
						news.classList.add('hidden');
				});


				// [...allNews].forEach((news) => {
				all: for (let n = 0; n < allNews.length; n++) {

								for (let i = 0; i < arrFilterNews.length; i++) {

										if (Number(allNews[n].dataset.index) === Number(arrFilterNews[i].id)) {
												allNews[n].classList.remove('hidden');
												break all;
										}
								}

								pageList.appendChild(allNews[n]);
				}

				document.querySelector('#spinerMain').classList.add('hider');
				page.classList.remove('hider');

		}






		getCurrentOneNewsState() {

				if (location.hash.includes('#oneNews/')) {
						// let filter = window.location.pathname.split('filter/')[1].trim();
						let news = location.hash.split('#oneNews/')[1].trim();
						news = JSON.parse(decodeURI(news));

						return news;
				}

		}


// сделать вызов из контроллера и рисовать html из js !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		showOneNewsPage (allNews, idSelectedOneNews) {

				const page = document.querySelector('.oneNews');

				if (allNews && allNews.length) {
						for (let i = 0; i < allNews.length; i++) {
								if (Number(allNews[i].id) === Number(idSelectedOneNews)) {

										page.querySelector('img')
												.setAttribute('src', '/' + allNews[i].image.large);
										page.querySelector('p').innerText = allNews[i].content;

										page.querySelector('img').onload = ()=> page.classList.remove('hider');

										break;
								}
						}
				}

		}


}
