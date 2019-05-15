import { EventEmitter } from '../src/evente-emitter.js';

export class NewsModel extends EventEmitter{
		constructor() {

				super();

		}

		getNews() {
				if (this.allNews && this.allNews.length > 0) {
						this.emit('getNews', this.allNews);


				} else {

						fetch('http://localhost:3006/news', {
								headers: {
										'Content-Type': 'application/json'
								}
						})
								.then((res) => res.json())
								.then((allNews) => {

										this.allNews = allNews;

										this.emit('getNews', allNews);

								})
				}

		}




}
