const Pool = require('pg').Pool;

export const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'recipes',
    password: 'password',
    port: 5432
});