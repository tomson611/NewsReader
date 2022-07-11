const fetch = require("node-fetch");
const express = require('express');
const {API_KEY} = require("../utils/config");

const readRouter = express.Router();

readRouter
    .get('/form', (req, res) => {
        const read_page = true;

        res.render('read-form', {read_page});
    })

    .post('/results', async (req, res) => {
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

module.exports = {
    readRouter,
}