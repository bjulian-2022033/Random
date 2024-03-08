'use strict'

import { Schema, model } from 'mongoose'

const CartSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    products: [{
           product:{
            type: Schema.ObjectId,
            ref: 'product'
           },
           cant:{
            type: Number,
            default: 0
        },
        
    }],
   
    total: {
        type: Number,
        default: 0
    }
})

export default model('Cart', CartSchema)