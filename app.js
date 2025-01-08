const path = require('node:path');
const assetsPath = path.join(__dirname, "public"); 
const express = require('express');
const signupRouter = require('./routes/signupRouter');
const homeRouter = require('./routes/homeRouter');
const pool = require('./db/pool')
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false}));
app.use(passport.session());


app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/login'}));

app.get('/log-out', (req, res, next) => {
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


app.use('/sign-up', signupRouter)
app.use('/home', homeRouter)
app.use('/', (req, res) => {
    res.render('landing')
})


app.listen(3000, () => console.log('Listening on port 3000'));