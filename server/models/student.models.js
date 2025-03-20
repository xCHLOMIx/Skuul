const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must have atleast 3 characters']
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'Last name(s) must have atleast 3 characters']
    },
    class: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)

studentSchema.statics.signup = async function (firstname, lastname, email, password) {
    if (!validator.isEmail(email)) {
        throw Error("Enter a valid email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Enter a strong password")
    }

    const exist = await this.findOne({ email: email })

    if (exist) {
        throw Error("The Email already exists")
    }

    const thePassword = await bcrypt.hash(password, 10)
    const student = { firstname, lastname, email, password: thePassword }

    return student
}