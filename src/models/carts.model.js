const {Schema, model} = require('mongoose')

const collections = 'carts'

const CartSchema = new Schema({
    // userID:
    products: {
        type: [{
            product: {
                type:Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity:{
                type: Number
            }
        }]
    }
})

const cartModel = model(collections, CartSchema)

module.exports = {
    cartModel
}