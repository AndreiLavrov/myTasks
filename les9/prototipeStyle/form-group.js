// function FormGroup(id) {
//     this._id = id;
//     this.form = this._getForm();
//     this.formControls = [];
//
//     this._helper = new Helper2();    // объявлять класс helper с ынутрен методами или прототипом??
//
//     this.isValid = this._getStatus.bind(this)();
//     this._init.bind(this)();
//
//     this.addClass =  this._helper.addClass;
//
//     this.removeClass =  this._helper.removeClass;
//
// }
//
// // FormGroup.prototype = Object.create(Helper.prototype);
// // FormGroup.prototype.constructor = FormGroup;
//
// FormGroup.prototype._getForm =  function () {
//     let forms = document.getElementsByTagName('form');
//     forms = [].slice.call(forms, 0);
//
//     return forms.filter(function(item){
//         return item.id === this._id;
//     })[0];
// };
//
// FormGroup.prototype.registerControls = function(control) {
//     this.formControls.push(control);
//     this.isValid = this._getStatus.bind(this)();
// };
//
//
//
// FormGroup.prototype._getStatus =  function () {
//     try {
//         if(this.formControls.length === 0) {
//             throw new Error('No detected form control elements');
//         }
//
//         let status = true;
//         console.log(this.formControls);
//         this.formControls.forEach(function(item){
//             if (!item.isValid) {
//                 status = false;
//                 return false;
//             }
//         });
//
//         return status;
//
//     } catch(e) {
//         console.log(e.message);
//         return true;
//     }
// }
//
// //        ???????????
//
//
// FormGroup.prototype._init = function () {
//     const self = this;
//
//     this.form.addEventListener('submit', function(event){
//         event.preventDefault();
//
//         self.isValid = self._getStatus.bind(self)();
//         if (self.isValid) {
//             self.removeClass( ['error'] );
//             console.log('Data was sent');
//             return true;
//         }
//
//         console.log('Form is not valid');
//         self.addClass( ['error'] );
//         self.formControls.forEach(function(control){
//             control.startCheck();
//         });
//
//         return false;
//     });
// }
//
//
// FormGroup.prototype._init = function () {
//     const self = this;
//
//     this.form.addEventListener('submit', function(event){
//         event.preventDefault();
//
//         self.isValid = self._getStatus.bind(self)();
//         if (self.isValid) {
//             self.removeClass( ['error'] );
//             console.log('Data was sent');
//             return true;
//         }
//
//         console.log('Form is not valid');
//         self.addClass( ['error'] );
//         self.formControls.forEach(function(control){
//             control.startCheck();
//         });
//
//         return false;
//     });
// }
//

function FormGroup(id) {
    this._id = id;
    this.form = this._getForm();
    this.formControls = [];
    let myHelper = helper;

    this.addClass = myHelper.addClass;
    this.removeClass =  myHelper.removeClass;

    this.isValid = this._getStatus.bind(this)();

    this._init.bind(this)();

//     function _init() {
//         const self = this;
//
//         this.form.addEventListener('submit', function(event){
//             event.preventDefault();
//
//             self.isValid = getStatus.bind(self)();
//             if (self.isValid) {
//                 self.removeClass(['error']);
//                 console.log('Data was sent');
//                 return true;
//             }
//
//             console.log('Form is not valid');
//             self.addClass(['error']);
//             self.formControls.forEach(function(control){
//                 control.startCheck();
//             });
//
//             return false;
//         });
//     }
//
//     function getForm() {
//         let forms = document.getElementsByTagName('form');
//         forms = [].slice.call(forms, 0);
//
//         return forms.filter(function(item){
//             return item.id === id;
//         })[0];
//     }
//
//     this.registerControls = function(control) {
//         this.formControls.push(control);
//         this.isValid = getStatus.bind(this)();
//     };
//
//     function getStatus() {
//         try {
//             if(this.formControls.length === 0) {
//                 throw new Error('No detected form control elements');
//             }
//
//             let status = true;
//             console.log(this.formControls);
//             this.formControls.forEach(function(item){
//                 if (!item.isValid) {
//                     status = false;
//                     return false;
//                 }
//             });
//
//             return status;
//
//         } catch(e) {
//             console.log(e.message);
//             return true;
//         }
//     }
//
//

}

    FormGroup.prototype._getForm =  function () {
    let forms = document.getElementsByTagName('form');
    forms = [].slice.call(forms, 0);

    return forms.filter(function(item){
        return item.id === this._id;
    })[0];
};

FormGroup.prototype.registerControls = function(control) {
    this.formControls.push(control);
    this.isValid = this._getStatus.bind(this)();
};



FormGroup.prototype._getStatus =  function () {
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

//        ???????????


FormGroup.prototype._init = function () {
    const self = this;

    this.form.addEventListener('submit', function(event){
        event.preventDefault();

        self.isValid = self._getStatus.bind(self)();
        if (self.isValid) {
            self.removeClass( ['error'] );
            console.log('Data was sent');
            return true;
        }

        console.log('Form is not valid');
        self.addClass( ['error'] );
        self.formControls.forEach(function(control){
            control.startCheck();
        });

        return false;
    });
}


FormGroup.prototype._init = function () {
    const self = this;

    this.form.addEventListener('submit', function(event){
        event.preventDefault();

        self.isValid = self._getStatus.bind(self)();
        if (self.isValid) {
            self.removeClass( ['error'] );
            console.log('Data was sent');
            return true;
        }

        console.log('Form is not valid');
        self.addClass( ['error'] );
        self.formControls.forEach(function(control){
            control.startCheck();
        });

        return false;
    });
}


