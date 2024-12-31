const { Router } = require('express');
const { getHomePageWithMessages, postNewMessage, deleteMessage } = require('../controllers/messageController')

const homeRouter = Router();

homeRouter.get('/', getHomePageWithMessages)

homeRouter.post('/', postNewMessage)

homeRouter.post('/:id/delete', deleteMessage)
homeRouter.post('/:id/edit', (req, res) => {
    console.log('edit')
})


module.exports = homeRouter