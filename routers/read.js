const fetch = require("node-fetch");
const express = require('express');
const {API_KEY} = require("../utils/config");

const readRouter = express.Router();
const readPage = true;

readRouter
    .get('/form', (req, res) => {

        res.render('read-form', {readPage});
    })

    .post('/results', async (req, res) => {
        const category = req.body.category;
        const country = req.body.country;
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