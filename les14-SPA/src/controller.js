export class Controller {

		constructor (){
				this.navigation = document.querySelector('.navigation');

				this.home = document.querySelector('.home');
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

						if (event.target === this.about) {

								window.location.hash = `about`;

						} else if(event.target === this.home) {
								window.location.hash = `#`;
						}
				});
		};
}
