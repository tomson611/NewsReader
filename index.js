const express = require('express');
const hbs = require('express-handlebars');
const fetch = require('node-fetch');
const {API_KEY} = require('./utils/config')
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
    res.render('home')
})

app.post('/articles', (req, res) => {
    const category = req.body.category;
    fetch(`https://newsapi.org/v2/top-headlines?country=pl&category=${category}&apiKey=${API_KEY}&pageSize=30`)
        .then(res => res.json())
        .then(json => {
            res.render('results', {
                json
            });
        })
})

// let port = process.env.PORT;
// if (port === null || port === "") {
//     port = 3000;
// }
app.listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
})
