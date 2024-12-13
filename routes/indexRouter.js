const { Router } = require('express');
const { check } = require('express-validator');
const { addUser, signupGET, signupPOST } = require('../controllers/indexController');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = Router();

const signupValidationRules = [
    check('firstname').notEmpty().withMessage('First name is required'),
    check('lastname').notEmpty().withMessage('Last name is required'),
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('passwordConfirmation')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
];

indexRouter.use(session({ secret: 'cats', resave: false, saveUninitialized: false}));
indexRouter.use(passport.session());

indexRouter.get('/', (req, res) => {
    res.render('index')
})
indexRouter.get('/sign-up', signupGET)

// indexRouter.post('/', addUser)
indexRouter.post('/sign-up', signupValidationRules, signupPOST)

module.exports = indexRouter