const pool = require('../db/pool')

async function getAllMessages(req, res) {
    const { rows } =  await pool.query ('SELECT * FROM messages');
    res.render('home', { messages: rows })
    return rows
}

module.exports = {getAllMessages}