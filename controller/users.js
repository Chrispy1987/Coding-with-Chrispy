const express = require('express');
const db = require('../database/db');
const User = require('../models/users');
const { generateHash, isValidPassword } = require('../util/hash');
const router = express.Router();

// USER - SIGN UP
router.post('/signup', (request, response) => {
    const email = request.body.email.toLowerCase()
    const password = request.body.password; 

    const hashedPassword = generateHash(password)

    const checkIfEmailExists = 'SELECT * FROM users WHERE email=$1'
    db.query(checkIfEmailExists, [email])
    .then((dbRes) => {
        if (dbRes.rowCount > 0) {
          return response.status(404).json({message: 'Email already exists'})  
        } 
    }).catch(() => response.sendStatus(500))

    const sql = 'INSERT INTO users(email, password) VALUES($1, $2)'
    db.query(sql, [email, hashedPassword])
    .then(() => response.json({}))
    .catch(() => response.sendStatus(500));
})

// USER - LOG IN
router.post('/', (request, response) => {
    const email = request.body.email.toLowerCase()
    const password = request.body.password;  
    User.checkExists(email)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(400).json({message: 'The username and/or password you have entered is incorrect.'})
        } 
        const user = dbRes.rows[0];
        const hashedPassword = user.password;
        if (isValidPassword(password, hashedPassword)) {
            console.log('CORRECT PASSWORD')
            request.session.email = email;
            return response.json({})
        } 
        return response.status(400).json({message: 'The username and/or password you have entered is incorrect.'})
    })
    .catch(() => response.sendStatus(500))
})

// USER - LOG OUT - Why wont this mofo work...
router.delete('/', (request, response) => {
    const userExists = request.session.email
    if (userExists) {
        request.session.destroy()
        return response.json({})   
    } else {
        return response.status(400).json({message: 'No users are logged in. How did you get here!?'})   
    }
});

// GET SESSION DATA (confirm user logged in for page access)
router.get('/', (request, response) => {
    const email = request.session.email;
    if (!email) {
        return response.status(401).json({message: 'Please login to access this page'});
    } else {
        return response.json({email: email})
    }
})

module.exports = router;