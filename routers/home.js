const express = require('express');

const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) => {
        const homePage = true;

        res.render('home', {homePage});
    });

module.exports = {
    homeRouter
}