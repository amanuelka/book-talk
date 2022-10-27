const Book = require('../models/Book');

async function getAll() {
    return Book.find({}).lean();
};

async function getWished(id) {
    return Book.find({ wishList: id }).lean();
};

async function getById(id) {
    return Book.findById(id).lean();
};

async function create(data) {
    return Book.create(data);
};

async function update(id, data) {
    const existing = await Book.findById(id);
    Object.assign(existing, data);
    return existing.save();
};

async function deleteByid(id) {
    return Book.findByIdAndDelete(id);
};

async function wish(bookId, userId) {
    const book = await Book.findById(bookId);
    book.wishList.push(userId);
    return book.save();
};

module.exports = { getAll, getWished, getById, create, update, deleteByid, wish };