require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT
const bookRoutes = require('./routes/book.routes')
const studentRoutes = require('./routes/student.routes')

mongoose.connect('mongodb://localhost:27017/Skuul')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected and running PORT ${PORT}`)
        })
    })
    .catch((err) => console.log(err.message))

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/books', bookRoutes)
app.use('/students', studentRoutes)