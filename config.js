require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,
  CONNECTION: process.env.CONNECTION,
  NAME: process.env.NAME,
  COLLECTION_SYSTEM: process.env.COLLECTION_SYSTEM,
  COLLECTION_OPERATIONS: process.env.COLLECTION_OPERATIONS,
  SEC: process.env.SEC
}