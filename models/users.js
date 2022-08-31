

const db = require("../database/db.js");

const User = {
  checkExists: (email) => {
    const sql = 'SELECT * FROM users WHERE email=$1'
    return db.query(sql, [email])
    .then(dbRes => dbRes)
  }
}

module.exports = User;
