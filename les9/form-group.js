function FormGroup(id) {
    this._id = id;
    this.form = getForm();
    this.formControls = [];
    let myHelper = helper;            // почему не передает параметром конструктора helper ??????

     // this.addClass = myHelper.manipulatWithClass(this.form.classList, helper.addClassMyFun); // ok?
     // this.removeClass = myHelper.manipulatWithClass(this.form.classList, helper.removeClassMyFun); // ok?
	this.addClass = myHelper.addClass;
	this.removeClass =  myHelper.removeClass;

    this.isValid = getStatus.bind(this)();

    _init.bind(this)();

    function _init() {
        const self = this;

        this.form.addEventListener('submit', function(event){
            event.preventDefault();

            self.isValid = getStatus.bind(self)();
            if (self.isValid) {
                self.removeClass(['error']);
                console.log('Data was sent');
                return true;
            }

            console.log('Form is not valid');
            self.addClass(['error']);
            self.formControls.forEach(function(control){
                control.startCheck();
            });

            return false;
        });
    }

    function getForm() {
        let forms = document.getElementsByTagName('form');
        forms = [].slice.call(forms, 0);

        return forms.filter(function(item){
            return item.id === id;
        })[0];
    }

    this.registerControls = function(control) {
        this.formControls.push(control);
        this.isValid = getStatus.bind(this)();
    };

    function getStatus() {
        try {
            if(this.formControls.length === 0) {
                throw new Error('No detected form control elements');
            }

            let status = true;
            console.log(this.formControls);
            this.formControls.forEach(function(item){
                if (!item.isValid) {
                    status = false;
                    return false;
                }
            });

            return status;

        } catch(e) {
            console.log(e.message);
            return true;
        }
    }


}

// FormGroup.prototype = Object.create(Helper.prototype);
// FormGroup.prototype.constructor = FormGroup;

// FormGroup.prototype._getForm =  function () {
//     let forms = document.getElementsByTagName('form');
//     forms = [].slice.call(forms, 0);
//
//     return forms.filter(function(item){
//         return item.id === id;
//     })[0];
// }


