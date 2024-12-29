const pool = require('../db/pool')


async function getHomePageWithMessages(req, res) {
    const { rows } =  await pool.query ('SELECT * FROM messages');
    res.render('home', { messages: rows, user: req.user })
    return rows
}

async function postNewMessage(req, res) {
    const message = req.body;
    const username = req.user;
    const currentDate = new Date().toLocaleString('en-US');;
    
    await pool.query('INSERT INTO messages ("text", "username", "add") VALUES ($1, $2, $3);', [
        message,
        username,
        currentDate
    ])
    res.redirect('/home');
}

module.exports = {getHomePageWithMessages, postNewMessage}