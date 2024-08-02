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

    getProduct = async (objectparams) => {
        const { pid } = objectparams
        try {
            const products = await this.readProducts()
            const Found = products.find((product) => product.id === parseInt(pid))
            return Found
        } catch (error) {
            console.log("Producto no encontrado")
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

    updateProduct = async (objparams, objbody) => {
        const { pid } = objparams
        const { name, description, price, stock } = objbody
        if (!name || !description || !price || !stock) {
            console.log("ingresar datos del producto para actualizar")
            return
        } else {
            const listadoProductos = await this.readProducts()
            const newProductsList = listadoProductos.map((elemento) => {
                if (elemento.id === parseInt(pid)) {
                    const updatedProduct = {
                        ...elemento,
                        name,
                        description,
                        price,
                        stock
                    }
                    return updatedProduct
                } else {
                    return elemento
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, '\t'))
        }
    }
}

deleteProduct = async (objparams) => {
    const { pid } = objparams
    const allProducts = await this.readProducts()
    const productsNoFound = allProducts.filter(
        (elemento) => elemento.id !== parseInt(pid)
    )
    await fs.promises.writeFile(this.path, JSON.stringify(productsNoFound, null, '\t'))
}


module.exports = ProductsManagerFs