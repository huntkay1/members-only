const { Router } = require('express');
const { addUser } = require('../controllers/indexController')

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.render('index')
})

indexRouter.post('/', addUser)

module.exports = indexRouter