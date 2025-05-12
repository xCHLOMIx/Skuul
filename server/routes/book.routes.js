const express = require('express')
const router = express.Router()
const { createBook, getBooks, borrowBook, returnBook, getBorrowers, getReaders, availableBooks } = require('../controllers/book.controllers')
const { requireAuth } = require('../middleware/admin.middleware')

router.get('/', getBooks)
router.get('/available', availableBooks)
router.post('/add', createBook)
router.post('/borrow', borrowBook)
router.post('/return', returnBook)
router.get('/borrowers', getBorrowers)
router.get('/readers', getReaders)

module.exports = router