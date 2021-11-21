const { logger } = require('@vtfk/logger')

const withTokenAuth = require('../lib/with-token-auth')
const hasData = require('../lib/hasData')
const { updateSystem, updateOperations } = require('../lib/update-db')

const update = async (req, res) => {
  if (!hasData(req.body)) {
    logger('error', ['index', 'Body missing'])
    res.status(400)
    res.json({
      error: 'Body missing'
    })
    return
  }

  const { sys, ops } = req.body
  const result = {}
  if (sys) {
    try {
      await updateSystem(sys)
      result.system = { message: 'Updated' }
    } catch (error) {
      logger('error', ['index', 'system', error])
      res.status(500)
      res.json({
        system: {
          error: error.message
        }
      })
      return
    }
  }

  if (ops) {
    try {
      await updateOperations(ops)
      result.operations = { message: 'Updated' }
    } catch (error) {
      logger('error', ['index', 'operations', error])
      res.status(500)
      res.json({
        operations: {
          error: error.message
        }
      })
      return
    }
  }

  res.json(result)
}

module.exports = (req, res) => withTokenAuth(req, res, update)
