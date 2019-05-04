import { RouterHistory } from './router-history';

export class Controller {

		constructor (router){
				this.router = router;

				this.navigation = document.querySelector('.navigation');

				this.home = document.querySelector('.home');
				this.products = document.querySelector('.products');
				this.usedThin = document.querySelector('.usedThin');
				this.blog = document.querySelector('.blog');
				this.contacts = document.querySelector('.contacts');
				this.about = document.querySelector('.about');
				this.service = document.querySelector('.service');
				this.location = document.querySelector('.location');
				this.weather = document.querySelector('.weather');
				this.play = document.querySelector('.play');

		}


		initHeaderButtons() {

				this.navigation.addEventListener('click', (event) => {

						event.preventDefault();

						if (event.target === this.home) {
								window.location.pathname = '';
						} else if(event.target === this.about) {
								window.history.pushState(null, null, '/about');
								this.router.render(decodeURI(window.location.pathname) + '/');        // +  }/

						} else if(event.target === this.products) {
								window.history.pushState(null, null, '/products');
								this.router.render(decodeURI(window.location.pathname) + '/');        // +  }/
				}

				});
		};
}
