const mongoose = require("mongoose")

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publish: {
    type: Date,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
})

module.exports = mongoose.model("books", BooksSchema)
