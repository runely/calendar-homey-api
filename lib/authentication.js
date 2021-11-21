const jwt = require('jsonwebtoken')
const { SEC } = require('../config')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ error: 'Missing required authorization header' })
  if (!authHeader.includes('Bearer ')) return res.status(401).json({ error: 'Invalid authorization header' })

  const token = authHeader.split(' ')[1]
  if (token === null) return res.status(401).json({ error: 'Invalid authorization token' })

  const decodedToken = jwt.verify(token, SEC)
  console.log(decodedToken)

  next()
}
