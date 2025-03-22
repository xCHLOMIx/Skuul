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
    theClass: {
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

studentSchema.statics.signup = async function (firstName, lastName, theClass, email, password) {
    // if (!firstName || !lastName || !theClass || !email || !password) {
    //     throw Error("All fields are required!")
    // }

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
    const student = await this.create({ firstName, lastName, theClass, email, password: thePassword })

    return student
}

studentSchema.statics.signIn = async function (email, password) {
    const exists = await this.findOne({ email: email })

    if (!email || !password) {
        throw Error("All fields are required")
    }

    if (!exists) {
        throw Error("No Student with such email!")
    }

    const isAuth = await bcrypt.compare(password, exists.password)

    if (!isAuth) {
        throw Error("Incorrect Password")
    }

    return exists
}

module.exports = mongoose.model('Student', studentSchema)