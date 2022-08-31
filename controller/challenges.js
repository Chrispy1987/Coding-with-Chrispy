const express = require('express');
const Challenges = require('../models/challenges')
const router = express.Router();

//GET ALL CHALLENGES
router.get('/', (request, response) => {
    Challenges.getAll()
    .then(dbRes => {
        response.json(dbRes)
    })
    .catch(() => response.sendStatus(500));
});

//**NOT IN USE* - Perhaps use for a filter? 
//Param for: id ASC/DESC, name ASC/DESC
router.get('/:id', (request, response) => {
    const id = request.params.id
    Challenges.getOne(id)
    .then(dbRes => {
        response.json(dbRes)
    })
    .catch(() => response.sendStatus(500));

});

//CREATE NEW CHALLENGE
router.post('/', (request, response) => {
    const name = request.body.name.toLowerCase()
    const {description, address} = request.body;
  
    if (name === '') {
        return response.status(400).json({message: 'Name required'})
    } else if (name.length > 25) {
        return response.status(400).json({message: 'Name entered is too long (limit: 25 characters)'})
    } else if (description === '') {
        return response.status(400).json({message: 'Description required'})
    } else if (address === '') {
        return response.status(400).json({message: 'Address required'})
    }
    //CHECK THAT CHALLENGE NAME DOESNT ALREADY EXIST
    Challenges.checkExisting(name)
    .then(dbRes => {
        if (dbRes.rowCount > 0) {
            response.status(403).json({message: 'A Challenge by that name already exists!'})
        } else {
            Challenges.createChallenge(name, description, address)
            .then(() => response.json({}))
            .catch(() => response.sendStatus(500));
        }
    })
});

//DELETE CHALLENGE
router.delete('/:id', (request, response) => {
    const id = request.params.id
    Challenges.deleteChallenge(id)
    .then(() => {       
        response.json({});
    })
    .catch(() => response.sendStatus(500));
})

//UPDATE CHALLENGE DETAILS
router.put("/:id", (request, response) => {
    const id = request.params.id
    const name = request.body.name.toLowerCase()
    const { description, address } = request.body;
    
    if (name === '') {
        response.status(400).json({message: 'Name required'})
    } else if (description === '') {
        response.status(400).json({message: 'Description required'})
    } else if (address === '') {
        response.status(400).json({message: 'Address required'})
    } else {
        Challenges.updateChallenge(name, description, address, id)
        .then(() => {
            response.json({})
            })
            .catch(() => response.sendStatus(500)); 
        }
});

module.exports = router;