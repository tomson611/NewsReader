const express = require('express');

const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) => {
        const home_page = true;

        res.render('home', {home_page});
    });

module.exports = {
    homeRouter
}