const { Router } = require('express');
const { addUser, signupGET, signupPOST } = require('../controllers/indexController');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = Router();

indexRouter.use(session({ secret: 'cats', resave: false, saveUninitialized: false}));
indexRouter.use(passport.session());

indexRouter.get('/', (req, res) => {
    res.render('index')
})
indexRouter.get('/sign-up', signupGET)

indexRouter.post('/', addUser)
indexRouter.post('/sign-up', signupPOST)

module.exports = indexRouter