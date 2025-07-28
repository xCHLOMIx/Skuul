const mongoose = require('mongoose')
const Counter = require('../models/counter.models')
const schoolSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

schoolSchema.pre('save', async function (next) {
    if (this.isNew && !this._id) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'schools' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )

        this._id = `SCH${String(counter.seq).padStart(5, '0')}`
    }
    
    next()
})

module.exports = mongoose.model('School', schoolSchema)