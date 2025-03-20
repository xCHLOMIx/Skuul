const express = require('express')
const router = express.Router()
const { createBook, getBooks } = require('../controllers/book.controllers')

router.get('/', getBooks)
router.post('/add-book', createBook)

module.exports = router