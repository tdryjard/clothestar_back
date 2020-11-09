const express = require('express')
const Star = require('../../controllers/star/star.controller')

const router = express.Router()

router.get('/find', Star.find)

router.post('/create', Star.create)

router.put('/update/:id', Star.update)

router.delete('/delete/:productId', Star.delete)

module.exports = router