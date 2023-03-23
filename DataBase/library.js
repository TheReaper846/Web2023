const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  status: {
    type: Number,
    required: true,
  },
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
