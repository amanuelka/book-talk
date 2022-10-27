const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /https?:\/\/./i;

const userSchema = new Schema({
    title: { type: String, required: true, minlength: [2, 'Title must be at least 2 characters long'] },
    author: { type: String, required: true, minlength: [5, 'Author must be at least 5 characters long'] },
    imageUrl: { type: String, required: true, match: [URL_PATTERN, 'Invalid image URL'] },
    review: { type: String, required: true, minlength: [10, 'Review must be at least 10 characters long'] },
    genre: { type: String, required: true, minlength: [3, 'Genre must be at least 3 characters long'] },
    stars: { type: Number, required: true, min: 1, max: 5 },
    wishList: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' }
});

const Book = model('Book', userSchema);
module.exports = Book;