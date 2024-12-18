const path = require('node:path');
const express = require('express');
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/sessionRouter');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use('/sign-up', signupRouter)
app.use('/user', loginRouter)
app.use('/home', (req, res) => {
    res.render('home')
})
app.use('/', (req, res) => {
    res.render('landing')
})


app.listen(3000, () => console.log('Listening on port 3000'));