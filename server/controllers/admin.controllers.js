const Admin = require('../models/admin.models')

exports.adminSignup = async (req, res) => {
    const { title, email, password } = req.body

    try {
        const admin = await Admin.signup(title, email, password)
        res.status(200).json(admin)
    } catch (error) {
        res.status(200).json({ error: error.message })
    }
}