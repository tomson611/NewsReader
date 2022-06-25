const express = require('express');
const hbs = require('express-handlebars');
const fetch = require('node-fetch');
let {API_KEY} = process.env.API_KEY;
if (API_KEY === undefined) {
    API_KEY = require('./utils/config')
}
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


app.get('/', (req, res) => {
    const home_page = true;

    res.render('home', {home_page});
})

app.get('/form', (req, res) => {
    const current_page = true;

    res.render('form', {current_page});
})

app.post('/articles', (req, res) => {
    const category = req.body.category;
    const current_page = true;
    fetch(`https://newsapi.org/v2/top-headlines?country=pl&category=${category}&apiKey=${API_KEY}&pageSize=30`)
        .then(res => res.json())
        .then(json => {
            res.render('results', {
                json,
                current_page,
            });
        })
})

let port = process.env.PORT;
if (port === null || port === "" || port === undefined) {
    port = 3001;
}
;

app.listen(port, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
})
