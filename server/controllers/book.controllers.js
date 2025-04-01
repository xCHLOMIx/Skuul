const Book = require('../models/book.models')
const Student = require('../models/student.models')

exports.getBooks = async (req, res) => {
    const books = await Book.find().sort({ title : 1})

    if (books.length <= 0) return res.status(404).json({ message: "No books found" })

    res.status(200).json(books)
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
    const { student, borrow } = req.body

    try {
        const theStudent = await Student.findOne({ _id: student })
        let books = theStudent['books']

        const borrowed = []
        for (const book of borrow) {
            const theBook = await Book.findOne({ _id: book })
            let quantity = theBook.quantity
            let status = theBook.status

            if (books.includes(theBook._id)) {
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
                borrowed.push(theBook._id)
                console.log(borrowed)
            } else {
                throw Error(`${theBook.title} is not available`)
            }
        }
        books = [...books, ...borrowed]


        await Student.findOneAndUpdate({ _id: student }, { $set: { books: books } })

        res.status(200).json({ student: theStudent.firstName, books })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// Just to check if Wakatime works
exports.returnBook = async (req, res) => {
    const { returns, student } = req.body

    try {
        const theStudent = await Student.findOne({ _id: student })
        let books = theStudent.books

        const returned = []
        for (const book of returns) {
            const theBook = await Book.findOne({ _id: book })
            let quantity = theBook.quantity

            if (!theStudent['books'].includes(book)) {
                throw Error(`You did not borrow ${theBook.title}`)
            }

            quantity = theBook.quantity += 1

            await Book.findOneAndUpdate(
                { _id: book },
                {
                    $set: {
                        status: "Available",
                        quantity: quantity
                    }
                }
            )

            returned.push(theBook._id)
        }

        books = books.filter((book) => !returns.includes(String(book)))
        console.log(books)

        await Student.findOneAndUpdate(
            { _id: student },
            {
                $set: {
                    books: books
                }
            }
        )

        res.status(200).json({ message: `Successfully returned all books` })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}