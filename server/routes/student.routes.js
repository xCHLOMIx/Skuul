const express = require('express')
const router = express.Router()
const { signUp, signIn } = require('../controllers/student.controllers')
const { getNotifications } = require('../controllers/book.controllers')

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/notifications', getNotifications)

module.exports = router