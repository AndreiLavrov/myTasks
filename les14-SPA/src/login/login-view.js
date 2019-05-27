import { EventEmitter } from '../evente-emitter';

export class LoginView extends EventEmitter {
		constructor () {
				super();
				this.handlersAdded = false;
				this.listenLoginOut();
		}

		/**
		 * If the page was loaded earlier we just make it visible.
		 */
		showLoginPage () {
				const loginPage = document.querySelector('.login-wrap');
				if (!this.handlersAdded) {
						this.addHandlers();
				}

				document.querySelector('#spinnerMain')
						.classList
						.add('hider');
				loginPage.classList.remove('hider');

				this.handlersAdded = true;
		}

		/**
		 * Check whether the e-mail address on the server is free. Making form validation
		 */
		addHandlers () {
				const userEmail = document.querySelector('.sign-up-htm .email');
				userEmail.addEventListener('blur', () => this.checkIsTakenEmail());

				const submBut = document.querySelector('.butSignUp');
				submBut.addEventListener('click', (e) => {
						e.preventDefault();                     // чтобы не менялся url........................./////////!!!
						this.getUserFormSignUp();
				});

				const butLog = document.querySelector('.sign-in-htm .butLog');
				butLog.addEventListener('click', (e) => {
						e.preventDefault();                     // чтобы не менялся url........................./////////!!!
						this.getUserFormSignIn(e);
				});

				$('#sign-in-htm')
						.validate({
								rules: {
										userNameLog: { required: true },
										emailLog: {
												required: true,
												email: true
										},
										passLog: { required: true, minlength: 6, maxlength: 20 }
								},
								messages: {
										userNameLog: 'Please specify your name',
										emailLog: {
												required: 'Please specify your name email',
												email: 'Your email address must be in the format of name@domain.com'
										}

								},
								errorClass: 'errValidForm'

						});

				$('#sign-up-htm')
						.validate({
								rules: {
										userName: { required: true },
										email: {
												required: true,
												email: true
										},
										pass: { required: true, minlength: 6, maxlength: 20 },
										pass2: {
												required: true,
												minlength: 6,
												maxlength: 20,
												equalTo: '#pass'
										}
								},
								messages: {
										userName: 'Please specify your name',
										email: {
												required: 'We need your email address to contact you',
												email: 'Your email address must be in the format of name@domain.com'
										}
								},
								errorClass: 'errValidForm'
						});

		}


		/**
		 * We make a request to the server and check is not busy that email.
		 * We clean the error field
		 */
		checkIsTakenEmail () {
				const userObg = this.createUserObgRegistr();

				let showHelpMes = document.querySelector('.showHelpMes');
				showHelpMes.innerHTML = '';

				this.emit('checkIsTakenEmail', userObg);
		}


		/**
		 * We register the user on the server,
		 * if the form does not have an error class tag
		 */
		getUserFormSignUp () {
				// jQuery.contains(document.querySelector('.sign-up-htm'), document.querySelector('.error'));
				const quantityAllInp = document.querySelectorAll('.sign-up-htm .input').length;
				const quantityAllValidInp = document.querySelectorAll('.sign-up-htm .input.valid').length;


				if (quantityAllInp === quantityAllValidInp) {
						const userObg = this.createUserObgRegistr();

						this.emit('getUserFormSignUp', userObg);
				}
		}


		/**
		 * Get user data from registration-form and sent them as an object.
		 */
		createUserObgRegistr () {
				const userName = document.querySelector('.sign-up-htm .userName').value;
				const pass = document.querySelector('.sign-up-htm .pass').value;
				const pass2 = document.querySelector('.sign-up-htm .pass2').value;
				const email = document.querySelector('.sign-up-htm .email').value;

				let userObg = {
						userName,
						pass,
						pass2,
						email,
				};

				return userObg;
		}

		/**
		 *
		 * @param userStatusObj -- obj-user with name or 'false'
		 */
		emailIsTaken (userStatusObj) {
				let showHelpMes = document.querySelector('.showHelpMes');

				showHelpMes.innerHTML = 'Sorry... This email is taken!!!';
		};





		/**
		 * Get user data from login-form and sent them as an object.
		 */
		getUserFormSignIn () {
				const userName = document.querySelector('.sign-in-htm .userNameLog').value;
				const pass = document.querySelector('.sign-in-htm .passLog').value;
				const email = document.querySelector('.sign-in-htm .emailLog').value;
				// jQuery.contains(document.querySelector('.sign-up-htm'), document.querySelector('.error'));
				const quantityAllInp = document.querySelectorAll('.sign-in-htm .input').length;
				const quantityAllValidInp = document.querySelectorAll('.sign-in-htm .input.valid').length;


				let userObg = {
						userName,
						pass,
						email,
				};

				if (quantityAllInp === quantityAllValidInp) {
						// alert('!elemErrorSignIn && elemValidSignIn');

						this.emit('getUserFormSignIn', userObg);
				}

		}

		/**
		 * draw in navbar userLogName
		 * @param userLogName - (string) registered user name
		 */
		showUserAccountEmail(email) {
				if (email) {
						let name = document.querySelector('.authorDisplay')
						name.innerHTML = email;
				}
		}

		listenLoginOut () {
				let loginOut = document.querySelector('.loginOut');
				loginOut.addEventListener('click', (e) => {
						this.emit('loginOut');
						let name = document.querySelector('.authorDisplay');
						name.innerHTML = '';
						});
		};

}
