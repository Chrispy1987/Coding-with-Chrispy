
const renderChallenges = () => {
    axios
    .get('/api/challenges')
    .then((challenges) => {
        const page = document.getElementById('page');
        page.innerHTML = ""
        const heading = document.createElement('h2')
        heading.textContent = 'CHALLENGES'
        page.append(heading)
        for (const challenge of challenges.data) {
            const container = document.createElement('div')            
            container.className = 'challenge'
            
            const name = document.createElement('p')
            name.textContent = challenge.name
            name.classList.add('challenge-name')

            const description = document.createElement('p')  
            description.textContent = challenge.description  

            const address = document.createElement('p')             
            address.textContent = challenge.address

            container.appendChild(name)

            //DELETE BUTTON
            const deleteChallenge = document.createElement('button');
            deleteChallenge.innerText = 'Delete'
            deleteChallenge.className = 'delete'    
            deleteChallenge.addEventListener('click', (e) => {
                if (e.target.textContent == 'Delete') {
                    e.target.textContent = 'Confirm'
                    e.target.classList.add('confirm')
                    setTimeout(() => {
                        e.target.textContent = 'Delete'
                        e.target.classList.remove('confirm')
                    }, 3000)
                } else {
                    axios.delete(`/api/challenges/${challenge.id}`)
                    .then(() => {
                        renderChallenges()
                    }).catch(() => alert('An unknown error occured. Please try again'))
                }
            })
            container.appendChild(deleteChallenge)

            //EDIT BUTTON
            const editChallenge = document.createElement('button');
            editChallenge.textContent = 'Edit'
            editChallenge.className = 'edit'  
            editChallenge.addEventListener('click', () => {
                console.log(challenge)
                renderEditChallenge(challenge)
            })
            container.appendChild(editChallenge)

            //EXPAND VIEW BUTTON
            const expandView = document.createElement('button');
            expandView.textContent = '↓'
            expandView.className = 'expand'
            let clicked = false;
            expandView.addEventListener('click', (e) => {
                if (clicked) {
                    e.target.textContent = '↓'
                    e.target.style.backgroundColor = 'aqua'
                    container.removeChild(description)
                    container.removeChild(address)
                    clicked = !clicked;
                } else {
                    e.target.textContent = '↑'
                    e.target.style.backgroundColor = 'lime'

                    container.appendChild(description)
                    container.appendChild(address)
                    clicked = !clicked;
                }
            })       
            container.appendChild(expandView)
            page.appendChild(container);  
        } 
    })
    .catch(() => {alert('An unknown error occured. Please try again')
    });
}

