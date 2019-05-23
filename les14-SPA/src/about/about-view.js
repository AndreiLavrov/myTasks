
import { EventEmitter } from '../evente-emitter';

export class AboutView extends EventEmitter{
		constructor() {

				super();
				// this.aboutData = [];
		}


		showAboutPage(aboutData) {

				const page = document.querySelector('.about-container');
				const aboutText1 = document.querySelector('.aboutText1');

				console.log(aboutData);
				aboutText1.innerHTML = aboutData[0].text1;
				console.log(aboutText1);

				if (aboutText1.innerHTML === '') {

						aboutText1.innerHTML = aboutData[0].text1;

				}

				document.querySelector('#spinnerMain').classList.add('hider');
				page.classList.remove('hider');
		}


}
