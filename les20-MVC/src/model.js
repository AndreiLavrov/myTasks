import { EventEmitter } from './evente-emitter.js';

export class Model extends EventEmitter{
		constructor(items) {
				super();
				this._items = items || [];

				this._noteSelectedElement = 0;
				this._countIdNote = 3;
		}

		getItems() {
				return this._items;
		}

		addItem(str) {
				this._countIdNote += 1;

				let obgItem = {
						id: this._countIdNote,
						notes: `${str}`,
						type: 'archival',
						state: false,
				};

				this._items.push(obgItem);
				this.emit('itemAdded', obgItem);
		}

		removeItemAt(num) {
				const self = this;

				this._items.forEach((itemObg, index) => {

						if (itemObg.id === Number(num)) {
								self._items.splice(index, 1);
						}
				});

				this.emit('itemRemoved');

		}

		get noteSelectedElement() {
				return this._noteSelectedElement;
		}

		set noteSelectedElement(num) {
				const previousIndex = this._noteSelectedElement;
				this._noteSelectedElement = num;
				this.emit('selectedIndexChanged', previousIndex);
		}

		changeSelectedElement(id) {
				this._noteSelectedElement = id;
		};

		changeTypeObj(num) {
				this._items.forEach((itemObg) => {

						if (itemObg.id === Number(num)) {
								(itemObg.type === 'archival')? itemObg.type = 'active' : itemObg.type = 'archival';
						}
				});

				this.emit('itemRemoved');
		}


}
