const search = document.getElementById('search');
let timerId;

search.addEventListener('input', function (event) {
    if(event.target.value.trim() === '') {
        return false;
    }

    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(function(){
        loadData(event.target.value);
    }, 750);
});

function loadData(search) {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/search/users`;

    xhr.open('GET', `${url}?q=${search}`);

    xhr.send();

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
          // console.log(JSON.parse(xhr.responseText));
          renderData(JSON.parse(xhr.responseText));
      }
    };
}

function renderData(data){
    const container = document.getElementById('results');
    container.innerHTML = '';
    data.items.forEach(function(item){
       const div = document.createElement('div');
       const tmp = `<img width="200" src="${item.avatar_url}" alt="${item.login}" />
<a href="${item.html_url}">${item.login}</a>`;
       div.innerHTML = tmp;
       container.appendChild(div);
    });
}