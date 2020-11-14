// Require & Import API routes
import routes from './routes/users'

const express = require('express')

// Init express instance
const app = express()

// Init body-parser options (express built-in)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use API Routes
app.use(routes.users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
