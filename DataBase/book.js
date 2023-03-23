const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
