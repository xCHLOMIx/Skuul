const Admin = require('../models/admin.models')
const jwt = require('jsonwebtoken')

const createToken = ({ id }) => {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, { 'expiresIn': '3d' })

    return token
}
//Admin sign up controller
exports.adminSignup = async (req, res) => {
    const { title, email, password } = req.body

    try {
        const admin = await Admin.signup(title, email, password)
        res.status(200).json(admin)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Admin sign in controller
exports.adminSignin = async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.signin(email, password)
        const token = createToken(admin._id)

        res.status(200).json({ title: admin.title, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}