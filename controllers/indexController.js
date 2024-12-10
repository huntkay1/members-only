const pool = require('../db/pool');
const bcrypt = require('bcryptjs');


async function addUser(req, res, next) {
    const user = req.body;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await pool.query('INSERT INTO users ("firstname", "lastname", "username", "email", "password") VALUES ($1, $2, $3, $4, $5);', [
        user.firstname, 
        user.lastname,
        user.username,
        user.email,
        hashedPassword
    ]);

    
}

module.exports = { addUser }