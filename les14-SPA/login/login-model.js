import { EventEmitter } from '../src/evente-emitter';
import { MethodsAJAX } from '../src/methodsAJAX';

export class LoginModel extends EventEmitter{
		constructor() {

				super();

				this.methodsAJAX = new MethodsAJAX();
				this.userLogStatus = false;
				// localStorage.setItem('userLogStatus', JSON.stringify(this.userLogStatus) );

		}


		checkIsTakenEmail(userObg) {
				// вместо проверки на бэке
				return this.methodsAJAX.getDataFetch('http://localhost:3006/login')
						.then((allUserObg) => {

								for (let i = 0; i < allUserObg.length; i++) {

										if (allUserObg[i].email === userObg.email) {

												userObg.email = false;
												this.emit('getStatRegistr', userObg);
												break;
										}
								}
						})
		}


		signUp(userObg) {

				this.checkIsTakenEmail(userObg)
						.then(() => {

								if (userObg.email !== false) {
										this.signUpUser(userObg);
								}
						})
						.catch(err => alert(err));                 //
		}


		signUpUser(userObg) {

				if (userObg.pass === '' || userObg.pass2 === '' || userObg.userName === '') {
						return;
				}

				this.methodsAJAX.sendData('http://localhost:3006/login', userObg)
						.then(() => {

								this.emit('getStatRegistr', userObg);

						})
						.catch(err => alert(err));                                   // not alert !!!!

		}




		signIn(userObj) {

				this.methodsAJAX.getDataFetch('http://localhost:3006/login')
						.then((allUserObg) => {

								for (let i = 0; i < allUserObg.length; i++) {

										if (allUserObg[i].userName === userObj.userName
												&& allUserObg[i].pass === userObj.pass
												&& allUserObg[i].email === userObj.email) {

												this.showUserLogStatus(userObj);
												break;
										}
								}

						})
						.catch(err => alert(err));
		}


		showUserLogStatus(userObj) {

				this.userLogStatus = true;
				localStorage.setItem('userLogStatus', JSON.stringify(this.userLogStatus) );

				this.emit('showUserStatusLogin', userObj);
		}



}


