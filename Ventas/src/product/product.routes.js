'use strict'

import { Router } from 'express'
import {
    outofStock,
    searchProduct,
    deleteP,
    productUpdate,
    saveProduct,
    getProducts,
    getProductsByCategory,
    getTopSellingProducts
} from '../product/product.controller.js'
import { validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/saveProduct', saveProduct)
api.put('/productUpdate/:id', productUpdate)
api.delete('/deleteP/:id', deleteP)
api.get('/searchProduct',searchProduct)

api.get('/getProducts', [validateJwt], getProducts)
api.get('/outofStock', outofStock)
api.get('/getProductsByCategory/:id',getProductsByCategory)
api.get('/getTopSellingProducts', getTopSellingProducts)

export default api