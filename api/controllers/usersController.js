import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '../config'

// TODO: Use server-side Validator
const validator = require('express-validator')

const users = []

const addUser = (email, password) => {
  const data = {
    email,
    password,
    // token: generateAccessToken({ email }),
  }
  const user = users.find((v) => {
    return v.email === email
  })
  if (user) {
    return false
  } else {
    users.push(data)
    return true
  }
}

const getUser = (email) => {
  return users.find((v) => {
    return v.email === email
  })
}

export const register = (req, res) => {
  // throw validation errors
  // const errors = validator.validationResult(req)
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.mapped() })
  // }

  // encrypt password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)

  // initialize record
  const user = {
    email: req.body.email,
    password: hash,
  }

  // Get from Array DB
  if (getUser(req.body.email)) {
    return res.status(500).json({
      message: 'Email already registered.',
      email: user.email,
    })
  } else {
    addUser(user.email, user.password)
    return res.status(200).json({
      message: 'Email registered.',
      email: user.email,
    })
  }
}

export const login = (req, res) => {
  // throw validation errors
  const errors = validator.validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() })
  }

  // Find user in arrayDB
  const user = getUser(req.body.email)
  if (user) {
    // Compare Password
    bcrypt.compare(req.body.password, user.password, (e, isMatch) => {
      if (isMatch === true) {
        return res.json({
          user: {
            email: req.body.email,
          },
          token: jwt.sign({ email: req.body.email }, config.config.authSecret),
        })
      } else {
        return res.status(500).json({
          message: 'Invalid Email or Password entered.',
        })
      }
    })
  } else {
    return res.status(500).json({
      message: 'Please Sign up to Log in.',
    })
  }
}

// checking user token
export const user = (req, res) => {
  const token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(
      token.replace(/^Bearer\s/, ''),
      config.config.authSecret,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({ message: 'unauthorized' })
        } else {
          return res.json({ user: decoded })
        }
      }
    )
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
}

// export default {
//   register,
//   login,
//   user,
// }
