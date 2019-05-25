import { EventEmitter } from '../evente-emitter';

export class NewsView extends EventEmitter {
		constructor () {
				super();
				this.search = document.querySelector('.search');
				this.search.addEventListener('input', this.onSearchClick.bind(this));
		}

		generateAllNewsHTML (data) {
				const list = document.querySelector('.all-news .news-list');
				const theTemplateScript = document.getElementById('news-template').innerHTML;

				const theTemplate = Handlebars.compile(theTemplateScript);
				list.innerHTML = theTemplate(data);

				list.querySelectorAll('.liClass')
						.forEach((li) => {

								li.addEventListener('click', (event) => {
										event.preventDefault();
										window.location.hash = `oneNews/${li.dataset.index}`;
								});
						});
		}

		showNewsPage () {
				this.clearSearchInp();

				let allNews = document.querySelectorAll('.all-news .news-list > li');
				[...allNews].forEach((news) => {
						news.classList.remove('hidden');
				});

				const page = document.querySelector('.all-news');
				document.querySelector('#spinnerMain')
						.classList
						.add('hider');
				page.classList.remove('hider');
		}

		clearSearchInp () {
				document.querySelector('.search').value = '';
		}

		onSearchClick (event) {
				this.filters = event.target.value;
				location.hash = this.createQueryHash(this.filters);
		}

		createQueryHash (filters) {
				if (filters.length > 0) {
						return `filter/${JSON.stringify(filters)}`;
				}

				return '';
		}

		getCurrentFilterState () {
				if (location.hash.includes('#filter/')) {
						let filter = location.hash.split('#filter/')[1].trim();
						filter = JSON.parse(decodeURI(filter));

						document.querySelector('.search').value = filter;
						return filter;
				}
		}

		/**
		 * leave visible and first only selected items.
		 * I Use break to avoid sorting out unnecessary options.
		 * @param arrFilterNews -- array of matching items
		 */
		showFilterNews (arrFilterNews) {
				const page = document.querySelector('.all-news');
				const pageList = document.querySelector('.news-list');
				let allNews = document.querySelectorAll('.all-news .news-list > li');

				[...allNews].forEach((news) => {
						news.classList.add('hidden');
				});

				[...arrFilterNews].forEach((filterNews) => {

						for (let i = 0; i < allNews.length; i++) {
								if (Number(allNews[i].dataset.index) === Number(filterNews.id)) {
										allNews[i].classList.remove('hidden');
										pageList.insertBefore(allNews[i], pageList.firstChild);
										break;
								}
						}
				});

				document.querySelector('#spinnerMain')
						.classList
						.add('hider');
				page.classList.remove('hider');
		}

		getCurrentOneNewsState () {

				if (location.hash.includes('#oneNews/')) {
						// let filter = window.location.pathname.split('filter/')[1].trim();
						let news = location.hash.split('#oneNews/')[1].trim();
						news = JSON.parse(decodeURI(news));

						return news;
				}

		}

		/**
		 * I Use break to avoid sorting out unnecessary options.
		 * @param allNews - all News
		 * @param idSelectedOneNews - ID number of the selected news
		 */
		showOneNewsPage (allNews, idSelectedOneNews) {
				const page = document.querySelector('.oneNews');

				for (let i = 0; i < allNews.length; i++) {
						if (Number(allNews[i].id) === Number(idSelectedOneNews)) {

								page.querySelector('img')
										.setAttribute('src', '/' + allNews[i].image.large);
								page.querySelector('p').innerText = allNews[i].content;

								page.querySelector('img').onload = () => {
										document.querySelector('#spinnerMain')
												.classList
												.add('hider');
										page.classList.remove('hider');
								};

								break;
						}
				}
		}

}
