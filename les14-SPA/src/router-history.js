export class RouterHistory {
		constructor (){
				this.routes = {
						'404': ()=> {
								console.log('Not found');
						}
				};

				this.mainContentPages = document.querySelectorAll('.main-content .page');


				window.addEventListener('popstate', ()=> {

						this.render(decodeURI(window.location.pathname));
				})
		}


		addRoute(route, action){
				this.routes[route] = action;
		}

		render(url){
				console.log(url);
				let temp = url.slice(1, url.length - 1).split('/')[0];                           // -1


				[...this.mainContentPages].forEach((page)=> {
						//page.classList.remove('visible');
						if(!page.classList.contains('hider')){
								// console.log(`page.classList.contains`);       //
								page.classList.add('hider');
						}
				});
				this.routes[temp] ? this.routes[temp]() : this.routes['404']();
				// console.log('this');

		}


}
