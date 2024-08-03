const express = require("express")
const userRouter = require('./routes/users.router.js')
const productRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js')
const logger = require('morgan')
const { uploader } = require("./utils/multer.js")
// import express from "express"

const app = express()
const PORT = 8080


// para procesar los json del cliente
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))
app.use(logger('dev'))

app.use(function(req, res, next){
    console.log('Time: ', Date.now())
    next()
})

app.post('/', uploader.single('myFile'), (req, res)=>{
    res.send('archivo subido')
})
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use( (error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})

app.listen(8080, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})
