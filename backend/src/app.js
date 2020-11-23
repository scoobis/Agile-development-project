require('dotenv').config()
const express = require('express')
const cors = require('cors')
const headers = require('./headers')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

// Middleware
app.use(cors())
app.use(morgan('common'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(headers)

// Routes
app.use('/', require('./routes/userRouter'))
app.use('/users', require('./routes/userRouter'))

app.use((err, req, res, next) => {
res.status(err.status).send({ message: `${err.message}` })
})

app.use((req, res, next) => {
    const error = new Error('404 Not Found')
    error.status = 404
    next(error)
  })


const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Listening on port ${port}...`))
