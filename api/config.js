import jwt from 'jsonwebtoken'

// TODO: Put secrets to .env
const config = {
  authSecret: 'instaDapp', // secret for generating jwt token
}

const isAuthenticated = function (req, res, next) {
  const token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(
      token.replace(/^Bearer\s/, ''),
      config.authSecret,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'unauthorized' })
        } else {
          return next()
        }
      }
    )
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
}

export default {
  config,
  isAuthenticated,
}
