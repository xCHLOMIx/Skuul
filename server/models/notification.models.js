const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'students',
        required: true
    },
    message : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true,
        default: "Unread"
    }
})

module.exports = mongoose.model('Notification', notificationSchema)