const express = require('express')
const router = express.Router()
const { createBook, getBooks, borrowBook } = require('../controllers/book.controllers')

router.get('/', getBooks)
router.post('/add-book', createBook)
router.post('/borrow', borrowBook)

module.exports = router