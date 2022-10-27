const { isOwner } = require('../middlewares/guards');
const { parseError } = require('../middlewares/parsers');
const preload = require('../middlewares/preloader');
const { create, getById, deleteByid, update, wish } = require('../services/bookService');

const bookController = require('express').Router();

bookController.get('/create', (req, res) => {
    res.render('create');
});

bookController.post('/create', async (req, res) => {
    const data = { ...req.body, owner: req.user._id };

    try {
        if (Object.values(data).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(data);
        res.redirect('/catalog');
    } catch (err) {
        res.render('create', { errors: parseError(err), ...data });
    }

});

bookController.get('/:id', async (req, res) => {
    const book = await getById(req.params.id);

    book.isOwner = req.user && book.owner == req.user._id;
    book.isWished = req.user && book.wishList.some(u => u._id == req.user._id);

    res.render('details', { ...book });
});

bookController.get('/:id/delete', preload(), isOwner(), async (req, res) => {
    await deleteByid(req.params.id);
    res.redirect('/');
});

bookController.get('/:id/edit', preload(), isOwner(), async (req, res) => {
    const book = res.locals.book;
    res.render('edit', { ...book });
});

bookController.post('/:id/edit', preload(), isOwner(), async (req, res) => {

    try {
        await update(req.params.id, { ...req.body, _id: req.params.id });
        res.redirect(`/book/${req.params.id}`);
    } catch (error) {
        res.render('edit', { errors: parseError(error), ...req.body });
    }
});

bookController.get('/:id/wish', preload(), async (req, res) => {
    const book = res.locals.book;
    if (book.owner != req.user._id && book.wishList.some(u => u._id == req.user._id) == false) {
        await wish(req.params.id, req.user._id);
    }
    res.redirect(`/book/${req.params.id}`);
});

module.exports = bookController;