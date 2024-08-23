const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.managers')

const router = Router()

router.get('/', (req, res) => {
    res.render('chat', {
        isMenu: true
     })
})

const users = [
    { id: '1', full_name: 'user 1', email: 'user1@gmail' },
    { id: '2', full_name: 'user 2', email: 'user2@gmail' },
    { id: '3', full_name: 'user 3', email: 'user3@gmail' }
]

router.get('/user', (req, res) => {
    const userLogin = {
        full_name: 'Mati',
        role: 'admin'
    }
    res.render('users', {
        user: userLogin,
        isAdmin: userLogin.role === 'admin',
        users,
        title: 'HOME',
        styles: 'styles.css'
    })
})

router.get('/home', async (req, res) =>{
    const {getProducts} = new ProductsManagerFs()
    const products =  await getProducts()
    res.render('home', {products})
})

router.get('/realtimeproducts', (req, res) =>{
    res.render('realtimeproducts', {})
})

module.exports = router