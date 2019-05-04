import { Observable } from "./observable";

export class SearchService {
		constructor () {
				this._observable = new Observable();

				this.filters = '';

				this.setInitialState();
				this.search = document.querySelector('.search');
				this.init();
		}

		init() {

      	this.search.addEventListener('input', this.onSearchClick.bind(this));
		}

		subscribe(fn) {
         this._observable.subscribe(fn);
    }

		onSearchClick(event) {
				console.log(event.target.value);

				this.filters = event.target.value;
				console.log(this.filters);
				this._observable.next(this.createQueryHash(this.filters));
    }

		createQueryHash(filters) {
				if (filters.length > 0) {
						return `filter/${JSON.stringify(filters)}`;
				}

				return '';
		}

    setInitialState() {
        if (window.location.pathname.includes('filters/')) {
            let filter = window.location.pathname.split('filter/')[1].trim();
            try {
                this.filters = JSON.parse(decodeURI(filter));
            } catch(err) {
                this.filters = {};
            }
        }
    }

    getCurrentState() {
        return this.createQueryHash(this.filters);
    }

    renderFilters(news, filter) {
				this.search.value = `${filter}`;

        let result = [];
				news.forEach((item) => {
            if(item.description.includes(String(filter))
							|| item.description.toLowerCase().includes(String(filter)) ) {
                result.push(item);
            }
        });

            return result;
		}

}
