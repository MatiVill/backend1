const fs = require('fs')
const path = './dbjson/cartsDb.json'

class CartManagerFs {
    constructor() {
        this.path
    }

    readCart = async () => {
        try {
            const cartsJson = await fs.promises.readFile(path, 'utf-8')
            const cartsJs = JSON.parse(cartsJson)
            return cartsJs
        } catch (error) {
            return []
        }
    }


    createCart = async () => {
        try {
            const carts = await this.readCart()
            const newCart = {
                products: []
            }
            if (carts.length === 0) {
                newCart.id = 1
            } else {
                newCart.id = carts[carts.length - 1].id + 1
            }
            carts.push(newCart)
            await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (objparams) => {
        const { cid } = objparams
        try {
            const Carts = await this.readCart()
            const FoundCarts = Carts.find(element => element.id === parseInt(cid))
            if (FoundCarts) {
                return FoundCarts
            } else {
                return ('Carrito solicitado no existe')
            }
        } catch (error) {
            return console.log(error)
        }
    }

    createProductToCart = async (cid, pid) => {
        const carts = await this.readCart()
        const cart = carts.find(e => e.id === cid)
        const productIndex = cart.products.findIndex(p => p.pid === pid)
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++
        } else {
            cart.products.push({
                pid,
                quantity: 1
            })
        }
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
    }

}

module.exports = CartManagerFs
