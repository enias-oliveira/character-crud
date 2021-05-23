const { MongoClient } = require('mongodb')

const configDatabase = async (dbName) => {
  const client = new MongoClient(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    return await client.db(dbName)
  } catch (e) {
    throw e
  }
}

module.exports = configDatabase
