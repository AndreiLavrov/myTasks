import { EventEmitter } from '../src/evente-emitter';

export class LoginModel extends EventEmitter{
		constructor() {

				super();
				this.userObg = {};
				this.userStatus = false;
		}


		// addUserObgToServer(this.userObg) {
		// 		//отправляем запрос на сервер с объектом в теле(пароль зашифрованный)
		//
		// 		//получили подтверждение....
		//
		// this.userStatus = true;
		// }


}


