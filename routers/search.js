const fetch = require("node-fetch");
const express = require('express');
const API_KEY = process.env.API_KEY;

const searchRouter = express.Router();
const searchPage = true;

searchRouter
    .get('/form', (req, res) => {
        res.render('search-form', {searchPage})
    })

    .post('/results', async (req, res) => {
        const term = req.body.term;
        const language = req.body.language;
        const sortBy = req.body.sortby;
        const response = await fetch(`https://newsapi.org/v2/everything?q=${term}&language=${language}&sortBy=${sortBy}&apiKey=${API_KEY}`)
        const json = await response.json();
        res.render('results', {
            json,
            searchPage,
        })
    });

module.exports = {
    searchRouter,
}