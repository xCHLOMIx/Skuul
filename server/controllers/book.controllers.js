const Book = require('../models/book.models')
const Student = require('../models/student.models')

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
    const { user, book } = req.body
    try {
        const student = await Student.findOne({ _id: user })
        let books = student['books']

        if (books.includes(book)) {
            throw Error("Already have that book")
        }

        books = [...books, book]
        const theStudent = await Student.findOneAndUpdate({ _id: user }, { $set : { books : books }})
        res.status(200).json({ theStudent })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.returnBook = async (req, res) => {
    const { book, student } = req.body

    try {
        const theBook = await Return.create({ book, student })
        res.status(200).json({ theBook })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}