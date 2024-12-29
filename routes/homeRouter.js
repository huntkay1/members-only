const { Router } = require('express');
const { getHomePageWithMessages, postNewMessage } = require('../controllers/messageController')

const homeRouter = Router();

homeRouter.get('/', getHomePageWithMessages)

homeRouter.post('/', postNewMessage)


module.exports = homeRouter