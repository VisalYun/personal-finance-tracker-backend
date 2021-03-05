const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "thisisadmin",
    host: "localhost",
    port: 5432,
    database: "finance",
});

module.exports = pool;