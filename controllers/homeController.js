const { getAll, getWished } = require('../services/bookService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/catalog', async (req, res) => {
    const books = await getAll();
    res.render('catalog', { books });
});

homeController.get('/profile', async (req, res) => {
    const books = await getWished(req.user._id);
    res.render('profile', { books });
});

module.exports = homeController;