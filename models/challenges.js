
//MODEL EXAMPLE

class Challenge {
    constructor(name, description, address) {
        this.name = name;
        this.description = description; 
        this.address = address;
    }
}

const db = require("../database/db.js");

const Challenges = {
  getAll: () => {
    const sql = "SELECT * FROM challenges ORDER BY id DESC LIMIT 100";
    return db.query(sql)
    .then(dbRes => dbRes.rows);
  },
  getOne: (id) => {
    const sql = 'SELECT * FROM challenges WHERE id=$1';
    return db.query(sql, [id])
    .then(dbRes => dbRes.rows)
  },
  checkExisting: (name) => {
    const sql = 'SELECT name FROM challenges WHERE name=$1';
    return db.query(sql, [name])
  },
  createChallenge: (name, description, address) => {
    const sql = 'INSERT INTO challenges (name, description, address) VALUES($1, $2, $3)'
    return db.query(sql, [name, description, address])
  },
  updateChallenge: (name, description, address, id) => {
    const sql = 'UPDATE challenges SET name=$1, description=$2, address=$3 WHERE id=$4'
    return db.query(sql,[name, description, address, id])
  },
  deleteChallenge: (id) => {
    const sql = 'DELETE FROM challenges WHERE id=$1'
    return db.query(sql, [id])
  },
};

module.exports = Challenges;
