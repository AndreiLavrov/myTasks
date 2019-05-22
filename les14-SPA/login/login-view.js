import { EventEmitter } from '../src/evente-emitter';

export class LoginView extends EventEmitter {
		constructor () {

				super();
		}

		showLoginPage () {

				let loginPage = document.querySelector('.login-wrap');

				if (loginPage.innerHTML === '') {

						this.drawLoginPage();
				}

				document.querySelector('#spinerMain')
						.classList
						.add('hider');
				loginPage.classList.remove('hider');
		}

		drawLoginPage () {

				let loginPage = document.querySelector('.login-wrap');
				loginPage.innerHTML = `	
			<div class="login-html">
				<input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
				<input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
				<div class="login-form">
					<form class="sign-in-htm" id="sign-in-htm">
						<div class="group">
							<label for="userNameLog" class="label">Username</label>
							<input id="userNameLog" type="text" class="input userNameLog" name="userNameLog">
						</div>
						<div class="group">
							<label for="emailLog" class="label">Email Address</label>
							<input id="emailLog" type="text" class="input emailLog" name="emailLog">
						</div>
						<div class="group">
							<label for="passLog" class="label">Password</label>
							<input id="passLog" type="password" class="input passLog" data-type="password" name="passLog">
						</div>
						<div class="group">
							<input id="check" type="checkbox" class="check" checked>
							<label for="check"><span class="icon"></span> Keep me Signed in</label>
						</div>
						<div class="group">
							<input type="submit" class="button butLog" value="Sign In">
						</div>
						<div class="hr"></div>
						<div class="foot-lnk">
							<a href="#forgot">Forgot Password?</a>
						</div>
					</form>
					
					<form class="sign-up-htm" id="sign-up-htm">
						<div class="group">
							<label for="userName" class="label">Username</label>
							<input id="userName" type="text" class="input userName" name="userName">
						</div>
						<div class="group">
							<label for="email" class="label">Email Address</label>
							<input id="email" type="text" class="input email" name="email">
						</div>
						<div class="showHelpMes errValidForm"></div>
						<div class="group">
							<label for="pass" class="label">Password</label>
							<input id="pass" type="password" class="input pass" data-type="password" name="pass">
						</div>
						<div class="group">
							<label for="pass2" class="label">Repeat Password</label>
							<input id="pass2" type="password" class="input pass2" data-type="password" name="pass2">
						</div>
						<div class="group">
							<input type="submit" class="button butSignUp" value="Sign Up ">
						</div>
						<div class="hr"></div>
						<div class="foot-lnk">
							<label for="tab-1">Already Member?</a>
						</div>
					</form>
				</div>
			</div>`;

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

		getUserFormSignIn () {

				const userName = document.querySelector('.sign-in-htm .userNameLog').value;
				const pass = document.querySelector('.sign-in-htm .passLog').value;
				const email = document.querySelector('.sign-in-htm .emailLog').value;

				let userObg = {
						userName,
						pass,
						email,
				};

				this.emit('getUserFormSignIn', userObg);
		}

		showUserStatusLogin (userStatusObj) {

				alert(`Ok. You logged under the email address ${userStatusObj.email}`);
		}

		showUserStatus (userStatusObj) {

				let showHelpMes = document.querySelector('.showHelpMes');

				if (userStatusObj.email === false) {
						showHelpMes.innerHTML = 'Sorry... This email is taken!!!';

				} else {

						alert(`Ok. You registered under the email ${userStatusObj.email}`);
				}
		};

		checkIsTakenEmail () {

				const userObg = this.createUserObg();

				let showHelpMes = document.querySelector('.showHelpMes');
				showHelpMes.innerHTML = '';

				this.emit('checkIsTakenEmail', userObg);
		}

		createUserObg () {

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



		getUserFormSignUp () {

				// jQuery.contains(document.querySelector('.sign-up-htm'), document.querySelector('.error'));
				const elemError = document.querySelector('.sign-up-htm .input.errValidForm');

				if (!elemError) {
						const userObg = this.createUserObg();

						this.emit('getUserFormSignUp', userObg);
				}
		}

}
