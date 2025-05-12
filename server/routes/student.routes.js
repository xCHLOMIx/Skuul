const express = require('express')
const router = express.Router()
const { signUp, signIn, getStudents } = require('../controllers/student.controllers')

router.post('/', getStudents)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router