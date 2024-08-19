const express = require("express")
const userRouter = require('./routes/users.router.js')
const productRouter = require('./routes/products.router.js')
const pruebaRouter = require('./routes/pruebas.router.js')
const viewsRouter = require('./routes/views.router.js')
const cartRouter = require('./routes/carts.router.js')
const logger = require('morgan')
const { uploader } = require("./utils/multer.js")
const handlebars = require('express-handlebars')

const {Server} = require('socket.io')
// import express from "express"

const app = express()
const PORT = 8080

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

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})

const io = new Server(httpServer)