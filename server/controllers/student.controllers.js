const Student = require('../models/student.models')
const jwt = require('jsonwebtoken')

const createToken = async (id) => {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '3d' })

    return token
}

exports.signUp = async (req, res) => {
    const { fullNames, theClass, email, pin, schoolCode } = req.body

    try {
        const student = await Student.signup(fullNames, theClass, email, pin, schoolCode)
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.signIn = async (req, res) => {
    const { email, pin } = req.body

    try {
        const student = await Student.signIn(email, pin)
        const token = await createToken(student._id)
        res.status(200).json({ id: student._id, name: student.firstName, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getStudents = async (req,res) => {
    const students = await Student.find()

    res.status(200).json(students);
}