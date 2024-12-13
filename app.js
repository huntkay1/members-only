const path = require('node:path');
const express = require('express');
const indexRouter = require('./routes/indexRouter')

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)


app.listen(3000, () => console.log('Listening on port 3000'));