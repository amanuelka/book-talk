const { getById } = require('../services/bookService');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const book = await getById(id);
        res.locals.book = book;

        next();
    };
}

module.exports = preload;