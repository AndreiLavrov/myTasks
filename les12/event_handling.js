export class EventHandling {
	constructor (instance, url) {
		// this.instance = instance;
		// this.url = url;
		console.log(this);
	}

	/**
	 * get posts by 'fetch'
	 *
	 */


	getPosts () {

		console.log(this);
		instance.getDataFetch(url)
			.then((data) => renderPosts(data))
			.catch(err => alert(err));
	};

	/**
	 * send post to server
	 */


	sendOnePost () {

		this.instance.sendData(this.url)
			.then((data) => {
				console.log(` data was send ${data}`);
				getPosts(this.url);
			})
			.catch(err => alert(err));
	}

	/**
	 * deletу post to server
	 */


	deleteData (id) {
		this.instance.deleteData(this.url, id)
			.then((data) => {
				console.log(` data was deleted ${data}`);
				getPosts(this.url);
			})
			.catch(err => alert(err));
	}

	/**
	 * change post to server
	 */


	changePost (id) {
		this.instance.changePost(this.url, id)
			.then((data) => {
				console.log(data);
				getPosts(this.url);
			})
			.catch(err => alert(err));
	}

	/**
	 * add data on page
	 * @param data -- object from server
	 */


	renderPosts (data) {
		let divFromPosts = document.getElementById('divFromPosts');
		divFromPosts.innerHTML = '';

		data.forEach(function (post) {
			const div = document.createElement('div');

			const tmp = `<h3><a onclick="getPost(${post.id})">${post.title}</a></h3>
<p>${post.text}</p>
<span>${post.author}</span><br />
<a onclick="this.changePost(${post.id})">Change Post</a><br />
<a onclick="this.deleteData(${post.id})">Delete Post</a>
`;
			div.innerHTML = tmp;
			divFromPosts.appendChild(div);
		});
	}

}
