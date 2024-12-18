const { Router } = require('express');
const { getAllMessages } = require('../controllers/messageController')

const homeRouter = Router();

homeRouter.get('/', getAllMessages)




module.exports = homeRouter