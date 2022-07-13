const fetch = require("node-fetch");
const express = require('express');
const API_KEY = process.env.API_KEY;
const {ValidationError, NotFoundError} = require("../utils/errors");

const searchRouter = express.Router();
const searchPage = true;

searchRouter
    .get('/form', (req, res) => {
        res.render('search-form', {searchPage})
    })

    .get('/results', (req, res) => {
        throw new NotFoundError('Oops, wrong place')
    })

    .post('/results', async (req, res) => {
        const term = req.body.term;
        const language = req.body.language;
        const sortBy = req.body.sortby;

        if (term === undefined) {
            throw new ValidationError('Term needs to be provided')
        }

        if (language === undefined) {
            throw new ValidationError('Language needs to be provided')
        }

        if (sortBy === undefined) {
            throw new ValidationError('"Sort by" needs to be provided')
        }

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