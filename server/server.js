require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT
const bookRoutes = require('./routes/book.routes')
const studentRoutes = require('./routes/student.routes')
const adminRoutes = require('./routes/admin.routes')
const notificationRoutes = require('./routes/notification.routes')

mongoose.connect(process.env.MONGO_URI)
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

app.use('/api/books', bookRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/admin', adminRoutes)