require('dotenv').config()
const express = require('express')
const cors = require('cors')
const headers = require('./headers')
const router = require('./router')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(headers)
app.use('/', router)

const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Listening on port ${port}...`))

