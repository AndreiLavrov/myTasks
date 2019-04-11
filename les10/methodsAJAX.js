function MethodsAJAX () {};

MethodsAJAX.prototype.creatObgData = ()=> {
	return {
		title : document.getElementById('title').value,      // присвоение будет происходить в каждом экземпляре на лету ведь ??
		author : document.getElementById('author').value,
		text : document.getElementById('text').value,
	};
}


MethodsAJAX.prototype.getDataXhr = function (url) {

	return new Promise(function(resolve, reject) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);      // 'true' для наглядности

		xhr.onload = function() {
			if (this.status === 200) {
				resolve(JSON.parse(this.response) );
			} else {
				const error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function() {
			reject(new Error("Network Error"));
		};

		xhr.send();
	});

}

MethodsAJAX.prototype.getDataFetch = function (url) {
	return fetch(url)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		})
}

MethodsAJAX.prototype.sendData =  function (url) {
	return new Promise(function(resolve, reject) {

		const data = MethodsAJAX.prototype.creatObgData();

		const xhr = new XMLHttpRequest();
		xhr.open('POST', url);

		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(data));

		xhr.onload = function() {
			if (this.status === 201) {
				resolve(this, url);
			} else {                                      // не использую функцию в борьбе с Copy Path т.к. код не такой объемный. Верно это ??
				var error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function() {
			reject(new Error("Network Error"));
		};

	});
}


MethodsAJAX.prototype.deleteData = function(url, id) {
	return new Promise(function(resolve, reject) {

		const xhr = new XMLHttpRequest();
		xhr.open('DELETE', `${url}/${id}`);
		xhr.onload = function() {
			if (this.status === 200) {
				resolve(JSON.parse(this.response) );
			} else {
				var error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function() {
			reject(new Error("Network Error"));
		};

		xhr.send();
	});
}

MethodsAJAX.prototype.changePost = function(url, id) {
	return new Promise(function(resolve, reject) {

		const data = MethodsAJAX.prototype.creatObgData();

		const xhr = new XMLHttpRequest();
		xhr.open('PUT', `${url}/${id}`);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function() {
			if (this.status === 200) {
				resolve(url);
			} else {
				var error = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function() {
			reject(new Error("Network Error"));
		};

		xhr.send(JSON.stringify(data));
	});
}
