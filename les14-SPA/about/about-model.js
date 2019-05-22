import { EventEmitter } from '../src/evente-emitter';
import { MethodsAJAX } from '../src/methodsAJAX';

export class AboutModel extends EventEmitter{
		constructor() {

				super();

				this.methodsAJAX = new MethodsAJAX();
				this.aboutData = [];
		}



		getAboutData() {
				if (!this.aboutData.length > 0) {
						 this.getAboutDataAJAX()
								.then((about) => {

										this.aboutData = about;
										this.emit('getAboutData', about);

										// aboutText1.innerHTML = this.aboutData[0].text1
										// page.classList.remove('hider');
								});

				} else {

						this.emit('getAboutData', this.aboutData);
				}
		}


		getAboutDataAJAX() {
				return this.methodsAJAX.getDataFetch('http://localhost:3006/about')
		}
}
