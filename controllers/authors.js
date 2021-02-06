const Author = require('../models/Author');
const { validationResult } = require('express-validator');

// GET AUTHORS
// =========================
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    console.log(error);
  }
};

// GET AUTHOR BY ID
// =========================
exports.getAuthorById = async (req, res, next) => {
  try {
    // validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //controller logic
    const { authorId } = req.params;
    const author = await Author.findById(authorId);

    if (!author) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No author found under this id' }] });
    }

    res.json(author);
  } catch (error) {
    console.log(error);
  }
};

// POST AUTHOR
// =========================
exports.postAuthor = async (req, res, next) => {
  try {
    // validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //controller logic
    const authorExists = await Author.find({ firstName, lastName });
    if (authorExists) {
      return res.status(422).json({ errors: [{ msg: 'This author already exists' }] });
    }

    const { firstName, lastName } = req.body;
    const author = new Author({ firstName, lastName });
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    console.log(error);
  }
};

// EDIT AUTHOR BY ID
// =========================
exports.editAuthorById = async (req, res, next) => {
  try {
    // validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //controller logic
    const { authorId } = req.params;
    let author = await Author.findById(authorId);
    if (!author) {
      return res.status(422).json({ errors: [{ msg: 'This author does not exist' }] });
    }

    const { firstName, lastName } = req.body;
    if (`${firstName} ${lastName}` === author.fullName) {
      return res.status(422).json({ errirs: [{ msg: 'No changes detected' }] });
    } else {
      editedAuthor = await Author.findOneAndUpdate(
        { _id: authorId },
        { $set: { firstName, lastName } },
        //to return the object after the update was applied
        { new: true }
      );
      res.json(editedAuthor);
    }
  } catch (error) {
    console.log(error);
  }
};
