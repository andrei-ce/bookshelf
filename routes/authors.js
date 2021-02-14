const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authors');
const auth = require('../middleware/auth');

const { authorIdValidator, postAuthorValidator } = require('../middleware/validators');

// @route GET /authors
// @desc gets a list of all authors
router.get('/', authorController.getAuthors);

// @route GET /authors/:authorId
// @desc gets 1 author by ID
router.get('/:authorId', authorIdValidator, authorController.getAuthorById);

// @route POST /authors
// @desc post a new author
router.post('/', auth, postAuthorValidator, authorController.postAuthor);

// @route PUT /authors
// @desc edit 1 author by ID
router.put(
  '/:authorId',
  auth,
  [authorIdValidator, postAuthorValidator],
  authorController.editAuthorById
);

module.exports = router;
