const form = document.querySelector('form');
const buttonSend = document.getElementById('send_button');
const buttonFind = document.getElementById('find_button');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/v2/meos'
const API_URL_FIND = 'http://localhost:5000/meofind'
const meosElement = document.querySelector('.meos');

let meo;
loading.style.display = '';

listAllMeos();

buttonSend.onclick = fetchListCats;
buttonFind.onclick = findCat;

function getInputData() {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    meo = {
        name,
        content
    };

    form.style.display = 'none';
    loading.style.display = '';
}

function findCat() {
    getInputData();
    fetch(API_URL_FIND, {
        method: 'POST',
        body: JSON.stringify(meo),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res =>
        res.json())
        .then(foundMeo => {
            form.reset();
            setTimeout(() => {
                form.style.display = '';
            }, 30000);
            loading.style.display = 'none';
            console.log(foundMeo);
            listFoundMeo(foundMeo);
        });
}

function listFoundMeo(meos) {
    meosElement.innerHTML = '';
    meos.reverse();

    meos.forEach(meo => {
        const div = document.createElement('div')

        const header = document.createElement('h3');
        header.textContent = meo.name;

        const content = document.createElement('p');
        content.textContent = meo.content;

        const date = document.createElement('small');
        date.textContent = new Date(meo.created);

        div.appendChild(header);
        div.appendChild(content);
        div.appendChild(date);

        meosElement.append(div);
    })
    loading.style.display = 'none';
}

function fetchListCats() {
    getInputData();
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(meo),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res =>
        res.json())
        .then(createdMeo => {
            form.reset();
            setTimeout(() => {
                form.style.display = '';
            }, 30000);
            loading.style.display = 'none';
            listAllMeos();
        });

}


function listAllMeos() {
    let skip = 0;
    let limit = 5;
    meosElement.innerHTML = '';
    fetch(`${API_URL}?skip=${skip}&limt=${limit}`).then(res => res.json())
        .then(result => {
            // meos.reverse();

            result.meos.forEach(meo => {
                const div = document.createElement('div')

                const header = document.createElement('h3');
                header.textContent = meo.name;

                const content = document.createElement('p');
                content.textContent = meo.content;

                const date = document.createElement('small');
                date.textContent = new Date(meo.created);

                div.appendChild(header);
                div.appendChild(content);
                div.appendChild(date);

                meosElement.append(div);
            })
            loading.style.display = 'none';
        });
}

