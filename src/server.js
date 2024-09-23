const express = require("express")
const userRouter = require('./routes/users.router.js')
const productRouter = require('./routes/products.router.js')
const pruebaRouter = require('./routes/pruebas.router.js')
const viewsRouter = require('./routes/views.router.js')
const cartRouter = require('./routes/carts.router.js')
const logger = require('morgan')
const { uploader } = require("./utils/multer.js")
const handlebars = require('express-handlebars')
const {chatSocket} = require('./utils/chatSocket.js')

const {Server} = require('socket.io')
const ProductsManagerFs = require("./managers/FileSystem/products.managers.js")
const { connect } = require("mongoose")
const { connectDB } = require("./config/index.js")
// import express from "express"

const app = express()
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})

const io = new Server(httpServer)

chatSocket(io)

// const ioMiddleware = (io) => (req, res, next) =>{
//     req.io=io
//     next()
// }
// app.use(ioMiddleware(io))

// para procesar los json del cliente
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))
app.use(logger('dev'))

// config motor plantillas
app.engine('handlebars', handlebars.engine())
//config carpeta donde debe tomar las plantillas
app.set('views', __dirname + '/views')
//config extensión plantillas
app.set('view engine', 'handlebars')

connectDB()

app.post('/', uploader.single('myFile'), (req, res)=>{
    res.send('archivo subido')
})

app.use('/', viewsRouter)
app.use('/pruebas', pruebaRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


app.use( (error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})

const productSocket = (io) =>{
    io.on('connection', async socket => {
        console.log('Nuevo cliente conectado')
        const {getProducts, createProduct, deleteProduct } = new ProductsManagerFs()
        const products = await getProducts()
        
        socket.emit('productsList', products)

        socket.on('addProduct', async data => {
            await createProduct(data)
        })

        socket.on('deleteProduct', async data => {
            await deleteProduct(data)
        })
})

}

productSocket(io)