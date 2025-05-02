const Book = require('../models/book.models')
const Student = require('../models/student.models')
const Notification = require('../models/notification.models')
const { default: mongoose } = require('mongoose')

exports.getNotifications = async (req, res) => {
    const student = new mongoose.Types.ObjectId("67f3ded9cfae976d7cb9c618")
    const notifications = await Notification.aggregate([
        {
            $match: {
                student: student
            }
        },
        {
            $lookup: {
                from: 'students',
                foreignField: '_id',
                localField: 'student',
                as: 'student'
            }
        }
    ]).sort({ status: -1 })


    res.status(200).json(notifications)

    setTimeout(async () => {
        await Notification.updateMany({ student: student }, { $set: { status: "Read" } })
    }, 5000)
}

exports.sendNotification = async (req, res) => {
    const { deadline } = req.body
    const students = await Student.find({ books: { $not: { $size: 0 } } })

    try {
        if (!deadline) {
            throw Error("Deadline date is required")
        }
        for (const student of students) {
            const books = student.books
            const bookNames = []

            for (const book of books) {
                const theBook = await Book.findOne({ _id: book })
                bookNames.push(theBook.title)
            }

            await Notification.create({ student, books: bookNames, deadline })
        }
        res.status(200).json({ message: "Notifications sent" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
