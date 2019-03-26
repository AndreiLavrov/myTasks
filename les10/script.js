// const xhr = new XMLHttpRequest();
//
// xhr.onreadystatechange = function(){
//     console.log(xhr.readyState);
// };
// xhr.open('GET', 'users.json');
//
// xhr.send();
// xhr.onload = function() {
//   if(xhr.status !== 200) {
//       alert(`${xhr.status} : ${xhr.statusText}`);
//   } else {
//       const result = xhr.responseText;
//       console.log(result);
//   }
// };

const url = 'http://localhost:3006';

function getPosts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}/posts`);
    xhr.send();

    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200) {
          renderPosts(JSON.parse(xhr.responseText));
          return true;
      }
    };
}

function getPost(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}/posts/${id}`);
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            return true;
        }
    };
}

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

function sendData() {
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

function changePost(id) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const text = document.getElementById('text').value;

    const data = {
        title,
        author,
        text,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${url}/posts/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Post was changed');
        }
    }
}


function deletePost(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${url}/posts/${id}`);
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Post was deleted:', JSON.parse(xhr.responseText));
            return true;
        }
    };
}
