const { PORT } = require('./config')

const { logger } = require('@vtfk/logger')
const authenticateToken = require('./lib/authentication')
const { updateSystem, updateOperations } = require('./lib/update-db')

const hasData = data => data !== undefined && data !== null && (Array.isArray(data) ? data.length !== 0 : typeof data === 'object' ? Object.getOwnPropertyNames(data).length !== 0 : data)

const express = require('express')
const app = express()
app.use(express.json())

app.post('/update', authenticateToken, async (req, res) => {
  if (!hasData(req.body)) {
    logger('error', ['index', 'Body missing'])
    return res.status(400).json({
      error: 'Body missing'
    })
  }

  const { sys, ops } = req.body
  const result = {}
  if (sys) {
    try {
      await updateSystem(sys)
      result.system = { message: 'Updated' }
    } catch (error) {
      logger('error', ['index', 'system', error])
      return res.status(500).json({
        system: {
          error: error.message
        }
      })
    }
  }

  if (ops) {
    try {
      await updateOperations(ops)
      result.operations = { message: 'Updated' }
    } catch (error) {
      logger('error', ['index', 'operations', error])
      return res.status(500).json({
        operations: {
          error: error.message
        }
      })
    }
  }

  res.json(result)
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
