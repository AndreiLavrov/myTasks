export class Router {
	constructor (){
		this.routes = {  // список роутов адреса в прилажении
			'404': ()=> {
				console.log('Not found');
			}
		};

		this.mainContentPages = document.querySelectorAll('.main-content .page');  // save all pages

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

	render(url){    // запуск перерисовку нужного роута для нужн страницы
		let temp = url.split('/')[0];
		[...this.mainContentPages].forEach((page)=> {
			page.classList.remove('visible')
		});

		this.routes[temp] ? this.routes[temp]() : this.routes['404']();
	}
}
