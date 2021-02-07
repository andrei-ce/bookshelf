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
    const { title, cover, authors, description, isbn } = req.body;

    // check if isbn is already in the database
    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
      return res
        .status(409)
        .json({ errors: [{ msg: 'This book is already in our database' }] });
    }
    // **TODO** check if authors exist in database --> if not error or create new author?
    const book = new Book({ title, cover, authors, description, isbn });
    const newBook = await book.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
  }
};

// EDIT BOOK BY ID
// =========================
exports.editBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No book found under this id' }] });
    }

    const { title, cover, authors, description, isbn } = req.body;
    if (
      title === book.title &&
      cover === book.cover &&
      isbn === book.isbn.toString() &&
      description === book.description &&
      arrayEquals(authors, book.authors)
    ) {
      return res.status(400).json({ errors: [{ msg: 'No changes detected' }] });
    } else {
      editedBook = await Book.findOneAndUpdate(
        { _id: bookId },
        { $set: { title, cover, authors, description, isbn } },
        //to return the object after the update was applied
        { new: true }
      );
      res.json(editedBook);
    }
  } catch (error) {
    console.log(error);
  }
};

// HELPER FUNCTIONS
// =========================

arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val.toString() === b[index].toString())
  );
};
