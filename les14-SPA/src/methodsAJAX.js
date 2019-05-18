export class MethodsAJAX {
 		constructor () {}

	// creatObgData () {
	// 	return {
	// 		title : document.getElementById('title').value,
	// 		author : document.getElementById('author').value,
	// 		text : document.getElementById('text').value,
	// 	};
	// }

	thenCopyPathFunc  () {
		return (response) => {
			if (response.ok) {
				return response.statusText;
			}
			throw new Error(`Bad HTTP stuff..`)

		};
	}

	getDataFetch (url) {
		return fetch(url)
			.then( (response) => {
				if (response.ok){
					return response.json();
				}
				throw new Error(`Bad HTTP stuff..`)

			});
	}


	sendData  (url, data)  {

		// const data = this.creatObgData();

		const options = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'}),
		};

		return fetch(url, options)
			.then( this.thenCopyPathFunc() );

	}

	deleteData (url, id) {
		const options = {
			method: 'DELETE',
		};

		return fetch(`${url}/${id}`, options)
			.then( this.thenCopyPathFunc() );
	}

	changePost (url, id) {

		const data = this.creatObgData();

		const options = {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'}),
		};

		return fetch(`${url}/${id}`, options)
			.then( this.thenCopyPathFunc() );
	}
}
