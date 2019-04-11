
// task 1
const getWeather = document.getElementById('getWeather');
getWeather.addEventListener('click', loadData);

async function loadData () {
	const options = {
		proxy: 'https://cors-anywhere.herokuapp.com/',
		url: 'https://api.darksky.net/forecast/353f0be960fc98cb5eef4891d953ea8b/53.37356, 24.17112',
		opts: '?lang=ru&units=si&exclude=currently, hourly, flags, minutely',
	};

	/**
	 * old way of solving
	 */
	/* const xhr = new XMLHttpRequest();
	xhr.open('GET', `${options.proxy}${options.url}${options.opts}`);
	xhr.responseType = 'text';

	xhr.onload = function() {

		rendData(JSON.parse(xhr.response) );
	}

		xhr.onerror = function() {
			alert(xhr.response);
		}

		xhr.send();*/

	/**
	 * new way of solving by `fetch`
	 */
	// разница в ошибках между ошибкой на сервере и ошибкой несостоявшейся связи с сервером. первая сробатывает сразу,
	// а вторая ЖДЕТ ошибки 'net::ERR_CONNECTION_TIMED_OUT' и выводит "Failed to fetch" это из-за специфики fetch ??
	// из-за promise??  как заставить возвращать сразу ошибку при не прав. url ??
	fetch(`${options.proxy}${options.url}${options.opts}`)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		} )
		.then(function (data) {
			rendData(data);
		} )
		.catch( (err) => {
			alert(err.message);
		} );

	/**
	 * Another way
	 * @type {Response}
	 */
	/* const response = await fetch(`${options.proxy}${options.url}${options.opts}`);
	const data = await response.json();
	rendData(data);*/
}

function rendData (data) {
	const container = document.getElementById('weatherResults');
	container.innerHTML = '';

	const objWetherTomorrow = data.daily.data[1];
	console.log(objWetherTomorrow);
	showObjWetherTomor(objWetherTomorrow, container);
}

function showObjWetherTomor (objWetherTomorrow, container) {
	var options = {
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric',
	};

	for (const key in objWetherTomorrow) {
		if (objWetherTomorrow[key] > 1000000000) {
			objWetherTomorrow[key] = new Date(objWetherTomorrow[key] * 1000).toLocaleString('ru', options);
		}
		container.innerHTML += ` ${key} : ${objWetherTomorrow[key]} <br/>`;
	}
}



// task2        ***************************    task2      *******************************

const instance = new MethodsAJAX();
const url = 'http://localhost:3006/posts';
const send = document.getElementById('send');
send.addEventListener('click', sendOnePost);
const funOnreject = err => alert(`${err} ${err.code}`);

/**
 * send post to server
 */
function sendOnePost () {
	instance.sendData(url)
		.then( (resp, url) =>	getPosts(url), funOnreject);
}

/**
 * get posts by 'XHR'
 * @param url
 * return data from server and show it on the page
 */
function getPosts () {
	instance.getDataXhr(url)
		.then(data => renderPosts(data), funOnreject); // какая разница ипользовать catch или reject ??
}
/**
 * get posts by 'fetch'
 * @param data
 */
// function getPosts() {
//
// 	instance.getDataFetch(`http://localhost:3006/posts`)
// 		.then((data)=> renderPosts(data))
// 		.catch( err => alert(err));
// };


function deleteData (id) {
	instance.deleteData(url, id)
		.then( () => getPosts(url), funOnreject);
}

function changePost (id) {
	instance.changePost(url, id)
		.then( () => getPosts(url), funOnreject);
}


function renderPosts (data) {
	const divFromPosts = document.getElementById('divFromPosts');
	divFromPosts.innerHTML = '';

	data.forEach(function (post) {
		const div = document.createElement('div');

		const tmp = `<h3><a onclick="getPost(${post.id})">${post.title}</a></h3>
<p>${post.text}</p>
<span>${post.author}</span><br />
<a onclick="changePost(${post.id})">Change Post</a><br />
<a onclick="deleteData(${post.id})">Delete Post</a>`;

		div.innerHTML = tmp;
		divFromPosts.appendChild(div);
	} );
}




