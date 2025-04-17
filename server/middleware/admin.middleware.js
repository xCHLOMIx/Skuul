const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.models')

exports.requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({ error: "Admin needs to be authorized" })
    }
    
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)
        req.admin = Admin.findOne({ _id })

        next()
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}