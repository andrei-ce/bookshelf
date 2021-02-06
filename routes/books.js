const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
const { bookIdValidator, postBookValidator } = require('../middleware/validators');

// @route GET /authors
// @desc gets a list of all authors
router.get('/', bookController.getBooks);

// @route GET /authors/:authorId
// @desc gets 1 author by ID
router.get('/:bookId', bookIdValidator, bookController.getBookById);

// @route POST /authors
// @desc post a new author
router.post('/', postBookValidator, bookController.postBook);

// // @route PUT /authors
// // @desc edit 1 author by ID
// router.put(
//   '/:bookId',
//   [bookIdValidator, postBookValidator],
//   bookController.editAuthorById
// );

module.exports = router;
