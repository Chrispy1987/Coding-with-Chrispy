const pg = require('pg');

const db = new pg.Pool({
    database: 'scav_hunt'
});

module.exports = db;