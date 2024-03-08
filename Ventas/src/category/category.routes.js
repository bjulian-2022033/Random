'use strict'

import { Router } from 'express'
import { categoryUpdate, deleteC, saveCategory, get } from './category.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()
api.post('/saveCategory', saveCategory)
api.put('/categoryUpdate/:id', categoryUpdate)
api.delete('/deleteC/:id', deleteC)
api.get('/get', [validateJwt],get)

export default api