const express = require('express');
const hbs = require('express-handlebars');
const fetch = require('node-fetch');
const {API_KEY} = process.env.API_KEY || require('./utils/config');
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
});

app.get('/form', (req, res) => {
    const read_page = true;

    res.render('form', {read_page});
});

app.post('/articles', async (req, res) => {
    const category = req.body.category;
    const country = req.body.country;
    const read_page = true;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&pageSize=30`)
    const json = await response.json();
    res.render('results', {
        json,
        read_page,
    })
});

app.get('/search-form', (req, res) => {
    const search_page = true
    res.render('search-form.hbs', {search_page})
});

app.post('/search-results', async (req, res) => {
    const term = req.body.term;
    const language = req.body.language;
    const sortBy = req.body.sortby;
    const search_page = true;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${term}&language=${language}&sortBy=${sortBy}&apiKey=${API_KEY}`)
    const json = await response.json();
    res.render('results', {
        json,
        search_page,
    })
});


let port = process.env.PORT;
if (port === null || port === "" || port === undefined) {
    port = 3001;
}

app.listen(port, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
})
