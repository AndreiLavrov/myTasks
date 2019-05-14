import { EventEmitter } from './evente-emitter20.js';

export class ViewTable extends EventEmitter {
		constructor(model, elementsPage) {
				super();
				this.model = model;
				this.elementsPage = elementsPage;

				model.on('itemAdded', () => this.rebuildList());
				model.on('itemRemoved', () => this.rebuildList());

				elementsPage.list.addEventListener('click', e => {                                     // should to controller ??

						let idElem = e.target.getAttribute('id');

						this.emit('listModified', idElem)});                                // ??  .selectedIndex

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


				// let tbl = `<table><tbody><tr><td>${tdContentActive}</td><td>${tdContentArchival}</td></tr></tbody></table>`;



				let tbl = document.createElement('table');
				tbl.style.width = '70%';
				tbl.setAttribute('border', '1');
				let tbdy = document.createElement('tbody');
				let tr = document.createElement('tr');
				let tdContentActive = document.createElement('td');
				let tdContentArchival = document.createElement('td');

				tr.appendChild(tdContentActive);
				tr.appendChild(tdContentArchival);
				tbdy.appendChild(tr);
				tbl.appendChild(tbdy);

				list.innerHTML = tbl;

				this.model.getItems().forEach((obg) => {

						let p = document.createElement('p'); // is a node
						p.innerHTML = obg.notes;          //    list.appendChild(`${z}`);  ???  why doesn't it work ??

						p.setAttribute ("id", `${obg.id}`);
						if (obg.type === 'active') {                                  // вынести в отдельную функцию
								//p.classList.add('red');                                           // why does not work it
								p.style.color = 'red';
								tdContentActive.appendChild(p);
						} else if (obg.type === 'archival'){
								//p.classList.add('green');
								p.style.color = 'green';
								tdContentArchival.appendChild(p);
						}

				});
				list.appendChild(tbl);

		}
}
