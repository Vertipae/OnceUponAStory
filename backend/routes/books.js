const express = require("express")
const router = express.Router()
const Book = require("../models/Books")

// @route GET api/books
// @desc Get all books
// @access Public
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({})
    res.json(books)
  } catch (err) {
    console.log(err)
    res.status(500).send("Server Error")
  }
})

// @route GET api/books/:id
// @desc Get one book
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ msg: "Book not found" })
    res.json(book)
  } catch (err) {
    console.log(err)
    res.status(500).send("Server Error")
  }
})

// @route POST api/books
// @desc Add new book
// @access Public
router.post("/", async (req, res) => {
  const { title, description, publish, author, genre } = req.body
  try {
    const newBook = new Book({
      title,
      description,
      publish,
      author,
      genre,
    })
    const book = await newBook.save()
    res.send(book)
  } catch (err) {
    console.log(err)
    res.status(500).send("Save failed")
  }
})

// @route PUT api/books
// @desc Update book
// @access Public
router.put("/:id", async (req, res) => {
  //   res.send("Hello")
  const { title, description, publish, author, genre } = req.body
  const bookFields = {}
  if (title) bookFields.title = title
  if (description) bookFields.description = description
  if (publish) bookFields.publish = publish
  if (author) bookFields.author = author
  if (genre) bookFields.genre = genre

  try {
    let book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ msg: "Book not found" })

    await Book.findOneAndUpdate(
      req.params.id,
      { $set: bookFields },
      { new: true }
    )
    res.send(book)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Update failed")
  }
})

// @route DELETE api/books
// @desc Delete book
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    let book = await Book.findById(req.params.id)

    if (!book) return res.status(404).json({ msg: "Book not found" })

    await Book.findByIdAndRemove(req.params.id)
    res.send(book)
  } catch (err) {
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

module.exports = router
