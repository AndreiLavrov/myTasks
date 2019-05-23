import { EventEmitter } from '../evente-emitter';
import { MethodsAJAX } from '../methodsAJAX';

export class LoginModel extends EventEmitter{
		constructor() {
				super();

				this.methodsAJAX = new MethodsAJAX();
				this.userLogName = false;
				// localStorage.setItem('userLogName', JSON.stringify(this.userLogName) );
				this.checkUserLogName();
		}


		/**
		 * check is user registered
		 */
		checkUserLogName() {
				if ( localStorage.getItem('userLogName') != null) {
						this.userLogName = JSON.parse (localStorage.getItem('userLogName'));
				}
		}


		/**
		 * Get an array objects of the server. Checking if there is an object
		 * with such email. If true - there will be a validation error event
		 * @param userObj - this is user data from the form
		 * @returns {PromiseLike<T | never> | Promise<T | always> | *}                    // как правильно коментнуть ?
		 */
		checkIsTakenEmail(userObj) {
				return this.methodsAJAX.getDataFetch('http://localhost:3006/login')
						.then((allUserObj) => {

								for (let i = 0; i < allUserObj.length; i++) {

										if (allUserObj[i].email === userObj.email) {
												userObj.email = false;
												this.emit('getStatRegistr', userObj);
												break;
										}
								}
						})
						.catch(err => alert(err));
		}

		/**
		 * Get an array objects of the server.
		 * Checking if there is an object with such email.
		 * if true - add user to array of objects on server
		 * @param userObj -- this is user data from the form
		 */
		signUp(userObj) {
				this.checkIsTakenEmail(userObj)
						.then(() => {

								if (userObj.email !== false) {
										this.addNewUser(userObj);
								}
						})
						.catch(err => alert(err));                 //
		}

		/**
		 * Add user to array of objects on server and LocalStorage
		 * @param userObj -- this is user data from the form
		 */
		addNewUser(userObj) {
				if (userObj.pass === '' || userObj.pass2 === '' || userObj.userName === '') {
						return;
				}

				this.methodsAJAX.sendData('http://localhost:3006/login', userObj)
						.then(() => {

								this.userLogName = userObj.userName;
								this.emit('getStatRegistr', userObj);
								this.showUserLogName(userObj);

								alert('addNewUser');

						})
						.catch(err => alert(err));                                   // not alert !!!!
		}

		/**
		 * Get an array objects of the server. Checking if there is this object.
		 * @param userObj -- this is user data from the form
		 */
		signIn(userObj) {
				this.methodsAJAX.getDataFetch('http://localhost:3006/login')
						.then((allUserObj) => {

								for (let i = 0; i < allUserObj.length; i++) {

										if (allUserObj[i].userName === userObj.userName
												&& allUserObj[i].pass === userObj.pass
												&& allUserObj[i].email === userObj.email) {

												this.showUserLogName(userObj);
												break;
										}
								}

						})
						.catch(err => alert(err));
		}

		/**
		 * add the user to the Local Storage.
		 * @param userObj
		 */
		showUserLogName(userObj) {
				this.userLogName = userObj.userName;
				localStorage.setItem('userLogName', JSON.stringify(this.userLogName) );

				this.emit('showUserStatusLogin', userObj);
		}



}


