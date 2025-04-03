const Book = require('../models/book.models')
const Student = require('../models/student.models')
const Notification = require('../models/notification.models')

exports.getBooks = async (req, res) => {
    const books = await Book.find().sort({ title: 1 })

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

exports.getBorrowers = async (req, res) => {
    const borrowers = await Student.aggregate([{
        $lookup: {
            from: 'books',
            localField: 'books',
            foreignField: '_id',
            as: 'books'
        }
    }])

    res.status(200).json(borrowers)
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

exports.getNotifications = async (req, res) => {
    const student = "67ebd6821603e697847fbd1e"
    const notifications = await Notification.find({ student: student })

    for (const notification of notifications) {
        await Notification.updateMany({ student: student }, { $set: { status: "Read" } })
    }

    res.status(200).json({ notifications })
}

exports.sendNotification = async (req, res) => {
    const students = await Student.find({ books: { $not: { $size: 0 } } })

    try {
        for (const student of students) {
            const books = student.books
            const bookNames = []

            for (const book of books) {
                const theBook = await Book.findOne({ _id: book })
                bookNames.push(theBook.title)
            }

            await Notification.create({
                student,
                books: bookNames
            })
        }
        res.status(200).json({ message: "Notifications sent" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
