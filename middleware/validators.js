const { check, param } = require('express-validator');

// AUTHOR VALIDATORS
// =========================
exports.authorIdValidator = [
  param('authorId', 'Invalid author id format').isLength({ min: 24, max: 24 }),
];

exports.postAuthorValidator = [
  check(
    'firstName',
    'Please include a first name with a minimum of 2 characters'
  ).isLength({ min: 2 }),
  check(
    'lastName',
    'Please include a last name with a minimum of 2 characters'
  ).isLength({ min: 2 }),
];

// BOOK VALIDATORS
// =========================
exports.bookIdValidator = [
  param('bookId', 'Invalid book id format').isLength({ min: 24, max: 24 }),
];

exports.postBookValidator = [
  check('title', 'Please include a title of min 3 characters').isLength({ min: 3 }),
];
