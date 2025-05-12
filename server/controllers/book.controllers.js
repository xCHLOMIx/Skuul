const Book = require('../models/book.models')
const Student = require('../models/student.models')
const bcrypt = require('bcryptjs')

exports.getBooks = async (req, res) => {
    const books = await Book.find().sort({ title: 1 })

    if (books.length <= 0) return res.status(404).json({ message: "No books found" })

    res.status(200).json(books)
}

exports.availableBooks = async (req, res) => {
    const books = await Book.find({ status: "Available" })

    if (books.length <= 0) return res.status(404).json({ message: "No books found" })

    res.status(200).json(books)
}

exports.createBook = async (req, res) => {
    const { title, author, quantity } = req.body

    try {
        if (!title || !author || !quantity) {
            throw Error("All fields are required")
        }
        const book = await Book.create({ title, author, quantity })
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.borrowBook = async (req, res) => {
    const { student, borrow, pin } = req.body


    try {
        if (!student || borrow.length <= 0 || !pin) {
            throw Error("All fields are required");
        }

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
            } else {
                throw Error(`${theBook.title} is not available`)
            }
        }
        books = [...books, ...borrowed]

        const check = await bcrypt.compare(pin, theStudent.pin)

        if (pin.length < 6) throw Error("PIN must be 6 digits");
        if (!check) throw Error("Incorrect password");

        await Student.findOneAndUpdate({ _id: student }, { $set: { books: books } })

        res.status(200).json({ student: theStudent.firstName, books })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.returnBook = async (req, res) => {
    const { returns, student, summary } = req.body

    try {
        const theStudent = await Student.findOne({ _id: student })
        let books = theStudent.books
        let read = theStudent.booksDone

        const returned = []
        for (const book of returns) {
            const theBook = await Book.findOne({ _id: book })
            let quantity = theBook.quantity

            if (!theStudent['books'].includes(book)) {
                throw Error(`You did not borrow ${theBook.title}`)
            }

            if (summary) {
                read += 1
            }

            quantity = theBook.quantity += 1

            await Book.findOneAndUpdate(
                { _id: book },
                {
                    $set: {
                        status: "Available",
                        quantity: quantity,
                    }
                }
            )

            returned.push(theBook._id)
        }

        books = books.filter((book) => !returns.includes(String(book)))

        await Student.findOneAndUpdate(
            { _id: student },
            {
                $set: {
                    books: books,
                    booksDone: read
                }
            }
        )

        res.status(200).json({ message: `Successfully returned all books` })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getBorrowers = async (req, res) => {
    const borrowers = await Student.aggregate([{
        $lookup: {
            from: 'books',
            localField: 'books',
            foreignField: '_id',
            as: 'books'
        }
    }]).match({ books: { $not: { $size: 0 } } })

    res.status(200).json(borrowers)
}

exports.getReaders = async (req, res) => {
    const readers = await Student.find({ booksDone: { $gt: 0 } }).sort({ booksDone: -1, firstName: 1 })

    res.status(200).json(readers)
}

// exports.getBorrowers = async (req, res) => {
//     const borrowers = await Student.find({ books: { $not: { $size: 0 } } })
//     const theBorrowers = []
//     for (const borrower of borrowers) {
//         let theBooks = []
//         for (const book of borrower.books) {
//             const theBook = await Book.findOne({ _id: book })
//             theBooks.push(theBook.title)
//         }

//         const theBorrower = {
//             _id: borrower._id,
//             firstName: borrower.firstName,
//             lastName: borrower.lastName,
//             theClass: borrower.theClass,
//             books: theBooks
//         }

//         theBorrowers.push(theBorrower)
//     }

//     res.status(200).json(theBorrowers)
// }