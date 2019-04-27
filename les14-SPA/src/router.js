export class Router {
	constructor (){
		this.routes = {
			'404': ()=> {
				console.log('Not found');
			}
		};

		// save all pages
		this.mainContentPages = document.querySelectorAll('.main-content .page');

		/**
		 * react on event changed hash url
		 */
		window.addEventListener('hashchange', ()=> {
			// запуск отрисовку нужного роута для нужн страницы
			this.render(decodeURI(window.location.hash));              // decode URI
		})
	}


	/**
	 * add routes in constructor
	 * @param route address
	 * @param action  (набор действий при переходе на данный) route
	 */
	addRoute(route, action){
		this.routes[route] = action;
	}

	render(url){
		let temp = url.split('/')[0];
		[...this.mainContentPages].forEach((page)=> {
				//page.classList.remove('visible');
				if(!page.classList.contains('hider')){
						console.log(`page.classList.contains`);
						page.classList.add('hider');
				}
		});

		this.routes[temp] ? this.routes[temp]() : this.routes['404']();
	}
}
