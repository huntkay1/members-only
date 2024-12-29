const pool = require('../db/pool')


async function getHomePageWithMessages(req, res) {
    const { rows } =  await pool.query ('SELECT * FROM messages');
    res.render('home', { messages: rows, user: req.user })
    return rows
}

async function postNewMessage(req, res) {
    console.log(req.body)
}

module.exports = {getHomePageWithMessages, postNewMessage}