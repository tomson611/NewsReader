const express = require('express');
const hbs = require('express-handlebars');
const {homeRouter} = require("./routers/home");
const {readRouter} = require("./routers/read");
const {searchRouter} = require("./routers/search");
const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.engine('.hbs', hbs({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/read', readRouter);
app.use('/search', searchRouter);

let port = process.env.PORT;
if (port === null || port === "" || port === undefined) {
    port = 3001;
}

app.listen(port, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
})
