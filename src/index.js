const dotenv = require('dotenv')
const Express = require('express')
const configApp = require('./configuration/index.js')

dotenv.config()
const port = process.env.PORT || 3000

const app = Express()
configApp(app)

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}/`)
})
