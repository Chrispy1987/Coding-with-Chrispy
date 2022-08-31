const renderHeader = () => {
    axios.get('/api/session')
    .then(dbRes => {
        if (dbRes) {
            const header = document.getElementById('header-nav');
            header.innerHTML = ''
            
            const h1 = document.createElement('h1')
            h1.textContent = 'SCAV HUNT'
            header.appendChild(h1)

            const navList = document.createElement('ul')
            navList.id = 'navlist'

            //BUTTON - FETCH CHALLENGES
            const challengesButton = document.createElement('li')
            challengesButton.textContent = 'Challenges'
            challengesButton.addEventListener('click', renderChallenges)
            navList.appendChild(challengesButton)

            //BUTTON - FETCH RULES
            const rulesButton = document.createElement('li')
            rulesButton.textContent = 'Rules'
            rulesButton.addEventListener('click', renderRules)
            navList.appendChild(rulesButton)

            //BUTTON - ADD NEW CHALLENGE
            const newChallengeButton = document.createElement('li')
            newChallengeButton.textContent = 'Add Challenge'
            newChallengeButton.addEventListener('click', renderNewChallenge)
            navList.appendChild(newChallengeButton)
            
            //BUTTON - LOGOUT
            const logoutButton = document.createElement('li')
            logoutButton.textContent = 'Logout'
            logoutButton.addEventListener('click', () => {
                //LOG OUT - DESTROY SESSION
                //RELOAD INDEX
                logout()
                // location.href = '/'                
            })
            navList.appendChild(logoutButton)

            header.appendChild(navList)    
        }
    })
    .catch(err => {
        if (err.response.status === 500) {
        alert('An unknown error occured. Please refresh your page')
        } else {
            const header = document.getElementById('header-nav');
            
            const h1 = document.createElement('h1')
            h1.textContent = 'SCAV HUNT'
            header.appendChild(h1)

            const navList = document.createElement('ul')
            navList.id = 'navlist'

            const signupButton = document.createElement('li')
            signupButton.textContent = 'Sign Up'
            signupButton.addEventListener('click', () => {
                location.href = '/signup.html'; 
            })

            const loginButton = document.createElement('li')
            loginButton.textContent = 'Login'
            loginButton.addEventListener('click', () => {
                location.href = '/login.html'; 
            })
            navList.appendChild(signupButton)
            navList.appendChild(loginButton)
            header.appendChild(navList)

            const page = document.getElementById('page')  
            const h2 = document.createElement('h2')
            h2.textContent = 'PLEASE LOG IN'
            page.appendChild(h2)

            const gifForSid = document.createElement('img')
            gifForSid.src = '../../css/login.gif'
            gifForSid.style.borderRadius = '12px'
            page.appendChild(gifForSid)    
        }
    });
}

