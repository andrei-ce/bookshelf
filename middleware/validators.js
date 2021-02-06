const { check, param } = require('express-validator');

exports.getAuthorByIdValidator = [
  param('authorId', 'Invalid author id format').isLength(24),
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
