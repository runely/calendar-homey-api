const { verify } = require('jsonwebtoken')
const { logger } = require('@vtfk/logger')
const { TOKEN_AUTH } = require('../config')

module.exports = (req, res, next) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken) {
    logger('error', ['with-token-auth', 'no-authorization-header'])
    res.status(401)
    res.json({ error: 'Missing authorization header' })
    return
  }

  const token = bearerToken.replace('Bearer ', '')
  try {
    const validatedToken = verify(token, TOKEN_AUTH)
    req.token = validatedToken
    next(req, res)
  } catch (error) {
    logger('error', ['with-token-auth', 'validation-failed', error])
    res.status(401)
    res.json(error)
  }
}
