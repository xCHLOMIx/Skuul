const express = require('express')
const router = express.Router()
const { adminSignup } = require('../controllers/admin.controllers')

router.post('/signup', adminSignup)

module.exports = router