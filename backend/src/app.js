// require('dotenv').config({ path: 'src/.env' })
const express = require('express')
const cors = require('cors')
const headers = require('./headers')
const morgan = require('morgan')
const helmet = require('helmet')
const createError = require('http-errors')

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
app.use('/signup', require('./routes/userRouter'))
app.use('/login', require('./routes/userRouter'))
app.use('*', (req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  res.status(err.status).send({ message: `${err.message}` })
})



const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Listening on port ${port}...`))
