
require("dotenv").config();

// Express library to handle sessions
const expressSession = require("express-session"); 

// We need to store sessions in the DB, otherwise it'll forget them all when you restart the server.
const pgSession = require("connect-pg-simple")(expressSession);

module.exports = { expressSession, pgSession } 