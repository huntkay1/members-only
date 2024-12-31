const pool = require('../db/pool')


async function getHomePageWithMessages(req, res) {
    const { rows } =  await pool.query ('SELECT * FROM messages');
    res.render('home', { messages: rows, user: req.user })
    return rows
}

async function postNewMessage(req, res) {
    const message = req.body.message;
    const username = req.user.username;
    const currentDate = new Date().toLocaleString('en-US');;
    
    await pool.query('INSERT INTO messages ("text", "username", "add") VALUES ($1, $2, $3);', [
        message,
        username,
        currentDate
    ])
    res.redirect('/home');
}

async function deleteMessage(req, res) {
    const id = req.params.id;

    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
    res.redirect('/home')
}

module.exports = {getHomePageWithMessages, postNewMessage, deleteMessage}