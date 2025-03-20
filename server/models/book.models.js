const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Title must have atleast 3 characters']
    },
    author: {
        type: String,
        required: true,
        minlength: [3, 'Author must have atleast 3 characters']
    },
    status: {
        type: String,
        default: "Available",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)