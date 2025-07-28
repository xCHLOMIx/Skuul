const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const School = require('./school.models')

const studentSchema = new mongoose.Schema({
    fullNames: {
        type: String,
        required: true,
        minlength: [16, 'Full names must have atleast 16 characters']
    },
    schoolCode: {
        type: String,
        required: true,
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
    pin: {
        type: String,
        required: true,
    },
    books: {
        type: [mongoose.Types.ObjectId],
        ref: 'book'
    },
    booksDone: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

studentSchema.statics.signup = async function (fullNames, theClass, email, pin, schoolCode) {
    if (!fullNames || !theClass || !email || !pin || !schoolCode) {
        throw Error("All fields are required")
    }

    const school = await School.findOne({ _id: schoolCode })

    if (!school) {
        throw Error("School not found. Format: SCH-XXXXX")
    }

    if (fullNames.length < 16) {
        throw Error("Full names must have at least 16 characters")
    }

    if (!validator.isEmail(email)) {
        throw Error("Enter a valid email")
    }

    const exist = await this.findOne({ email: email })

    if (exist) {
        throw Error("The Email already exists")
    }

    if (pin.length < 6 || pin.length > 6) {
        throw Error("PIN must be 6 digits")
    }

    const thePin = await bcrypt.hash(pin, 10)
    const student = await this.create({ fullNames, theClass, email, pin: thePin, schoolCode })

    return student
}

studentSchema.statics.signIn = async function (email, pin) {
    const student = await this.findOne({ email: email })

    if (!email || !pin) {
        throw Error("All fields are required")
    }

    if (!student) {
        throw Error("No Student with such email!")
    }

    const isAuth = await bcrypt.compare(pin, student.pin)

    if (!isAuth) {
        throw Error("Incorrect pin")
    }

    return student
}

module.exports = mongoose.model('Student', studentSchema)