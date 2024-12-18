const { Router } = require('express');
const { getAllMessages } = require('../controllers/messageController')

const homeRouter = Router();

homeRouter.get('/', getAllMessages)

homeRouter.get('/new-post', (req, res) => {
    res.render('newPost', { user: req.user })
})


module.exports = homeRouter