const Express = require('express')

const app = Express()

app.get('/', (request, response) => {
  response.send({ msg: 'Hello World!' })
})

app.listen(3000, () => {
  console.log('Express app listening at http://localhost:3000/')
})
