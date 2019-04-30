export class Controller {
		constructor(model, view) {
				this._model = model;
				this._view = view;

				view.on('listModified', str => this.updateSelected(str));
				view.on('addButtonClicked', () => this.addItem());
				view.on('delButtonClicked', () => this.delItem());
				view.on('changeButtonClicked', () => this.changeItem());

				view.show();

		}

		updateSelected(id) {
				this._model.changeSelectedElement(id);
		}

		addItem() {
				const str = window.prompt('Add item:', '');
				if ((str !== -1) || (str !== null)) {
						this._model.addItem(str);
				}
		}

		delItem() {
				const id = this._model.noteSelectedElement;

				if (id) {
						this._model.removeItemAt(id);
				 }
		}

		changeItem() {
				const id = this._model.noteSelectedElement;

				if (id) {
						this._model.changeTypeObj(id);
				}
		}

}
