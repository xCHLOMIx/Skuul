// This is a model to increment by one every time
const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seq: {
        type: Number
    }
})

module.exports = mongoose.model('Counter', counterSchema)