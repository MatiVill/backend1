const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.managers')
// import { Router } from 'espress'

const router = Router()

const productsManagerFs = new ProductsManagerFs()

router.get('/', async (req, res)=>{
    try {
        const productsDb = await productsManagerFs.getProducts()
        res.send({status: 'success', data: productsDb})
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const productFound = await productsManagerFs.getProduct(req.params)
        res.send(productFound)
    } catch (error) {
        res.send('Producto no encontrado')
    }
})

router.post('/', async (req, res) =>{
    try {
        const { body } = req
        const response = await productsManagerFs.createProduct(body)
        res.send({status:'succes', data: response})
    } catch (error) {
        console.log(error)
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const updateProduct = await productsManagerFs.updateProduct(req.params, req.body)
        res.send({status: 'success', updateProduct})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const deleteProduct = await productsManagerFs.deleteProduct(req.params)
        res.send({status: 'succes', deleteProduct})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
// export default router