function MethodsAJAX () {};

MethodsAJAX.prototype.creatObgData = ()=> {
	return {
		  title : document.getElementById('title').value,      // присвоение будет происходить в каждом экземпляре на лету ведь ??
			 author : document.getElementById('author').value,
			 text : document.getElementById('text').value,
		};
}

MethodsAJAX.prototype.thenCopyPathFunc = ()=> {
	return (response) => {
		if (response.ok) {
			return response.statusText;
		} else {
			throw new Error(`Bad HTTP stuff..`)
		}
	};
};

MethodsAJAX.prototype.getDataFetch = function (url) {
	return fetch(url)
		.then( (response) => {
			if (response.ok){
				return response.json();
			}else{
				throw new Error(`Bad HTTP stuff..`)
			}
		});
}


MethodsAJAX.prototype.sendData = (url) => {

	const data = MethodsAJAX.prototype.creatObgData();

	const options = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({'Content-Type': 'application/json'}),
	}

	return fetch(url, options)
		.then( MethodsAJAX.prototype.thenCopyPathFunc() );

}

MethodsAJAX.prototype.deleteData = function(url, id) {
	const options = {
		method: 'DELETE',
	}

	return fetch(`${url}/${id}`, options)
		.then( MethodsAJAX.prototype.thenCopyPathFunc() );
}

MethodsAJAX.prototype.changePost = function(url, id) {

	const data = MethodsAJAX.prototype.creatObgData();

	const options = {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'}),
	}

		return fetch(`${url}/${id}`, options)
			.then( MethodsAJAX.prototype.thenCopyPathFunc() );
}
