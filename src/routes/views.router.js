const { Router } = require('express')

const router = Router()

const users = [
    { id: '1', full_name: 'user 1', email: 'user1@gmail' },
    { id: '2', full_name: 'user 2', email: 'user2@gmail' },
    { id: '3', full_name: 'user 3', email: 'user3@gmail' }
]

router.get('/', (req, res) => {
    const userLogin = {
        full_name: 'Mati',
        role: 'admin'
    }
    res.render('index', {
        user: userLogin,
        isAdmin: userLogin.role === 'admin',
        users,
        title: 'HOME',
        styles: 'styles.css'
    })
})


module.exports = router