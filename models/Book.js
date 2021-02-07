const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    default: 'https://i.ibb.co/D9Yqggx/Horror-Cover017.jpg',
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
