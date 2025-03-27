const express = require('express')
const router = express.Router()
const { createBook, getBooks, borrowBook, returnBook } = require('../controllers/book.controllers')

router.get('/', getBooks)
router.post('/add-book', createBook)
router.post('/borrow', borrowBook)
router.post('/return', returnBook)

module.exports = router