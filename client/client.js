const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/meo'

loading.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    console.log("Form submitted");
    const meo = {
        name,
        content
    };
    form.style.display = 'none';
    loading.style.display = '';

    fetch(API_URL, {
        method: 'POST', 
        body: JSON.stringify(meo),
        headers: {
            'content-type': 'application/json'
        }
    });
});