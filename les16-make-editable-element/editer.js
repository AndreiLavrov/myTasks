export class Editer {
		constructor(selector) {
				this.selector = selector;
				this.arrEditElements =  document.querySelectorAll(this.selector);

				this.editingTd = null;
				this.init();
		}

		init() {
				this.arrEditElements.forEach((elem)=> {

						elem.addEventListener('click', (event) => {

								let targ = event.target;

								if ( targ.nodeName === elem.nodeName && !this.editingTd) {
										this.makeTdEditable(targ);
								}

								if (targ.className === 'edit-cancel') {
										this.endEdit(this.editingTd.elem, false);
										return false;
								}

								if (targ.className === 'edit-ok') {
										this.endEdit(this.editingTd.elem, true);
										return false;
								}
						});
				});
		}


	makeTdEditable(targ) {
				this.editingTd = {
						elem: targ,
						data: targ.innerHTML,
				};

				targ.classList.add('edit-td');
				const textarea = document.createElement('textarea');
				textarea.style.width = targ.clientWidth + 'px';
				textarea.style.height = targ.clientHeight + 'px';
				textarea.className = 'edit-area';

				textarea.value = targ.innerHTML;
				targ.innerHTML = '';
				targ.appendChild(textarea);
				textarea.focus();

			targ.insertAdjacentHTML('beforeEnd', `
        <div class="edit-controls">
            <button class="edit-ok">OK</button>
            <button class="edit-cancel">Cancel</button>
        </div>`);
		}


		endEdit(targ, flag) {

				flag ? (targ.innerHTML = targ.firstChild.value) : (targ.innerHTML = this.editingTd.data);
					targ.classList.remove('edit-td');
				this.editingTd = null;
		}
}

