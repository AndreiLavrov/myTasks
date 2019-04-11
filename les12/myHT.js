//
// import { MethodsAJAX } from './methodsAJAX.js';
// import { EventHandling } from './event_handling.js';
//
// const url = `http://localhost:3006/posts`;
//
// const instance = new MethodsAJAX();
// const eventHandling = new EventHandling(instance, url);
//
// let getPos = document.getElementById('getPos');
// getPos.onclick = eventHandling.getPosts; // почему если указать обработчик соб. в html, то getPosts is not defined? (скрипт менял местами)
//
// let send = document.getElementById('send');
// send.addEventListener('click', eventHandling.sendOnePost);

import { MethodsAJAX } from './methodsAJAX.js';


const instance = new MethodsAJAX();
const url = `http://localhost:3006/posts`;

let getPos = document.getElementById('getPos');
getPos.onclick = getPosts; // почему если указать обработчик соб. в html, то getPosts is not defined? (скрипт менял местами)

let send = document.getElementById('send');
send.addEventListener('click', sendOnePost);


/**
 * get posts by 'fetch'
 *
 */
function getPosts() {

	instance.getDataFetch(url)
		.then((data)=> renderPosts(data))
		.catch( err => alert(err));
}


/**
 * send post to server
 */
function sendOnePost(){

	instance.sendData(url)
		.then((data)=>{
			console.log(` data was send ${data}`);
			getPosts(url);
		})
		.catch( err => alert(err));
}

/**
 * deletу post to server
 */
function deleteData(id) {
	instance.deleteData(url, id)
		.then((data)=> {
			console.log(` data was deleted ${data}`);
			getPosts(url);
		})
		.catch( err => alert(err));
}

/**
 * change post to server
 */
function changePost(id) {
	instance.changePost(url, id)
		.then((data)=> {
			console.log(data);
			getPosts(url);
		})
		.catch( err => alert(err));
}

/**
 * add data on page
 * @param data -- object from server
 */
function renderPosts(data) {
	let divFromPosts = document.getElementById('divFromPosts');
	divFromPosts.innerHTML = '';

	data.forEach(function(post){
		const div = document.createElement('div');

		const tmp = `<h3><a >${post.title}</a></h3>
<p>${post.text}</p>
<span>${post.author}</span><br />
<a onclick="changePost(${post.id})">Change Post</a><br />
<a onclick="deleteData(${post.id})">Delete Post</a>
`;
		div.innerHTML = tmp;
		divFromPosts.appendChild(div);
	});
}


/*
// task2
const instance = new MethodsAJAX();

let send = document.getElementById('send');
send.addEventListener('click', sendOnePost);

const url = `http://localhost:3006/posts`;
/!**
 * get posts by 'fetch'
 * @param data
 *!/
function getPosts() {

	instance.getDataFetch(url)
		.then((data)=> renderPosts(data))
		.catch( err => alert(err));
};


/!**
 * send post to server
 *!/
function sendOnePost(){

	instance.sendData(url)
		.then((data)=>{
			console.log(` data was send ${data}`);
			getPosts(url);
		})
		.catch( err => alert(err));
}

/!**
 * deletу post to server
 *!/
function deleteData(id) {
	instance.deleteData(url, id)
		.then((data)=> {
			console.log(` data was deleted ${data}`);
			getPosts(url);
		})
		.catch( err => alert(err));
}

/!**
 * change post to server
 *!/
function changePost(id) {
	instance.changePost(url, id)
		.then((data)=> {
			console.log(data);
			getPosts(url);
		})
		.catch( err => alert(err));
}

/!**
 * add data on page
 * @param data -- object from server
 *!/
function renderPosts(data) {
	let divFromPosts = document.getElementById('divFromPosts');
	divFromPosts.innerHTML = '';

	data.forEach(function(post){
		const div = document.createElement('div');

		const tmp = `<h3><a onclick="getPost(${post.id})">${post.title}</a></h3>
<p>${post.text}</p>
<span>${post.author}</span><br />
<a onclick="changePost(${post.id})">Change Post</a><br />
<a onclick="deleteData(${post.id})">Delete Post</a>
`;
		div.innerHTML = tmp;
		divFromPosts.appendChild(div);
	});
}
*/







