const { Router } = require('express');
const { getHomePageWithMessages, postNewMessage, deleteMessage, editMessage } = require('../controllers/messageController')

const homeRouter = Router();

homeRouter.get('/', getHomePageWithMessages)

homeRouter.post('/', postNewMessage)

homeRouter.post('/:id/delete', deleteMessage)

homeRouter.post('/:messageId/edit', editMessage)


module.exports = homeRouter