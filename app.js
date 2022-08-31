const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('client'))
app.use(express.json());

// IMPORT DEPENDANCIES
const db = require('./database/db')
const { expressSession, pgSession } = require('./controller/session');
const challengesController = require('./controller/challenges')
const usersController = require('./controller/users')

app.use((request, response, next) => {
    console.log(`*** Request method: ${request.method} and route: ${request.path} at ${new Date()} ***`)
    next();
})

//Middleare - expressSession:
app.use(
  expressSession({
    store: new pgSession({
      pool: db, // Connects to our postgres db
      createTableIfMissing: true, // Creates a session table in your database (go look at it!)
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  })
);

app.use('/api/challenges', challengesController)
app.use('/api/session', usersController)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})