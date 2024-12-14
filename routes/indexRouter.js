const { Router } = require('express');

const indexRouter = Router();


indexRouter.get('/', (req, res) => {
    res.render('landing')
})


module.exports = indexRouter