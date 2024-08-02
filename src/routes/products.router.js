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

router.post('/', async (req, res) =>{
    try {
        const { body } = req
        const response = await productsManagerFs.createProduct(body)
        res.send({status:'succes', data: response})
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
// export default router