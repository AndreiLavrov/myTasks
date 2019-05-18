class ServPosts {
	constructor (url) {
		this.instance = new MethodsAJAX();
		this.url = url || `http://localhost:3006/posts`;

		this.send = document.getElementById('send');
		this.getPos = document.getElementById('getPos');
		this.init();
	}

	init () {
		let self = this;
		this.send.addEventListener('click', this.sendOnePost.bind(self));
	/*
		почему если указать обработчик соб. в html, то getPosts is not defined?
		*/
		this.getPos.addEventListener('click', this.getPosts.bind(self));
	}

	/**
	 * get posts by 'fetch'
	 *
	 */
	getPosts () {

		this.instance.getDataFetch(this.url)
			.then((data) => this.renderPosts(data))
			.catch(err => alert(err));
	}

	/**
	 * send post to server
	 */
	sendOnePost () {

		this.instance.sendData(this.url)
			.then((data) => {
				console.log(` data was send ${data}`);
				this.getPosts(this.url);                                     // this => ok ?
			})
			.catch(err => alert(err));
	}

	/**
	 * delete post  server
	 */
	deleteData (id) {
		this.instance.deleteData(this.url, id)
			.then((data) => {
				console.log(` data was deleted ${data}`);
				this.getPosts(this.url);
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
				this.getPosts(this.url);
			})
			.catch(err => alert(err));
	}

	/**
	 * add data on page
	 * @param data -- object from server
	 */
	renderPosts (data) {
		console.log(data);
		let self = this;                                                              // контекст
		let divFromPosts = document.getElementById('divFromPosts');
		divFromPosts.innerHTML = '';

		data.forEach(function (post) {
			const div = document.createElement('div');

			const tmp = `<h3><a >${post.title}</a></h3>
<p>${post.text}</p>
<span>${post.author}</span><br />
<a id="change${post.id}">Change Post</a><br />
<a id="delete${post.id}">Delete Post</a>
`;
			div.innerHTML = tmp;
			divFromPosts.appendChild(div);

			// была потеря  контекст
			document.getElementById(`delete${post.id}`)
				.addEventListener('click', self.deleteData.bind(self, post.id) );
			document.getElementById(`change${post.id}`)
				.addEventListener('click', self.changePost.bind(self, post.id) );

		});
	}

}

let servPosts = new ServPosts();

