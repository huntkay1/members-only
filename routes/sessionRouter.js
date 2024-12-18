const { Router } = require('express');
const pool = require('../db/pool')
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const sessionRouter = Router();

sessionRouter.use(session({ secret: 'cats', resave: false, saveUninitialized: false}));
sessionRouter.use(passport.session());


sessionRouter.get('/login', (req, res) => {
    res.render('login')
});

sessionRouter.post('/login', passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/login'}));

sessionRouter.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password); //compares input password to hashed password

            if (!user) {

                return done(null, false, { message: 'Incorrect username'});
            }
            if (!match) {
                return done(null, false, { message: 'Incorrect password'});
            }
            return done(null, user)
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = rows[0];
        done(null, user);
    } catch(err) {
        done(err);
    }
});

module.exports = sessionRouter