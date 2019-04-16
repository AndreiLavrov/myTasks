import { MethodsAJAX_ES6 as Methods} from './methodsAJAX_ES6.js';
import { ServPosts } from './task2.js';

let servPosts = new ServPosts(Methods);
class Task1 {
	constructor () {               														// параметром или нет MethodsAJAX_ES6??
		this.options = {
			proxy: 'https://cors-anywhere.herokuapp.com/',
			url: 'https://api.darksky.net/forecast/353f0be960fc98cb5eef4891d953ea8b/53.37356, 24.17112',
			opts: '?lang=ru&units=si&exclude=currently, hourly, flags, minutely',
		};

		this.instance = new Methods();                   // параметром или нет MethodsAJAX_ES6??
		this.init();

	}

	init () {

		const self = this;
		this.getWeather = document.getElementById('getWeather');

		this.getWeather.addEventListener('click', self.loadData.bind(self) );   // this не терять(использовать bind)

	}

	funOnreject (err) {
		alert(`${err} ${err.code}`);
	}

	loadData () {    //  параметр === MouseEvent {isTrusted: true, screenX: 327, screenY: 115, clientX: 327, clientY: 12, …}

		this.instance.getDataFetch(`${this.options.proxy}${this.options.url}${this.options.opts}`)
			.then(data => this.rendData(data), this.funOnreject)
			.catch((err) => {
				alert(err.message);
			});
	}

	/**
	 * old way of solving
	 */
	loadDataXhr () {
		const self = this;

		const xhr = new XMLHttpRequest();
		xhr.open('GET', `${this.options.proxy}${this.options.url}${this.options.opts}`);
		xhr.responseType = 'text';

		xhr.onload = function () {

			self.rendData(JSON.parse(xhr.response));
		}

		xhr.onerror = function () {
			alert(xhr.response);
		}

		xhr.send();

	}

	/**
	 * new way of solving by `fetch`
	 */
	loadDataFetch () {
		const self = this;
		                          // из-за promise??  как заставить возвращать сразу ошибку при не прав. url ??
		fetch(`${this.options.proxy}${this.options.url}${this.options.opts}`)
			.then(function (response) {
				if (response.ok) {
					return response.json();
				}
			})
			.then(function (data) {
				self.rendData(data);
			})
			.catch((err) => {
				alert(err.message);
			});
	}

	/**
	 * Another way
	 * @type {Response}
	 */
	async loadDataAsync () {                                   // останавливается ли выполнение? механизм работы ?

		this.response = await fetch(`${this.options.proxy}${this.options.url}${this.options.opts}`);
		this.data = await this.response.json();
		rendData(data);
	}



	rendData (data) {
		this.container = document.getElementById('weatherResults');
		this.container.innerHTML = '';

		this.objWetherTomorrow = data.daily.data[1];
		console.log(this.objWetherTomorrow);
		this.showObjWetherTomor(this.objWetherTomorrow, this.container);
	}

	showObjWetherTomor (objWetherTomorrow, container) {
		var options = {
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			hour: 'numeric',
			minute: 'numeric',
		};

		for (const key in objWetherTomorrow) {
			if (objWetherTomorrow[key] > 1000000000) {                      // альтернатива проверки на дату в милисекундах ?
				objWetherTomorrow[key] = new Date(objWetherTomorrow[key] * 1000).toLocaleString('ru', options);
			}
			container.innerHTML += ` ${key} : ${objWetherTomorrow[key]} <br/>`;
		}
	}
}

const task1 = new Task1();
