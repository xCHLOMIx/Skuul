const express = require('express')
const router = express.Router()
const { createBook, getBooks, borrowBook, returnBook, sendNotification, getBorrowers } = require('../controllers/book.controllers')

router.get('/', getBooks)
router.post('/add', createBook)
router.post('/borrow', borrowBook)
router.post('/return', returnBook)
router.get('/notify', sendNotification)
router.get('/borrowers', getBorrowers)

module.exports = router