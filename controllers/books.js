const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// GET BOOKS
// =========================
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('authors');
    res.json(books);
  } catch (error) {
    console.log(error);
  }
};

// GET BOOK BY ID
// =========================
exports.getBookById = async (req, res, next) => {
  try {
    // validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //controller logic
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No book found under this id' }] });
    }

    res.json(book);
  } catch (error) {
    console.log(error);
  }
};

// POST BOOK
// =========================
exports.postBook = async (req, res, next) => {
  try {
    // validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    res.send('post book route');
  } catch (error) {
    console.log(error);
  }
};

// EDIT BOOK BY ID
// =========================
exports.editBookById = async (req, res, next) => {
  try {
    // validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //controller logic
    const { bookId } = req.params;

    res.send('put book route');
  } catch (error) {
    console.log(error);
  }
};
