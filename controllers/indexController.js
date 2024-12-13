const pool = require('../db/pool');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

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

function signupGET(req, res) {
    res.render('signup');
}

async function signupPOST(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.render('signup', {
            errors: errors.array(),
            data: req.body,
        })
    }

    await addUser(req, res);
}

module.exports = { addUser, signupGET, signupPOST }