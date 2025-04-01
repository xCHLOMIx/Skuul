const express = require('express')
const router = express.Router()
const { createBook, getBooks, borrowBook, returnBook, sendNotification } = require('../controllers/book.controllers')

router.get('/', getBooks)
router.post('/add-book', createBook)
router.post('/borrow', borrowBook)
router.post('/return', returnBook)
router.get('/notify', sendNotification)

module.exports = router