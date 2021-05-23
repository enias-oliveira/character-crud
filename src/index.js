const Express = require('express')

const configApp = require('./configuration/index.js')
const app = Express()

configApp(app)

app.get('/', (request, response) => {
  response.send({ msg: 'Hello World!' })
})

app.post('/characters', async (request, response) => {
  const result = await app.db.collection('personagens').insertOne(request.body)

  response.status(201).send({
    data: result.ops[0],
  })
})

app.listen(3000, () => {
  console.log('Express app listening at http://localhost:3000/')
})
