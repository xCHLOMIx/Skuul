const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({
    book : {
        type: mongoose.Types.ObjectId,
        ref: 'book',
        required: true
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'student',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('borrow', borrowSchema)