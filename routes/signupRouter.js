const { Router } = require('express');
const { check } = require('express-validator');
const { signupGET, signupPOST } = require('../controllers/signupController');

const signupRouter = Router();

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


signupRouter.get('/', signupGET)

signupRouter.post('/', signupValidationRules, signupPOST)

module.exports = signupRouter