const express = require('express')
const Advice = require('../../controllers/advice/advice.controller')

const router = express.Router()

router.get('/find/:id', Advice.findByProduct)

router.post('/create', Advice.create)

module.exports = router