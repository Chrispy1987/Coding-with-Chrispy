

const logout = () => {
    console.log('LOGGING OUT')
    // not even making it to the backend, as it reckons the following path does not exist!?!?!?
    axios.delete('/api/session/')
    .then(() => {
        console.log('SESSION DELETED')
        location.href = '/'; 
        })
    .catch(err => {
        if (err.response.status === 500) {
            alert('An unknown error occured. Please try again')
        } else {
            console.log(err)
            alert(err.message)
        }
    });
}