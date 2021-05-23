const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const configDatabase = require('./database.js')

const configApp = async (app) => {
  dotenv.config()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.db = await configDatabase('anime-crud')
}

module.exports = configApp
