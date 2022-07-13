const fetch = require("node-fetch");
const express = require('express');
const API_KEY = process.env.API_KEY;
const {ValidationError, NotFoundError} = require("../utils/errors");

const readRouter = express.Router();
const readPage = true;

readRouter
    .get('/form', (req, res) => {

        res.render('read-form', {readPage});
    })

    .get('/results', (req, res) => {
        throw new NotFoundError('Oops, wrong place')
    })

    .post('/results', async (req, res) => {
        const category = req.body.category;
        const country = req.body.country;

        if (category === undefined) {
            throw new ValidationError('Category needs to be provided')
        }

        if (country === undefined) {
            throw new ValidationError('Country needs to be provided')
        }

        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&pageSize=30`)
        const json = await response.json();
        res.render('results', {
            json,
            readPage,
        })
    });

module.exports = {
    readRouter,
}