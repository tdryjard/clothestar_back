const express = require('express')
const Product = require('../../controllers/product/product.controller')

const router = express.Router()

router.get('/find', Product.find)

router.post('/create', Product.create)

router.put('/update/:id', Product.update)

router.delete('/delete/:productId', Product.delete)

module.exports = router