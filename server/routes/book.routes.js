const express = require('express')
const router = express.Router()
const { createBook, getBooks, borrowBook, returnBook, sendNotification, getBorrowers, getReaders } = require('../controllers/book.controllers')
const { requireAuth } = require('../middleware/admin.middleware')

router.get('/', getBooks)
router.post('/add', createBook)
router.post('/borrow', borrowBook)
router.post('/return', returnBook)
router.get('/notify', sendNotification)
router.get('/borrowers', requireAuth, getBorrowers)
router.get('/readers', getReaders)

module.exports = router