require('dotenv').config()
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('CONNECTED')
    app.listen(80)
    })
  .catch(err => {
    console.log(err)
  })
