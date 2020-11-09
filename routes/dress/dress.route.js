const express = require('express')
const Dress = require('../../controllers/dress/dress.controller')

const router = express.Router()

router.get('/find', Dress.find)

router.post('/find/products', Dress.findProductDress)

router.post('/create', Dress.create)

router.put('/update/:id', Dress.update)

router.delete('/delete/:productId', Dress.delete)

module.exports = router