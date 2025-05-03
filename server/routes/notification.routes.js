const express = require('express')
const { sendNotification, getNotifications } = require('../controllers/notification.controllers')
const router = express.Router()

router.get('/:id', getNotifications)
router.post('/send', sendNotification)

module.exports = router