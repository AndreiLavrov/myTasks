import { EventEmitter } from './evente-emitter20.js';

export class View extends EventEmitter {
		constructor(model, elementsPage) {
				super();
				this.model = model;
				this.elementsPage = elementsPage;

				model.on('itemAdded', () => this.rebuildList());
				model.on('itemRemoved', () => this.rebuildList());

				elementsPage.list.addEventListener('click', e => {                                     // should to controller ??
						let idElem = e.target.getAttribute('id');
						this.emit('listModified', idElem);
				});

				elementsPage.addButton.addEventListener('click', e => this.emit('addButtonClicked'));
				elementsPage.delButton.addEventListener('click', e => this.emit('delButtonClicked'));
				elementsPage.changeButton.addEventListener('click', e => this.emit('changeButtonClicked'));
		}

		show() {
				this.rebuildList();
		}

		rebuildList() {
				const list = this.elementsPage.list;
				list.innerHTML = '';

				this.model.getItems().forEach((obg) => {

						let p = document.createElement('p'); // is a node
						p.innerHTML = obg.notes;
						list.appendChild(p);     							//    list.appendChild(`${z}`);  ???  why doesn't it work ??
						p.setAttribute ("id", `${obg.id}`);
						if (obg.type === 'active') {           // вынести в отдельную функцию
								//p.classList.add('red');                                           // why does not work it
								p.style.color = 'red';
						} else if (obg.type === 'archival'){
								//p.classList.add('green');
								p.style.color = 'green';
						}

				});

				// this.model.clearSelectedIndex();
		}
}
