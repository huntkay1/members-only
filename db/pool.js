const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    user: 'Kayla.',
    database: 'members_only',
    password: process.env.PASSWORD,
    port: 5432
});

module.exports = pool;