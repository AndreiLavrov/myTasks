
 import { EventEmitter } from '../src/evente-emitter';

 export class LoginView extends EventEmitter{
		constructor() {

				super();
		}


		 showLoginPage() {
				 let loginPage = document.querySelector('.login-wrap');
				 loginPage.classList.remove('hider');
		 }


		 drawLoginPage() {
				 let loginPage = document.querySelector('.login-wrap');
				 loginPage.innerHTML = `	<div class="login-html">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
		<div class="login-form">
			<div class="sign-in-htm">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input">
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password">
				</div>
				<div class="group">
					<input id="check" type="checkbox" class="check" checked>
					<label for="check"><span class="icon"></span> Keep me Signed in</label>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign In">
				</div>
				<div class="hr"></div>
				<div class="foot-lnk">
					<a href="#forgot">Forgot Password?</a>
				</div>
			</div>
			<div class="sign-up-htm">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input userName">
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input pass" data-type="password">
				</div>
				<div class="group">
					<label for="pass" class="label">Repeat Password</label>
					<input id="pass" type="password" class="input pass2" data-type="password">
				</div>
				<div class="group">
					<label for="pass" class="label">Email Address</label>
					<input id="pass" type="text" class="input .email">
				</div>
				<div class="group">
					<input type="submit" class="button butSignUp" value="Sign Up">
				</div>
				<div class="hr"></div>
				<div class="foot-lnk">
					<label for="tab-1">Already Member?</a>
				</div>
			</div>
		</div>
	</div>`;



				 loginPage.classList.remove('hider');


				 //  не занято ли уже имя
				 const userName = document.querySelector('.sign-up-htm .userName');
				 userName.addEventListener('blur', changeUserName )


				 const submBut = document.querySelector('.butSignUp');
				 submBut.addEventListener('click',(event) => {

				 })
		 }


		 getUserFormData() {

				 const userName = document.querySelector('.sign-up-htm .userName');
				 const pass = document.querySelector('.sign-up-htm .pass');
				 const pass2 = document.querySelector('.sign-up-htm .pass2');
				 const email = document.querySelector('.sign-up-htm .email');

				 let userObg = {
						 userName,
						 pass,
						 pass2,
						 email
				 }

				 console.log(userObg);
		 }


 }
