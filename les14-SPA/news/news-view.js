import { EventEmitter } from '../src/evente-emitter';
import { SearchService } from '../src/search_service';

export class NewsView extends EventEmitter{
		constructor() {

				super();
				this.searchService = new SearchService();
		}


		generateAllNewsHTML (data) {

				const list = document.querySelector('.all-news .news-list');
				const theTemplateScript = document.getElementById('news-template').innerHTML;


				const theTemplate = Handlebars.compile(theTemplateScript);
				list.innerHTML = theTemplate(data);

				list.querySelectorAll('.liClass').forEach((li) => {

						li.addEventListener('click', (event) => {

								event.preventDefault();

								window.location.hash = `news/${li.dataset.index}`;

								// this.router.render(decodeURI(window.location.pathname));
						});
				});
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

				/*if (!allNews.length > 0) {

						this.generateAllNewsHTML(this.allNews);
						allNews = document.querySelectorAll('.all-news .news-list > li');
						console.log(allNews);
				}*/

				[...allNews].forEach((news) => {
						news.classList.add('hidden');
				});


				[...allNews].forEach((news) => {

						for (let i = 0; i < data.length; i++) {

								if (Number(news.dataset.index) === Number(data[i].id)) {
										news.classList.remove('hidden');
										return;
								}
						}

						pageList.appendChild(news);
				});

				page.classList.remove('hider');

		}

		renderFilterResults (allNews) {
				// let filter = window.location.pathname.split('filter/')[1].trim();      // window
				let filter = location.hash.split('#filter/')[1].trim();

				try {
						filter = JSON.parse(decodeURI(filter));
				} catch (e) {
						// window.location.href = '';
						window.location.hash = '#';
						return false;
				}

				const results = this.searchService.renderFilters(allNews, filter);        // major filtration
				this.renderNewsPage(results);
		}


		renderSingleNewsPage (allNews) {
				const page = document.querySelector('.news');
				const index = location.hash.split('#news/')[1].trim();
				// const index = window.location.pathname.split('news/')[1].trim();

				if (allNews && allNews.length) {
						allNews.forEach((item) => {
								if (Number(item.id) === Number(index)) {

										page.querySelector('img')
												.setAttribute('src', '/' + item.image.large);
										page.querySelector('p').innerText = item.content;
								}
						});
				}

				page.classList.remove('hider');
		}
}
