
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

		rendData(xhr.response);
	}

		xhr.onerror = function() {
			alert(xhr.response);
		}

		xhr.send();
		*/

	/**
	 * new way of solving by `fetch`
	 */
	fetch(`${options.proxy}${options.url}${options.opts}`)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Bad HTTP stuff..'); // почему не выдает эту ошибку, а ждет ошибки по таймеру(из-за ожидания очередного "then") ??
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
		.then(data => renderPosts(data), funOnreject);
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
<a onclick="deleteData(${post.id})">Delete Post</a>
`;
		div.innerHTML = tmp;
		divFromPosts.appendChild(div);
	} );
}




