const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

//Admin sign up function
adminSchema.statics.signup = async function (title, email, password) {
    if (!title || !email || !password) throw Error("All fields are required")

    const theTitle = await this.findOne({ title: title })

    if (theTitle) {
        throw Error(`We already have a ${title}`)
    }

    const exists = await this.findOne({ email: email })

    if (exists) {
        throw Error("Email already exists")
    }


    if (!validator.isEmail(email)) {
        throw Error("Invalid email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Please create a strong password")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = this.create({ title, email, password: hashedPassword })

    return admin
}

//Admin sign in function
adminSchema.statics.signin = async function (email, password) {
    if (!email || !password) throw Error("All fields are required")

    const admin = await this.findOne({ email: email })

    if (!admin) {
        throw Error("No admin with that email")
    }

    const isAuth = await bcrypt.compare(password, admin.password)

    if (!isAuth) {
        throw Error("Incorrect Password")
    }

    return admin
}

module.exports = mongoose.model('Admin', adminSchema)