const Book = require('../models/book.models')
const Student = require('../models/student.models')

exports.getBooks = async (req, res) => {
    const books = await Book.find()

    if (books.length <= 0) return res.status(404).json({ message: "No books found" })

    res.status(200).json({ books })
}

exports.createBook = async (req, res) => {
    const { title, author, quantity } = req.body

    try {
        const book = await Book.create({ title, author, quantity })
        res.status(200).json({ book })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.borrowBook = async (req, res) => {
    const { user, book } = req.body
    try {
        const student = await Student.findOne({ _id: user })
        let books = student['books']

        const theBook = await Book.findOne({ _id: book })
        let quantity = theBook.quantity
        let status = theBook.status

        if (books.includes(book)) {
            throw Error(`You already have ${theBook.title}`)
        }

        if (status === "Available") {
            quantity -= 1
            await Book.findOneAndUpdate(
                { _id: book },
                {
                    $set: {
                        quantity: quantity,
                        status: quantity === 0 ? "Unavailable" : "Available"
                    }
                }
            )
        } else {
            throw Error(`${theBook.title} is not available`)
        }

        books = [...books, book]

        await Student.findOneAndUpdate({ _id: user }, { $set: { books: books } })

        res.status(200).json({ student: student.firstName, theBook })
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