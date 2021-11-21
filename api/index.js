const { PORT } = require('../config')

const { logger } = require('@vtfk/logger')
const express = require('express')
const authenticateToken = require('../lib/authentication')
const hasData = require('../lib/hasData')
const { updateSystem, updateOperations } = require('../lib/update-db')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Check out the readme please')
})

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
