const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/meos'
const meosElement = document.querySelector('.meos');

loading.style.display = '';

listAllMeos();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    const meo = {
        name,
        content
    };
    form.style.display = 'none';
    loading.style.display = '';

    console.log("Hello world");

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

});

function listAllMeos() {
    meosElement.innerHTML = '';
    fetch(API_URL).then(res => res.json())
        .then(meos => {
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
        });
}

