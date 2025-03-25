const Student = require('../models/student.models')
const jwt = require('jsonwebtoken')

const createToken = async (id) => {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '3d' })

    return token
}

exports.signUp = async (req, res) => {
    const { firstName, lastName, theClass, email, password } = req.body

    try {
        const student = await Student.signup(firstName, lastName, theClass, email, password)
        res.status(200).json({ student })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const student = await Student.signIn(email, password)
        const token = await createToken(student._id)
        res.status(200).json({ student: student.firstName, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}