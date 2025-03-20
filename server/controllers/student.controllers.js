const Student = require('../models/student.models')

exports.signUp = async (req, res) => {
    const { firstName, lastName, theClass, email, password } = req.body

    try {
        const student = await Student.signup(firstName, lastName, theClass, email, password)
        res.status(200).json({ student })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}