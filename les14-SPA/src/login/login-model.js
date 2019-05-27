import { EventEmitter } from '../evente-emitter';
import { MethodsAJAX } from '../methodsAJAX';

export class LoginModel extends EventEmitter{
		constructor() {
				super();

				this.methodsAJAX = new MethodsAJAX();
				this.userLogEmail = false;
				// localStorage.setItem('userLogName', JSON.stringify(this.userLogName) );
				// this.checkIsUserRegistered();
		}


		/**
		 * check is user registered
		 */
		checkIsUserRegistered() {
				console.log(3);
				if ( localStorage.getItem('userLogEmail') != null) {
						console.log(4);

						this.userLogEmail = JSON.parse (localStorage.getItem('userLogEmail'));
						this.emit('userIsRegistered', this.userLogEmail);
						console.log(this.userLogEmail);

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
												this.emit('emailIsTaken', userObj);
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
				this.methodsAJAX.sendData('http://localhost:3006/login', userObj)
						.then(() => {

								// this.emit('addedNewUser', userObj);
								this.userIsAuthorized(userObj);

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

												this.userIsAuthorized(allUserObj[i]);
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
		userIsAuthorized(userObj) {
				this.userLogEmail = userObj.email;
				localStorage.setItem('userLogEmail', JSON.stringify(userObj.email) );
				this.checkIsUserRegistered();
				this.emit('goToCart');
				// window.location.hash = '#cart';
		}

		loginOut() {
				localStorage.removeItem('cart');
				localStorage.removeItem('userLogEmail');
		}


}


