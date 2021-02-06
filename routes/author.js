const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');
const {
  getAuthorByIdValidator,
  postAuthorValidator,
} = require('../middleware/validators');

// @route GET /authors
// @desc gets a list of all authors
router.get('/', authorController.getAuthors);

// @route GET /authors/:authorId
// @desc gets 1 author by ID
router.get('/:authorId', getAuthorByIdValidator, authorController.getAuthorById);

// @route POST /authors
// @desc post a new author
router.post('/', postAuthorValidator, authorController.postAuthor);

// @route PUT /authors
// @desc edit 1 author by ID
router.put(
  '/:authorId',
  [getAuthorByIdValidator, postAuthorValidator],
  authorController.editAuthorById
);

module.exports = router;
