const { MongoClient } = require('mongodb')
const { logger } = require('@vtfk/logger')
const { CONNECTION, NAME, COLLECTION_SYSTEM, COLLECTION_OPERATIONS } = require('../config')

let client = null

const getClient = async () => {
  client = new MongoClient(CONNECTION)
  await client.connect()
  client = client.db(NAME)
  logger('info', ['update-db', 'getClient', 'client connected'])
}

const updateSystem = async system => {
  if (!client) await getClient()
  const collection = client.collection(COLLECTION_SYSTEM)

  const item = await collection.find({ homeyId: system.homeyId }).toArray()
  if (item.length > 0) {
    await collection.replaceOne({ homeyId: system.homeyId }, system)
    logger('info', ['update-db', 'updateSystem', 'system updated'])
  } else {
    await collection.insertOne(system)
    logger('info', ['update-db', 'updateSystem', 'system created'])
  }
}

const updateOperations = async operations => {
  if (!client) await getClient()
  const collection = client.collection(COLLECTION_OPERATIONS)

  if (operations.triggers) {
    for (let i = 0; i < operations.triggers.length; i++) {
      const { count, name } = operations.triggers[i]
      await collection.updateOne({ type: 'trigger', name }, { $inc: { count } })
      logger('info', ['update-db', 'updateOperations', 'triggers', 'incremented', name, 'with', count])
    }
  }

  if (operations.conditions) {
    for (let i = 0; i < operations.conditions.length; i++) {
      const { count, name } = operations.conditions[i]
      await collection.updateOne({ type: 'condition', name }, { $inc: { count } })
      logger('info', ['update-db', 'updateOperations', 'conditions', 'incremented', name, 'with', count])
    }
  }

  if (operations.actions) {
    for (let i = 0; i < operations.actions.length; i++) {
      const { count, name } = operations.actions[i]
      await collection.updateOne({ type: 'action', name }, { $inc: { count } })
      logger('info', ['update-db', 'updateOperations', 'actions', 'incremented', name, 'with', count])
    }
  }
}

module.exports = {
  updateSystem,
  updateOperations
}
