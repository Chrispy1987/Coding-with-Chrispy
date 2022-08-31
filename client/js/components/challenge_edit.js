
const renderEditChallenge = (challenge) => {
    const page = document.getElementById('page');

    const form = document.createElement('form')
    form.innerHTML = `
    <h2>UPDATE CHALLENGE</h2>
    <fieldset class="challenge-field">
        <label for="name">Name:</label>
        <input type="text" name="name" value="${challenge.name}" class="challenge-input">
    </fieldset>

    <fieldset class="challenge-field">
        <label for="description">Description:</label>    
        <input type="text" name="description" value="${challenge.description}" class="challenge-input">
    </fieldset>

    <fieldset class="challenge-field">
        <label for="address">Address:</label>
        <input type="text" name="address" value="${challenge.address}" class="challenge-input">       
    </fieldset>       
    <button class="save">Update</button>
        `;

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form)
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            address: formData.get('address'),
        };

        axios.put(`/api/challenges/${challenge.id}`, data)
        .then(() => {
                const msg = document.createElement('p')
                msg.textContent = `'${data.name}' successfully updated...`
                msg.classList.add('message')
                page.replaceChildren(msg)
                setTimeout(renderChallenges, 2000);
            } 
        )
        .catch(err => {
            if (err.response.status === 500) {
                alert('An unknown error occured. Please try again')
            } else {
                alert(err.response.data.message)
            }
        })
    });
    page.replaceChildren(form)
};