const express = require('express')
const router = express.Router()
const { signUp } = require('../controllers/student.controllers')

router.post('/signup', signUp)

module.exports = router