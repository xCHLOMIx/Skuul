const Book = require('../models/book.models')
const Borrow = require('../models/borrow.models')
const Return = require('../models/return.models')

exports.createBook = async (req, res) => {
    const { title, author } = req.body

    try {
        const book = await Book.create({ title, author })
        res.status(200).json({ book })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getBooks = async (req, res) => {
    const books = await Book.find()

    if (books.length <= 0) return res.status(404).json({ message: "No books found" })

    res.status(200).json({ books })
}

exports.borrowBook = async (req, res) => {
    const { book, student } = req.body
}