const mongoose = require("mongoose");

const currentBookSchema = new mongoose.Schema({
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

const CurrentBook = mongoose.model("CurrentBook", currentBookSchema);

module.exports = CurrentBook;
