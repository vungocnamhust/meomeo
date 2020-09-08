const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/meos'

loading.style.display = 'none';

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
    }).then(res => {
        console.log(res);
        return res.json();
    })
      .then(createdMeo => {
          console.log(createdMeo);
          loading.style.display = 'none';
          
      });

});