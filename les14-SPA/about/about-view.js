
import { EventEmitter } from '../src/evente-emitter';

export class AboutView extends EventEmitter{
		constructor() {

				super();
				this.aboutData = [];
		}


		showAboutPage() {

				const newsList = document.querySelector('.news-list');
				const page = document.querySelector('.about-container');
				const aboutText1 = document.querySelector('.aboutText1');

				if (!this.aboutData.length > 0) {
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

						aboutText1.innerHTML = this.aboutData[0].text1;
						page.classList.remove('hider');
				}

		}
}
