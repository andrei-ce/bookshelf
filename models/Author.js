const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  // or?
  // get: () => {return `${this.name.first} ${this.name.first}`}
});

// Virtuals: getter function
authorSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.first}`;
});

module.exports = mongoose.model('Author', authorSchema);
