const express = require('express')
const router = express.Router()
const { createSchool } = require('../controllers/school.controllers');

router.post('/', createSchool)

module.exports = router