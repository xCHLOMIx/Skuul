const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const classes = ["L3 SOD", "L3 NIT", "L3 MM", "L4 SOD", "L4 NIT", "L4 MM", "L5 SOD", "L5 NIT", "L5 MM"]
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
        enum: {
            values: classes,
            message: `Classes supported are ${classes.join()}`
        }
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
    }
}, { timestamps: true })

studentSchema.statics.signup = async function (firstName, lastName, theClass, email, pin) {
    if (!firstName || !lastName || !theClass || !email || !pin) {
        throw Error("All fields are required!")
    }

    if (!validator.isEmail(email)) {
        throw Error("Enter a valid email")
    }

    const exist = await this.findOne({ email: email })

    if (exist) {
        throw Error("The Email already exists")
    }

    if (pin.length < 6 || pin.length > 6 ) {
        throw Error("PIN must be 6 digits")
    }

    const thePin = await bcrypt.hash(pin, 10)
    const student = await this.create({ firstName, lastName, theClass, email, pin: thePin })

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