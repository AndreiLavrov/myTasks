
// task1
const instance = new MethodsAJAX();

let send = document.getElementById('send');
send.addEventListener('click', sendOnePost);

const url = `http://localhost:3006/posts`;
/**
 * get posts by 'fetch'
 * @param data
 */
function getPosts() {

	instance.getDataFetch(url)
		.then((data)=> renderPosts(data))
		.catch( err => alert(err));
};


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







