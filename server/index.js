'use strict'
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()
const PORT = 5001;

// if (process.env.NODE_ENV !== 'production') require("../secret")


// Logging middleware
app.use(morgan('dev'))

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// for mounting + routes
app.use('/routes', require('./routes')); // include our routes!


// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')))



// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('*', (req, res, next) => {
  console.log("HIT")
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})


app.listen(PORT, () => console.log(`
      ==> 🌎 Listening at http://localhost:${PORT}
      http://localhost:5001/
`))
