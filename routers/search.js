const fetch = require("node-fetch");
const express = require('express');
const {API_KEY} = require("../utils/config");

const searchRouter = express.Router();

searchRouter
    .get('/form', (req, res) => {
        const search_page = true
        res.render('search-form', {search_page})
    })

    .post('/results', async (req, res) => {
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

module.exports = {
    searchRouter,
}