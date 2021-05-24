const bodyParser = require('body-parser')
const configDatabase = require('./database.js')
const registerRoutes = require('../routes/index.js')

const configApp = async (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.db = await configDatabase('anime-crud')

  registerRoutes(app)
}

module.exports = configApp
