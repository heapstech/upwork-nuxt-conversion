import { Router } from 'express'
// eslint-disable-next-line no-unused-vars
const { config } = require('../config')

const router = Router()

// Load Controller
const usersController = require('../controllers/usersController')

// registration (sign-up)
router.post('/auth/register', usersController.register)

// login (sign-in)
router.post('/auth/login', usersController.login)

// user token
router.get('/auth/user', usersController.user)

export default {
  users: router,
}
