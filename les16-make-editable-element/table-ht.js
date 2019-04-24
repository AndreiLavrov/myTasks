import { Editer } from './editer.js';

class EditableTable {
		constructor() {

				this.init();
		}

		init() {

				let tdArr = document.querySelectorAll(`td`);
				tdArr.forEach((td)=> {
						td.classList.add(`editable`);
				})

				return new Editer(`.editable`);
		}

}

const item = new EditableTable();
