'use strict'

import { Schema, model } from 'mongoose'

const productSchema = Schema({
    nameProduct: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
})

export default model('product', productSchema)