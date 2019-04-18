import { Observable } from "./observable";

export class SearchService {
	constructor () {
		this._observable = new Observable();

		this.filters = {};
		// this.filters = '';

		this.setInitialState();
		this.search = document.querySelector('.search');
    this.init();
	}

	init() {
      let self = this;
      this.search.addEventListener('input', this.onSearchClick.bind(self));
	}

	subscribe(fn) {
         this._observable.subscribe(fn);
    }

	onSearchClick(event) {
      this.filters = event.target.value;
      this._observable.next(this.createQueryHash(this.filters));
    }

	createQueryHash(filters) {
		if (Object.keys(filters).length > 0) {
			return `#filter/${JSON.stringify(filters)}`;
		}

		return '#';
	}

    setInitialState() {
        if (location.hash.includes('#filters/')) {
            let filter = location.hash.split('#filter/')[1].trim();
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

    renderFilters(products, filter) {
				this.search.value = `${filter}`;


        let result = [];
        products.forEach((product) => {
            if(product.description.toLowerCase().includes(String(filter))
							|| product.description.includes(String(filter)) ) {
                result.push(product);
            }
        });

            return result;
		}

}
