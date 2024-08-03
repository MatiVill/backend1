const { Router } = require('express')
const CartManagerFs = require('../managers/FileSystem/carts.manager')

const router = Router()

const cartsManagerFs = new CartManagerFs()

router.get('/', async (req, res) => {
    const carts = await cartsManagerFs.readCart()
    res.send({status: 'success', carts})
})


router.get('/:cid', async (req, res) => {
    try {
        const cartFound = await cartsManagerFs.getCartById(req.params)
        res.send({status: 'success', cartFound})
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/', async(req, res)=>{
    const newCart = await cartsManagerFs.createCart()
    res.send({status: 'success', newCart})
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid)
        const pid = parseInt(req.params.pid)
        await cartsManagerFs.createProductToCart(cid, pid)
        res.send({status: 'success', message:'Producto añadido correctamente'})
    } catch (error) {
        console.error('Error al añadir el producto al carrito')
    }
} )


module.exports = router