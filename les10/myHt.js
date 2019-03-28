// task 1

const getWeather = document.getElementById('getWeather');
let timerId;

getWeather.addEventListener('click', loadData );

function loadData() {
	const xhr = new XMLHttpRequest();
	const url = `https://api.darksky.net/forecast/353f0be960fc98cb5eef4891d953ea8b/37.8267,-122.4233`;

	xhr.open('GET', `${url}?lang=ru`);

	xhr.send();

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			// console.log(JSON.parse(xhr.responseText));
			renderData(JSON.parse(xhr.responseText));
		}else {
			alert(xhr.statusText);
		}
	};
}

function renderData(data){
	const container = document.getElementById('weatherResults');
	container.innerHTML = '';

	container.innerHTML = data;
}



/*
// task2
const url = 'http://localhost:3006';

function MetodsAJAX () {}
const instance = new MetodsAJAX();
MetodsAJAX.prototype.sendData =  function () {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const text = document.getElementById('text').value;

	const data = {
		title,
		author,
		text,
	};

	const xhr = new XMLHttpRequest();
	xhr.open('POST', `${url}/posts`);

	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(data));

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 201) {
			console.log('Post was added');
		}
	}
}

MetodsAJAX.prototype.getData = function (url ) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `${url}/posts`);
	xhr.send();

	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4 && xhr.status === 200) {
			renderPosts(JSON.parse(xhr.responseText));
			return true;
		}
	};
	function renderPosts(data) {
		data.forEach(function(post){
			const div = document.createElement('div');

			const tmp = `<h3><a onclick="getPost(${post.id})">${post.title}</a></h3>
<p>${post.text}</p>
<span>${post.author}</span><br />
<a onclick="changePost(${post.id})">Change Post</a><br />
<a onclick="deletePost(${post.id})">Delete Post</a>
`;
			div.innerHTML = tmp;
			document.querySelector('body').appendChild(div);
		});
	}
}
*/


