const fs = require('fs')
const path = './dbjson/productsDb.json'

class ProductsManagerFs {
    constructor() {
        this.path = path
    }

    readProducts = async () => {
        try {
            const productsJson = await fs.promises.readFile(path, 'utf-8')
            const productsJs = JSON.parse(productsJson)
            return productsJs
        } catch (error) {
            return []
        }

    }


    getProducts = async () => {
        const products = await this.readProducts()
        return products
    }

    getProduct = async () => {
        try {
            const products = await this.readProducts()
            
        } catch (error) {
            console.log('No hay productos')
        }
     }

    createProduct = async newProduct => {
        try {
            const products = await this.readProducts()
            if (products.length === 0) {
                newProduct.id = 1
            } else {
                newProduct.id = products[products.length - 1].id + 1
            }
            products.push(newProduct)
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async () => { }
    deleteProduct = async () => { }
}

module.exports = ProductsManagerFs