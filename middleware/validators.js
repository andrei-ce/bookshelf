const { check, param, isMongoId, validationResult } = require('express-validator');

// AUTHOR VALIDATORS
// =========================
exports.authorIdValidator = [
  // alternative: isLength({ min: 24, max: 24})
  param('authorId', 'Invalid author id format').isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.postAuthorValidator = [
  check('firstName', 'Please include a first name with a minimum of 2 characters')
    .trim()
    .isLength({ min: 2 }),
  check('lastName', 'Please include a last name with a minimum of 2 characters')
    .trim()
    .isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

// BOOK VALIDATORS
// =========================
exports.bookIdValidator = [
  param('bookId', 'Invalid book id format').isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.postBookValidator = [
  check('title', 'Please include a title of min 3 characters')
    .trim()
    .isLength({ min: 3 }),
  check('cover', 'Please enter a valid url').optional().trim().isURL(),
  check('description', 'Please enter a description of at least 10 characters')
    .trim()
    .isLength({ min: 10, max: 300 }),
  check('isbn', 'Please include a valid ISBN-13').trim().isISBN(13),
  check('authors', 'Please include at least one author')
    .isArray()
    .isLength({ min: 1 }),
  // check('authors').custom((authors) => {
  //   authors.map((author) => {
  //     if (author.length()) {
  //       throw new Error('Authors are not in our database yet');
  //     } else {
  //       return true;
  //     }
  //   });
  // }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
