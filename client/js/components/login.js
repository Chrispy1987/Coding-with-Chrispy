//ADD EVENT LISTENER TO LOGIN FORM
const form = document.getElementById('log-in-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    axios.post('/api/session', data)
    .then(() => {
        //redirect to / will automatically seek index.html
        form.replaceChildren('Success - Logging in...')
        setTimeout(() => {
           location.href = '/' 
        }, 2000)        
    })
    .catch((err) => {
        if (err.response.status === 500) {
        alert('Something went wrong. Please try again.');
        } else {
        alert(err.response.data.message);
        }
    });
});
 