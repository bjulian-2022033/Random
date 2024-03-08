'use strict'

import { Router } from 'express'
import { create } from './cart.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

//import { saveProduct } from '../product/product.controller.js'

const api = Router()

api.post('/create', [validateJwt], create)
//api.post('/generateBillPDF', generateBillPDF)

export default api