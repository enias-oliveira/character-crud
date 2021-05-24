const registerCharactersRoutes = require('./characters.js')

const registerRoutes = (app) => {
  registerCharactersRoutes(app)
}

module.exports = registerRoutes
