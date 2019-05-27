
import { EventEmitter } from '../evente-emitter';

export class AboutView extends EventEmitter{
		constructor() {
				super();
		}


		showAboutPage(aboutData) {
				const page = document.querySelector('.about-container');
				const aboutText1 = document.querySelector('.aboutText1');
				aboutText1.innerHTML = aboutData[0].text1;

				if (aboutText1.innerHTML === '') {
						aboutText1.innerHTML = aboutData[0].text1;
				}
				document.querySelector('#spinnerMain').classList.add('hider');
				page.classList.remove('hider');
		}

}
