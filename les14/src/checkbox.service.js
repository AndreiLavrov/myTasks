import { Observable } from "./observable";

export class CheckboxService {
	constructor () {
		this._checkbox = document.querySelectorAll('.all-products input[type=checkbox]');
		this._observable = new Observable();

		this.filters = {};
		this.setInitialState();  // set initial state filters
         //*******************************************
      this.search = document.querySelector('.search');
     // this.filters = '';
      this.init();
	}

	init() {
      let self = this;
      // ***
      this.search.addEventListener('input', this.onCheckboxClick.bind(self));
      /*this._checkbox.forEach((item) => {
				item.addEventListener('click', this.onCheckboxClick.bind(self));
			});

			// button clear form
			document.querySelector('.filters button').addEventListener('click', (event) => {
							event.preventDefault();
							this.filters = {};
							this._observable.next('#');
					});*/
	}

	subscribe(fn) {   // subscribe on checkboks method
         this._observable.subscribe(fn);
    }

	onCheckboxClick(event) {      // checked checkbox
        /*const target = event.target;
        const specName = target.getAttribute('name');  // name specification

        if (target.checked) {
            if(!(this.filters[specName] && this.filters[specName].length)) {
                this.filters[specName] = [];
            }
            this.filters[specName].push(target.value);
        } else {
            if (this.filters[specName] && this.filters[specName].length &&
                (this.filters[specName].indexOf(target.value) !== -1)) {
                let index = this.filters[specName].indexOf(target.value);
                this.filters[specName].splice(index, 1);

                if( !this.filters[specName].length) {
                    delete this.filters[specName];
                }
            }
        }*/
      // if(event.target.value.trim() === '') {                         // проверить на чило и т.д.
      //     this.filters = '';
      // }
      //console.log(this._observable);
      this.filters = event.target.value;

      this._observable.next(this.createQueryHash(this.filters));
      //console.log(this._observable);
    }
    setInitialState() {   // добавляем в фильтры текущий фильтр из адресной строки
        if (location.hash.includes('#filters/')) {
            let filter = location.hash.split('#filter/')[1].trim();
            try {
                this.filters = JSON.parse(decodeURI(filter));
            } catch(err) {
                this.filters = {};
            }
        }
    }

    createQueryHash(filters) {
        if (Object.keys(filters).length > 0) {
            return `#filter/${JSON.stringify(filters)}`;
        }

        return '#';
    }

    getCurrentState() {
        return this.createQueryHash(this.filters);
    }

    renderFilters(products, filter) {
			this.search.value = `${filter}`;


        let result = [];
        products.forEach((product) => {
            if(product.name.includes(String(filter)) ) {
                result.push(product);
            }
        });

	    /*const criteria = ['manufacturer', 'storage', 'os', 'camera'];
        products = [...products];
        let result = [];
        let isFiltered = false;  // show used or no used criteria
        this.clearCheckbox();

        criteria.forEach((c) => {

            if (filter[c] && filter[c].length) {
                if (isFiltered) {                   // about no filter only one criteria
                    products = result;
                    result = [];
                }

                filter[c].forEach((filter) => {
                    products.forEach((product) => {
                        if (typeof product.specs[c] === 'number') {
                            if(product.specs[c] === Number(filter)) {
                                result.push(product);
                                isFiltered = true;
                            }
                        }

                        if (typeof product.specs[c] === 'string') {
                            if(product.specs[c].toLowerCase().indexOf(filter) !== -1) {
                                result.push(product);
                                isFiltered = true;
                            }
                        }


                    });
                    if (c && filter) {
                        [...document.querySelectorAll(`input[name=${c}]`)].filter((checkbox) => {
                           return checkbox.value === filter;
                        })[0].checked = true;
                    }
                })
            }
        });*/

            return result;
        }



}
